import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Community = () => {
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/groups', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setGroups(response.data);
      } catch (error) {
        console.error('Error fetching groups', error.response ? error.response.data : error.message);
      }
    };

    const fetchJoinedGroups = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/groups/joined', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJoinedGroups(response.data);
      } catch (error) {
        console.error('Error fetching joined groups', error.response ? error.response.data : error.message);
      }
    };

    fetchGroups();
    fetchJoinedGroups();
  }, []);

  const joinGroup = async (groupId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/groups/${groupId}/join`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Joined group successfully!');
      setJoinedGroups([...joinedGroups, groupId]);
    } catch (error) {
      console.error('Error joining group', error.response ? error.response.data : error.message);
    }
  };

  const leaveGroup = async (groupId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:5000/api/groups/${groupId}/leave`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Left group successfully!');
      setJoinedGroups(joinedGroups.filter(id => id !== groupId));
    } catch (error) {
      console.error('Error leaving group', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="community">
      <h2>Community Groups</h2>
      <ul>
        {groups.map(group => (
          <li key={group._id}>
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <Link to={`/groups/${group._id}`}>View Group</Link> {/* Link to GroupPage */}
            {joinedGroups.includes(group._id) ? (
              <button onClick={() => leaveGroup(group._id)}>Leave Group</button>
            ) : (
              <button onClick={() => joinGroup(group._id)}>Join Group</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;
