import type { LoginCredentials, User } from '../types/auth';

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};

export const validateAdminCredentials = async (credentials: LoginCredentials): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (credentials.username === ADMIN_CREDENTIALS.username && 
          credentials.password === ADMIN_CREDENTIALS.password) {
        resolve({
          username: credentials.username,
          role: 'admin'
        });
      } else {
        resolve(null);
      }
    }, 100);
  });
};

export const isAdminCredentials = (credentials: LoginCredentials): boolean => {
  return credentials.username === ADMIN_CREDENTIALS.username && 
         credentials.password === ADMIN_CREDENTIALS.password;
};

export const validateCredentials = async (credentials: LoginCredentials): Promise<User | null> => {
  return await validateAdminCredentials(credentials);
};

export const clearAuthData = (): void => {
};