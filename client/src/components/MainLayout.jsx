
import React from 'react';
import Header from './Header';  
import PropTypes from 'prop-types'; 
import './MainLayout.css';  

const MainLayout = ({ user, setUser, children }) => {
    return (
      <div>
        <header>
          <Header user={user} setUser={setUser} /> {}
        </header>
        <main>
          {children} {}
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