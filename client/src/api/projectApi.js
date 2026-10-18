import { request } from './apiClient.js';

export const projectApi = {
  getProjects: () => request('/projects'),
  getProjectById: (id) => request(`/projects/${id}`)
};

