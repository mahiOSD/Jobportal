import React from 'react';
import { Link } from 'react-router-dom';
import { FaBriefcase, FaSearch, FaUser } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './Home.css';

const Home = ({ user }) => {
  return (
    <div className="home">
      {!user && (
        <video autoPlay loop muted playsInline className="background-video">
          <source src="/background-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
      <div className="home-banner">
        <h1>The Easiest Way to Get Your New Job</h1>
        <p>Your one-stop destination for finding your dream job</p>
        <div className="features">
          <Link to="/login" className="feature-item"> 
            <FaSearch className="feature-icon" />
            <h3>Search Jobs</h3>
            <p>Find the job that fits your life</p>
          </Link>
          <Link to="/login" className="feature-item"> 
            <FaBriefcase className="feature-icon" />
            <h3>Post Jobs</h3>
            <p>Reach millions of job seekers</p>
          </Link>
          <Link to="/login" className="feature-item"> 
            <FaUser className="feature-icon" />
            <h3>Create Profile</h3>
            <p>Showcase your skills and experience</p>
          </Link>
        </div>
        {!user && <Link to="/login" className="cta-button">Get Started</Link>}
      </div>
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object,  
};

export default Home;