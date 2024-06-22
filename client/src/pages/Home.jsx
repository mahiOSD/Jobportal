import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaSearch, FaUser } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to JobPortal</h1>
      <p>Your one-stop destination for finding your dream job</p>
      <div className="features">
        <div className="feature-item">
          <FaSearch className="feature-icon" />
          <h3>Search Jobs</h3>
          <p>Find the job that fits your life</p>
        </div>
        <div className="feature-item">
          <FaBriefcase className="feature-icon" />
          <h3>Post Jobs</h3>
          <p>Reach millions of job seekers</p>
        </div>
        <div className="feature-item">
          <FaUser className="feature-icon" />
          <h3>Create Profile</h3>
          <p>Showcase your skills and experience</p>
        </div>
      </div>
      <Link to="/search-jobs" className="cta-button">Get Started</Link>
    </div>
  );
};

export default Home;