import { request } from './apiClient.js';

export const dreamApi = {
  getDreams: () => request('/dreams'),
  getDreamById: (id) => request(`/dreams/${id}`),
  collectDream: (id) =>
    request(`/dreams/${id}/collect`, {
      method: 'POST'
    }),
  getUserCollection: () => request('/dreams/collection')
};

