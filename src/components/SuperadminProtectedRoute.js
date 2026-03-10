import React from 'react';
import { Navigate } from 'react-router-dom';

export default function SuperadminProtectedRoute({ children }) {
  // Check if our mock auth token exists in localStorage
  const isAuthenticated = localStorage.getItem('isSuperadminAuth') === 'true';

  // If they are NOT authenticated, kick them back to the hidden login page
  if (!isAuthenticated) {
    return <Navigate to="/system-root-access" replace />;
  }

  // If they ARE authenticated, allow them to view the page (the 'children')
  return children;
}