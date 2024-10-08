import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faTachometerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const UserProfile = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [profile, setProfile] = useState(user || {});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        try {
          setLoading(true);
          //const res = await axios.get('http://localhost:5000/api/auth/profile', {
            const res = await axios.get('https://jobportal-black.vercel.app/api/auth/profile', {

            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
          });
          setProfile(res.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

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

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-profile">
      <button onClick={toggleDropdown} className="user-profile-button">
        <img 
          //src={`http://localhost:5000${profile.profilePicture || '/default-avatar.png'}`} 
          src={`https://jobportal-black.vercel.app${profile.profilePicture || '/default-avatar.png'}`} 

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
