import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './PatientReportPage.module.css';

// Define an interface for the expected shape of the API response

const capitalize = (str: string) => {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
interface Measurement {
  bpm: number;
  temperature: number;
  angle: number;
  battery: number;
  circumference: number;
  standuppercentage: number;
  measuredtime: string;
}

interface PatientReport {
  patient_unique_code: number;
  patient_firstname: string;
  patient_lastname: string;
  measurements: Measurement[];
  doctor_unique_code: number;
}

const PatientReportPage = () => {
  const { patientId } = useParams<{ patientId: string }>();
  const [patientReport, setPatientReport] = useState<PatientReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const apiUrl = `https://dcw3srhbqk.execute-api.us-east-1.amazonaws.com/user/${patientId}/reports`

  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setPatientReport(response.data);
      })
      .catch(err => {
        setError('Failed to load patient report');
        console.error('Error fetching patient report:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [patientId]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!patientReport) return <div className={styles.noData}>No patient report available.</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{capitalize(patientReport.patient_firstname)} {capitalize(patientReport.patient_lastname)}</h1>
      <h2 className={styles.title}>Patient Profile</h2>
      <div className={styles.patientDetails}>
        {/* Additional patient details can be added here */}
        <h2 className={styles.measurementsTitle}>Measurements</h2>
        {patientReport.measurements.map((measurement, index) => (
          <div key={index} className={styles.measurement}>
            <p><strong>Time:</strong> {measurement.measuredtime}</p>
            <p><strong>BPM:</strong> {measurement.bpm}</p>
            <p><strong>Temperature:</strong> {measurement.temperature}°C</p>
            <p><strong>Angle:</strong> {measurement.angle}</p>
            <p><strong>Battery:</strong> {measurement.battery}%</p>
            <p><strong>Circumference:</strong> {measurement.circumference}</p>
            <p><strong>Standup Percentage:</strong> {measurement.standuppercentage}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientReportPage;