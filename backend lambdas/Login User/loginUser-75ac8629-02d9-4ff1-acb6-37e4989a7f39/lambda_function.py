import json
import sys
import logging 
import pymysql
import os
import boto3
from base64 import b64encode
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
    print("Succesfully Connected")
    

except pymysql.MySQLError as e:
    logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
    logger.error(e)
    sys.exit(1)
    
def user_details(data: dict):
    
    print(data['userName'])
    body =  { "userName" : data['userName'].lower(), 
              "password": b64encode(data['password'].encode()).decode(),
            }
    return body


def lambda_handler(event, context):
    # TODO implement
    data = event['body']
    
    body = json.loads(data)
    print('type of  ',type(data))
    user_details = {
        "userName": body['userName'].lower(),
        "password": b64encode(body['password'].encode()).decode(),
    }
    dl =  data_layer.check_user(user_details,conn)
    # print('Username: ',data['userName'])
    if dl:
        return json.dumps({
            'statusCode': 200,
            'status': "Succesfully Logged In!",
            "headers": {
            'Content-Type': 'application/json',
            }
            })
        
    return json.dumps({
        'statusCode': 404,
        'status': "Login Unsuccesful",
        "headers": {
            'Content-Type': 'application/json',
            }
    })
