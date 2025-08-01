import { apiRequest } from "./queryClient";

// Types
interface User {
  id: number;
  username: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

// Store auth token in localStorage
export const setToken = (token: string) => {
  localStorage.setItem('auth_token', token);
};

// Get auth token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

// Remove auth token from localStorage
export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

// Store user data in localStorage
export const setUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

// Get user data from localStorage
export const getUser = (): User | null => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
};

// Remove user data from localStorage
export const removeUser = () => {
  localStorage.removeItem('user');
};

// Check if user is logged in
export const isAuthenticated = (): boolean => {
  return !!getToken() && !!getUser();
};

// Login user
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    // Modified to use the correct endpoint
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
      throw new Error('Login failed');
    }
    
    const data = await response.json();
    
    // Store auth data
    setToken(data.token);
    setUser(data.user);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout user
export const logout = () => {
  removeToken();
  removeUser();
  
  // Redirect to login page after logout
  window.location.href = '/admin/login';
};

// Add auth header to fetch requests
export const getAuthHeader = (): Record<string, string> => {
  const token = getToken();
  if (!token) return {};
  
  return {
    'Authorization': `Bearer ${token}`
  };
};
