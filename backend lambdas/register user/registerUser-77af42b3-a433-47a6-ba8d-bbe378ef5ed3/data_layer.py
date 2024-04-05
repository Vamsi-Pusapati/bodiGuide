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

def put_values(data,connection):
    try:
        curr = connection.cursor()

        sql = """INSERT INTO `user` (uid,hashpassword,firstname,lastname,phonenumber,dob,usertype) VALUES (%s,%s,%s,%s,%s,%s,%s)"""
        curr.execute(sql,(data['userName'],data['password'],data['firstName'],data['lastName'],data['phoneNumber'],data['dob'],data['userType']))
        connection.commit()
        print("Succesfully put values in Database User")
        # return {
        #     'statusCode': 201,
        #     'status': 'success',
        #     "headers": {
        #     'Content-Type': 'application/json',
        #     }
        # }
        return True
    
    except pymysql.Error as e:
        logger.error("ERROR: Unexpected error in MySQL operation")
        logger.error(e)
        sys.exit(1)
        
def checkUser(data,connection):
    try:
        curr = connection.cursor()
        #Check if given userName exists in user table
        checkUser = """SELECT uid FROM `user` WHERE uid = %s AND hashpassword = %s"""
        curr.execute(checkUser,(data['userName'],data['password']))
        result = curr.fetchone()
        print("User Value: ",result)
        
        if result == None:
            return put_values(data,connection)
            # print('Values: ',put_values(data,connection))
            
        else:
            # return {
            #     'statusCode': 409,
            #     'status': 'User Name already exists. Please choose a new one',
            #     "headers": {
            # 'Content-Type': 'application/json',
            # }
            # }
            return False

    
    except pymysql.Error as e:
        logger.error("ERROR: Unexpected error in MySQL operation")
        logger.error(e)
        sys.exit(1)