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
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.category === 'admin') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({
      ...newJob,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isAdmin) {
      console.error('Insufficient permissions to add a job');
      return;
    }

    const token = localStorage.getItem('token'); 
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    try {
      const response = await axios.post('https://jobportal-black.vercel.app/api/jobs/add', newJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Job added successfully:', response.data);
      
      
      navigate('/jobs');

      
      window.dispatchEvent(new Event('jobAdded'));
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
      } else {
        console.error('Error adding job:', error.message);
      }

      if (error.response && error.response.status === 403) {
        console.error('Forbidden: Insufficient permissions.');
      }
    }
  };
  
  if (!isAdmin) {
    return <p>You do not have permission to add a job. Only admins can add new jobs.</p>;
  }

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

export default AddJob;
