import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 
import './ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        //`http://localhost:5000/api/auth/reset-password/${token}`,
        `https://jobportal-black.vercel.app/api/auth/reset-password/${token}`,
        { password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setSuccess(response.data.message);
      setError('');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error resetting password');
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">New Password</label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            required
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            required
          />
          <button type="submit" className="reset-password-button">
            Reset Password
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;