import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import './App.css';


const jobs = [
  {
    id: '1',
    title: 'Software Engineer',
    description: 'We are looking for a skilled Software Engineer to join our team...',
    company: 'Tech Solutions Inc.',
    location: 'Dhaka',
    salary: '৳80,000 - ৳100,000 per year',
    icon: '/images/software-engineer-icon.png',
    category: 'backend',
  },
  {
    id: '2',
    title: 'Data Scientist',
    description: 'Join our Data Science team to analyze and interpret complex data sets...',
    company: 'Data Analytics Corp.',
    location: 'Dhaka',
    salary: '৳90,000 - ৳110,000 per year',
    icon: '/images/data-scientist-icon.jpg',
    category: 'data science',
  },
  {
    id: '3',
    title: 'Web Development Teacher',
    description: 'We are seeking a passionate Web Development Teacher to join our education team...',
    company: 'Tech Education Institute',
    location: 'Remote or Dhaka',
    salary: '৳60,000 - ৳80,000 per year',
    icon: '/images/web-development-icon.png',
    category: 'design',
  },
  {
    id: '4',
    title: 'Junior/Graduate Software Developer',
    description: 'We are looking for a Junior/Graduate Software Developer to join our team...',
    company: 'Innovative Tech Solutions',
    location: 'Dhaka',
    salary: '৳50,000 - ৳70,000 per year',
    icon: '/images/software-developer-icon.png',
    category: 'frontend',
  },
  {
    id: '5',
    title: 'Junior/Graduate Web Developer',
    description: 'Join our dynamic web development team as a Junior/Graduate Web Developer...',
    company: 'Creative Web Agency',
    location: 'Remote or Dhaka',
    salary: '৳45,000 - ৳65,000 per year',
    icon: '/images/web-developer-icon.png',
    category: 'frontend',
  },
  {
    id: '6',
    title: 'Senior Backend Developer',
    description: 'Looking for an experienced Senior Backend Developer to work on our core platform...',
    company: 'FutureTech Solutions',
    location: 'Dhaka',
    salary: '৳100,000 - ৳130,000 per year',
    icon: '/images/Backend.jpg',
    category: 'backend',
  },
  {
    id: '7',
    title: 'Fullstack Developer',
    description: 'Join our team as a Fullstack Developer and work on both frontend and backend technologies...',
    company: 'Web Innovators Inc.',
    location: 'Dhaka',
    salary: '৳90,000 - ৳120,000 per year',
    icon: '/images/Full stack.jpg',
    category: 'fullstack',
  },
  {
    id: '8',
    title: 'UI/UX Designer',
    description: 'We are looking for a creative UI/UX Designer to enhance the user experience of our products...',
    company: 'Design Masters',
    location: 'Dhaka',
    salary: '৳70,000 - ৳90,000 per year',
    icon: '/images/UIUX-Designer.png',
    category: 'design',
  },
  {
    id: '9',
    title: 'Frontend Web Developer',
    description: 'Seeking a talented Frontend Web Developer to create visually appealing and responsive web pages...',
    company: 'Tech Innovations',
    location: 'Remote or Dhaka',
    salary: '৳60,000 - ৳80,000 per year',
    icon: '/images/Frontend.jpg',
    category: 'frontend',
  },
  {
    id: '10',
    title: 'Junior Backend Developer',
    description: 'We are looking for a Junior Backend Developer to assist with server-side logic and integration...',
    company: 'Tech Innovations',
    location: 'Dhaka',
    salary: '৳45,000 - ৳65,000 per year',
    icon: '/images/back-end-developer.jpg',
    category: 'backend',
  },
  {
    id: '11',
    title: 'Junior Frontend Developer',
    description: 'Join our team as a Junior Frontend Developer to help build user-friendly web interfaces...',
    company: 'Creative Web Agency',
    location: 'Remote or Dhaka',
    salary: '৳50,000 - ৳70,000 per year',
    icon: '/images/Junior-Frontend.png',
    category: 'frontend',
  },
  {
    id: '12',
    title: 'Senior Frontend Developer',
    description: 'Seeking a Senior Frontend Developer to lead the development of advanced web applications...',
    company: 'FutureTech Solutions',
    location: 'Dhaka',
    salary: '৳100,000 - ৳130,000 per year',
    icon: '/images/Senior-Frontend.png',
    category: 'frontend',
  },
  {
    id: '13',
    title: 'Senior Fullstack Developer',
    description: 'Looking for a Senior Fullstack Developer to manage both frontend and backend tasks...',
    company: 'Tech Pioneers Inc.',
    location: 'Dhaka',
    salary: '৳120,000 - ৳150,000 per year',
    icon: '/images/Senior-Full stack.avif',
    category: 'fullstack',
  },
];



const App = () => {
  const [user, setUser] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const navigate = useNavigate();

  
  const [jobsState, setJobsState] = useState(jobs);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSave = async (updatedJob) => {
    try {
      const response = await axios.put(
        `https://jobportal-black.vercel.app/api/jobs/update/${updatedJob._id}`,
        updatedJob
      );
      const updatedJobs = jobsState.map((job) =>
        job._id === updatedJob._id ? response.data : job
      );
      setJobsState(updatedJobs);
      setEditingJob(null);
      navigate('/');
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleAddJob = async (newJob) => {
    try {
      const response = await axios.post(
        'https://jobportal-black.vercel.app/api/jobs/add',
        newJob
      );
      setJobsState([...jobsState, response.data]);
      navigate('/');
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  const handleLogin = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="app-container">
      <Header user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchJobs jobs={jobsState} />} />
        <Route path="/job/:id" element={<JobDetails jobs={jobsState} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/edit-job" element={<PrivateRoute user={user}><JobEdit job={editingJob} onSave={handleSave} /></PrivateRoute>} />
        <Route path="/add-job" element={<PrivateRoute user={user}><AddJob onAdd={handleAddJob} /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default App;
