import React, { useState, useEffect } from 'react';
import { visitorApi } from '../api/visitorApi.js';

export const VisitorCounter = () => {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchCounter = async () => {
      try {
        const res = await visitorApi.getVisitorCount();
        if (mounted && res.data?.totalVisits !== undefined) {
          setCount(res.data.totalVisits);
          setIsOffline(Boolean(res.data.isOffline));
        }
      } catch {
        if (mounted) {
          setCount(1999);
          setIsOffline(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCounter();

    return () => {
      mounted = false;
    };
  }, []);

  // Format count into 6 digits with leading zeros
  const displayDigits = (count ?? 1999)
    .toString()
    .padStart(6, '0')
    .split('');

  return (
    <div className="visitor-odometer-container" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
      <div className="odometer-box" title={`Total Observatory Explorers: ${count ?? 1999}`}>
        {loading ? (
          <span style={{ color: 'var(--color-yellow)', fontFamily: 'var(--font-retro)', fontSize: '0.85rem' }}>
            CONNECTING...
          </span>
        ) : (
          displayDigits.map((digit, idx) => (
            <span key={idx} className="odometer-digit" aria-label={`Digit ${digit}`}>
              {digit}
            </span>
          ))
        )}
      </div>
      <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        {isOffline ? '★ STARRY VISITORS (OFFLINE)' : '★ TOTAL OBSERVATORY VISITORS'}
      </span>
    </div>
  );
};

