import React, { useState, useEffect } from 'react';
import { api } from '../api/client';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await api.getUserProfile();
        setProfile(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadProfile();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <img src={profile.photoURL} alt="Profile" />
      <p>Name: {profile.displayName}</p>
      <p>Email: {profile.email}</p>
      <p>Email verified: {profile.emailVerified ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default UserProfile;