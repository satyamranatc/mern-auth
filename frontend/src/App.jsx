import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import NavBar from "./Components/NavBar.jsx"
import Login from "./Components/LogIn.jsx"
import SignUp from "./Components/SignUp.jsx"
import Profile from './Components/Profile.jsx'
import Blog from './Pages/Blog.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === 'true';
      setIsLoggedIn(loggedInStatus);
    };
    
    // Check on mount
    checkLoginStatus();
    
    // Setup event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event listener for login/logout
    window.addEventListener('auth-change', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('auth-change', checkLoginStatus);
    };
  }, []);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Routes */}
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/blog"
          element={
            <PrivateRoute>
              <Blog />
            </PrivateRoute>
          }
        />

        {/* Redirect root to blog if logged in, otherwise to login */}
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/blog" replace /> : <Navigate to="/login" replace />} 
        />
        
        {/* Catch 404 */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/blog" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}