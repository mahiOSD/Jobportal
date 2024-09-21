import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

 
  const handleInputChange = (e) => {
    setNewJob({ ...newJob, [e.target.name]: e.target.value });
  };

 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.category === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      setErrorMessage('User is not authenticated. Please log in again.');
      return;
    }
  
    try {
      const response = await axios.post(
        'https://jobportal-black.vercel.app/api/jobs/add',
        newJob,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log('Job added successfully:', response.data);
      navigate('/jobs');
      window.dispatchEvent(new Event('jobAdded')); 
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };
  
  if (!isAdmin) {
    return <p>You do not have permission to add a job. Only admins can add new jobs.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <h2>Add New Job</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="form-group">
        <label>Title:</label>
        <input type="text" name="title" value={newJob.title} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Company:</label>
        <input type="text" name="company" value={newJob.company} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" value={newJob.description} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input type="text" name="location" value={newJob.location} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Salary:</label>
        <input type="text" name="salary" value={newJob.salary} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input type="text" name="category" value={newJob.category} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Date:</label>
        <input type="date" name="date" value={newJob.date} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Experience Level:</label>
        <input type="text" name="experienceLevel" value={newJob.experienceLevel} onChange={handleInputChange} required />
      </div>
      <div className="form-group">
        <label>Required Skills:</label>
        <input type="text" name="requiredSkills" value={newJob.requiredSkills} onChange={handleInputChange} required />
      </div>
      <button type="submit">Add Job</button>
    </form>
  );
};

export default AddJob;
