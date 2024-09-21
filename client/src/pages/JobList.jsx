import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './JobList.css';
import LoadingSpinner from '../components/LoadingSpinner';

const JobList = ({ onEdit, onDelete }) => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      //const response = await axios.get('http://localhost:5000/api/jobs');
      const response = await axios.get('https://jobportal-black.vercel.app/api/jobs');
      setJobs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching jobs');
      //setLoading(false);
    }
    setLoading(false);

  };

  useEffect(() => {
    fetchJobs();

    const handleJobAdded = () => {
      fetchJobs();
    };

    window.addEventListener('jobAdded', handleJobAdded);

    return () => {
      window.removeEventListener('jobAdded', handleJobAdded);
    };
  }, []);

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

  const handleDelete = async (jobId) => {
    try {
      
      const updatedFilteredJobs = filteredJobs.filter(job => job._id !== jobId);
      setFilteredJobs(updatedFilteredJobs);

      
      onDelete(jobId);

      
      //await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      await axios.delete(`https://jobportal-black.vercel.app/api/jobs/${jobId}`);

      
      
    } catch (err) {
      
      setFilteredJobs(filteredJobs);
      setError('Error deleting job');
    
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }  if (error) return <div>{error}</div>;

  return (
    <div className="job-list-container">
      <h2>My Jobs</h2>
      {jobs.length > 0 ? (
        <table className="job-list-table">
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
                  <button
                    onClick={() => {
                      onEdit(job);
                      navigate('/edit-job');
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td className="job-delete">
                  <button onClick={() => handleDelete(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
};

JobList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobList;