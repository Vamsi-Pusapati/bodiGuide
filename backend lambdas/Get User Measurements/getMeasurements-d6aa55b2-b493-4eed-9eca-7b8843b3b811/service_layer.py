import data_layer as data_layer
def patientFlow(patient, conn):
    return_dict = dict()
    return_dict['patient_unique_code'] = patient['pk']
    return_dict['patient_firstname'] = patient['firstname']
    return_dict['patient_lastname'] = patient['lastname']
    reports = data_layer.getMeasurementsForPatient(patient['pk'], conn)
    return_dict['measurements'] = reports
    return return_dict

def doctorFlow(doc, pat, conn):
    if(patient_iotDevice(pat)):
        pat_mas_dict = patientFlow(pat, conn)
        pat_mas_dict['doctor_unique_code'] = doc['pk']
        return pat_mas_dict
    else:
        return {'message':'No IOT device associated to patient'}

def doctor_validations(doctor,patient, conn):
    relation = data_layer.getPatientsfromDoctorPk(doctor['pk'], patient['pk'], conn)
    if(None != relation and len(relation)==1):
        return True
    return False


def patient_iotDevice(patient):
    if(None == patient['iotdevice']):
        return False
    return True
    