import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import PatientSideBar from "./PatientSideBar";
import CardMedia from '@mui/material/CardMedia';


// Define an interface for the expected shape of patientDetails

const capitalize = (str: string) => {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
interface PatientDetails {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  dob: string; // Date of birth
  // include other properties as needed
}

// In the component, use the interface to type the state


const PatientProfilePage: React.FC = () => {
  // State to hold patient details
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Replace with the actual user ID you want to fetch
  const userId = 1;

  // Effect to fetch patient data on mount
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`https://vfqd51syg4.execute-api.us-east-1.amazonaws.com/prod/user/${userId}`);
        setPatientDetails(response.data);
      } catch (err) {
        setError('Failed to load patient details');
        console.error('Error fetching patient details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [userId]); // useEffect will run when the userId changes

  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!patientDetails) return <div>No patient details available.</div>;

  // Render patient details
  return (
    <>
      <div className="h-screen bg-blue-200">
        <aside className="">
          <PatientSideBar />
        </aside>

        <main className="ml-60">
          <div className="text-center pt-8 font-semibold text-2xl">Profile</div>
          <div className="flex items-center justify-center pt-16">
            <div className="w-1/2 h-full bg-white">
              <Card className="flex flex-col items-center justify-center w-full">
              <CardMedia
                  className="pt-12"
                  component="img"
                  sx={{ width: 151 }}
                  image="user.png"
                  alt="Profile picture"
                />
                <div className="">
                  <div className="text-xl text-center font-semibold">
                    {capitalize(patientDetails.firstname)} {capitalize(patientDetails.lastname)}
                  </div>
                  <div className="pb-12 pt-4">
                    <div className="flex pl-10">
                      <div className="w-1/2 font-semibold">Email ID</div>
                      <div className="w-1/2">{patientDetails.email}</div>
                    </div>
                    <div className="flex pt-4 pl-10">
                      <div className="w-1/2 font-semibold">Gender</div>
                      <div className="w-1/2">{patientDetails.gender}</div>
                    </div>
                    <div className="flex pt-4 pl-10">
                      <div className="w-1/2 font-semibold">Date of Birth</div>
                      <div className="w-1/2">{patientDetails.dob}</div>
                    </div>
                    {/* Add additional fields as needed */}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default PatientProfilePage;