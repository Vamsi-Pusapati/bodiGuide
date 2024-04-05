import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './DoctorHomePage.module.css'; 
import Button from '@mui/material/Button';


const capitalize = (str: string) => {
  if (!str) return '';
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
// Define an interface for the expected shape of doctorDetails
interface DoctorDetails {
  unique_code: number;
  firstname: string;
  lastname: string;
  usertype: string;
  patients: Array<{
    unique_code: number;
    firstname: string;
    lastname: string;
  }>;
}

const DoctorHomePage: React.FC = () => {
  // State to hold doctor details
  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Replace with your actual doctor's unique code
  const doctorUniqueCode = 2;
  const doctorApiUrl = `https://dcw3srhbqk.execute-api.us-east-1.amazonaws.com/user/${doctorUniqueCode}`;

  useEffect(() => {
    axios.get(doctorApiUrl)
      .then(response => {
        // Ensure the response is in the expected format with type assertion
        const details = response.data as DoctorDetails;
        if (details && details.usertype === 'doctor') {
          setDoctorDetails(details);
        } else {
          setError('No doctor data found');
        }
      })
      .catch(error => {
        console.error('Error fetching doctor details:', error);
        setError('Failed to load doctor details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [doctorApiUrl, doctorUniqueCode]); // useEffect dependency array


  // Loading and error handling
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!doctorDetails) return <div>No doctor details available.</div>;

  // Extract the doctor's name and patient list
  const doctorName = `${doctorDetails.firstname} ${doctorDetails.lastname}`;
  const patients = doctorDetails.patients;

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

                <div className="flex flex-col justify-center items-center mt-10">
                    <div className="w-2/3 bg-white rounded">

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        
                                        <TableCell align="center">First Name</TableCell>
                                        <TableCell align="center">Last Name</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                  {patients.map((patient) => (
                                    <TableRow
                                      key={patient.unique_code}
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell className={styles.name} component="th" scope="row">
                                        {patient.firstname}
                                      </TableCell>
                                      <TableCell className={styles.name} align="left">{patient.lastname}</TableCell>
                                      <TableCell align="center">
                                        <Button
                                          variant="contained"
                                          color="primary"
                                          component={Link}
                                          to={`/doctor/view-patient/${patient.unique_code}`}
                                        >
                                          View Full Details
                                        </Button>
                                      </TableCell>

                                    </TableRow>
                                  ))}
                                </TableBody>

                            </Table>
                        </TableContainer>

                        <div className='text-center py-4 cursor-pointer'>View Full List</div>
                    </div>
                    
                    <div className="flex flex-row items-start rounded mt-10">
                        <div className="flex flex-col bg-white h-32 w-64">
                              <div className='text-center text-l font-semibold pt-6'>Total Number of Patients</div>
                              <div className='text-center pt-4'>{patients.length}</div>
                        </div>
                        <div className="bg-white ml-48 h-32 w-64">
                              <div className='pt-6 text-center' ><strong>{capitalize(doctorName)}</strong></div>
                        </div>

                    </div>

                </div>


            </div>


        
    
    </>
  );
};

export default DoctorHomePage;
