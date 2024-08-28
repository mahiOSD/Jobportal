import React, { useState } from 'react';
import axios from 'axios';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetRequest = async (e) => {
    e.preventDefault();

    try {
      await axios.post('https://jobportal-black.vercel.app/api/auth/send-reset-link', { email });
      setMessage('Password reset email sent. Check your inbox.');
    } catch (error) {
      console.error('Error requesting password reset:', error);
      setMessage('Error requesting password reset. Please try again.');
    }
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-image">
        <img src="/images/banner.jpg" alt="Forgot Password" />
      </div>
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <form onSubmit={handleResetRequest}>
          <label>
            Email:
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </label>
          <button type="submit" className="forgot-password-button">
            Reset Password
          </button>
        </form>
        {message && <p className={message.includes('sent') ? 'success' : 'error'}>{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
