import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { useDreamAudio } from './hooks/useDreamAudio.js';
import { SiteHeader } from './components/SiteHeader.jsx';
import { SiteFooter } from './components/SiteFooter.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import './app.css';

export const App = () => {
  const audio = useDreamAudio();

  // Gentle sparkle trail on desktop pointer movement (disabled on touch / reduced-motion)
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let lastSparkleTime = 0;
    const handlePointerMove = (e) => {
      const now = Date.now();
      if (now - lastSparkleTime < 120) return; // throttle sparkle generation
      lastSparkleTime = now;

      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-particle';
      sparkle.innerHTML = '✦';
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;
      sparkle.style.position = 'fixed';
      sparkle.style.pointerEvents = 'none';
      sparkle.style.zIndex = '9999';
      sparkle.style.color = '#FDD848';
      sparkle.style.fontSize = '14px';
      sparkle.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      sparkle.style.transform = `translate(-50%, -50%) scale(1) rotate(${Math.random() * 60 - 30}deg)`;
      sparkle.style.opacity = '0.9';

      document.body.appendChild(sparkle);

      requestAnimationFrame(() => {
        sparkle.style.transform = `translate(-50%, -80%) scale(0.3) rotate(${Math.random() * 120}deg)`;
        sparkle.style.opacity = '0';
      });

      setTimeout(() => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      }, 650);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="app-container">
            <SiteHeader audio={audio} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<HomePage audio={audio} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <SiteFooter onPlaySound={audio.playEasterEggSound} />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

