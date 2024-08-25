import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'https://jobportal-black.vercel.app'; 
        const token = localStorage.getItem('token'); 

        // Make a single request using axios
        const response = await axios.get(`${API_URL}/api/jobs/stats`, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;
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
