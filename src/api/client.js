import { getAuth } from "firebase/auth";

// const API_BASE_URL = 'http://localhost:8000';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://basetopia-be-421858698882.us-east1.run.app';

export async function fetchWithAuth(endpoint, options = {}) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User not authenticated');
  }

  const token = await user.getIdToken();
  
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'An error occurred');
  }

  return response.json();
}

// Example API functions
export const api = {
  verifyToken: async (idToken) => {
    const response = await fetch(`${API_BASE_URL}/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken }),
    });
    return response.json();
  },

  getProtected: () => fetchWithAuth('/protected'),
  
  getUserProfile: () => fetchWithAuth('/user/profile'),
};