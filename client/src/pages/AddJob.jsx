import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './AddJob.css'; 

const AddJob = ({ addJobToList }) => { 
  const [job, setJob] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    type: '',
    salary: '',
    date: ''
  });
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  // Basic form validation
  if (!job.title || !job.description || !job.company) {
    setError('Please fill in all required fields.');
    setIsSubmitting(false);
    return;
  }
  try {
      const response = await axios.post('http://localhost:5000/api/jobs/add', job);
      addJobToList(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding job:', error);
      setError('Failed to add job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="create-job-form">
      <div className="form-group">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter job title"
          value={job.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Enter job description"
          value={job.description}
          onChange={handleChange}
          className="form-control"
          rows="4"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="company">Company Name</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Enter company name"
          value={job.company}
          onChange={handleChange}
          className="form-control"
          required
        />
      
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Enter job location"
          value={job.location}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Job Type</label>
        <input
          type="text"
          id="type"
          name="type"
          placeholder="Enter job type"
          value={job.type}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          id="salary"
          name="salary"
          placeholder="Enter job salary"
          value={job.salary}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={job.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    <button type="submit" className="btn-submit" disabled={isSubmitting}>
      {isSubmitting ? 'Adding...' : 'Add Job'}
    </button>
  </form>
);
};

export default AddJob;
