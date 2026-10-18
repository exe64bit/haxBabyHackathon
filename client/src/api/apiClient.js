/**
 * Centralized API client for Pip's Midnight Observatory
 * Configured with session credentials and consistent error normalization
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export class ApiError extends Error {
  constructor(message, status, errors = []) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

export const request = async (endpoint, options = {}) => {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const config = {
    ...options,
    headers,
    credentials: 'include' // Send session cookie across requests
  };

  try {
    const res = await fetch(url, config);
    let data = {};
    
    try {
      data = await res.json();
    } catch {
      data = { message: 'Unexpected response from the observatory' };
    }

    if (!res.ok) {
      throw new ApiError(
        data.message || `Request failed with status ${res.status}`,
        res.status,
        data.errors || []
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // Network or connection failure
    throw new ApiError(
      'Could not connect to Pip’s Observatory server. Please check your connection.',
      0,
      ['NETWORK_ERROR']
    );
  }
};

