import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ApplicationForm.css';

const ApplicationForm = ({ onClose }) => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantAddress, setApplicantAddress] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resume, setResume] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('jobId', jobId);
    formData.append('applicantName', applicantName);
    formData.append('applicantEmail', applicantEmail);
    formData.append('applicantPhone', applicantPhone);
    formData.append('applicantAddress', applicantAddress);
    formData.append('coverLetter', coverLetter);
    formData.append('resume', resume);

    try {
      const response = await axios.post('https://jobportal-black.vercel.app/api/jobs/applications', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Application submitted:', response.data);
      setSuccessMessage('Application submitted successfully!');
      setTimeout(() => {
        onClose();
        navigate(`/job/${jobId}`);
      }, 2000); 
    } catch (error) {
      console.error('Error submitting application:', error);
      setSuccessMessage('Failed to submit application. Please try again.');
    }
  };

  return (
    <div className="application-form-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="applicantName">Your Name</label>
          <input
            type="text"
            id="applicantName"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="applicantEmail">Your Email</label>
          <input
            type="email"
            id="applicantEmail"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="applicantPhone">Your Phone Number</label>
          <input
            type="tel"
            id="applicantPhone"
            value={applicantPhone}
            onChange={(e) => setApplicantPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="applicantAddress">Your Address</label>
          <input
            type="text"
            id="applicantAddress"
            value={applicantAddress}
            onChange={(e) => setApplicantAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coverLetter">Cover Letter</label>
          <textarea
            id="coverLetter"
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="resume">Select Resume</label>
          <input
            type="file"
            id="resume"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Send Application</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

ApplicationForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ApplicationForm;