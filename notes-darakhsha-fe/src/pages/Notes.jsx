import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes, createNote, updateNote, deleteNote } from '../features/notes/notesSlice';
import { HiPlus } from 'react-icons/hi';
import NotesList from '../components/notes/NotesList';
import NoteForm from '../components/notes/NoteForm';
import Loader from '../components/common/Loader';

const Notes = () => {
  const dispatch = useDispatch();
  const { notes, isLoading } = useSelector((state) => state.notes);
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  const handleCreateNote = async (formData) => {
    await dispatch(createNote(formData));
    setShowForm(false);
  };

  const handleUpdateNote = async (formData) => {
    await dispatch(updateNote({ id: selectedNote._id, noteData: formData }));
    setSelectedNote(null);
    setShowForm(false);
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await dispatch(deleteNote(id));
    }
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowForm(true);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-6 mt-16">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">My Notes</h1>
        <button
          onClick={() => {
            setSelectedNote(null);
            setShowForm(true);
          }}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          <HiPlus className="w-5 h-5 mr-1" />
          New Note
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="max-w-2xl w-full">
            <NoteForm
              note={selectedNote}
              onSubmit={selectedNote ? handleUpdateNote : handleCreateNote}
              onClose={() => {
                setShowForm(false);
                setSelectedNote(null);
              }}
            />
          </div>
        </div>
      )}

      <NotesList
        notes={notes}
        onEdit={handleEdit}
        onDelete={handleDeleteNote}
      />
    </div>
  );
};

export default Notes;