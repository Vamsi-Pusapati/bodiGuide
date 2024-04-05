import React, { useState } from 'react';
import styles from './SignUp.module.css';

type FormData = {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    dob: string;
    gender: string;
    password: string;
    confirmPassword: string;
    role: string;
  };
  
  const SignUp: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      gender: '',
      password: '',
      confirmPassword: '',
      role: '',
    });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    // Here you would typically send formData to your backend server
    console.log(formData);
    // Remember to handle state for loading, response, and errors
  };

  return (
    <form className={styles.signupForm} onSubmit={handleSignUp}>
      <h2>Sign Up</h2>
      
      {/* Name Fields */}
      <div className={styles.formGroup}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter First Name"
          className={styles.inputField}
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          placeholder="Enter Middle Name (Optional)"
          className={styles.inputField}
          value={formData.middleName}
          onChange={handleInputChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter Last Name"
          className={styles.inputField}
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </div>
      
      {/* Email and Phone Number Fields */}
      <div className={styles.formGroup}>
        <label htmlFor="email">Email ID</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          className={styles.inputField}
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Enter Address"
          className={styles.inputField}
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          className={styles.inputField}
          value={formData.dob}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          className={styles.inputField}
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="phone">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter Phone Number"
          className={styles.inputField}
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      
      {/* Role Selection */}
      <div className={styles.formGroup}>
        <div className={styles.radioGroup}>
          <label>
            <input
              type="radio"
              name="role"
              value="Doctor"
              checked={formData.role === 'Doctor'}
              onChange={handleInputChange}
            />
            Doctor
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="Patient"
              checked={formData.role === 'Patient'}
              onChange={handleInputChange}
            />
            Patient
          </label>
        </div>
      </div>
      
      {/* Password Fields */}
      <div className={styles.formGroup}>
        <label htmlFor="password">Set Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Set Password"
          className={styles.inputField}
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          className={styles.inputField}
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>
      
      {/* Submit Button */}
      <button type="submit" className={styles.submitButton}>Sign Up</button>
    </form>
  );
};

export default SignUp;