import React from 'react';
import { Sparkles, AlertTriangle } from 'lucide-react';

export const LoadingState = ({ message = 'Polishing the telescope lens...' }) => {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✨ 🔭 🌙</div>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-heading)' }}>
        {message}
      </p>
      <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.8rem' }}>
        LOADING STARDUST DATA...
      </span>
    </div>
  );
};

export const ErrorState = ({ message = 'Something went cloudy in the night sky.', onRetry }) => {
  return (
    <div
      style={{
        padding: '40px 20px',
        textAlign: 'center',
        backgroundColor: 'var(--bg-card)',
        border: '2px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        maxWidth: '500px',
        margin: '40px auto'
      }}
    >
      <AlertTriangle size={36} color="var(--color-orange)" style={{ marginBottom: '12px' }} />
      <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'var(--text-heading)' }}>
        Observatory Telescope Glitch
      </h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{message}</p>
      {onRetry && (
        <button type="button" className="btn-primary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

