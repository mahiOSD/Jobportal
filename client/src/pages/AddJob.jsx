import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddJob.css';
import axios from 'axios';

const AddJob = ({ addJobToList }) => {
  const [newJob, setNewJob] = useState({
    title: '',
    companyName: '',
    description: '',
    location: '',
    jobType: '',
    salary: '',
    date: '',
    experienceLevel: '',
    requiredSkills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/add', newJob, {
        withCredentials: true,
      });
      console.log(response.data);
      addJobToList(response.data);
      setNewJob({
        title: '',
        companyName: '',
        description: '',
        location: '',
        jobType: '',
        salary: '',
        date: '',
        experienceLevel: '',
        requiredSkills: '',
      });

      window.location.href = '/search';
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <h2>Add New Job</h2>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" name="title" value={newJob.title} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Company Name:</label>
        <input type="text" name="companyName" value={newJob.companyName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" value={newJob.description} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input type="text" name="location" value={newJob.location} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Job Type:</label>
        <input type="text" name="jobType" value={newJob.jobType} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Salary:</label>
        <input type="text" name="salary" value={newJob.salary} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="text" name="date" value={newJob.date} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Experience Level:</label>
        <input type="text" name="experienceLevel" value={newJob.experienceLevel} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Required Skills:</label>
        <input type="text" name="requiredSkills" value={newJob.requiredSkills} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn-save">Save</button>
    </form>
  );
};

AddJob.propTypes = {
  addJobToList: PropTypes.func.isRequired,
};

export default AddJob;
