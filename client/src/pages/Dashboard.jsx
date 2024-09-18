import React, { useState, useEffect } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const [barData, setBarData] = useState({});
  const [pieData, setPieData] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); 
      if (!token) throw new Error('Token is missing');

      const { data } = await axios.get('https://jobportal-black.vercel.app/api/jobs/stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Stats data:', data); 

      setBarData({
        labels: ['Total Jobs', 'Total Applications', 'Jobs Added'],
        datasets: [
          {
            label: 'Job Statistics',
            data: [data.totalJobs, data.totalApplications, data.jobsAdded],
            backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
          },
        ],
      });

      setPieData({
        labels: data.categoryCounts.map((cat) => cat.category),
        datasets: [
          {
            label: 'Job Categories',
            data: data.categoryCounts.map((cat) => cat.count),
            backgroundColor: [
              '#f39c12', '#8e44ad', '#e67e22', '#1abc9c', '#c0392b',
              '#2980b9', '#27ae60', '#d35400', '#7f8c8d', '#34495e',
            ],
          },
        ],
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching job stats:', error); 
      setLoading(false);
    }
  };

  useEffect(() => {
    const category = localStorage.getItem('userCategory');
    console.log('User category:', category); 

    if (category === 'admin') {
      setIsAdmin(true);
      fetchStats();
    } else {
      setIsAdmin(false);
    }

    const handleUserLogin = () => {
      const updatedCategory = localStorage.getItem('userCategory');
      if (updatedCategory === 'admin') {
        fetchStats();
      }
    };

    window.addEventListener('userLoggedIn', handleUserLogin);

    return () => {
      window.removeEventListener('userLoggedIn', handleUserLogin);
    };
  }, []);

  if (!isAdmin) {
    return <p>Access denied. Admins only.</p>;
  }

  return (
    <div className="dashboard-container">
      {loading ? <p>Loading...</p> : (
        <>
          <div className="header-container">
            <div className="header-item">
              <h3>Total Jobs</h3>
              <p>{barData.datasets ? barData.datasets[0].data[0] : 0}</p>
            </div>
            <div className="header-item">
              <h3>Total Applications</h3>
              <p>{barData.datasets ? barData.datasets[0].data[1] : 0}</p>
            </div>
            <div className="header-item">
              <h3>Jobs Added</h3>
              <p>{barData.datasets ? barData.datasets[0].data[2] : 0}</p>
            </div>
          </div>
          <div className="charts-wrapper">
            <div className="chart-container">
              <h2>Job Statistics</h2>
              <Bar data={barData} />
            </div>
            <div className="chart-container">
              <h2>Jobs by Category</h2>
              <Pie data={pieData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
