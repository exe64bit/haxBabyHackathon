import React from 'react';

export const RetroWindow = ({
  title = 'OBSERVATORY_TERMINAL.EXE',
  tag = 'PIP-OS 1999',
  children,
  className = ''
}) => {
  return (
    <div className={`retro-window ${className}`}>
      <div className="retro-window-header">
        <div className="window-dots" aria-hidden="true">
          <span className="window-dot dot-red"></span>
          <span className="window-dot dot-yellow"></span>
          <span className="window-dot dot-green"></span>
        </div>
        <div className="window-title">{title}</div>
        <div className="window-tag">{tag}</div>
      </div>
      <div className="retro-window-body">{children}</div>
    </div>
  );
};

