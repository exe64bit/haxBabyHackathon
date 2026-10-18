import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../api/authApi.js';
import { dreamApi } from '../api/dreamApi.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Anonymous local sticker storage
  const [localStickers, setLocalStickers] = useState(() => {
    try {
      const saved = localStorage.getItem('pip-local-stickers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Check current session
  const checkAuth = async () => {
    try {
      setLoading(true);
      const res = await authApi.getMe();
      if (res.data?.user) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Save local stickers
  useEffect(() => {
    try {
      localStorage.setItem('pip-local-stickers', JSON.stringify(localStickers));
    } catch {
      // Storage unavailable
    }
  }, [localStickers]);

  // Sync anonymous local stickers to server upon login
  const syncLocalStickers = async () => {
    if (!localStickers.length) return;
    try {
      for (const dreamId of localStickers) {
        await dreamApi.collectDream(dreamId);
      }
      setLocalStickers([]);
      localStorage.removeItem('pip-local-stickers');
    } catch {
      // Ignore background sync errors
    }
  };

  const login = async (email, password) => {
    setError(null);
    const res = await authApi.login(email, password);
    setUser(res.data.user);
    await syncLocalStickers();
    return res;
  };

  const register = async (nickname, email, password) => {
    setError(null);
    const res = await authApi.register(nickname, email, password);
    setUser(res.data.user);
    await syncLocalStickers();
    return res;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } finally {
      setUser(null);
    }
  };

  const addLocalSticker = (dreamId) => {
    if (!localStickers.includes(dreamId)) {
      setLocalStickers((prev) => [...prev, dreamId]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        refreshUser: checkAuth,
        localStickers,
        addLocalSticker,
        isAuthenticated: Boolean(user)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

