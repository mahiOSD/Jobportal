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
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoute from './components/PrivateRoute';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs', {
          withCredentials: true,
        });
        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) =>
        job.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    navigate('/edit-job');
  };

  const handleSave = async (updatedJob) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/jobs/update/${updatedJob._id}`,
        updatedJob
      );
      const updatedJobs = jobs.map((job) =>
        job._id === updatedJob._id ? response.data : job
      );
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      setEditingJob(null);
      handleSearch(searchQuery);
      console.log('Job updated successfully:', response.data);
      navigate('/jobs'); // Redirect to jobs list after successful update
    } catch (error) {
      console.error('Error saving job:', error);
      if (error.response) {
        console.error('Server Error:', error.response.data);
      } else if (error.request) {
        console.error('Request Error:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);
      const updatedJobs = jobs.filter((job) => job._id !== jobId);
      setJobs(updatedJobs);
      setFilteredJobs(updatedJobs);
      handleSearch(searchQuery);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const addJobToList = (newJob) => {
    setJobs([...jobs, newJob]);
    setFilteredJobs([...jobs, newJob]);
    handleSearch(searchQuery);
  };

  return (
    <div className="App">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/search"
          element={
            <PrivateRoute user={user}>
              <SearchJobs handleSearch={handleSearch} />
            </PrivateRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <PrivateRoute user={user}>
              <JobList jobs={filteredJobs} onEdit={handleEdit} onDelete={handleDelete} />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-job"
          element={
            <PrivateRoute user={user}>
              <AddJob addJobToList={addJobToList} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-job"
          element={
            <PrivateRoute user={user}>
              <JobEdit
                job={editingJob}
                onSave={handleSave}
                onCancel={() => setEditingJob(null)}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/job/:id"
          element={
            <PrivateRoute user={user}>
              <JobDetails />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        
      </Routes>
    </div>
  );
};

export default App;