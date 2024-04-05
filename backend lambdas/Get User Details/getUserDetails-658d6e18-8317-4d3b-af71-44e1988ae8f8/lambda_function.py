
import sys
import logging
import pymysql
import json
import os
from datetime import datetime
import data_layer as data_layer

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

def createUserData(user):
        user_data = dict()
        user_data['unique_code'] = user['pk']
        user_data['firstname'] = user['firstname']
        user_data['lastname'] = user['lastname']
        user_data['usertype'] = user['usertype']
        user_data['gender'] = user['gender']
        user_data['dob'] = str(user['dob'])
        user_data['email'] = user['email']
        return user_data

def lambda_handler(event, context):
    # TODO implement
    
    print(event)
    
    try:
        pathParameters = event['pathParameters']
    
        pk = pathParameters['userId']
        
        if(None ==  pk):
            return {
            'statusCode': 400,
            'body': json.dumps({'error':'Uid not passed'}),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            }
            
        }
        
        user = data_layer.getUserfromPk(pk,conn)
        
        if(None == user):
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
        else:
            user_data = createUserData(user)
            if(user['usertype'] == 'doctor'):
                patients = data_layer.getPatientsfromDoctorPk(user['pk'], conn)
                print(patients)
                patients_data = []
                if(None != patients and len(patients) != 0):
                    for patient in patients:
                        patient_data = dict()
                        patient_data['unique_code'] = patient['pk']
                        patient_data['firstname'] = patient['firstname']
                        patient_data['lastname'] = patient['lastname']
                        patient_data['gender'] = user['gender']
                        patient_data['dob'] = str(user['dob'])
                        patient_data['email'] = user['email']
                        patients_data.append(patient_data)
                user_data['patients'] = patients_data
                    
        
        return {
            'statusCode': 200,
            'body': json.dumps(user_data),
            'headers': {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
        }
    except Exception as e:
        logger.error("Error: error during retriving the user details. Please check logs")
        logger.error(e)
        return {
        'statusCode':400
        # 'headers': {
        #         'Access-Control-Allow-Headers': 'Content-Type',
        #         'Access-Control-Allow-Origin': '*',
        #         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        #     },
        }
    
    

    