import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { databaseService } from '../services/database';

// User types
export type UserType = 'customer' | 'staff' | 'partner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  type: UserType;
  isAuthenticated: boolean;
  createdAt?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  area: string;
  pincode: string;
  email: string;
  mobile: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, userType: UserType) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true

  // Save user to localStorage
  const saveUserToStorage = (userData: User) => {
    try {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('auth_timestamp', Date.now().toString());
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  };

  // Load user from localStorage
  const loadUserFromStorage = (): User | null => {
    try {
      const savedUser = localStorage.getItem('user');
      const authTimestamp = localStorage.getItem('auth_timestamp');
      
      if (!savedUser || !authTimestamp) {
        return null;
      }

      const userData = JSON.parse(savedUser);
      const timestamp = parseInt(authTimestamp);
      const now = Date.now();
      
      // Check if session is still valid (7 days instead of 24 hours for better UX)
      const sessionValid = (now - timestamp) < (7 * 24 * 60 * 60 * 1000);
      
      if (!sessionValid) {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_timestamp');
        return null;
      }

      // Validate user data structure
      if (!userData.id || !userData.email || !userData.name || !userData.type) {
        localStorage.removeItem('user');
        localStorage.removeItem('auth_timestamp');
        return null;
      }

      return userData;
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('user');
      localStorage.removeItem('auth_timestamp');
      return null;
    }
  };

  // Database-based login function
  const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      console.log('AuthContext: Attempting login for:', { email, userType });
      
      // Authenticate with database
      const dbUser = await databaseService.authenticateUser(email, password, userType);
      
      if (dbUser) {
        const user: User = {
          id: dbUser.id,
          email: dbUser.email,
          name: dbUser.name,
          type: dbUser.type as UserType,
          isAuthenticated: true,
          createdAt: dbUser.createdAt
        };
        
        console.log('AuthContext: Setting user:', user);
        setUser(user);
        saveUserToStorage(user);
        return true;
      }
      
      console.log('AuthContext: Authentication failed');
      return false;
    } catch (error) {
      console.error('AuthContext: Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      console.log('AuthContext: Attempting registration for:', { email: data.email });
      
      // Register with database
      const success = await databaseService.registerUser(data);
      
      if (success) {
        // Auto-login after successful registration
        const loginSuccess = await login(data.email, data.password, 'customer');
        return loginSuccess;
      }
      
      console.log('AuthContext: Registration failed');
      return false;
    } catch (error) {
      console.error('AuthContext: Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_timestamp');
  };

  // Check for existing user on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = loadUserFromStorage();
        
        if (savedUser) {
          // Verify user still exists in database
          try {
            const dbUser = await databaseService.getUserByEmail(savedUser.email);
            if (dbUser) {
              setUser(savedUser);
              console.log('AuthContext: Restored user session:', savedUser);
            } else {
              // User no longer exists in database
              localStorage.removeItem('user');
              localStorage.removeItem('auth_timestamp');
              setUser(null);
            }
          } catch (error) {
            console.error('Error verifying user in database:', error);
            // Keep the user logged in if database verification fails
            setUser(savedUser);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Activity monitoring to refresh session timestamp
  useEffect(() => {
    if (!user) return;

    const updateSessionTimestamp = () => {
      localStorage.setItem('auth_timestamp', Date.now().toString());
    };

    // Update timestamp on user activity
    const handleUserActivity = () => {
      updateSessionTimestamp();
    };

    // Listen for user activity events
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keypress', handleUserActivity);
    window.addEventListener('click', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    // Update timestamp every 5 minutes if user is active
    const interval = setInterval(updateSessionTimestamp, 5 * 60 * 1000);

    return () => {
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keypress', handleUserActivity);
      window.removeEventListener('click', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      clearInterval(interval);
    };
  }, [user]);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 