
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    if (isLoggedIn && token) {
      navigate('/blog');
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = {
        fullName: e.target[0].value,
        age: e.target[1].value,
        username: e.target[2].value,
        password: e.target[3].value
      };

      const res = await axios.post('http://localhost:5500/api/user/SignUp', data);

      if (res.data.message === true) {
        // After successful signup, automatically log the user in
        const loginRes = await axios.post('http://localhost:5500/api/user/login', {
          username: data.username,
          password: data.password
        });

        if (loginRes.data.token) {
          localStorage.setItem('token', loginRes.data.token);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('user', JSON.stringify(loginRes.data.user));
          
          // Trigger custom event to notify other components
          window.dispatchEvent(new Event('auth-change'));
          
          navigate('/blog');
        }
      } else {
        setError(res.data.error || 'Signup failed');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span>{error}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              id="fullName"
              placeholder="Full Name" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="age" className="block text-gray-700 mb-1">Age</label>
            <input 
              type="number" 
              id="age"
              placeholder="Age" 
              required 
              min="10" 
              max="120"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              id="username"
              placeholder="Username" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              id="password"
              placeholder="Password" 
              required 
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}