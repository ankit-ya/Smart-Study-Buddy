import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import quizData from '../data/quizData.json';

function Quiz() {
  const { category, topic } = useParams(); // Define category and topic using useParams
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    if (quizData[category] && quizData[category][topic]) {
      setQuizzes(quizData[category][topic]);
    }
  }, [category, topic]); // Use category and topic as dependencies correctly

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer
    });
  };

  const calculateScore = () => {
    const correctAnswers = quizzes.reduce((acc, quiz, index) => {
      if (userAnswers[index] === quiz.answer) {
        acc++;
      }
      return acc;
    }, 0);

    setScore(correctAnswers);
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