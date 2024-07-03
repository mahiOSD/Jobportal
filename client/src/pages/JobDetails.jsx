import React from 'react';
import { useParams } from 'react-router-dom';
import './JobsDetails.css';

const JobDetails = () => {
  const { id } = useParams(); 

  
  const jobs = [
    {
      id: '1',
      title: 'Software Engineer',
      description: 'We are looking for a skilled Software Engineer to join our team...',
      company: 'Tech Solutions Inc.',
      location: 'Dhaka',
      salary: '৳80,000 - ৳100,000 per year',
      icon: 'photo_2024-06-22_23-05-13.jpg',
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Join our Data Science team to analyze and interpret complex data sets...',
      company: 'Data Analytics Corp.',
      location: 'Dhaka',
      salary: '৳90,000 - ৳110,000 per year',
      icon: '/images/data-scientist-icon.jpg',
    },
    {
      id: '3',
      title: 'Web Development Teacher',
      description: 'We are seeking a passionate Web Development Teacher to join our education team...',
      company: 'Tech Education Institute',
      location: 'Remote or Dhaka',
      salary: '৳60,000 - ৳80,000 per year',
      icon: '/images/web-development-icon.png',
    },
    {
      id: '4',
      title: 'Junior/Graduate Software Developer',
      description: 'We are looking for a Junior/Graduate Software Developer to join our team...',
      company: 'Innovative Tech Solutions',
      location: 'Dhaka',
      salary: '৳50,000 - ৳70,000 per year',
      icon: '/images/software-developer-icon.png',
    },
    {
      id: '5',
      title: 'Junior/Graduate Web Developer',
      description: 'Join our dynamic web development team as a Junior/Graduate Web Developer...',
      company: 'Creative Web Agency',
      location: 'Remote or Dhaka',
      salary: '৳45,000 - ৳65,000 per year',
      icon: '/images/web-developer-icon.png',
    },
  ];

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
      {job.icon && <img src={job.icon} alt={`${job.title} icon`} style={{ width: '100px', height: '100px' }} />}
      <p>{job.description}</p>
      <ul>
        <li><strong>Company:</strong> {job.company}</li>
        <li><strong>Location:</strong> {job.location}</li>
        <li><strong>Salary:</strong> {job.salary}</li>
      </ul>
      <div className="button-container">
        <button onClick={handleSaveJob} className="save-button">Save Job</button>
        <button onClick={handleApplyNow} className="apply-button">Apply Now</button>
      </div>
    </div>
  );
};

export default JobDetails;
