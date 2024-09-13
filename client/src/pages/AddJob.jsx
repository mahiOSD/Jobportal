import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting job data:', newJob);

    let token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    try {
      const response = await axios.post('https://jobportal-black.vercel.app/api/jobs/add', newJob, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      console.log('Job added successfully:', response.data);
      
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
      
      window.dispatchEvent(new Event('jobAdded'));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Token expired, refreshing...');

        try {
          token = await refreshToken();
          const response = await axios.post('https://jobportal-black.vercel.app/api/jobs/add', newJob, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          console.log('Job added successfully after token refresh:', response.data);
          
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
          window.dispatchEvent(new Event('jobAdded'));
        } catch (refreshError) {
          console.error('Token refresh failed:', refreshError);
        }
      } else {
        console.error('Error adding job:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value,
    });
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


const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token is missing.');
  }

  try {
    const response = await axios.post('https://jobportal-black.vercel.app/api/auth/refresh', { refreshToken });
    const newToken = response.data.token;
    localStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

export default AddJob;