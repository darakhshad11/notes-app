import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, createUser, updateUser, deleteUser } from '../features/admin/adminSlice';
import { HiPlus, HiSearch, HiX, HiFilter } from 'react-icons/hi';
import UserList from '../components/admin/UserList';
import UserForm from '../components/admin/UserForm';
import Loader from '../components/common/Loader';

const Admin = () => {
  const dispatch = useDispatch();
  const { users, isLoading } = useSelector((state) => state.admin);
  const [showForm, setShowForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleCreateUser = async (userData) => {
    await dispatch(createUser(userData));
    setShowForm(false);
  };

  const handleUpdateUser = async (userData) => {
    await dispatch(updateUser({ id: selectedUser._id, userData }));
    setSelectedUser(null);
    setShowForm(false);
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          
          {/* Mobile Responsive Buttons */}
          <div className="flex items-center space-x-2">
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 bg-white rounded-md border border-gray-200 text-gray-600"
            >
              {isSearchOpen ? <HiX className="h-5 w-5" /> : <HiSearch className="h-5 w-5" />}
            </button>

            {/* Add User Button */}
            <button
              onClick={() => {
                setSelectedUser(null);
                setShowForm(true);
              }}
              className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              <HiPlus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Expandable Search Input */}
        {isSearchOpen && (
          <div className="mb-4 transition-all duration-300 ease-in-out">
            <div className="relative">
              <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* User List */}
        <UserList
          users={filteredUsers}
          onEdit={handleEdit}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* User Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
            <UserForm
              user={selectedUser}
              onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
              onClose={() => {
                setShowForm(false);
                setSelectedUser(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;