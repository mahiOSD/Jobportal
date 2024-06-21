import React from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import './Searchjob.css'; 

const SearchJobs = ({ jobs }) => {
  return (
    <div className="search-jobs">
      <h2>Find your <span className="highlight">new job</span> today</h2>
      <div className="search-container">
        <div className="input-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="What position are you looking for?" />
        </div>
        <button className="search-button">Search</button>
      </div>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-item">
            <div className="job-details">
              <h3>{job.title}</h3>
              <p>{job.companyName}</p>
              <p>{job.salary}</p>
              <p>{job.location}</p>
              <p>{job.jobType}</p>
              <p>{job.date}</p>
              <p>{job.experienceLevel}</p>
              <ul>
                {job.requiredSkills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchJobs.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      jobType: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      experienceLevel: PropTypes.string.isRequired,
      requiredSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default SearchJobs;