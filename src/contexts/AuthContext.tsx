import React, { createContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { AuthState, AuthContextType, LoginCredentials, User } from '../types/auth';
import { validateCredentials, clearAuthData } from '../services/authService';

const initialAuthState: AuthState = {
  isAuthenticated: false,
  isAdmin: false,
  user: undefined
};

type AuthAction = 
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        isAuthenticated: true,
        isAdmin: action.payload.role === 'admin',
        user: action.payload
      };
    case 'LOGIN_FAILURE':
      return {
        isAuthenticated: false,
        isAdmin: false,
        user: undefined
      };
    case 'LOGOUT':
      return {
        isAuthenticated: false,
        isAdmin: false,
        user: undefined
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialAuthState);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const user = await validateCredentials(credentials);
      
      if (user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  const logout = (): void => {
    clearAuthData();
    dispatch({ type: 'LOGOUT' });
  };

  const isAdmin = (): boolean => {
    return authState.isAdmin;
  };

  const isAuthenticated = (): boolean => {
    return authState.isAuthenticated;
  };

  const contextValue: AuthContextType = {
    authState,
    login,
    logout,
    isAdmin,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
