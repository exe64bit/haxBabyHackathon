import React from 'react';

export const Sticker = ({
  color = 'yellow',
  icon: Icon,
  children,
  rotate = 0,
  className = ''
}) => {
  return (
    <span
      className={`sticker sticker-${color} ${className}`}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      {Icon && <Icon size={14} aria-hidden="true" />}
      {children}
    </span>
  );
};

