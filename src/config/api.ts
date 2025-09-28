// API Configuration
export const API_CONFIG = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001',
  API_KEY: import.meta.env.VITE_API_KEY || 'AIzaSyAfn2WAU-RR0bmbdclaK3K5U4ZB1WH1PkQ',
} as const;

// Helper function to check if backend is configured
export const isBackendConfigured = (): boolean => {
  return !!API_CONFIG.BACKEND_URL && API_CONFIG.BACKEND_URL.trim() !== '';
};

// Helper function to get backend URL
export const getBackendUrl = (): string => {
  if (!isBackendConfigured()) {
    throw new Error('Backend URL is not configured. Please set VITE_BACKEND_URL in your environment variables.');
  }
  return API_CONFIG.BACKEND_URL;
};

// Helper function to get API key
export const getApiKey = (): string => {
  return API_CONFIG.API_KEY;
};
