<<<<<<< HEAD

import React from 'react';
import { useParams } from 'react-router-dom';
import './JobsDetails.css';
=======
// JobDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98

const JobDetails = () => {
  const { jobId } = useParams();

<<<<<<< HEAD
  
=======
  // Manually define job details based on jobId
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
  let job = null;
  if (jobId === '1') {
    job = {
      id: '1',
      title: 'Software Engineer',
      description: 'We are looking for a skilled Software Engineer to join our team...',
      company: 'Tech Solutions Inc.',
      location: 'Dhaka',
      salary: '৳80,000 - ৳100,000 per year',
<<<<<<< HEAD
      icon: 'photo_2024-06-22_23-05-13.jpg',
=======
      icon: '/images/software-engineer-icon.png',
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
    };
  } else if (jobId === '2') {
    job = {
      id: '2',
      title: 'Data Scientist',
      description: 'Join our Data Science team to analyze and interpret complex data sets...',
      company: 'Data Analytics Corp.',
      location: 'Dhaka',
      salary: '৳90,000 - ৳110,000 per year',
<<<<<<< HEAD
      icon: '/images/data-scientist-icon.jpg',
=======
      icon: '/images/data-scientist-icon.png',
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
    };
  } else if (jobId === '3') {
    job = {
      id: '3',
      title: 'Web Development Teacher',
      description: 'We are seeking a passionate Web Development Teacher to join our education team. In this role, you will teach students the fundamentals of web development, including HTML, CSS, JavaScript, and modern frameworks. Your responsibilities will include developing curriculum, leading classes, and providing guidance to students to help them succeed in their learning journey.',
      company: 'Tech Education Institute',
      location: 'Remote or Dhaka',
      salary: '৳60,000 - ৳80,000 per year',
      icon: '/images/web-development-icon.png', 
    };
  } else if (jobId === '4') {
    job = {
      id: '4',
      title: 'Junior/Graduate Software Developer',
      description: 'We are looking for a Junior/Graduate Software Developer to join our team. The ideal candidate is a recent graduate with a strong foundation in software development principles and practices. You will work on various projects, contributing to software design, development, testing, and maintenance.',
      company: 'Innovative Tech Solutions',
      location: 'Dhaka',
      salary: '৳50,000 - ৳70,000 per year',
      icon: '/images/software-developer-icon.png', 
    };
  } else if (jobId === '5') {
    job = {
      id: '5',
      title: 'Junior/Graduate Web Developer',
      description: 'Join our dynamic web development team as a Junior/Graduate Web Developer. This entry-level position is perfect for recent graduates with a passion for web technologies. You will assist in building and maintaining websites and web applications, learning and growing in a supportive environment.',
      company: 'Creative Web Agency',
      location: 'Remote or Dhaka',
      salary: '৳45,000 - ৳65,000 per year',
      icon: '/images/web-developer-icon.png', 
    };
  }

<<<<<<< HEAD
  
=======
  // Return early if job not found
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
  if (!job) {
    return <div>No job details found.</div>;
  }

  const handleSaveJob = () => {
<<<<<<< HEAD
    
=======
    // Logic to save job (e.g., API call, local storage)
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
    alert(`Job "${job.title}" saved.`);
  };

  const handleApplyNow = () => {
<<<<<<< HEAD
    
=======
    // Logic to handle job application (e.g., redirect to application form)
>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
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
<<<<<<< HEAD
=======

>>>>>>> bfc78c1732aa255be3c26d707a0aff45809bbd98
