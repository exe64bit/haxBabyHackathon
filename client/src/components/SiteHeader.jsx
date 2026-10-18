import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ThemeToggle } from './ThemeToggle.jsx';
import { SoundToggle } from './SoundToggle.jsx';
import { User, LogIn, Menu, X, Sparkles, Compass, BookOpen, Bookmark, MessageSquare, Wrench, Heart } from 'lucide-react';

export const SiteHeader = ({ audio }) => {
  const { user, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const scrollTo = (id) => {
    setMobileOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand-link" aria-label="Pip's Midnight Observatory Home">
          <img
            src="/images/pip_portrait.png"
            alt="Pip portrait"
            className="brand-avatar"
            onError={(e) => {
              e.currentTarget.src = '/images/pip_avatar_cloud.png';
            }}
          />
          <div className="brand-text">
            <h1>Pip’s Observatory</h1>
            <span className="brand-subtitle">JUNIOR DREAM ENGINEER</span>
          </div>
        </Link>

        {/* Desktop Navigation (>= 960px) */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <button type="button" className="nav-link" onClick={() => scrollTo('about')}>
            About Pip
          </button>
          <button type="button" className="nav-link" onClick={() => scrollTo('projects')}>
            Inventions
          </button>
          <button type="button" className="nav-link" onClick={() => scrollTo('story')}>
            Story
          </button>
          <button type="button" className="nav-link" onClick={() => scrollTo('dream-map')}>
            Dream Map
          </button>
          <button type="button" className="nav-link" onClick={() => scrollTo('collection')}>
            Album
          </button>
          <button type="button" className="nav-link" onClick={() => scrollTo('guestbook')}>
            Guestbook
          </button>
        </nav>

        {/* Right side controls */}
        <div className="header-controls">
          {audio && (
            <div className="header-audio-btn">
              <SoundToggle isMuted={audio.isMuted} toggleMute={audio.toggleMute} />
            </div>
          )}

          <ThemeToggle />

          {/* Desktop/Tablet account button */}
          <div className="header-account-desktop">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="btn-primary header-user-btn"
                title="View your collected dream album and account"
              >
                <User size={15} />
                <span className="header-username">{user.nickname}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="btn-secondary header-login-btn"
              >
                <LogIn size={15} />
                <span>Log In</span>
              </Link>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="control-icon-btn menu-toggle-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Responsive Overlay for mobile & small tablet) */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-drawer-header">
          <span className="sticker sticker-peach">★ MIDNIGHT NURSERY MAP</span>
          <button
            type="button"
            className="control-icon-btn mobile-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mobile-drawer-links">
          <button type="button" className="mobile-nav-link" onClick={() => scrollTo('about')}>
            <Heart size={16} color="var(--color-orange)" />
            <span>About Pip</span>
          </button>
          <button type="button" className="mobile-nav-link" onClick={() => scrollTo('projects')}>
            <Wrench size={16} color="var(--color-yellow)" />
            <span>Inventions &amp; Workshop</span>
          </button>
          <button type="button" className="mobile-nav-link" onClick={() => scrollTo('story')}>
            <BookOpen size={16} color="var(--color-peach)" />
            <span>Origin Storybook</span>
          </button>
          <button type="button" className="mobile-nav-link" onClick={() => scrollTo('dream-map')}>
            <Compass size={16} color="var(--color-mint)" />
            <span>Dream Radar Map</span>
          </button>
          <button type="button" className="mobile-nav-link" onClick={() => scrollTo('collection')}>
            <Bookmark size={16} color="var(--color-powder-blue)" />
            <span>Sticker Album</span>
          </button>
          <button type="button" className="mobile-nav-link" onClick={() => scrollTo('guestbook')}>
            <MessageSquare size={16} color="var(--color-lavender)" />
            <span>Visitor Guestbook</span>
          </button>
        </div>

        {/* Mobile Account & Quick Controls Section */}
        <div className="mobile-drawer-footer">
          {isAuthenticated ? (
            <Link
              to="/profile"
              className="btn-primary mobile-account-btn"
              onClick={() => setMobileOpen(false)}
            >
              <User size={16} />
              <span>Pass: {user.nickname} (My Album)</span>
            </Link>
          ) : (
            <div className="mobile-auth-actions">
              <Link
                to="/login"
                className="btn-primary"
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.9rem' }}
                onClick={() => setMobileOpen(false)}
              >
                <LogIn size={15} />
                <span>Log In</span>
              </Link>
              <Link
                to="/register"
                className="btn-secondary"
                style={{ flex: 1, padding: '10px 14px', fontSize: '0.9rem' }}
                onClick={() => setMobileOpen(false)}
              >
                <span>Register Pass</span>
              </Link>
            </div>
          )}

          <div className="mobile-quick-toggles">
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--font-retro)', color: 'var(--text-muted)' }}>
              OBSERVATORY AMBIANCE:
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {audio && (
                <SoundToggle isMuted={audio.isMuted} toggleMute={audio.toggleMute} />
              )}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
