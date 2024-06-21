import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SearchJobs from './pages/Searchjobs';
import JobList from './pages/JobList';
import JobEdit from './pages/JobEdit';
import AddJob from './pages/AddJob';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([
    { 
      id: 1, 
      title: 'Software Engineer', 
      companyName: 'Tech Solutions Inc.', 
      description: 'Design intuitive user interfaces for web and mobile applications.',
      location: 'Dhaka',
      jobType: 'Full-time',
      salary: '$70 - $80K',
      date: 'June 21, 2024',
      experienceLevel: 'Mid-level',
      requiredSkills: ['UI/UX Design', 'Prototyping', 'Wireframing']
    },
    { 
      id: 2, 
      title: 'Data Scientist', 
      companyName: 'Data Analytics Corp.', 
      description: 'Manage infrastructure automation and deployment pipelines.',
      location: 'Dhaka',
      jobType: 'Full-time',
      salary: '$80 - $120k',
      date: 'June 21, 2024',
      experienceLevel: 'Senior',
      requiredSkills: ['AWS', 'Docker', 'CI/CD']
    },
    { 
      id: 3, 
      title: 'Web Development Teacher', 
      companyName: 'Tech Education Institute', 
      description: 'Develop and maintain software applications for internal systems.',
      location: 'Remote or Dhaka',
      jobType: 'Contract',
      salary: '$60 - $70k',
      date: 'June 21, 2024',
      experienceLevel: 'Junior',
      requiredSkills: ['JavaScript', 'React', 'Node.js']
    },

  ]);

  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  const handleEdit = (job) => {
    setEditingJob(job);
    navigate('/edit-job');
  };

  const handleSave = (updatedJob) => {
    setJobs(jobs.map(job => (job.id === updatedJob.id ? updatedJob : job)));
    setEditingJob(null);
    navigate('/jobs');
  };

  const handleCancel = () => {
    setEditingJob(null);
    navigate('/jobs');
  };

  const handleDelete = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const addJobToList = (newJob) => {
    // Ensure only objects are added to the jobs array and all required fields are present
    if (newJob && typeof newJob === 'object' && !Array.isArray(newJob)) {
      const id = jobs.length + 1; // Generate a new unique ID for the new job
      const jobWithId = { id, ...newJob };
      setJobs([...jobs, jobWithId]);
      console.log('Job added:', jobWithId);
    } else {
      console.error('Invalid job data:', newJob);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchJobs jobs={jobs} />} />
            <Route path="/jobs" element={<JobList jobs={jobs} onEdit={handleEdit} onDelete={handleDelete} />} />
            {editingJob && (
              <Route path="/edit-job" element={<JobEdit job={editingJob} onSave={handleSave} onCancel={handleCancel} />} />
            )}
            <Route path="/add-job" element={<AddJob addJobToList={addJobToList} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;