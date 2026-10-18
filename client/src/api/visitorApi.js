import { request } from './apiClient.js';

export const visitorApi = {
  getVisitorCount: () => request('/visitors')
};

