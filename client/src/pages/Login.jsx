import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        // Store token in local storage
        localStorage.setItem('token', response.data.token);
        // Fetch user data or use response.data.user if provided
      // Example assuming response includes user data
      const userDataResponse = await axios.get('http://localhost:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${response.data.token}`,
        },
      });

      if (userDataResponse.data) {
        setUser(userDataResponse.data);
      }

        // Navigate to home page or desired route
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Email:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <span>Password:</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};
/*
Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};
*/
export default Login;
