// src/services/authService.js
import axios from '../utils/axios';

const login = async (userData) => {
  const response = await axios.post('/users/login', userData);
  return response.data;
};

const register = async (userData) => {
  const response = await axios.post('/users/register', userData);
  return response.data;
};

const logout = async () => {
  try {
    await axios.post('/users/logout');
  } catch (error) {
    console.error('Logout API error:', error);
  }
};

const authService = {
  login,
  register,
  logout
};

export default authService;