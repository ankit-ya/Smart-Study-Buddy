import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import '../App.css'; // Import your custom CSS if needed

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://smart-study-buddy-iehm.onrender.com/api/login', formData);
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      navigate('/profile'); // Redirect to profile after successful login
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Account doesn't exist");
      } else {
        setError('Login error. Please try again.');
      }
    }
  };

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
    },
    title: {
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      fontWeight: 'bold',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#fff',
      backgroundColor: '#4a90e2',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#357abd',
    },
    errorPopup: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      padding: '10px',
      border: '1px solid #f5c6cb',
      borderRadius: '5px',
      marginBottom: '15px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      {error && <div style={styles.errorPopup}>{error}</div>} {/* Error popup */}
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
