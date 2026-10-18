import React, { useState } from 'react';
import { Lightbulb, LightbulbOff } from 'lucide-react';

export const Nightlight = () => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="nightlight-box">
      <div className={`lantern-glow-stage ${isOn ? 'on' : ''}`}>
        <img
          src="/images/pip_dream_lantern.png"
          alt="Pip's glowing bedtime dream lantern"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'contain',
            filter: isOn
              ? 'drop-shadow(0 0 16px rgba(253, 216, 72, 0.9))'
              : 'grayscale(0.4) opacity(0.85)',
            transition: 'all 0.3s ease'
          }}
        />
      </div>

      <button
        type="button"
        className={isOn ? 'btn-primary' : 'btn-secondary'}
        onClick={() => setIsOn(!isOn)}
        aria-pressed={isOn}
        style={{ padding: '8px 18px', fontSize: '0.88rem' }}
      >
        {isOn ? (
          <>
            <LightbulbOff size={15} /> Switch Lantern Off
          </>
        ) : (
          <>
            <Lightbulb size={15} /> Turn On Cozy Glow
          </>
        )}
      </button>

      <span className="nightlight-caption">
        {isOn
          ? '🌟 Cozy amber glow active — shadows under the bed have run away!'
          : '🌙 Click to wake up the gentle firefly starlight inside the glass.'}
      </span>
    </div>
  );
};

