// MainLayout.jsx
/*
import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile'; // Adjust the import path as needed

const MainLayout = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      // Example: Fetch user data from localStorage or an API
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    };

    fetchUser();
  }, []);

  return (
    <div>
      <header>
        <UserProfile user={user} setUser={setUser} />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
*/
//MainLayout.jsx

import React from 'react';
import Header from './Header';  // Import the Header component
import PropTypes from 'prop-types'; // Import PropTypes if you use them
import './MainLayout.css';  // Import the CSS file if needed

const MainLayout = ({ user, setUser, children }) => {
    return (
      <div>
        <header>
          <Header user={user} setUser={setUser} /> {/* Pass user and setUser to Header */}
        </header>
        <main>
          {children} {/* Render the children passed to MainLayout */}
        </main>
      </div>
    );
};

MainLayout.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  children: PropTypes.node
};

export default MainLayout;
