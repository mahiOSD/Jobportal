import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBriefcase, faPlusSquare, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <a href="https://www.google.com" className="icon-link">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyktlpOaKmjkqW_M4ASDBgAhpGycm_AcmTuy2GYzLCkymEv9OWldADgPuqn61niV0T4Tw&usqp=CAU" alt="Google Logo" className="google-icon" />
        </a>
        <div className="logo">JobPortal</div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/search" className="nav-link">
              <FontAwesomeIcon icon={faSearch} className="nav-icon" />
              Start a search
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link">
              <FontAwesomeIcon icon={faBriefcase} className="nav-icon" />
              My Jobs
            </Link>
          </li>
          <li>
            <Link to="#" className="nav-link">
              <FontAwesomeIcon icon={faMoneyBillWave} className="nav-icon" />
              Salary estimate
            </Link>
          </li>
          <li>
            <Link to="/add-job" className="nav-link">
              <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
              Post A Job
            </Link>
          </li>
        </ul>
      </nav>
      <div className="dashboard-icon">
        <FaUserCircle size={24} />
      </div>
    </header>
  );
};

export default Header;
