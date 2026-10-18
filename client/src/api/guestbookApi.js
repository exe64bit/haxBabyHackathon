import { request } from './apiClient.js';

export const guestbookApi = {
  getGuestbookEntries: (page = 1, limit = 20) =>
    request(`/guestbook?page=${page}&limit=${limit}`),

  createGuestbookEntry: (nickname, message, sticker = 'star') =>
    request('/guestbook', {
      method: 'POST',
      body: JSON.stringify({ nickname, message, sticker })
    })
};

