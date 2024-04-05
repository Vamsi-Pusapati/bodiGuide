import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import DoctorHomePage from './DoctorHomePage';
import PatientHomePage from './PatientHomePage';
import DoctorViewPatientPage from './DoctorViewPatientPage';
import PatientReportPage from './PatientReportPage';
import PatientProfilePage from './PatientProfilePage'; // Import the PatientProfilePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage onLogin={(username, password) => {
              // Implement your login logic here
              console.log(`Login with username: ${username}, password: ${password}`);
            }}
            onForgotPassword={() => {
              // Implement your forgot password logic here
              console.log('Forgot Password clicked');
            }}
          />} 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/doctor-home" element={<DoctorHomePage />} />
        <Route path="/patient-home" element={<PatientHomePage />} />
        <Route path="/patient-report/:patientId" element={<PatientReportPage />} />
        <Route path="/doctor/view-patient/:patientId" element={<DoctorViewPatientPage />} />
        <Route path="/patient-profile" element={<PatientProfilePage />} /> {/* Add the route for PatientProfilePage */}
      </Routes>
    </Router>
  );
}

export default App;
