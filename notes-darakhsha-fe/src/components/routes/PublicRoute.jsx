// src/components/routes/PublicRoute.jsx
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth';

export const PublicRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return children;
};