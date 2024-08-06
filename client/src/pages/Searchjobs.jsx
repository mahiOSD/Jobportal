import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import locationIcon from '/images/location-icon.jpg';
import './Searchjob.css';

const SearchJobs = ({ jobs }) => {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const filterJobs = () => {
      let filtered = Array.isArray(jobs) ? jobs : [];
      if (category && category !== 'all') {
        filtered = filtered.filter(job =>
          job.category.toLowerCase() === category.toLowerCase()
        );
      }
      if (searchTerm) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setFilteredJobs(filtered);
    };

    filterJobs();
  }, [jobs, category, searchTerm]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClearClick = () => {
    setSearchTerm('');
    setCategory('');
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
        <button className="clear-button" onClick={handleClearClick}>Clear</button>
      </div>
      <div className="filter-container">
        <div className="filter-category">
          <h3>Filter job by category</h3>
          <select value={category} onChange={handleCategoryChange}>
            <option value="all">All</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="fullstack">Fullstack</option>
            <option value="design">Design</option>
            <option value="data science">Data Science</option>
          </select>
        </div>
      </div>
      <div className="job-list">
        {Array.isArray(filteredJobs) && filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-card-header">
                <h3>{job.title}</h3>
                <p className="job-location">
                  <img src={locationIcon} alt="Location icon" className="location-icon" />
                  {job.location}
                </p>
              </div>
              <div className="job-card-body">
                <p className="job-description">{job.description}</p>
                <Link to={`/job/${job._id}`} className="more-details-button">
                  More Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No jobs found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

SearchJobs.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default SearchJobs;
