import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './JobDetails.css';
import locationIcon from '/images/location-icon.jpg'; 

const JobDetails = ({ jobs }) => {
  const { id } = useParams();
  
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return <div>No job details found.</div>;
  }

  const handleSaveJob = () => {
    alert(`Job "${job.title}" saved.`);
  };

  const handleApplyNow = () => {
    alert(`Applying for job "${job.title}".`);
  };

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      {job.icon && <img src={job.icon} alt={`${job.title} icon`} className="job-icon" />}
      <p>{job.description}</p>
      <ul>
        <li><strong>Company:</strong> {job.company}</li>
        <li>
          <strong>Location:</strong>
          <img src={locationIcon} alt="Location icon" className="location-icon" />
          {job.location}
        </li>
        <li><strong>Salary:</strong> {job.salary}</li>
      </ul>
      <div className="button-container">
        <button onClick={handleSaveJob} className="save-button">Save Job</button>
        <button onClick={handleApplyNow} className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

JobDetails.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      icon: PropTypes.string
    })
  ).isRequired
};

export default JobDetails;