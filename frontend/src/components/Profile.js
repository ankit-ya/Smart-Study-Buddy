import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    phone: '',
    profilePicture: null, // To store the uploaded file
  });
  const [previewImage, setPreviewImage] = useState(null); // To store image preview
  const navigate = useNavigate();

  // Fetch user profile function wrapped in useCallback
  const fetchUserProfile = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data); // Set user data from response
      setFormData({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        gender: response.data.gender || '',
        phone: response.data.phone || '',
        profilePicture: response.data.profilePicture || null, // Set existing profile picture
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      navigate('/login'); // Redirect to login on error
    }
  }, [navigate]); // Added navigate as a dependency

  useEffect(() => {
    fetchUserProfile(); // Call the fetch function on component mount
  }, [fetchUserProfile]); // Included fetchUserProfile in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePicture: file });
    
    // Create a preview of the selected image
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formDataToSend = new FormData();

    // Append form data
    formDataToSend.append('firstName', formData.firstName);
    formDataToSend.append('lastName', formData.lastName);
    formDataToSend.append('gender', formData.gender);
    formDataToSend.append('phone', formData.phone);
    if (formData.profilePicture) {
      formDataToSend.append('profilePicture', formData.profilePicture);
    }

    try {
      await axios.put('http://localhost:5000/api/profile', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type for file upload
        },
      });
      alert('Profile updated successfully!');
      fetchUserProfile(); // Refresh the user data after upload
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select
            className="form-control"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Image Upload Section */}
        <div className="form-group">
          <label>Upload Profile Picture</label>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
          />
          {previewImage && (
            <div className="mt-2">
              <h5>Preview:</h5>
              <img src={previewImage} alt="Preview" className="img-thumbnail" style={{ width: '150px', height: '150px' }} />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Save Changes
        </button>
      </form>

      {/* Display Current Profile Picture */}
      {user.profilePicture && (
        <div className="mt-3">
          <h4>Current Profile Picture:</h4>
          <img 
            src={`http://localhost:5000/${user.profilePicture}`} 
            alt="Profile" 
            className="img-thumbnail" 
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
