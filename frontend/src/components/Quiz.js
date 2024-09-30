import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios
import quizData from '../data/quizData.json';

function Quiz() {
  const { category, topic } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (quizData[category] && quizData[category][topic]) {
      setQuizzes(quizData[category][topic]);
    }
  }, [category, topic]);

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    });
  };

  const calculateScore = async () => {
    const correctAnswers = quizzes.reduce((acc, quiz, index) => {
      if (userAnswers[index] === quiz.answer) {
        acc++;
      }
      return acc;
    }, 0);

    setScore(correctAnswers);

    // Save or update quiz progress in local storage (if needed)
    const quizProgress = JSON.parse(localStorage.getItem('quizProgress')) || [];
    const existingQuizIndex = quizProgress.findIndex(item => item.topic === topic);

    if (existingQuizIndex > -1) {
      quizProgress[existingQuizIndex].score = correctAnswers;
      quizProgress[existingQuizIndex].totalQuestions = quizzes.length;
    } else {
      quizProgress.push({ topic, score: correctAnswers, totalQuestions: quizzes.length });
    }
    localStorage.setItem('quizProgress', JSON.stringify(quizProgress));

    // Send score to the backend
    const token = localStorage.getItem('token'); // Get the token from local storage
    console.log('Token:', token); // Log token for debugging
    try {
      await axios.post('http://localhost:5000/api/saveProgress', { topic, score: correctAnswers }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Score saved successfully');
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  return (
    <div>
      <h1>Quiz: {topic}</h1>
      <ul>
        {quizzes.map((quiz, index) => (
          <li key={index}>
            <h3>{quiz.question}</h3>
            {quiz.options.map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  id={`question${index}option${i}`}
                  name={`question${index}`}
                  value={option}
                  onChange={() => handleAnswerChange(index, option)}
                />
                <label htmlFor={`question${index}option${i}`}>{option}</label>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <button onClick={calculateScore}>Submit</button>
      {score !== null && <h2>Your score: {score} / {quizzes.length}</h2>}
    </div>
  );
}

export default Quiz;
