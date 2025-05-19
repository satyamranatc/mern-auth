
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setUser(userData);
      setLoading(false);
    } else {
      setError('User data not found');
      setLoading(false);
    }
  }, []);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Welcome, {user?.fullName}</h2>
          <p className="text-gray-600">Username: {user?.username}</p>
          <p className="text-gray-600">Age: {user?.age}</p>
        </div>
        <div className="mt-4">
          <button 
            onClick={() => {
              localStorage.removeItem('isLoggedIn');
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.href = '/login';
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;