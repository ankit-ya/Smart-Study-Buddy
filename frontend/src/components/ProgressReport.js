import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressReport = () => {
  const [progressData, setProgressData] = useState({ quizzes: [], assignments: [] });

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem('token'); // Ensure token is stored after login
      try {
        const response = await axios.get('https://smart-study-buddy-iehm.onrender.com/api/getProgress', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Progress Data:', response.data); // Log the progress data to inspect

        // Mapping quizzes to the correct format for display
        const quizzes = Array.from(Object.keys(response.data.quizzes || {})).map(topic => ({
          topic,
          score: response.data.quizzes[topic],
          totalQuestions: 2, // Replace with actual number of questions
        }));

        // Mapping assignments to the correct format for display
        const assignments = Array.from(Object.keys(response.data.assignments || {})).map(topic => ({
          topic,
          completed: response.data.assignments[topic],
        }));

        // Set state with fetched quizzes and assignments
        setProgressData({ quizzes, assignments });
      } catch (error) {
        console.error('Error fetching progress:', error);
      }
    };

    fetchProgress();
  }, []);

  return (
    <div>
      <h1>Progress Report</h1>

      {/* Quiz Progress Section */}
      <h2>Quiz Progress</h2>
      {progressData.quizzes.length === 0 ? (
        <p>No quiz progress recorded yet.</p>
      ) : (
        <ul>
          {progressData.quizzes.map((quiz, index) => (
            <li key={index}>
              {quiz.topic}: {quiz.score} / {quiz.totalQuestions}
            </li>
          ))}
        </ul>
      )}

      {/* Assignment Progress Section */}
      <h2>Assignment Progress</h2>
      {progressData.assignments.length === 0 ? (
        <p>No assignment progress recorded yet.</p>
      ) : (
        <ul>
          {progressData.assignments.map((assignment, index) => (
            <li key={index}>
              {assignment.topic}: {assignment.completed ? 'Completed' : 'Not Completed'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProgressReport;
