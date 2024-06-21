import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddJob.css'; // Adjust the CSS file name if needed

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
    requiredSkills: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addJobToList(newJob);
    setNewJob({
      title: '',
      companyName: '',
      description: '',
      location: '',
      jobType: '',
      salary: '',
      date: '',
      experienceLevel: '',
      requiredSkills: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-job-form">
      <h2>Add New Job</h2>
      <div className="form-group">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={newJob.title}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={newJob.companyName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={newJob.description}
          onChange={handleChange}
          className="form-control"
          rows="4"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          name="location"
          value={newJob.location}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="jobType">Job Type</label>
        <input
          type="text"
          id="jobType"
          name="jobType"
          value={newJob.jobType}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="salary">Salary</label>
        <input
          type="text"
          id="salary"
          name="salary"
          value={newJob.salary}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="text"
          id="date"
          name="date"
          value={newJob.date}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="experienceLevel">Experience Level</label>
        <input
          type="text"
          id="experienceLevel"
          name="experienceLevel"
          value={newJob.experienceLevel}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="requiredSkills">Required Skills </label>
        <input
          type="text"
          id="requiredSkills"
          name="requiredSkills"
          value={newJob.requiredSkills.join(', ')}
          onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value.split(',').map(skill => skill.trim()) })}
          className="form-control"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-save">Save</button>
      </div>
    </form>
  );
};

AddJob.propTypes = {
  addJobToList: PropTypes.func.isRequired,
};

export default AddJob;