import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faUser, faTachometerAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './UserProfile.css';

const UserProfile = ({ user, setUser }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="user-profile">
      <button onClick={toggleDropdown} className="user-profile-button">
        {user.name} <FontAwesomeIcon icon={faCaretDown} />
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
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default UserProfile;
