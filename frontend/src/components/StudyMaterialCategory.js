import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import studyMaterialData from '../data/studyMaterial.json';

const StudyMaterialCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedTopic(null); // Reset selected topic when a new category is selected
  };

  const handleTopicClick = (topic) => {
    setSelectedTopic(topic);
  };

  const renderCategories = () => {
    if (!selectedCategory) {
      return Object.keys(studyMaterialData).map(category => (
        <li key={category}>
          <button onClick={() => handleCategoryClick(category)}>{category}</button>
        </li>
      ));
    }
    return null;
  };

  const renderTopics = () => {
    if (selectedCategory && !selectedTopic) {
      return Object.keys(studyMaterialData[selectedCategory]).map(topic => (
        <li key={topic}>
          <button onClick={() => handleTopicClick(topic)}>{topic}</button>
        </li>
      ));
    }
    return null;
  };

  const renderStudyMaterialLink = () => {
    if (selectedTopic) {
      return (
        <Link to={`/study-material/${selectedCategory}/${selectedTopic}`}>
          <button>View Study Material</button>
        </Link>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Study Material Categories</h1>
      <ul>
        {renderCategories()}
      </ul>
      {selectedCategory && !selectedTopic && (
        <>
          <h2>Select a Topic in {selectedCategory}</h2>
          <ul>
            {renderTopics()}
          </ul>
        </>
      )}
      {renderStudyMaterialLink()}
    </div>
  );
};

export default StudyMaterialCategory;
