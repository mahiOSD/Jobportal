import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'https://jobportal-black.vercel.app';
  //const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const refreshToken = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {}, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error) {
      console.error('Error refreshing token:', error);
      navigate('/login');
    }
  };

  const fetchStats = async () => {
    let token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/api/jobs/stats`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log("Response data:", response.data);
      setStats(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        token = await refreshToken();
        if (token) {
          fetchStats(); // Retry with new token
        }
      } else {
        console.error('Error fetching stats:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleJobAdded = () => {
      fetchStats();
    };

    const handleUserAuthenticated = () => {
      fetchStats();
    };
    
    window.addEventListener('userAuthenticated', handleUserAuthenticated);
    window.addEventListener('jobAdded', handleJobAdded);

    return () => {
      window.removeEventListener('userAuthenticated', handleUserAuthenticated);
      window.removeEventListener('jobAdded', handleJobAdded);
    };
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (!stats) return <p>No data available</p>;

  const barChartData = {
    labels: ['Total Jobs', 'Total Applications', 'Jobs Added by You'],
    datasets: [
      {
        label: 'Job Statistics',
        data: [stats.totalJobs, stats.totalApplications, stats.jobsAdded],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
      },
    ],
  };

  const pieChartData = {
    labels: stats.categoryCounts.map(category => category.category),
    datasets: [
      {
        data: stats.categoryCounts.map(category => category.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Jobs</h2>
          <p>{stats.totalJobs}</p>
        </div>
        <div className="stat-card">
          <h2>Total Applications</h2>
          <p>{stats.totalApplications}</p>
        </div>
        <div className="stat-card">
          <h2>Jobs Added by You</h2>
          <p>{stats.jobsAdded}</p>
        </div>
      </div>
      <div className="charts-container">
        <div className="chart">
          <h2>Job Statistics</h2>
          <Bar data={barChartData} />
        </div>
        <div className="chart">
          <h2>Jobs by Category</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
