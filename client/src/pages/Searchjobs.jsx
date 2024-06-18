import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing FontAwesome search icon
import './Searchjobs.css';

const SearchJobs = () => {
  return (
    <div className="search-jobs">
      <h2>Find your <span className="highlight">new job</span> today</h2>
      <div className="search-container">
        <FaSearch className="search-icon" /> {/* Search icon */}
        <input type="text" placeholder="What position are you looking for?" />
        <button>Search</button>
      </div>
    </div>
  );
};

export default SearchJobs;
