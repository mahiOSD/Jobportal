import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const ResetPassword = ({ token }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/reset-password/${token}`, { password });
      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Error resetting password');
      console.error('Error resetting password:', error);
    }
  };

  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New Password"
        required
      />
      <button type="submit">Reset Password</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
};

ResetPassword.propTypes = {
  token: PropTypes.string.isRequired, 
};

export default ResetPassword;
