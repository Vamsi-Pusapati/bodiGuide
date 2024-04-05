import json
import sys
import logging 
import pymysql
import os
import boto3

user_name = os.environ['user']
password = os.environ['password']
rds_proxy_host = os.environ['proxy']
db_name = os.environ['db']


logger = logging.getLogger()
logger.setLevel(logging.INFO)


def check_user(data,connection):
    try:
        curr = connection.cursor()
        #Check if given userName exists in user table
        checkUser = """SELECT uid FROM `user` WHERE uid = %s AND hashpassword = %s"""
        curr.execute(checkUser,(data['userName'],data['password']))
        result = curr.fetchone()
        # print("User Value: ",result)
        
        if result == None:
            
            # return  {
            #     'statusCode' : 404,
            #     'status' : 'User Not Found!'
            # }
            return False
        
        # return {
        #     'statusCode': 200,
        #     'status': 'Succesfully Logged in!'
        # }
        return True
    
    except pymysql.Error as e:
        logger.error("ERROR: Unexpected error in MySQL operation")
        logger.error(e)
        sys.exit(1)