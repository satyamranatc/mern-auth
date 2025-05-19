
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Get user from local storage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
            setUser(userData);
        }
    }, [isLoggedIn]); // Re-run when isLoggedIn changes

    const handleLogout = () => {
        // Clear all authentication data
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        
        // Update state
        setIsLoggedIn(false);
        setUser(null);
        
        // Trigger custom event for other components to know about the logout
        window.dispatchEvent(new Event('auth-change'));
        
        // Navigate to login page
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Logo</h2>
                <ul className="flex space-x-6 items-center">
                    {isLoggedIn && (
                        <li><Link to="/blog" className="text-white hover:text-gray-300 transition duration-300">Blog</Link></li>
                    )}
                    
                    {isLoggedIn ? (
                        <>
                            <li><Link to="/Profile" className="text-white hover:text-gray-300 transition duration-300">Profile</Link></li>
                            <li className="font-bold text-white">{user?.fullName}</li>
                            <li>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login" className="text-white hover:text-gray-300 transition duration-300">Login</Link></li>
                            <li><Link to="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded transition duration-300">Sign Up</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}