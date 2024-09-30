import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    navigate('/');  // Redirect to homepage after logout
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Smart Study Buddy</h2>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        {/* Only show Home link if the user is authenticated */}
        {isAuthenticated && <li><Link to="/">Home</Link></li>}
        {isAuthenticated && (
          <>
            <li><Link to="/quiz">Quiz</Link></li>
            <li><Link to="/Study-Material">Study Material</Link></li>
            <li><Link to="/Assignment">Assignment</Link></li>
            <li><Link to="/ProgressReport">Progress Report</Link></li> {/* New Progress Report link */}
          </>
        )}
      </ul>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="auth-button">Logout</button>
        ) : (
          <></>  // No Login/Signup buttons here since they're on the homepage
        )}
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
