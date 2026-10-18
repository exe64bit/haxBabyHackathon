import React from 'react';
import { Play, Square, Volume2, VolumeX, Music } from 'lucide-react';

export const LullabyPlayer = ({ audio }) => {
  const {
    isPlaying,
    isMuted,
    volume,
    setVolume,
    togglePlayback,
    toggleMute
  } = audio;

  return (
    <div className="lullaby-interactive-box">
      <div className="lullaby-controls-row">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            className={isPlaying ? 'btn-primary' : 'btn-yellow'}
            onClick={togglePlayback}
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            aria-label={isPlaying ? 'Stop Lullaby Music Box' : 'Play Lullaby Music Box'}
          >
            {isPlaying ? (
              <>
                <Square size={14} fill="currentColor" /> Stop Box
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" /> Wind Up Chimes
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute chimes' : 'Mute chimes'}
            style={{
              padding: '6px',
              cursor: 'pointer',
              color: isMuted ? '#FF6B6B' : 'var(--text-main)'
            }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>

        {/* Chime visualizer */}
        <div className="chime-visualizer" aria-hidden="true">
          <span className={`chime-bar ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0s' }}></span>
          <span className={`chime-bar ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.15s' }}></span>
          <span className={`chime-bar ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.3s' }}></span>
          <span className={`chime-bar ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.2s' }}></span>
          <span className={`chime-bar ${isPlaying ? 'active' : ''}`} style={{ animationDelay: '0.4s' }}></span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px',
          paddingTop: '8px',
          borderTop: '1px dashed var(--border-subtle)',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-retro)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
          <Music size={13} />
          <span>STATUS: {isPlaying ? 'PLAYING STAR CHIMES ✨' : 'RESTING (WIND-UP READY)'}</span>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)' }}>
          <span>VOL:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            aria-label="Lullaby volume"
            style={{ width: '65px', accentColor: 'var(--color-orange)', cursor: 'pointer' }}
          />
        </label>
      </div>
    </div>
  );
};

