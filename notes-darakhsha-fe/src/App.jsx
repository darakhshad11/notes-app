// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { getUser } from './utils/auth';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Notes from './pages/Notes';
import Admin from './pages/Admin';

// Protected Route Component
const ProtectedRoute = ({ children, isAdmin }) => {
  const { user } = useSelector(state => state.auth);
  const currentUser = user || getUser();

  console.log('ProtectedRoute User:', { user, currentUser });

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && !currentUser.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};


// Public Route Component
const PublicRoute = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  const currentUser = user || getUser();

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="notes" element={<Notes />} />
            <Route
              path="admin"
              element={
                <ProtectedRoute isAdmin>
                  <Admin />
                </ProtectedRoute>
              }
            />
            {/* Catch unmatched routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: 'green',
              },
            },
            error: {
              style: {
                background: 'red',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
