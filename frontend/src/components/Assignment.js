import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import assignmentData from '../data/assignmentData.json'; // Import JSON data

const Assignment = () => {
  const { category, topic } = useParams(); // Get category and topic from URL
  const [pdfLink, setPdfLink] = useState('');

  useEffect(() => {
    // Set the PDF link for the selected category and topic
    if (assignmentData[category] && assignmentData[category][topic]) {
      setPdfLink(assignmentData[category][topic]);
    }
  }, [category, topic]);

  return (
    <div className="assignment-pdf">
      <h2>{topic} - Assignment</h2>
      {pdfLink ? (
        <a href={pdfLink} download>
          Download {topic} Assignment
        </a>
      ) : (
        <p>No assignment available for this topic.</p>
      )}
    </div>
  );
};

export default Assignment;
