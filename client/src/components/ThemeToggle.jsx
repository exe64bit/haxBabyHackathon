import React from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle = () => {
  const { isNight, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="control-icon-btn"
      onClick={toggleTheme}
      title={isNight ? 'Switch to Warm Daytime mode' : 'Switch to Cozy Starlight Night mode'}
      aria-label={isNight ? 'Switch to Warm Daytime mode' : 'Switch to Cozy Starlight Night mode'}
    >
      {isNight ? (
        <Sun size={18} color="#FDD848" />
      ) : (
        <Moon size={18} color="#F0743E" />
      )}
    </button>
  );
};

