// src/components/notes/NoteCard.jsx
import { HiPencil, HiTrash, HiTag, HiClock } from 'react-icons/hi';
import { formatDate, truncateText, timeAgo } from '../../utils/helpers';
import { useState } from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDelete(note._id);
    }
  };

  const categoryColors = {
    work: 'bg-blue-50 text-blue-700',
    personal: 'bg-green-50 text-green-700',
    ideas: 'bg-purple-50 text-purple-700',
    tasks: 'bg-yellow-50 text-yellow-700',
    general: 'bg-primary-50 text-primary-700'
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-medium text-gray-900 truncate max-w-[70%]" 
            title={note.title}>
          {truncateText(note.title, 50)}
        </h3>
        <span className={`flex items-center px-2 py-1 rounded-full text-xs ${categoryColors[note.category] || categoryColors.general}`}>
          <HiTag className="w-3 h-3 mr-1" />
          {note.category}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3 min-h-[4.5rem]" 
         title={note.content}>
        {note.content}
      </p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-500" title={formatDate(note.updatedAt)}>
          <HiClock className="w-4 h-4 mr-1" />
          <span>{timeAgo(note.updatedAt)}</span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(note)}
            className={`flex items-center ${
              isHovered 
                ? 'text-primary-600' 
                : 'text-gray-600'
            } hover:text-primary-700 transition-colors duration-200`}
            title="Edit note"
          >
            <HiPencil className="w-4 h-4 mr-1" />
            Edit
          </button>

          <button
            onClick={handleDelete}
            onMouseEnter={() => setIsDeleteHovered(true)}
            onMouseLeave={() => setIsDeleteHovered(false)}
            className={`flex items-center ${
              isDeleteHovered 
                ? 'text-red-600' 
                : 'text-gray-600'
            } hover:text-red-700 transition-colors duration-200`}
            title="Delete note"
          >
            <HiTrash className="w-4 h-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;