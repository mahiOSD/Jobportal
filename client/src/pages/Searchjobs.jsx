/* eslint-disable react/display-name */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Searchjob.css';

const SearchJobs = ({ jobs }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm)
    );
    setFilteredJobs(filtered);
  };

  const handleJobClick = (jobId) => {
    navigate(`/job/${jobId}`);
  };

  const handleSearchClick = () => {
    if (filteredJobs.length === 1) {
      navigate(`/job/${filteredJobs[0].id}`);
    } else if (filteredJobs.length > 1) {
      alert('Multiple jobs found. Please select one.');
    } else {
      alert('No job found.');
    }
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setFilteredJobs([]);
  };

  return (
    <div className="search-jobs">
      <h2>Find your <span className="highlight">new job</span> today</h2>
      <div className="search-container">
        <div className="input-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="What position are you looking for?"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <button onClick={handleSearchClick} className="search-button">Search</button>
        <button onClick={handleClearClick} className="clear-button">Clear</button>
      </div>
      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-item" onClick={() => handleJobClick(job.id)}>
              <div className="job-details">
                <h3>{job.title}</h3>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

SearchJobs.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

// Sample job list for demonstration
const jobList = [
  { id: 1, title: 'Software Engineer' },
  { id: 2, title: 'Data Scientist' },
  { id: 3, title: 'Web Development Teacher' },
  { id: 4, title: 'Junior/Graduate Software Developer' },
  { id: 5, title: 'Junior/Graduate Web Developer' },
];

export default () => <SearchJobs jobs={jobList} />;
