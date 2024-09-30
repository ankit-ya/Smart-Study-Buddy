import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import assignmentData from '../data/assignmentData.json';

const Assignment = () => {
  const { category, topic } = useParams();
  const [pdfLink, setPdfLink] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(''); // Error state

  useEffect(() => {
    if (assignmentData[category] && assignmentData[category][topic]) {
      setPdfLink(assignmentData[category][topic]);
      setLoading(false);
    } else {
      setError('No assignment found for this topic.');
      setLoading(false);
    }
  }, [category, topic]);

  const markAssignmentComplete = async () => {
    const token = localStorage.getItem('token');
    const completed = true; // Define the completion status

    if (!token) {
      alert('You must be logged in to complete assignments.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/saveAssignmentProgress', { topic, completed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Assignment marked as complete!');
    } catch (error) {
      console.error('Error saving assignment progress:', error);
      alert('Could not mark assignment as complete. Please log in again.');
    }
  };

  if (loading) {
    return <p>Loading assignment details...</p>; // Loading message
  }

  return (
    <div className="assignment-pdf">
      <h2>{topic} - Assignment</h2>
      {error ? (
        <p>{error}</p> // Display error message if any
      ) : (
        <div>
          {pdfLink ? (
            <div>
              <a href={pdfLink} download>
                Download {topic} Assignment
              </a>
              <button onClick={markAssignmentComplete}>Mark as Complete</button>
            </div>
          ) : (
            <p>No assignment available for this topic.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Assignment;
