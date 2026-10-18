import { request } from './apiClient.js';

export const authApi = {
  getMe: () => request('/auth/me'),

  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  register: (nickname, email, password) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ nickname, email, password })
    }),

  logout: () =>
    request('/auth/logout', {
      method: 'POST'
    })
};

