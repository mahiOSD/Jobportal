import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/signup',
        { name, phone, email, password },
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
        toast.error('Failed to register. Please try again.');
      }
    }
  };
  
  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <img src="/images/JobZeelogo.png" alt="logo" className="small-logo" />
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="inputTag">
            <label>Name</label>
            <div>
              <input
                type="text"
                placeholder="Zeeshan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>
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
            <label>Phone Number</label>
            <div>
              <input
                type="tel"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="banner">
        <img src="/images/register.png" alt="login" />
      </div>
    </section>
  );
};

Signup.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Signup;
