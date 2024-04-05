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
# kms_key = os.environ['kms_key_id']

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

# def encrypt_password(password,kms_key):
#     print(kms_key)
#     kms = boto3.client('kms')
#     response = kms.encrypt(KeyId=kms_key,Plaintext=password.encode())['CiphertextBlob']
#     print("response Kms: ",response)
#     return b64encode(response).decode('utf-8')

# def decrypt_password(ciphertext):
#     kms = boto3.client('kms')
#     return kms.decrypt(CiphertextBlob=b64decode(ciphertext))['Plaintext'].decode()
    
def user_details(data):
    
    body =  { "userName" : data['userName'].lower(), 
              "password": b64encode(data['password'].encode()).decode(),
               "firstName" : data['firstName'], 
               "lastName":data ['lastName'], 
               "phoneNumber" : data['phoneNumber'], 
               "dob": datetime.strptime(data['dob'], '%m-%d-%Y').date(), 
               "userType": data['userType']
            }
    return body
    
def lambda_handler(event, context):
    # TODO implement
    # data = user_details(event['body'])
    # print(data)
    data = event['body']
    body = json.loads(data)
    print(type(body))
    user_details = { "userName" : body['userName'].lower(), 
                      "password": b64encode(body['password'].encode()).decode(),
                       "firstName" : body['firstName'], 
                       "lastName":body ['lastName'], 
                       "phoneNumber" : body['phoneNumber'], 
                       "dob": datetime.strptime(body['dob'], '%m-%d-%Y').date(), 
                       "userType": body['userType']
    }
    
    
    inserted = data_layer.checkUser(user_details,conn)
    
    print(inserted)
    
    if inserted:
        return {
            'statusCode': 201,
            'status': 'success',
            "headers": {
            'Content-Type': 'application/json',
            }
        }
    else:
        return {
                'statusCode': 409,
                'status': 'User Name already exists. Please choose a new one',
                "headers": {
                'Content-Type': 'application/json',
                }
        }
    # return inserted