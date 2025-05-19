import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const token = localStorage.getItem('token');
    
    if (!isLoggedIn || !token) {
      // Redirect to login if not logged in
      navigate('/login');
      return;
    }

    // Get user from local storage
    const userData = JSON.parse(localStorage.getItem('user'));
    setUser(userData);

    // Get blog data
    async function fetchBlogs() {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5500/api/blogs', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Failed to load blog posts');
        setLoading(false);
      }
    }

    fetchBlogs();
  }, [navigate]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-pulse">Loading blog posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Blog Page</h1>
        <h2 className="text-xl text-gray-600">
          Welcome {user ? user.fullName : 'Guest'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((blog, index) => (
            <div key={blog._id || index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-lg mb-2">{blog.title || `Blog Post ${index + 1}`}</h3>
              <p className="text-gray-700">{blog.content || 'No content available'}</p>
              {blog.author && <p className="text-sm text-gray-500 mt-2">By: {blog.author}</p>}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 text-gray-500">
            No blog posts available
          </div>
        )}
      </div>
    </div>
  );
}