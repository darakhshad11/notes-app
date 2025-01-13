

// src/services/adminService.js
import axios from '../utils/axios';

// Get all users
const getUsers = async () => {
  const response = await axios.get('/admin/users');
  return response.data;
};

// Create new user
const createUser = async (userData) => {
  const response = await axios.post('/admin/users', userData);
  return response.data;
};

// Update user
const updateUser = async (id, userData) => {
  const response = await axios.put(`/admin/users/${id}`, userData);
  return response.data;
};

// Delete user
const deleteUser = async (id) => {
  const response = await axios.delete(`/admin/users/${id}`);
  return response.data;
};

// Get user statistics (optional)
const getUserStats = async () => {
  const response = await axios.get('/admin/users/stats');
  return response.data;
};

const adminService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserStats
};

export default adminService;