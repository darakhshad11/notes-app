import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  content: {
    type: String,
  },
  category: {
    type: String,
    default: 'general',
  },
}, {
  timestamps: true,
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
