import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddJob.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJob = ({ addJobToList }) => {
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    description: '',
    location: '',
    salary: '',
    category: '', 
    date: '',
    experienceLevel: '',
    requiredSkills: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting job data:', newJob); 
    try {

      const response = await axios.post('https://jobportal-black.vercel.app/api/jobs/add', newJob, {
      //const response = await axios.post('http://localhost:5000/api/jobs/add', newJob, {
        withCredentials: true,
      });
      console.log('Job added successfully:', response.data);
      addJobToList(response.data);
      setNewJob({
        title: '',
        company: '',
        description: '',
        location: '',
        salary: '',
        category: '', 
        date: '',
        experienceLevel: '',
        requiredSkills: '',
      });
      navigate('/jobs'); 
    } catch (error) {
      console.error('Error adding job:', error.response ? error.response.data : error.message);
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
        <label>Company:</label>
        <input type="text" name="company" value={newJob.company} onChange={handleChange} required />
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
        <label>Salary:</label>
        <input type="text" name="salary" value={newJob.salary} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" name="category" value={newJob.category} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" name="date" value={newJob.date} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Experience Level:</label>
        <input type="text" name="experienceLevel" value={newJob.experienceLevel} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Required Skills:</label>
        <input type="text" name="requiredSkills" value={newJob.requiredSkills} onChange={handleChange} required />
      </div>
      <button type="submit">Add Job</button>
    </form>
  );
};

AddJob.propTypes = {
  addJobToList: PropTypes.func.isRequired,
};

export default AddJob;