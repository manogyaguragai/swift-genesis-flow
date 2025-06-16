
import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, checkTokenValidity, logout, initializeAuth } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const initializeRef = useRef(false);

  useEffect(() => {
    // Initialize auth state only once when component mounts
    if (!initializeRef.current) {
      initializeAuth();
      initializeRef.current = true;
    }
  }, []); // Empty dependency array - only run once

  useEffect(() => {
    // Only redirect if not loading and not authenticated
    if (!isLoading && !isAuthenticated && location.pathname !== '/login') {
      console.log('User not authenticated, redirecting to login');
      navigate('/login', { 
        state: { from: location.pathname },
        replace: true 
      });
    }
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  useEffect(() => {
    // Check token validity if user is authenticated - but avoid loops
    if (isAuthenticated && !isLoading) {
      if (!checkTokenValidity()) {
        console.log('Token validation failed, user will be redirected to login');
        logout();
        return;
      }
    }
  }, [location.pathname]); // Only check on route changes

  // Show loading or children based on auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};
