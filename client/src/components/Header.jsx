import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">JobPortal</div>
      <nav>
        <ul>
          <li><Link to="/search">Start a search</Link></li>
          <li><Link to="/saved">My Jobs</Link></li>
          <li><Link to="#">Salary estimate</Link></li>
          <li><Link to="#">Post A Job</Link></li>
        </ul>
      </nav>
      <div className="dashboard-icon">
        <FaUserCircle size={24} />
      </div>
    </header>
  );
};

export default Header;
