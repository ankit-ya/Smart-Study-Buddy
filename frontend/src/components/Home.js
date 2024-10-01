import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [navigate, isAuthenticated]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log('Dropdown is open:', !isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Smart Study Buddy</h2>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        {isAuthenticated && (
          <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/Study-Material">Study Material</Link></li>
            <li><Link to="/Assignment">Assignment</Link></li>
            <li><Link to="/ProgressReport">Progress Report</Link></li>
          </>
        )}
      </ul>

      <div className="auth-section">
        {isAuthenticated && user ? (
          <div className="profile-dropdown" ref={dropdownRef}>
            <div className="profile-info" onClick={toggleMenu}>
              <img
                src={user.profilePicture || 'default-avatar.png'}
                alt="Profile"
                className="profile-picture"
              />
              <span className="username">{user.name}</span>
            </div>

            {isOpen && (
              <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                {console.log("Rendering dropdown", isOpen)}
                <Link to="/profile" className="dropdown-item">My Profile</Link>
                <Link to="/ProgressReport" className="dropdown-item">Progress Report</Link>
                <Link to="/community" className="dropdown-item">Community</Link> {/* Add this line */}
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </div>
        ) : null}

      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Home;
