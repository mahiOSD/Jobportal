import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types'; 
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('user'); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await axios.post('https://jobportal-black.vercel.app/api/auth/login', {
        email,
        password,
        category, 
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setUser(response.data.user);  
        navigate('/dashboard');
        window.dispatchEvent(new Event('userLoggedIn')); 
      } else {
        setError('Login failed: Invalid response');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
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
          <label>
            <span>Category:</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Forgot your password?&nbsp;
          <button onClick={() => navigate('/forgot-password')} className="forgot-password-link">
            Reset it here
          </button>
        </p>
        <p>
          Don&apos;t have an account?&nbsp;
          <button onClick={() => navigate('/signup')} className="signup-link">
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
