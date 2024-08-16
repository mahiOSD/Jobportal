import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBriefcase, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import axios from 'axios';

const BASE_URL = 'https://jobportal-black.vercel.app';

const Header = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`${BASE_URL}/api/profile/${user._id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });

          const profilePicUrl = response.data.profilePicture
            ? `${BASE_URL}${response.data.profilePicture}`
            : '/default-avatar.png';

          setProfilePicture(profilePicUrl);
        } catch (error) {
          console.error('Error fetching profile picture:', error);
          setProfilePicture('/default-avatar.png'); 
        }
      }
    };

    fetchProfilePicture();
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="icon-link">
          <img src="/images/JobZeelogo.png" alt="logo" className="small-logo" />
        </a>
        <div className="logo">JobPortal</div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {user ? (
            <>
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
                <Link to="/add-job" className="nav-link">
                  <FontAwesomeIcon icon={faPlusSquare} className="nav-icon" />
                  Post A Job
                </Link>
              </li>
              <li className="profile-icon" onClick={toggleDropdown}>
                <img
                  src={profilePicture}
                  alt="Profile Icon"
                  className="profile-picture-icon"
                />
                {dropdownVisible && (
                  <div className="dropdown-menu">
                    <Link to="/profile" className="dropdown-item">My Profile</Link>
                    <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="nav-link">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Header;
