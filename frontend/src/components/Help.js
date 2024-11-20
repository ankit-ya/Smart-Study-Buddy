import React, { useState } from 'react';
import axios from 'axios';
import '../Help.css';

const Help = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Replace with your actual OpenAI API key
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
      const result = await axios.post(
        url,
        {
          model: 'gpt-3.5-turbo', // Using the chat-based model
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: query },
          ],
          max_tokens: 150,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      
      const resultText = result.data.choices[0].message.content;
      setResponse(resultText);
    } catch (error) {
      console.error('Error fetching the help query:', error);
      setResponse('Sorry, something went wrong.');
    }
  };

  return (
    <div className="help-container">
      <h3>Help Section</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          placeholder="Type your query here..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div className="response">
          <h4>Response:</h4>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Help;
