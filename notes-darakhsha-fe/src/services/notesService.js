
// src/services/notesService.js
import axios from '../utils/axios';

// Get all notes
const getNotes = async () => {
  const response = await axios.get('/notes');
  return response.data;
};

// Create new note
const createNote = async (noteData) => {
  const response = await axios.post('/notes', noteData);
  return response.data;
};

// Update note
const updateNote = async (id, noteData) => {
  const response = await axios.put(`/notes/${id}`, noteData);
  return response.data;
};

// Delete note
const deleteNote = async (id) => {
  const response = await axios.delete(`/notes/${id}`);
  return response.data;
};

const notesService = {
  getNotes,
  createNote,
  updateNote,
  deleteNote
};

export default notesService;