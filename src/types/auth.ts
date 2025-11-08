export interface User {
  username: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user?: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  authState: AuthState;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
  isAuthenticated: () => boolean;
}
