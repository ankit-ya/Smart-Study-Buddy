// QuizCategories.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import quizData from '../data/quizData.json';

const QuizCategories = () => {
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
      return Object.keys(quizData).map(category => (
        <li key={category}>
          <button onClick={() => handleCategoryClick(category)}>{category}</button>
        </li>
      ));
    }
    return null;
  };

  const renderTopics = () => {
    if (selectedCategory && !selectedTopic) {
      return Object.keys(quizData[selectedCategory]).map(topic => (
        <li key={topic}>
          <button onClick={() => handleTopicClick(topic)}>{topic}</button>
        </li>
      ));
    }
    return null;
  };

  const renderQuizLink = () => {
    if (selectedTopic) {
      return (
        <Link to={`/quiz/${selectedCategory}/${selectedTopic}`}>
          <button>Start Quiz</button>
        </Link>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Quiz Categories</h1>
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
      {renderQuizLink()}
    </div>
  );
};

export default QuizCategories;