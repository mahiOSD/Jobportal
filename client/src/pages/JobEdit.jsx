import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobEdit.css';
import axios from 'axios';

const JobEdit = ({ job, onSave, onCancel }) => {
  const [updatedJob, setUpdatedJob] = useState(job);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob({ ...updatedJob, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
       `https://jobportal-black.vercel.app/api/jobs/${updatedJob._id}`,
       // `http://localhost:5000/api/jobs/${updatedJob._id}`,
        updatedJob
      );
      console.log('Updated job:', response.data);
      onSave(updatedJob);
    } catch (error) {
      console.error('Error updating job:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="job-edit">
      <h2>Edit Job</h2>
      <div className="form-group">
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={updatedJob.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Company:</label>
        <input
          type="text"
          name="company"
          value={updatedJob.company}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea
          name="description"
          value={updatedJob.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={updatedJob.location}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={updatedJob.category}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Salary:</label>
        <input
          type="text"
          name="salary"
          value={updatedJob.salary}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Posting Date:</label>
        <input
          type="date"
          name="postingDate"
          value={updatedJob.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Required Skills:</label>
        <input
          type="text"
          name="requiredSkills"
          value={updatedJob.requiredSkills}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Experience Level:</label>
        <input
          type="text"
          name="experienceLevel"
          value={updatedJob.experienceLevel}
          onChange={handleChange}
          required
        />
      </div>
      <div className="button-group">
        <button type="submit" className="btn-save">
          Save
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

JobEdit.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    requiredSkills: PropTypes.arrayOf(PropTypes.string).isRequired, 
    experienceLevel: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default JobEdit;