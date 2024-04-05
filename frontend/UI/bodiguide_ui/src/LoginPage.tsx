import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.module.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onForgotPassword: () => void;
}

const LoginPage: React.FC<LoginProps> = (props) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    const usernameInput = document.getElementById('usernameInput') as HTMLInputElement | null;
    const passwordInput = document.getElementById('passwordInput') as HTMLInputElement | null;

    const username = usernameInput?.value || '';
    const password = passwordInput?.value || '';

    // Check if the username is 'doctor'
    if (username.toLowerCase() === 'doctor') {
      navigate('/doctor-home'); // Navigate to the doctor home page
    } else {
      // Here you might want to navigate to patient home or handle other logins
      navigate('/patient-home'); // Navigate to the patient home page for any other username
    }

    // Call the onLogin prop with the entered credentials
    props.onLogin(username, password);
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <>
      <div className="h-screen bg-violet-400 flex items-center justify-center"> 
        <div className="w-2/3 h-2/3 bg-gray-100 rounded shadow-xl">
          <div className="flex flex-row">
            <div className="w-1/2 h-full pl-7 pt-6">
              <img src="BodiGuide_Icon.png" alt="BodiGuide Icon"/>
            </div>
            <div className="flex flex-col mx-9 my-9 w-1/2">
              <div className="text-xl pt-4 font-semibold">
                WELCOME!
              </div>
              <div className="pt-6 text-sm">
                Please Login to Continue
              </div>
              <div className="mr-16 py-6">
                <TextField id="usernameInput" label="Username" type="text" size="small" fullWidth />
              </div>
              <div className="mr-16">
                <TextField id="passwordInput" label="Password" type="password" size="small" fullWidth />
              </div>
              <div className="text-sm text-right mr-16 cursor-pointer" onClick={props.onForgotPassword}>
                Forgot Password?
              </div>
              <div className="text-center pt-4 mr-16">
                <Button variant="contained" onClick={handleLogin}>Login</Button>
              </div>
              <div className="text-center pt-3 mr-16">
                (Or)
              </div>
              <div className="text-center text-blue-500 pt-3 mr-16 cursor-pointer font-semibold" onClick={handleCreateAccount}>
                Create an Account
              </div>
            </div>
          </div>          
        </div>
      </div>
    </>
  );
};

export default LoginPage;
