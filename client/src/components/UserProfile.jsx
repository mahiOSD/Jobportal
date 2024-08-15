import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faTachometerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';
import axios from 'axios';

const UserProfile = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Include token for authorization
          }
        });
        setProfile(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="user-profile">
      <button onClick={toggleDropdown} className="user-profile-button">
        <img 
          src={profile.profilePicture || 'default-avatar.png'} 
          alt="User Profile" 
          className="profile-icon" 
        />
        {profile.name || 'User'} <FontAwesomeIcon icon={faCaretDown} />
      </button>
      {dropdownVisible && (
        <div className="user-profile-dropdown">
          <Link to="/profile" className="dropdown-item">
            <FontAwesomeIcon icon={faUser} /> My Profile
          </Link>
          <Link to="/dashboard" className="dropdown-item">
            <FontAwesomeIcon icon={faTachometerAlt} /> Dashboard
          </Link>
          <button onClick={handleLogout} className="dropdown-item">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func.isRequired,
};

export default UserProfile;
