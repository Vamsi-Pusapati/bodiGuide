import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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
  age: number; // Assuming you have the age property in your data
  gender: string;
  dob: string;
}

const PatientHomePage: React.FC = () => {
  const [patientDetails, setPatientDetails] = useState<PatientDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = 1; // Assuming '1' is the unique_id for the customer

  useEffect(() => {
    const endpoint = `https://vfqd51syg4.execute-api.us-east-1.amazonaws.com/prod/user/${userId}`;
    
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(endpoint);
        setPatientDetails(response.data);
      } catch (err) {
        setError('Failed to load patient details');
        console.error('Error fetching patient details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!patientDetails) return <div>No patient details available.</div>;

  return (
    <>
    <div className="h-screen  bg-stone-100">
        {/* Header Section */}
        <div className="h-16 bg-gray-200 text-center flex items-center justify-between">
            <div className="pl-9 text-2xl font-semibold">
                Bodiguide Inc.
            </div>
            <div className="flex items-end">
                <div className="pr-9">
                    Home
                </div>
                <div className="pr-9">
                    Profile
                </div>
                <div className="pr-9">
                    About
                </div>
                <div className="pr-9">
                    Logout
                </div>
            </div>
        </div>

        <div className="flex flex-row justify-center">
            <div className="flex flex-col w-1/2 items-center justify-center ">
            <div className="w-1/2 pt-24">
              <Link to={`/patient-report/${userId}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ display: 'flex' }}>
                  <CardMedia
                    className='h-36'
                    component="img"
                    sx={{ width: 151 }}
                    image="reports.png"
                    alt="Reports"
                  />
                  <CardContent>
                    <div className="text-xl font-semibold">
                      View Reports
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
                <div className="w-1/2 pt-24">
                    <Card sx={{ display: 'flex' }}>
                        <CardMedia
                        className='h-36'
                            component="img"
                            sx={{ width: 151 }}
                            image="monitor1.jpeg"
                            alt="Live from space album cover"
                        />
                        <CardContent>
                            <div className="text-xl text-center font-semibold">
                                Monitor Data 
                            </div>
                        </CardContent>
                        
                    </Card>
                </div>
            </div>

            <div className="w-1/2 h-full items-center mx-8">
            <div className="w-2/3 pt-24">
              <Card className="flex flex-col items-center">
                <CardMedia
                  className="pt-12"
                  component="img"
                  sx={{ width: 151 }}
                  image="user.png"
                  alt="Profile picture"
                />
                <CardContent>
                  <div className="text-xl text-center font-semibold">
                  {capitalize(patientDetails.firstname)} {capitalize(patientDetails.lastname)}
                  </div>
                  <div className="pb-8 pt-4">
                    <div className="flex pl-6">
                      <div className="w-1/2 font-semibold">Email</div>
                      <div className="w-1/2">{patientDetails.email}</div>
                    </div>
                    <div className="flex pt-4 pl-6">
                      <div className="w-1/2 font-semibold">Gender</div>
                      <div className="w-1/2">{patientDetails.gender}</div>
                    </div>
                    <div className="flex pt-4 pl-6">
                      <div className="w-1/2 font-semibold">Date of Birth</div>
                      <div className="w-1/2">{patientDetails.dob}</div>
                    </div>
                    <div className="flex items-center justify-center pt-4">
                      <Link to="/patient-profile" className="text-blue-400">View Profile</Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientHomePage;