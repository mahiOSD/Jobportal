import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';
import locationIcon from '/images/location-icon.jpg';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://jobportal-black.vercel.app/api/jobs/${jobId}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details', error);
      }
    };

    fetchJob();
  }, [jobId]);

  if (!job) {
    return <div>Loading job details...</div>;
  }

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
        <button className="save-button">Save Job</button>
        <button className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetails;
