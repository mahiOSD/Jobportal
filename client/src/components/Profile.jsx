// Profile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ user }) => {
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }

          const res = await axios.get('/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          setProfile(res.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
        <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
        <p><strong>Mobile Number:</strong> {profile.mobileNumber || 'N/A'}</p>
      </div>
    </div>
  );
};

export default Profile;
