import React from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const HomeContent = () => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check authentication

  return (
    <div className="home-content">
      <h1>Welcome to Smart Study Buddy!</h1>
      <p>Empower your learning with AI-powered tools and personalized study paths.</p>
      
      {!isAuthenticated && (  // Conditionally render if not authenticated
        <div className="auth-buttons">
          <Link to="/login">
            <button className="auth-button">Login</button>
          </Link>
          <Link to="/signup">
            <button className="auth-button">Signup</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomeContent;
