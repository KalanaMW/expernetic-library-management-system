import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import './ProfilePage.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5114/api';

export const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${API_URL}/auth/me`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update user context with new data
      setUser(response.data);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-page">
      <motion.div
        className="profile-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="profile-header">
          <div className="profile-avatar">
            <span className="avatar-icon">👤</span>
          </div>
          <h1>My Profile</h1>
          <p className="profile-username">@{user?.username}</p>
        </div>

        <div className="profile-content">
          {error && (
            <motion.div
              className="alert alert-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div
              className="alert alert-success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {success}
            </motion.div>
          )}

          {!isEditing ? (
            <div className="profile-info">
              <div className="info-row">
                <span className="info-label">First Name</span>
                <span className="info-value">{user?.firstName || 'Not set'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Last Name</span>
                <span className="info-value">{user?.lastName || 'Not set'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Email</span>
                <span className="info-value">{user?.email || 'Not set'}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Username</span>
                <span className="info-value">{user?.username}</span>
              </div>

              <motion.button
                className="btn-primary"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit Profile
              </motion.button>
            </div>
          ) : (
            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  className="btn-primary"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </motion.button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};
