// Login.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const { data } = response;
      toast.success(data.message);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to log in. Please try again.');
      }
    }
  };

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/images/JobZeelogo.png" alt="logo" className="small-logo" />
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Email Address</label>
            <div>
              <input
                type="email"
                placeholder="zk@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="banner">
        <img src="/images/login.png" alt="login" />
      </div>
    </section>
  );
};

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Login;
