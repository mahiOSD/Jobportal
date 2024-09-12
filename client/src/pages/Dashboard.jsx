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

  const fetchStats = async () => {
    try {
      let token = localStorage.getItem('token');
      // eslint-disable-next-line no-unused-vars
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token) throw new Error('Token is missing');

      try {
        const { data } = await axios.get('https://jobportal-black.vercel.app/api/jobs/stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const hasData = data && data.totalJobs !== undefined && data.categoryCounts !== undefined;

        setBarData({
          labels: hasData ? ['Total Jobs', 'Total Applications', 'Jobs Added'] : [],
          datasets: [
            {
              label: 'Job Statistics',
              data: hasData ? [data.totalJobs, data.totalApplications, data.jobsAdded] : [0, 0, 0],
              backgroundColor: ['#3498db', '#2ecc71', '#e74c3c'],
            },
          ],
        });

        setPieData({
          labels: hasData ? (data.categoryCounts || []).map((cat) => cat.category) : [],
          datasets: [
            {
              label: 'Job Categories',
              data: hasData ? (data.categoryCounts || []).map((cat) => cat.count) : [0],
              backgroundColor: [
                '#f39c12', '#8e44ad', '#e67e22', '#1abc9c', '#c0392b',
                '#2980b9', '#27ae60', '#d35400', '#7f8c8d', '#34495e',
              ],
            },
          ],
        });
        setLoading(false);
      } catch (fetchError) {
        console.error('Error fetching job stats:', fetchError);
        setLoading(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    const handleJobAdded = () => {
      fetchStats();
    };

    window.addEventListener('jobAdded', handleJobAdded);

    return () => {
      window.removeEventListener('jobAdded', handleJobAdded);
    };
  }, []);

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
              <h3>Add Jobs</h3>
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
