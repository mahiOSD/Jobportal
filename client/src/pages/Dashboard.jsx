// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [jobStats, setJobStats] = useState(null);

  //useEffect(() => {
    const fetchJobStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/jobs/stats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setJobStats(response.data);
      } catch (error) {
        console.error('Error fetching job stats:', error);
      }
    };
    useEffect(() => {
        fetchJobStats();
    
        // Set up event listener for job addition
        window.addEventListener('jobAdded', fetchJobStats);
    
        // Clean up event listener
        return () => {
          window.removeEventListener('jobAdded', fetchJobStats);
        };
      }, []);
    

  if (!jobStats) return <div>Loading...</div>;

  const barChartData = {
    labels: ['Total Jobs', 'Applications Received', 'Jobs Added'],
    datasets: [
      {
        label: 'Job Statistics',
        data: [jobStats.totalJobs, jobStats.totalApplications, jobStats.jobsAdded],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
      },
    ],
  };

  const pieChartData = {
    labels: jobStats.categoryCounts.map(item => item.category),
    datasets: [
      {
        data: jobStats.categoryCounts.map(item => item.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Job Dashboard</h1>
      <div className="chart-container">
        <div className="chart">
          <h2>Job Statistics</h2>
          <Bar data={barChartData} />
        </div>
        <div className="chart">
          <h2>Job Categories</h2>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
