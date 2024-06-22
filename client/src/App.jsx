import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import SearchJobs from './pages/Searchjobs';
import JobList from './pages/JobList';
import JobEdit from './pages/JobEdit';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]); 
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs'); 
        setJobs(response.data);
        setFilteredJobs(response.data); 
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      
      setFilteredJobs(jobs);
    } else {
      
      const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    navigate('/edit-job');
  };

  const handleSave = async (updatedJob, query) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/jobs/update/${updatedJob._id}`, updatedJob); 
      console.log('Updated job:', response.data); 

      
      const updatedJobs = jobs.map(job => (job._id === updatedJob._id ? updatedJob : job));
      setJobs(updatedJobs);

      
      const updatedFilteredJobs = updatedJobs.filter(job =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(updatedFilteredJobs);

      
      navigate('/jobs');
    } catch (error) {
      console.error('Error updating job:', error);
      
    }
  };

  const handleCancel = () => {
    setEditingJob(null);
    navigate('/jobs');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter(job => job._id !== id));
      setFilteredJobs(filteredJobs.filter(job => job._id !== id)); 
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const addJobToList = async (newJob) => {
    try {
      const response = await axios.post('http://localhost:5000/api/jobs/add', newJob);
      setJobs([...jobs, response.data]);
      setFilteredJobs([...filteredJobs, response.data]); 
      navigate('/jobs');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={<SearchJobs jobs={jobs} onSearch={handleSearch} />}
          />
          <Route
            path="/jobs"
            element={<JobList jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />}
          />
          {editingJob && (
            <Route
              path="/edit-job"
              element={<JobEdit job={editingJob} onSave={(updatedJob) => handleSave(updatedJob, searchQuery)} onCancel={handleCancel} />}
            />
          )}
          <Route path="/add-job" element={<AddJob addJobToList={addJobToList} />} />
          {}
          <Route path="/job/:jobId" element={<JobDetails jobs={filteredJobs} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
