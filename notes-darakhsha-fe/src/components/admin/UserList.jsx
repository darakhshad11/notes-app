import { useState } from 'react';
import { 
  HiPencil, 
  HiTrash, 
  HiBadgeCheck, 
  HiUser, 
  HiSearch, 
  HiSortAscending,
  HiExclamation,
  HiInformationCircle 
} from 'react-icons/hi';
import { formatDate, getInitials, timeAgo } from '../../utils/helpers';

const UserDetailModal = ({ user, onClose, onEdit, onDelete }) => {
  const handleDeleteClick = (userId, isAdmin) => {
    if (isAdmin) return;
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <HiInformationCircle className="h-6 w-6" />
            </button>
          </div>

          {/* User Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium text-lg">
                  {getInitials(user.name)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.isAdmin
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.isAdmin ? (
                    <>
                      <HiBadgeCheck className="mr-1 h-4 w-4" />
                      Admin
                    </>
                  ) : (
                    <>
                      <HiUser className="mr-1 h-4 w-4" />
                      User
                    </>
                  )}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Created</p>
                <p className="text-sm text-gray-900">{formatDate(user.createdAt)}</p>
              </div>
            </div>

            {user.lastLogin && (
              <div>
                <p className="text-sm text-gray-500">Last Login</p>
                <p className="text-sm text-gray-900">{timeAgo(user.lastLogin)}</p>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-500 mb-2">Actions</p>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="flex-1 flex items-center justify-center p-2 bg-primary-50 text-primary-600 rounded-md hover:bg-primary-100"
                >
                  <HiPencil className="h-5 w-5 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(user._id, user.isAdmin)}
                  className={`flex-1 flex items-center justify-center p-2 rounded-md 
                    ${user.isAdmin 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  disabled={user.isAdmin}
                >
                  {user.isAdmin ? (
                    <HiExclamation className="h-5 w-5 mr-2" />
                  ) : (
                    <HiTrash className="h-5 w-5 mr-2" />
                  )}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserList = ({ users, onEdit, onDelete }) => {
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredUser, setHoveredUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleDeleteClick = (userId, isAdmin) => {
    if (isAdmin) return;
    if (window.confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
    }
  };

  const ThHeader = ({ label, sortKey }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSort(sortKey)}
    >
      <div className="flex items-center space-x-1">
        <span>{label}</span>
        {sortConfig.key === sortKey && (
          <HiSortAscending className={`w-4 h-4 ${
            sortConfig.direction === 'desc' ? 'transform rotate-180' : ''
          }`} />
        )}
      </div>
    </th>
  );

  return (
    <div>
      {/* Mobile View */}
      <div className="block md:hidden">
        {sortedUsers.map((user) => (
          <div 
            key={user._id} 
            className="bg-white shadow rounded-lg p-4 mb-4 flex justify-between items-center"
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-600 font-medium text-lg">
                  {getInitials(user.name)}
                </span>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">{user.name}</h3>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.isAdmin
                    ? 'bg-primary-100 text-primary-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.isAdmin ? 'Admin' : 'User'}
                </span>
              </div>
            </div>
            <HiInformationCircle className="h-6 w-6 text-gray-400" />
          </div>
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <ThHeader label="User" sortKey="name" />
                <ThHeader label="Email" sortKey="email" />
                <ThHeader label="Role" sortKey="isAdmin" />
                <ThHeader label="Created At" sortKey="createdAt" />
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedUsers.map((user) => (
                <tr 
                  key={user._id} 
                  className="hover:bg-gray-50 transition-colors duration-150"
                  onMouseEnter={() => setHoveredUser(user._id)}
                  onMouseLeave={() => setHoveredUser(null)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-600 font-medium text-lg">
                          {getInitials(user.name)}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        {user.lastLogin && (
                          <div className="text-xs text-gray-500">
                            Last login: {timeAgo(user.lastLogin)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.isAdmin
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isAdmin ? (
                        <>
                          <HiBadgeCheck className="mr-1 h-4 w-4" />
                          Admin
                        </>
                      ) : (
                        <>
                          <HiUser className="mr-1 h-4 w-4" />
                          User
                        </>
                      )}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span title={formatDate(user.createdAt)}>
                      {timeAgo(user.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => onEdit(user)}
                        className={`transition-colors duration-150 ${
                          hoveredUser === user._id
                            ? 'text-primary-600'
                            : 'text-gray-400'
                        } hover:text-primary-900`}
                        title="Edit user"
                      >
                        <HiPencil className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user._id, user.isAdmin)}
                        className={`transition-colors duration-150 ${
                          user.isAdmin ? 'text-gray-300 cursor-not-allowed' :
                          hoveredUser === user._id ? 'text-red-600' : 'text-gray-400'
                        } hover:text-red-900`}
                        disabled={user.isAdmin}
                        title={user.isAdmin ? "Admin users cannot be deleted" : "Delete user"}
                      >
                        {user.isAdmin ? (
                          <HiExclamation className="h-5 w-5" />
                        ) : (
                          <HiTrash className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    </div>
  );
};

export default UserList;