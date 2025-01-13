import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';
import { toast } from 'react-hot-toast';
import {
  HiOutlineMenuAlt1,
  HiOutlineBell,
  HiOutlineLogout,
  HiOutlineX,
  HiMoon,
  HiSun
} from 'react-icons/hi';
import { useDarkMode } from '../../context/DarkModeContext';

const Navbar = ({ toggleSidebar, isSidebarOpen, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Mobile menu button */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none mr-4"
            >
              {isSidebarOpen ? (
                <HiOutlineX className="h-6 w-6" /> 
              ) : (
                <HiOutlineMenuAlt1 className="h-6 w-6" />
              )}
            </button>

          
          </div>

          {/* Right side navigation */}
          <div className="flex items-center">
            {/* Dark Mode Toggle */}
              {/* App Title */}
              <Link to="/" className="flex-shrink-0 flex items-center ml-4 ">
              <span className="text-2xl font-bold text
              -primary-600">Notes App</span>
            </Link>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none mr-3"
            >
              {isDarkMode ? (
                <HiSun className="h-6 w-6" />
              ) : (
                <HiMoon className="h-6 w-6" />
              )}
            </button>

            {/* Notifications */}
            <button className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none mr-3">
              <HiOutlineBell className="h-6 w-6" />
            </button>

            {/* User dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center max-w-xs bg-white rounded-full focus:outline-none"
              >
                <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    {user?.name}
                  </div>
                  <div className="border-t border-gray-100"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <HiOutlineLogout className="mr-2 h-4 w-4" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;