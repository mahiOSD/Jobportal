//App.jsx:
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Home from './pages/Home';
import SearchJobs from './pages/Searchjobs';
import JobEdit from './pages/JobEdit';
import AddJob from './pages/AddJob';
import JobDetails from './pages/JobDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import ApplicationForm from './pages/ApplicationForm'; 
import Profile from './components/Profile';
import JobList from './pages/JobList';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [jobsList, setJobsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchJobs = async () => {
      try {
           //const response = await axios.get('http://localhost:5000/api/jobs');
            const response = await axios.get('https://jobportal-black.vercel.app/api/jobs');
       

        setJobsList(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error.response ? error.response.data : error.message);
      }
    };

    fetchJobs();
  }, []);

  const handleSave = async (updatedJob) => {
    try {
      const response = await axios.put(
        //`http://localhost:5000/api/jobs/${updatedJob._id}`,
        `https://jobportal-black.vercel.app/api/jobs/${updatedJob._id}`,
       
        updatedJob
      );
      const updatedJobsList = jobsList.map((job) =>
        job._id === updatedJob._id ? response.data : job
      );
      setJobsList(updatedJobsList);
      setEditingJob(null);
      navigate('/jobs');
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleAddJob = async (newJob) => {
    try {
      const response = await axios.post(
        'https://jobportal-black.vercel.app/api/jobs/add',
        //'http://localhost:5000/api/jobs/add',

        newJob
      );
      setJobsList([...jobsList, response.data]);
      navigate('/jobs');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`https://jobportal-black.vercel.app/api/jobs/${jobId}`);
      //await axios.delete(`http://localhost:5000/api/jobs/${jobId}`);

      setJobsList(jobsList.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token); // Make sure this line is present
    navigate('/');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); 
  };

  const handleEditJob = (job) => {
    const defaultJob = {
      _id: '',
      title: '',
      company: '',
      description: '',
      location: '',
      category: '',
      salary: '',
      date: '',
      requiredSkills: '',
      experienceLevel: '',
    };
    setEditingJob({ ...defaultJob, ...job });
  };

  const ApplicationFormPage = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();

    return <ApplicationForm jobId={jobId} onClose={() => navigate(`/job/${jobId}`)} />;
  };

  return (
    <div className="app-container">
      <Header user={user} setUser={setUser} onLogout={handleLogout} />
      <Routes>
  <Route path="/" element={user ? <SearchJobs jobs={jobsList} /> : <Home />} />
  <Route path="/search" element={<SearchJobs jobs={jobsList} />} />
  <Route path="/job/:jobId" element={<JobDetails />} />
  <Route path="/apply/:jobId" element={<ApplicationFormPage />} />
  <Route path="/login" element={<Login onLogin={handleLogin} setUser={setUser} />} />
  <Route path="/signup" element={<Signup setUser={setUser} />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password/:token" element={<ResetPassword />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/jobs" element={<PrivateRoute user={user}><JobList jobs={jobsList} onEdit={handleEditJob} onDelete={handleDeleteJob} /></PrivateRoute>} />
  <Route path="/add-job" element={<PrivateRoute user={user}><AddJob addJobToList={handleAddJob} /></PrivateRoute>} />
  <Route path="/profile" element={<PrivateRoute user={user}><Profile user={user} /></PrivateRoute>} />
  {editingJob && (
    <Route path="/edit-job" element={<PrivateRoute user={user}><JobEdit job={editingJob} onSave={handleSave} onCancel={() => setEditingJob(null)} /></PrivateRoute>} />
  )}
</Routes>
    </div>
  );
};

export default App;
