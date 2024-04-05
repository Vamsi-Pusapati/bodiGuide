import sys
import logging
import pymysql
import json
import os
import data_layer as data_layer
from datetime import datetime


def getIotDevice(mac_id: str, conn) -> dict:
    iotdevice = None
    with conn.cursor() as cur:
        sql_statement = "select pk, macaddress from device where macaddress = %s"
        macaddress = (mac_id)
        cur.execute(sql_statement, macaddress)
        iotdevice = cur.fetchone()
        #print("Iot device details")
        #print(iotdevice)
    return iotdevice

def getGatewayDevice(hub_id: str, conn) -> dict:
    gateway = None
    with conn.cursor() as cur:
        sql_statement = "select pk, hubid from device where hubid = %s"
        hubid = (hub_id)
        cur.execute(sql_statement, hubid)
        gateway = cur.fetchone()
        #print("Gateway device details")
        #print(gateway)
    return gateway
    
def getUserfromMacAddress (mac_id: str, conn) -> dict:
    
    user = None
    with conn.cursor() as cur:
        sql_statement = "select u.pk, u.uid from user as u  join device as d on u.iotdevice = d.pk where d.macaddress = %s"
    
        macaddress = (mac_id)
        cur.execute(sql_statement, macaddress)
        user = cur.fetchone()
    #print (user)
    return user
    
def addMeasurement(body,userpk,conn):
    if(None != body):
        #print("type of body : " + str(type(body)))
        transtime = datetime.fromisoformat(body['transmissionTime'])
        measure = body['measure']
        measuretime = datetime.fromisoformat(measure['time'])
        
        measure_data = measure['data']
        bpm = int(measure_data['bpm'])
        temperature = float(measure_data['temp'])
        angle = float(measure_data['angle'])
        battery = int(measure_data['battery'])
        circumference = float(measure_data['circumference'])
        standuppercentage = int(measure_data['stand_up_percentage'])
        dtime = measure_data['dtime']
        
        mid = str(userpk) + "-" + str(measuretime)
    
    with conn.cursor() as cur:
        
        sql = """
        INSERT INTO measurement (
            measurementid,
            dtime,
            bpm, 
            temperature, 
            angle, 
            battery, 
            circumference, 
            standuppercentage, 
            measuredtime, 
            transmittedtime,
            userid
        ) VALUES (
            %s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s
        )
        """
        
        data = (
            mid,
            dtime,
            bpm,
            temperature,
            angle,
            battery,
            circumference,
            standuppercentage,
            measuretime,
            transtime,
            userpk
        )
        cur.execute(sql, data)
        conn.commit()
    
    
    