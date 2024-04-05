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



def lambda_handler(event, context):
    # TODO implement
    print(event)
    try:
        headers = event['headers']
        print(str(type(headers)))
        token = headers['authorization']
        accesstoken = os.environ['clienttoken']
        if(token != accesstoken):
            raise Exception ("UnAuthorized Access")
    except Exception as e:
        logger.error("Error: UnAuthorized Access")
        logger.error(e)
        return{
            'statusCode':400
        }
        
    
    print(event)
    event_body = event['body']
    if(None != event_body):
        try:
            body = json.loads(event_body)
            
            #validate request
            #validate valid iot device
            device = body['device']
            mac = device['mac']
            
            iotdevice = data_layer.getIotDevice(mac, conn)
            if(None == iotdevice):
                raise Exception("Iot Device does not exists")
            
            #validate valid gateway device
            hubid = body['hubId']
            
            gateway = data_layer.getGatewayDevice(hubid, conn)
            
            if(None == gateway):
                raise Exception(" Gateway Device does not exists") 

            user = data_layer.getUserfromMacAddress(mac, conn)
            if(None == user):
                raise Exception(" User does not exists") 

            data_layer.addMeasurement(body, user['pk'], conn)
        except Exception as e:
            logger.error("Error: error while adding measurement to db. Please check logs")
            logger.error(e)
            return {
            'statusCode':400
            }
            
    else:
        logger.error("Error: Body not found")
        return {
            'statusCode':400
            }
    return {
        'statusCode': 200
        # 'body': json.dumps(event['body'])
    }
