
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initializeDashboardStore, clearDashboardStore } from './dashboardStore';

interface User {
  email: string;
  initials: string;
  userId: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User, token: string) => void;
  checkTokenValidity: () => boolean;
  initializeAuth: () => void;
}

// Function to decode JWT and check expiry
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    const isExpired = payload.exp < currentTime;
    
    if (isExpired) {
      console.log('Token is expired. Current time:', currentTime, 'Token exp:', payload.exp);
    } else {
      const minutesLeft = Math.floor((payload.exp - currentTime) / 60);
      console.log('Token is valid. Minutes until expiry:', minutesLeft);
    }
    
    return isExpired;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,
      isInitialized: false,
      
      initializeAuth: () => {
        const { isInitialized } = get();
        
        // Prevent multiple initializations
        if (isInitialized) {
          console.log('Auth already initialized, skipping...');
          return;
        }
        
        console.log('Initializing auth state...');
        const { accessToken, user } = get();
        
        if (accessToken && user) {
          if (!isTokenExpired(accessToken)) {
            console.log('Valid token found, user is authenticated');
            set({ isAuthenticated: true, isLoading: false, isInitialized: true });
            // Initialize dashboard store for this user
            initializeDashboardStore(user.userId);
          } else {
            console.log('Token expired, clearing auth state');
            clearDashboardStore();
            set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false, isInitialized: true });
          }
        } else {
          console.log('No valid auth state found');
          clearDashboardStore();
          set({ isLoading: false, isInitialized: true });
        }
      },
      
      login: async (email: string, password: string) => {
        try {
          console.log('Attempting login for:', email);
          
          const formData = new URLSearchParams();
          formData.append('grant_type', 'password');
          formData.append('username', email);
          formData.append('password', password);
          formData.append('scope', '');
          formData.append('client_id', '');
          formData.append('client_secret', '');

          const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
          });

          if (response.ok) {
            const data = await response.json();
            const initials = email.split('@')[0].substring(0, 2).toUpperCase();
            
            console.log('Login successful, setting user and token');
            console.log('Login response data:', data);
            
            const user = { 
              email, 
              initials, 
              userId: data.user_id 
            };
            
            // Initialize dashboard store for the new user
            initializeDashboardStore(user.userId);
            
            set({
              user,
              accessToken: data.access_token,
              isAuthenticated: true,
              isLoading: false,
              isInitialized: true,
            });
            
            // Redirect to screen-candidates page after successful login
            setTimeout(() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/screen-candidates';
              }
            }, 100);
            
            return true;
          } else {
            console.error('Login failed with status:', response.status);
            set({ isLoading: false });
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        console.log('Logging out user');
        
        // Clear dashboard store before clearing auth
        clearDashboardStore();
        
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
          isInitialized: true,
        });
        
        // Redirect to homepage after logout
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      },

      setUser: (user: User, token: string) => {
        console.log('Setting user:', user.email);
        
        // Initialize dashboard store for this user
        initializeDashboardStore(user.userId);
        
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          isLoading: false,
          isInitialized: true,
        });
      },

      checkTokenValidity: () => {
        const { accessToken } = get();
        if (!accessToken) {
          console.log('No access token found');
          return false;
        }
        
        if (isTokenExpired(accessToken)) {
          console.log('Token expired');
          return false;
        }
        
        return true;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        console.log('Auth state rehydrated:', state);
        if (state && !state.isInitialized) {
          // Use a small delay to ensure proper initialization order
          requestAnimationFrame(() => {
            state.initializeAuth();
          });
        }
      },
    }
  )
);
