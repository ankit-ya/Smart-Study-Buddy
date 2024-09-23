import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>Smart Study Buddy</h2>
      </div>
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/quiz">Quiz</Link></li>
        <li><Link to="/Study-Material">Study-Material</Link></li>
        <li><Link to="/Assignment">Assignment</Link></li>
      </ul>
      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
};

export default Home;
