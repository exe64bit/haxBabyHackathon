import React, { useState } from 'react';
import { Star, CheckCircle, Compass, Send } from 'lucide-react';
import { LullabyPlayer } from './LullabyPlayer.jsx';
import { Nightlight } from './Nightlight.jsx';

export const ProjectCard = ({ project, audio }) => {
  const [routeStep, setRouteStep] = useState(0);

  const routeCheckpoints = [
    { destination: 'Cloud Castle', eta: 'On Time', altitude: '4,200 ft' },
    { destination: 'Moon Garden', eta: 'En Route', altitude: '8,900 ft' },
    { destination: 'Saturn Rings', eta: 'Scheduled', altitude: '12,000 ft' }
  ];

  const handleDispatchCloud = () => {
    setRouteStep((prev) => (prev + 1) % routeCheckpoints.length);
  };

  const currentCheckpoint = routeCheckpoints[routeStep];

  return (
    <div className="project-card">
      <div className="project-image-container">
        <img
          src={project.imageUrl}
          alt={project.title}
          onError={(e) => {
            e.currentTarget.src = '/images/pip_avatar_cloud.png';
          }}
        />
      </div>

      <div className="project-body">
        <div className="project-badge-strip">
          <span className="sticker sticker-peach">{project.category}</span>
          <span
            style={{
              fontFamily: 'var(--font-retro)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)'
            }}
          >
            {project.badge || 'PROTOTYPE 1999'}
          </span>
        </div>

        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {project.features && (
          <ul className="project-features-list">
            {project.features.map((feat, index) => (
              <li key={index} className="project-feature-item">
                <CheckCircle size={14} />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Unique interactive module based on project slug */}
        {project.slug === 'the-lullaby-lab' && audio && (
          <LullabyPlayer audio={audio} />
        )}

        {project.slug === 'nightlight-collection' && <Nightlight />}

        {project.slug === 'dream-delivery-routes' && (
          <div
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              border: '2px dashed var(--color-powder-blue)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginTop: '14px'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Compass size={16} color="var(--color-orange)" />
                <span
                  style={{
                    fontFamily: 'var(--font-retro)',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}
                >
                  NEXT FLIGHT: {currentCheckpoint.destination}
                </span>
              </div>
              <span className="sticker sticker-mint" style={{ fontSize: '0.72rem' }}>
                {currentCheckpoint.eta}
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              Cloud altitude: <strong>{currentCheckpoint.altitude}</strong> • Starlight guidance beam locked.
            </p>

            <button
              type="button"
              className="btn-mint"
              onClick={handleDispatchCloud}
              style={{ width: '100%', padding: '8px', fontSize: '0.85rem' }}
            >
              <Send size={13} /> Advance Delivery Waypoint
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

