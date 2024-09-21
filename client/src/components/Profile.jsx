import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './Profile.css';
import LoadingSpinner from './LoadingSpinner';

const Profile = ({ user, setUser }) => {
  const [profile, setProfile] = useState(user || {});
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No token found');
            return;
          }
          //const res = await axios.get('http://localhost:5000/api/auth/profile', {
            const res = await axios.get('https://jobportal-black.vercel.app/api/auth/profile', {

            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProfile(res.data);
        } catch (err) {
          console.error('Error fetching profile:', err);
        }
        setLoading(false);
      } else {
        setLoading(false);
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

    setUploadLoading(true);

    const formData = new FormData();
    formData.append('profilePicture', profilePicture);
    formData.append('userId', profile._id);

    try {
      //const response = await axios.post('http://localhost:5000/api/profile/uploadProfilePicture',
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
    } finally {
      setUploadLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="profile">
      <h1>My Profile</h1>
      {loading ? (
        <div className="loading-container">
          <LoadingSpinner />
          <p>Loading profile information...</p>
        </div>
      ) : (
        <>
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
          {uploadLoading ? (
            <div className="loading-container">
              <LoadingSpinner />
              <p>Uploading profile picture...</p>
            </div>
          ) : (
            <form onSubmit={handleProfilePictureUpload}>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <button type="submit">Upload</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default Profile;
  