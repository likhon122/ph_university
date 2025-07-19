import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { getCurrentUser } from '../store/slices/userSlice';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, token } = useSelector((state: RootState) => state.auth);
  const { currentUser, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isAuthenticated && token && !currentUser) {
      dispatch(getCurrentUser());
    }
  }, [isAuthenticated, token, currentUser, dispatch]);

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  if (loading && !currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;