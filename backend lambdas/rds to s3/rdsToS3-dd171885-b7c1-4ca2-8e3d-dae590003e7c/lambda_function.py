import json
import boto3
import pymysql
from datetime import datetime 
import os

def lambda_handler(event, context):
    
   #RDS details 
   rds_host,username,password,database_username = os.environ['rds_endpoint'], os.environ['username'], os.environ['password'], os.environ['database_name']
   
   #S3_details
   s3_bucket = os.environ['s3_bucket']
   tables = ['user','device','measurement']
   
   timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
   try:
      connection = pymysql.connect(host=rds_host, user=username, password=password, database=database_username)
   except pymysql.MySQLError as e:
      logger.error("ERROR: Unexpected error: Could not connect to MySQL instance.")
      logger.error(e)
      sys.exit(1)
   
   
   for table in tables:
      cursor = connection.cursor()
      cursor.execute(f"SELECT * FROM {table}")
      data = cursor.fetchall()
      # print(1)
      
      s3_key = f"{table}/{timestamp}_exported-data.csv"
      s3 = boto3.client("s3")
      
      try:
         #Check if the file exists
         s3.head_object(Bucket=s3_bucket, Key=s3_key)
         print(f"File for {table} already exists. Skipping export.")
      except:
         #Put data in S3
         s3.put_object(Bucket=s3_bucket, Key=s3_key, Body=str(data))
         print(f"Data for {table} exported successfully to S3.")


   connection.close()

   return {
        "statusCode": 200,
        "body": "Export completed."
   }
       
    
   #  print(event)
    
    
    # return {
    #     'statusCode': 200,
    #     'body': json.dumps('Hello from Lambda!')
    # }
