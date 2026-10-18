import React from 'react';
import { Sparkles, MapPin, Compass, ArrowDown } from 'lucide-react';
import { Sticker } from './Sticker.jsx';

export const HeroSection = () => {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <Sparkles size={15} color="#F0743E" />
              <span>OFFICIAL MIDNIGHT NURSERY PORTFOLIO • 1999</span>
            </div>

            <h1 className="hero-title">
              Small baby. <br />
              <span className="highlight">BIG DREAMS!</span> 🌙
            </h1>

            <p className="hero-description">
              Welcome to my little observatory, where stars become lullabies and every sleepy creature gets a dream of its own.
            </p>

            <div className="hero-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={() => scrollTo('projects')}
              >
                <span>Explore Inventions</span>
                <ArrowDown size={16} />
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => scrollTo('dream-map')}
              >
                <Compass size={16} />
                <span>Meet My Dreams</span>
              </button>
            </div>

            <div className="hero-status-strip">
              <span className="status-beacon" aria-hidden="true"></span>
              <span>DREAM DISPATCH RADAR: ONLINE &amp; STARRY</span>
            </div>
          </div>

          <div className="hero-art-wrapper">
            <div className="hero-cloud-backdrop" aria-hidden="true"></div>

            <Sticker
              color="yellow"
              rotate={-6}
              className="floating-sticker sticker-top-left"
            >
              ⭐ Junior Dream Engineer
            </Sticker>

            <img
              src="/images/pip_avatar_cloud.png"
              alt="Pip floating on a cozy dream cloud waving a tiny hand"
              className="hero-pip-image"
              onError={(e) => {
                e.currentTarget.src = '/images/pip_portrait.png';
              }}
            />

            <Sticker
              color="peach"
              rotate={4}
              className="floating-sticker sticker-bottom-right"
            >
              ☁️ Cloud Navigator
            </Sticker>
          </div>
        </div>
      </div>
    </section>
  );
};

