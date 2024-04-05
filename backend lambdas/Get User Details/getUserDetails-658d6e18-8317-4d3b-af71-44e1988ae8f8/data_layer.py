import sys
import logging
import pymysql
import json
import os
import data_layer as data_layer
from datetime import datetime
    
def getUserfromPk (pk: str, conn) -> dict:
    
    user = None
    with conn.cursor() as cur:
        sql_statement = "select * from user where pk = %s"
    
        user_pk = (pk)
        cur.execute(sql_statement, user_pk)
        user = cur.fetchone()
    #print (user)
    return user
    
def getPatientsfromDoctorPk (pk: str, conn) -> dict:
    
    patients = None
    with conn.cursor() as cur:
        sql_statement = """select p.pk, p.uid, p.lastname, p.firstname from user as d join doctor2patientrelation as d2p on d.pk=d2p.doctorId join user as p on p.pk=d2p.patientId
	where d.pk=%s"""
        doctor_pk = (pk)
        cur.execute(sql_statement, doctor_pk)
        patients = cur.fetchall()
    #print (user)
    return patients

    