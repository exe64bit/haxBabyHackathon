import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const SoundToggle = ({ isMuted, toggleMute }) => {
  return (
    <button
      type="button"
      className="control-icon-btn"
      onClick={toggleMute}
      title={isMuted ? 'Unmute observatory sounds' : 'Mute observatory sounds'}
      aria-label={isMuted ? 'Unmute observatory sounds' : 'Mute observatory sounds'}
    >
      {isMuted ? (
        <VolumeX size={18} color="#FF6B6B" />
      ) : (
        <Volume2 size={18} color="#AAD59E" />
      )}
    </button>
  );
};

