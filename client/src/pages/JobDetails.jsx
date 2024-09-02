import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';
import locationIcon from '/images/location-icon.jpg';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
       const response = await axios.get(`https://jobportal-black.vercel.app/api/jobs/${jobId}`);
       // const response = await axios.get(`http://localhost:5000/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Error fetching job details');
      }
    };

    fetchJob();
  }, [jobId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      {job.icon ? <img src={job.icon} alt={`${job.title} icon`} className="job-icon" /> : null}
      <p>{job.description || 'Description not available'}</p>
      <ul>
        <li><strong>Company:</strong> {job.company}</li>
        <li>
          <strong>Location:</strong>
          <img src={locationIcon} alt="Location icon" className="location-icon" />
          {job.location}
        </li>
        <li><strong>Salary:</strong> {job.salary}</li>
        <li><strong>Category:</strong> {job.category}</li>
        <li><strong>Date:</strong> {job.date}</li>
        <li><strong>Experience Level:</strong> {job.experienceLevel}</li>
        <li><strong>Required Skills:</strong> {job.requiredSkills.join(', ')}</li>
      </ul>
      <div className="button-container">
        <button className="apply-button" onClick={() => navigate(`/apply/${job._id}`)}>Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetails;
