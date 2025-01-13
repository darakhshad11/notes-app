// src/components/routes/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export const ProtectedRoute = ({ children, isAdmin }) => {
  const user = getUser();
  
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

