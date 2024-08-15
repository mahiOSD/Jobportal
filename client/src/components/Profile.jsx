import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ user, setUser }) => {
  const [profile, setProfile] = useState(user || {});
  const [profilePicture, setProfilePicture] = useState(null);

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
              Authorization: `Bearer ${token}`,
            },
          });

          setProfile(res.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();

    if (!profilePicture) {
      console.error('No profile picture selected');
      return;
    }

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userId', profile._id);

    try {
      const response = await axios.post(
        'https://jobportal-black.vercel.app/api/profile/uploadProfilePicture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log('Profile picture uploaded successfully:', response.data);
      setProfile((prevProfile) => ({
        ...prevProfile,
        profilePicture: response.data.profilePicture,
      }));
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
    }
  };

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile-details">
        <img
          src={`https://jobportal-black.vercel.app${profile.profilePicture}`}
          alt="Profile"
        />
        <p>
          <strong>Name:</strong> {profile.name || 'N/A'}
        </p>
        <p>
          <strong>Email:</strong> {profile.email || 'N/A'}
        </p>
        <p>
          <strong>Mobile Number:</strong> {profile.phone || 'N/A'}
        </p>
      </div>

      <h2>Upload Profile Picture</h2>
      <form onSubmit={handleProfilePictureUpload}>
        <input
          type="file"
          accept="image/*"
          onChange={handleProfilePictureChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default Profile;
