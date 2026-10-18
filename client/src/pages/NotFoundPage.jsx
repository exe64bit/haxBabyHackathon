import React from 'react';
import { Link } from 'react-router-dom';
import { RetroWindow } from '../components/RetroWindow.jsx';
import { Compass } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="container" style={{ padding: '80px 20px', maxWidth: '540px', textAlign: 'center' }}>
      <RetroWindow title="404_STAR_NOT_FOUND.ERR" tag="ORBIT LOST">
        <div style={{ fontSize: '3rem', marginBottom: '14px' }}>🌌 🛸 ❌</div>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '10px' }}>
          Lost Among the Cosmic Clouds
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '24px' }}>
          The observatory telescope looked everywhere in this quadrant, but this page seems to have drifted into a black hole.
        </p>
        <Link to="/" className="btn-primary">
          <Compass size={16} />
          <span>Fly Cloud Back Home</span>
        </Link>
      </RetroWindow>
    </div>
  );
};

