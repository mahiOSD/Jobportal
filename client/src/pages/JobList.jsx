import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobList.css'; 
import { FaSearch } from 'react-icons/fa'; 

const JobList = ({ jobs, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.jobType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="job-list">
      <h2>My Jobs</h2>
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map(job => (
            <tr key={job._id}>
              <td>{job.title}</td>
              <td>{job.companyName}</td>
              <td>{job.location}</td>
              <td>{job.jobType}</td>
              <td>
                <button onClick={() => onEdit(job)}>Edit</button>
                <button onClick={() => onDelete(job._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      jobType: PropTypes.string.isRequired,
     
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobList;
