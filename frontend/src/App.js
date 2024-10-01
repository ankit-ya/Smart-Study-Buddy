import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import the components
import Quiz from './components/Quiz';
import QuizCategories from './components/QuizCategory';
import StudyMaterial from './components/StudyMaterial';
import StudyMaterialCategory from './components/StudyMaterialCategory';
import Layout from './components/Layout';
import HomeContent from './components/HomeContent';
// Assignment-related components
import AssignmentCategories from './components/AssignmentCategories';
import AssignmentTopics from './components/AssignmentTopics';
import Assignment from './components/Assignment';
// Authentication components
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
// Progress report component
import ProgressReport from './components/ProgressReport'; // New Progress Report component

// Community component
import Community from './components/Community'; // Import the Community component

// Helper function to check authentication
const isAuthenticated = () => {
  return !!localStorage.getItem('token');  // Check if token exists in localStorage
};

// Create a PrivateRoute component for protected routes
const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Home page route */}
          <Route path="/" element={<HomeContent />} />
          
          {/* Protected Quiz routes */}
          <Route path="/quiz" element={<PrivateRoute element={<QuizCategories />} />} />
          <Route path="/quiz/:category/:topic" element={<PrivateRoute element={<Quiz />} />} />
          
          {/* Protected Study material routes */}
          <Route path="/Study-Material" element={<PrivateRoute element={<StudyMaterialCategory />} />} />
          <Route path="/Study-Material/:category/:topic" element={<PrivateRoute element={<StudyMaterial />} />} />
          
          {/* Protected Assignment routes */}
          <Route path="/Assignment" element={<PrivateRoute element={<AssignmentCategories />} />} />
          <Route path="/Assignment/:category" element={<PrivateRoute element={<AssignmentTopics />} />} />
          <Route path="/Assignment/:category/:topic" element={<PrivateRoute element={<Assignment />} />} />

          {/* Community route */}
          <Route path="/community" element={<PrivateRoute element={<Community />} />} /> {/* Add this line */}
          
          {/* Authentication routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            
          {/* Progress Report route */}
          <Route path="/ProgressReport" element={<ProgressReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
