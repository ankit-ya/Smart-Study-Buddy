import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Signup from './components/Signup'; // New Signup component
import Login from './components/Login';     // New Login component
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          {/* Home page route */}
          <Route path="/" element={<HomeContent />} />
          
          {/* Quiz routes */}
          <Route path="/quiz" element={<QuizCategories />} />
          <Route path="/quiz/:category/:topic" element={<Quiz />} />
          
          {/* Study material routes */}
          <Route path="/Study-Material" element={<StudyMaterialCategory />} />
          <Route path="/Study-Material/:category/:topic" element={<StudyMaterial />} />
          
          {/* Assignment routes */}
          <Route path="/Assignment" element={<AssignmentCategories />} />
          <Route path="/Assignment/:category" element={<AssignmentTopics />} />
          <Route path="/Assignment/:category/:topic" element={<Assignment />} />
          
          {/* Authentication routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
