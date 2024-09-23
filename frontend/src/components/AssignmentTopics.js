import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import assignmentData from '../data/assignmentData.json'; // Import JSON data

const AssignmentTopics = () => {
  const { category } = useParams(); // Get category from URL
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    // Set topics for the selected category
    setTopics(Object.keys(assignmentData[category] || {}));
  }, [category]);

  return (
    <div className="topics">
      <h2>{category} Topics</h2>
      <ul>
        {topics.map((topic, index) => (
          <li key={index}>
            <Link to={`/Assignment/${category}/${topic}`}>{topic}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentTopics;
