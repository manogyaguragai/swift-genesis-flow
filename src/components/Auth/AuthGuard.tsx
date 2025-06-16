
import React, { useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { checkTokenValidity, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check token validity on mount and navigation - but only if authenticated
    if (isAuthenticated) {
      if (!checkTokenValidity()) {
        console.log('Token validation failed, user will be redirected to login');
        logout();
        navigate('/login', { 
          state: { from: location.pathname },
          replace: true 
        });
      }
    }
  }, [location.pathname]); // Removed isAuthenticated from dependencies to prevent loops

  useEffect(() => {
    // Set up token validity check interval only if authenticated
    if (isAuthenticated) {
      intervalRef.current = setInterval(() => {
        if (!checkTokenValidity()) {
          console.log('Token expired, redirecting to login');
          logout();
          navigate('/login', { 
            state: { from: location.pathname },
            replace: true 
          });
        }
      }, 60000); // Check every minute
    }

    // Cleanup interval when component unmounts or auth state changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAuthenticated]); // Only depend on isAuthenticated

  return <>{children}</>;
};
