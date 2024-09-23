import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import assignmentData from '../data/assignmentData.json'; // Import JSON data

const AssignmentCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract categories from assignmentData
    setCategories(Object.keys(assignmentData));
  }, []);

  return (
    <div className="categories">
      <h2>Assignment Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/Assignment/${category}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentCategories;
