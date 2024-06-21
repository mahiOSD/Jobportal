import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import JobEdit from './JobEdit';
import './JobList.css'; // Adjust the CSS file name if needed

const JobList = ({ jobs, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  const handleEdit = (job) => {
    setCurrentJob(job);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    onDelete(id);
  };

  const handleSearch = (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    const filtered = jobs.filter(
      job =>
        job.title.toLowerCase().includes(term.toLowerCase()) ||
        job.companyName.toLowerCase().includes(term.toLowerCase()) ||
        job.salary.toLowerCase().includes(term.toLowerCase()) ||
        job.location.toLowerCase().includes(term.toLowerCase()) ||
        job.jobType.toLowerCase().includes(term.toLowerCase()) ||
        job.experienceLevel.toLowerCase().includes(term.toLowerCase()) ||
        job.requiredSkills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  const handleSave = (updatedJob) => {
    onEdit(updatedJob);
    setIsEditing(false);
    setCurrentJob(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentJob(null);
  };

  return (
    <div className="job-list">
      {isEditing ? (
        <JobEdit job={currentJob} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <>
          <h2>All My Jobs</h2>
          <div className="action-bar">
            <div className="search-options">
              <div className="search-bar">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Company Name</th>
                <th>Salary</th>
                <th>Location</th>
                <th>Job Type</th>
                <th>Date</th>
                <th>Experience Level</th>
                <th>Skills</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((job, index) => (
                <tr key={job.id}>
                  <td>{index + 1}</td>
                  <td>{job.title}</td>
                  <td>{job.companyName}</td>
                  <td>{job.salary}</td>
                  <td>{job.location}</td>
                  <td>{job.jobType}</td>
                  <td>{job.date}</td>
                  <td>{job.experienceLevel}</td>
                  <td>
                    <ul>
                      {job.requiredSkills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(job)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(job.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

JobList.propTypes = {
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      salary: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      jobType: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      experienceLevel: PropTypes.string.isRequired,
      requiredSkills: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default JobList;