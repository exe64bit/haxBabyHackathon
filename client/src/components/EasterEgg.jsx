import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, X } from 'lucide-react';

export const EasterEgg = ({ onPlaySound }) => {
  const [unlocked, setUnlocked] = useState(false);

  const handleSecretClick = () => {
    setUnlocked(true);

    if (onPlaySound) {
      onPlaySound();
    }

    // Trigger sweet kid-friendly star & heart confetti
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#F6C3AE', '#F0743E', '#CDBCDB', '#FDD848', '#AAD59E', '#9AB2D4']
      });
    } catch {
      // Ignored if canvas-confetti is not loaded
    }
  };

  return (
    <>
      {/* The Hidden Secret Star button in the footer or corner */}
      <button
        type="button"
        onClick={handleSecretClick}
        title="✨ A tiny twinkling secret star..."
        aria-label="Activate secret observatory star easter egg"
        style={{
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '50%',
          color: 'var(--color-yellow)',
          transition: 'transform 0.2s ease',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.3) rotate(15deg)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
      >
        <Sparkles size={18} />
      </button>

      {/* Secret Message Modal */}
      {unlocked && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="secret-dialog-title"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(20, 16, 35, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
            padding: '20px'
          }}
          onClick={() => setUnlocked(false)}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '3px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--retro-shadow-lg)',
              maxWidth: '420px',
              width: '100%',
              padding: '28px',
              textAlign: 'center',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setUnlocked(false)}
              aria-label="Close secret note"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '2px solid var(--border-color)',
                backgroundColor: 'var(--color-peach)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={16} />
            </button>

            <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>⭐ 🌙 🧸</div>
            <h3
              id="secret-dialog-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                color: 'var(--color-orange)',
                marginBottom: '10px'
              }}
            >
              Pip’s Secret Message!
            </h3>
            <p style={{ fontSize: '1.02rem', lineHeight: '1.6', color: 'var(--text-main)', marginBottom: '16px' }}>
              “Psst! You found my secret star! When the observatory gets quiet, I whisper good wishes to every sleeping child in the world. You’re doing amazing!”
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-retro)',
                fontSize: '0.8rem',
                color: 'var(--color-soft-ink)',
                backgroundColor: 'var(--color-mint)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-pill)',
                border: '2px solid var(--border-color)'
              }}
            >
              <Heart size={14} fill="#F0743E" color="#F0743E" /> Junior Dream Engineer Certified
            </div>
          </div>
        </div>
      )}
    </>
  );
};

