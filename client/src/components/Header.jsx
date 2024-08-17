import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faPlusSquare, faSearch, faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

const Header = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleDashboard = () => {
    setDashboardVisible(!dashboardVisible);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Dashboard Icon */}
        <div className="dashboard-icon" onClick={toggleDashboard}>
          <FontAwesomeIcon icon={faBars} />
        </div>

        {/* Logo and JobPortal Text */}
        <div className="logo-container">
          <a href="/search">
            <img src="/images/JobZeelogo.png" alt="JobPortal Logo" className="small-logo" />
          </a>
          <div className="logo">JobPortal</div>
        </div>

        {/* Profile Icon */}
        <div className="profile-container">
          <div className="profile-icon" onClick={toggleDropdown}>
            <img
              src={user?.profilePicture || '/default-avatar.png'}
              alt="Profile Icon"
              className="profile-picture-icon"
            />
          </div>
          {dropdownVisible && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item">My Profile</Link>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Menu */}
      <div className={`dashboard-menu ${dashboardVisible ? 'show' : ''}`}>
        <Link to="/search" className="dashboard-item">
          <FontAwesomeIcon icon={faSearch} className="nav-icon" />
          Start a Search
        </Link>
        <Link to="/jobs" className="dashboard-item">
          <FontAwesomeIcon icon={faBriefcase} className="nav-icon" />
          My Jobs
        </Link>
        <Link to="/add-job" className="dashboard-item">
          <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
          Post A Job
        </Link>
        <div className="spacer"></div>
        <button onClick={handleLogout} className="dashboard-item logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
          Logout
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Header;
