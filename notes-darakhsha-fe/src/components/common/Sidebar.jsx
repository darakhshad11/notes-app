import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineUserGroup,
  HiOutlineLogout
} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const Sidebar = ({ isOpen, toggleSidebar, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const navigation = [
    { name: 'Dashboard', to: '/', icon: HiOutlineHome },
    { name: 'Notes', to: '/notes', icon: HiOutlineDocumentText },
    ...(user?.isAdmin ? [
      { name: 'Users', to: '/admin', icon: HiOutlineUserGroup }
    ] : []),
  ];

  return (
    <>
      {/* Sidebar for mobile and desktop */}
      <div className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white shadow-sm z-30 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:block
        pt-16 // Account for navbar height
      `}>
        <div className="h-full py-4 overflow-y-auto">
          <div className="px-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium text-gray-900">{user?.name}</div>
                <div className="text-sm text-gray-500">{user?.email}</div>
              </div>
            </div>
          </div>
          
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                onClick={() => {
                  // Close sidebar on mobile when a link is clicked
                  if (window.innerWidth < 768) {
                    toggleSidebar();
                  }
                }}
                className={({ isActive }) => `
                  group flex items-center px-2 py-2 text-base font-medium rounded-md
                  ${isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <item.icon
                  className={`mr-4 h-6 w-6 flex-shrink-0`}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
            
            {/* Logout option */}
            <button
              onClick={handleLogout}
              className="w-full text-left group flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <HiOutlineLogout
                className="mr-4 h-6 w-6 flex-shrink-0"
                aria-hidden="true"
              />
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;