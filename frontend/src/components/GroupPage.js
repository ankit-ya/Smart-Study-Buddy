import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams for getting groupId
import '../GroupPage.css';

const GroupPage = () => {
  const { groupId } = useParams(); // Use useParams to get groupId
  const [queries, setQueries] = useState([]);
  const [newQuery, setNewQuery] = useState('');

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/groups/${groupId}/queries`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with the actual method of getting the token
          }
        });
        setQueries(response.data);
      } catch (error) {
        console.error('Error fetching queries', error.response ? error.response.data : error.message);
      }
    };

    fetchQueries();
  }, [groupId]);

  const handlePostQuery = async () => {
    if (newQuery.trim() === '') return;

    try {
      await axios.post(`http://localhost:5000/api/groups/${groupId}/queries`, 
        { content: newQuery },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add token here as well
          }
        }
      );
      setNewQuery('');
      const response = await axios.get(`http://localhost:5000/api/groups/${groupId}/queries`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setQueries(response.data);
    } catch (error) {
      console.error('Error posting query', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="group-page">
      <h2>Group Chat</h2>
      <div className="chat-window">
        {queries.map((query) => (
          <div key={query._id} className="message">
            <div className="message-sender">
              <strong>{query.user.name}</strong>
            </div>
            <div className="message-content">{query.content}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <textarea
          value={newQuery}
          onChange={(e) => setNewQuery(e.target.value)}
          placeholder="Type your message..."
          rows="3"
          className="message-input"
        />
        <button onClick={handlePostQuery} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default GroupPage;
