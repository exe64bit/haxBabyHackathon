import React, { useState } from 'react';
import { Heart, Sparkles, Star, Moon, Compass, Coffee } from 'lucide-react';
import { RetroWindow } from './RetroWindow.jsx';

export const PipCharacter = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Respect reduced motion: don't compute tilt if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const traits = [
    { label: 'SPECIES', value: 'Skull Baby', icon: Heart, color: 'peach' },
    { label: 'ROLE', value: 'Junior Dream Engineer', icon: Sparkles, color: 'yellow' },
    { label: 'WORKPLACE', value: 'Midnight Nursery', icon: Moon, color: 'lavender' },
    { label: 'PERSONALITY', value: 'Sleepy, Gentle, Thoughtful', icon: Coffee, color: 'mint' },
    { label: 'FAVORITE HOBBY', value: 'Catching fallen stars', icon: Star, color: 'orange' },
    { label: 'SIGNATURE QUIRK', value: 'Whispering stories to the moon', icon: Compass, color: 'blue' }
  ];

  return (
    <section id="about" className="section container">
      <div className="section-header">
        <span className="section-tag">★ Character Dossier ★</span>
        <h2 className="section-title">Meet Pip the Skull Baby</h2>
        <p className="section-subtitle">
          “I build the dreams you fall asleep inside.”
        </p>
      </div>

      <RetroWindow
        title="CHARACTER_FILE_PIP.DOC"
        tag="AUTHORIZED PERSONNEL ONLY"
        className="profile-window"
      >
        <div className="profile-card">
          <div className="profile-portrait-box">
            <div
              className="profile-portrait-frame"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div className="tape-top" aria-hidden="true"></div>
              <img
                src="/images/pip_portrait.png"
                alt="Studio portrait of Pip, a gentle baby with a smooth skull face and cozy nightcap"
                onError={(e) => {
                  e.currentTarget.src = '/images/pip_avatar_cloud.png';
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span className="sticker sticker-mint">★ 100% NON-SCARY</span>
              <span className="sticker sticker-lavender">★ CERTIFIED COZY</span>
            </div>
          </div>

          <div className="profile-details-column">
            <h3 style={{ fontSize: '1.8rem', color: 'var(--text-heading)', marginBottom: '8px' }}>
              Hello! I’m Pip. 👋
            </h3>

            <div className="profile-bio-box">
              <p>
                I have a smooth, round skull face and big curious eyes that glow with soft golden starlight.
                I wear my favorite bedtime nightcap dotted with stars so my ideas don’t float away while I’m snoring.
              </p>
              <p style={{ marginBottom: 0 }}>
                Every evening when the dusk bell rings, I sit on my fluffy cloud, wind up my lullaby music box,
                and mix dream recipes for sleepy kittens, tired owls, and little children who need sweet thoughts.
              </p>
            </div>

            <div className="profile-traits-grid">
              {traits.map((t, idx) => {
                const IconComponent = t.icon;
                return (
                  <div key={idx} className="trait-box">
                    <span className="trait-label">
                      <IconComponent size={12} style={{ display: 'inline', verticalAlign: '-1px', marginRight: '4px' }} />
                      {t.label}
                    </span>
                    <span className="trait-value">{t.value}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </RetroWindow>
    </section>
  );
};

