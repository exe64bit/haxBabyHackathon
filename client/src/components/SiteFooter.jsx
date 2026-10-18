import React from 'react';
import { VisitorCounter } from './VisitorCounter.jsx';
import { EasterEgg } from './EasterEgg.jsx';
import { Heart, Sparkles, ExternalLink } from 'lucide-react';

export const SiteFooter = ({ onPlaySound }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>Pip’s Midnight Observatory 🌙</h3>
            <p className="footer-quote">
              “Made with little dreams and a lot of stardust.”
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              A friendly 1990s retro web world and character portfolio built for the Baby’s First Website hackathon.
            </p>
            <div style={{ marginTop: '16px' }}>
              <VisitorCounter />
            </div>
          </div>

          <div className="footer-col">
            <h4>Observatory Wings</h4>
            <ul className="footer-links">
              <li><a href="#about">About Pip</a></li>
              <li><a href="#projects">Inventions &amp; Projects</a></li>
              <li><a href="#story">The Legend of Pip</a></li>
              <li><a href="#dream-map">Dream Radar Map</a></li>
              <li><a href="#collection">Sticker Album</a></li>
              <li><a href="#guestbook">Visitor Guestbook</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Credits &amp; Canon</h4>
            <ul className="footer-links">
              <li>
                <a href="https://hax.baby" target="_blank" rel="noreferrer">
                  haX.baby Official Platform <ExternalLink size={12} style={{ display: 'inline' }} />
                </a>
              </li>
              <li>
                <a href="https://hax.baby/baby-problem" target="_blank" rel="noreferrer">
                  Baby’s First Website Brief <ExternalLink size={12} style={{ display: 'inline' }} />
                </a>
              </li>
              <li>Official Pip Track 1 Artwork</li>
              <li>Midnight Nursery Dream Archives</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Pip’s Midnight Observatory • Built with React, Express &amp; MongoDB
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Touch the secret star:</span>
            <EasterEgg onPlaySound={onPlaySound} />
          </div>
        </div>
      </div>
    </footer>
  );
};

