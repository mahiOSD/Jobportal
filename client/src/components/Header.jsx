import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faSearch, faBriefcase, faPlusSquare, faChartBar } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);
  const toggleDashboard = () => setDashboardVisible(!dashboardVisible);

  return (
    <header className="header">
      <div className="header-content">
        {user && user.category === 'admin' && (
          <div className="dashboard-icon" onClick={toggleDashboard}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        )}

        <div className="logo-container">
          <Link to="/search">
            <img src="/images/JobZeelogo.png" alt="JobPortal Logo" className="small-logo" />
          </Link>
          <div className="logo">JobPortal</div>
        </div>

        <div className="auth-container">
          {user ? (
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
                  {user.category !== 'admin' && (
                    <button onClick={handleLogout} className="dropdown-item logout">
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/" className="auth-link">Home</Link>
              <Link to="/login" className="auth-link">Log in</Link>
              <Link to="/signup" className="auth-link">Sign Up</Link>
            </div>
          )}
        </div>
      </div>

      {user && user.category === 'admin' && (
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
            Add New Job
          </Link>
          <Link to="/dashboard" className="dashboard-item">
            <FontAwesomeIcon icon={faChartBar} className="nav-icon" />
            Dashboard
          </Link>
          <div className="spacer"></div>
          <button onClick={handleLogout} className="dashboard-item logout">
            <FontAwesomeIcon icon={faSignOutAlt} className="nav-icon" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default Header;
