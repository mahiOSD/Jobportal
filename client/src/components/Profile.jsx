import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

          const res = await axios.get('https://jobportal-black.vercel.app/api/auth/profile', {
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

      const updatedProfile = {
        ...profile,
        profilePicture: response.data.profilePicture,
      };

      setProfile(updatedProfile);

      const storedUser = JSON.parse(localStorage.getItem('user'));
      const updatedUser = { ...storedUser, profilePicture: response.data.profilePicture };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to upload profile picture:', error);
    }
  };

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile-details">
        <img
          src={profile.profilePicture || '/default-avatar.png'}
          alt="Profile"
          className="profile-picture"
        />
        <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
        <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
        <p><strong>Mobile Number:</strong> {profile.phone || 'N/A'}</p>
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

Profile.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Profile;