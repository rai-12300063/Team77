import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole, allowedRoles }) => {
  const { user, loading, isAuthenticated, hasRole } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You must be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <p className="text-sm text-gray-600 mt-2">Required role: {requiredRole}</p>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <p className="text-sm text-gray-600 mt-2">Allowed roles: {allowedRoles.join(', ')}</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;