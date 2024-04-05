"""
Your module description
"""
def getUserfromPk (pk: str, conn) -> dict:
    
    user = None
    with conn.cursor() as cur:
        sql_statement = "select * from user where pk = %s"
    
        user_pk = (pk)
        cur.execute(sql_statement, user_pk)
        user = cur.fetchone()
    #print (user)
    return user
    
def getMeasurementsForPatient(patient_pk, conn):
    measurements = []
    date_format = '%Y-%m-%d %H:%i%s'
    with conn.cursor() as cur:
        sql_statement = """select m.bpm, m.temperature, m.angle, m.battery, m.circumference, m.standuppercentage,date_format(m.measuredtime, %s) as measuredtime  from measurement as m join user as u on u.pk=m.userid 
        where u.pk=%s and m.measuredtime >= DATE_ADD(NOW(), interval -6 MONTH ) order by m.measuredtime DESC"""
        values = (date_format,patient_pk)
        cur.execute(sql_statement, values)
        patient_measurements = cur.fetchall()
    #print (user)
    return patient_measurements
    
    
def getPatientsfromDoctorPk (doc_pk: str, pat_pk: str, conn) -> dict:
    
    patients = None
    with conn.cursor() as cur:
        sql_statement = """select p.pk, p.uid, p.lastname, p.firstname from user as d join doctor2patientrelation as d2p on d.pk=d2p.doctorId join user as p on p.pk=d2p.patientId
	where d.pk=%s and p.pk=%s"""
        pks = (doc_pk, pat_pk)
        
        cur.execute(sql_statement, pks)
        patients = cur.fetchall()
    #print (user)
    return patients