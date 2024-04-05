import sys
import logging
import pymysql
import json
import os
from datetime import datetime
import data_layer as data_layer
import service_layer as serice_layer

user_name = os.environ['user']
password = os.environ['password']
rds_proxy_host = os.environ['proxy']
db_name = os.environ['db']


logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
        #makig cursor class as Dict that we can get sql results as dictionary instead of tuples
        conn = pymysql.connect(host=rds_proxy_host, user=user_name, passwd=password, db=db_name,
                    cursorclass=pymysql.cursors.DictCursor, connect_timeout=5)
        
        
except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit(1)

logger.info("SUCCESS: Connection to RDS for MySQL instance succeeded")


def lambda_handler(event, context):
    # TODO implement
    print(event)
    pathParameters = event['pathParameters']
    user_pk = pathParameters['userId']
    
    if(None ==  user_pk):
        return {
        'statusCode': 400,
        'body': json.dumps({'error':'Uid not passed'}),
        'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
        }
        
    user = data_layer.getUserfromPk(user_pk,conn)
    
    if(None != user):
        
        if(user['usertype'] == 'doctor'):
            try:
                query_param =  event['queryStringParameters']
                patient_pk = query_param['patientId']
            except Exception as e:
                logger.error("Error: error patiendId not passed. Please check logs")
                logger.error(e)
                return {
                'statusCode':400,
                'body': json.dumps({'error':'error patiendId not passed'})
                }
            
            patient = data_layer.getUserfromPk(patient_pk,conn)
            if(None == patient):
                logger.error("Error: error while retriving user. Please check logs")
                logger.error(e)
                return {
                'statusCode':400,
                'body': json.dumps({'error':'error while retriving patient details'}),
                'headers': {
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                }
                }
            
            
            bool_val = serice_layer.doctor_validations(user,patient, conn)
            if(bool_val):
                
                return_dict = serice_layer.doctorFlow(user,patient, conn)
                return {
                    'statusCode': 200,
                    'body': json.dumps(return_dict),
                    'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    }
                }
            else:
                return {
                'statusCode':400,
                'body': json.dumps({'error':'patient doctor relation does not exists'})
                }
        
        elif (user['usertype'] == 'patient'):
            
            iot_exists = serice_layer.patient_iotDevice(user)
            
            if(iot_exists):
                return_dict = serice_layer.patientFlow(user, conn)
                return {
                    'statusCode': 200,
                    'body': json.dumps(return_dict),
                    'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    }
                }
            
            else :
                return {
                'statusCode':200,
                'body': json.dumps({'message':'No IOT device associated to patient'}),
                'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    }
                }
        
        else:
            {
            'statusCode':400,
            'body': json.dumps({'error':'error user type'}),
            'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    }
            }
    else:
        logger.error("Error: error while retriving user. Please check logs")
        logger.error(e)
        return {
        'statusCode':400,
        'body': json.dumps({'error':'error while retriving user'}),
        'headers': {
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                    }
        }

