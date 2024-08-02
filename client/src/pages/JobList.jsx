import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './JobList.css';
import { FaSearch } from 'react-icons/fa';

const JobList = ({ jobs, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredJobs(filtered);
    } catch (err) {
      setError('Error filtering jobs');
    }
    setLoading(false);
  }, [jobs, searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="job-list">
      <table className="jobs-table">
        <thead>
          <tr className="search-row">
            <th colSpan="8">
              <div className="search-options">
                <div className="search-input-container">
                  <FaSearch className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                <button className="search-button">Search</button>
              </div>
            </th>
          </tr>
          <tr>
            <th>No.</th>
            <th>Title</th>
            <th>Company</th>
            <th>Location</th>
            <th>Category</th>
            <th>Salary</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job, index) => (
            <tr key={job._id}>
              <td>{index + 1}</td>
              <td>{job.title}</td>
              <td>{job.company}</td>
              <td>{job.location}</td>
              <td>{job.category}</td>
              <td>{job.salary}</td>
              <td className="job-edit">
                <button onClick={() => onEdit(job)}>Edit</button>
              </td>
              <td className="job-delete">
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
      company: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobList;
