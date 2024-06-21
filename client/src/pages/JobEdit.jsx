import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './JobEdit.css'; // Adjust the CSS file name if needed

const JobEdit = ({ job, onSave, onCancel }) => {
  const [updatedJob, setUpdatedJob] = useState(job);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedJob({ ...updatedJob, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedJob);
  };

  return (
    <form onSubmit={handleSubmit} className="job-edit-form">
      <h2>Edit Job</h2>
      <div className="form-group">
        <label htmlFor="title">Job Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedJob.title}
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
          value={updatedJob.companyName}
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
          value={updatedJob.salary}
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
          value={updatedJob.location}
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
          value={updatedJob.jobType}
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
          value={updatedJob.date}
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
          value={updatedJob.experienceLevel}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="requiredSkills">Required Skills (comma-separated)</label>
        <input
          type="text"
          id="requiredSkills"
          name="requiredSkills"
          value={updatedJob.requiredSkills.join(', ')}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn-save">Save</button>
        <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

JobEdit.propTypes = {
  job: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    salary: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    jobType: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    experienceLevel: PropTypes.string.isRequired,
    requiredSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default JobEdit;
