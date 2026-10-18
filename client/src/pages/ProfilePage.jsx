import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { dreamApi } from '../api/dreamApi.js';
import { RetroWindow } from '../components/RetroWindow.jsx';
import { LogOut, Bookmark, Star, Sparkles, UserCheck } from 'lucide-react';

export const ProfilePage = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const navigate = useNavigate();

  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    let mounted = true;
    const fetchCollection = async () => {
      if (isAuthenticated) {
        try {
          const res = await dreamApi.getUserCollection();
          if (mounted && res.data?.items) {
            setCollection(res.data.items);
          }
        } catch {
          // Fallback gracefully
        } finally {
          if (mounted) setLoading(false);
        }
      }
    };

    fetchCollection();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (authLoading || !user) {
    return (
      <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <p>Loading your observatory pass...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 16px', maxWidth: '800px' }}>
      <RetroWindow
        title={`OBSERVATORY_PASS_${user.nickname.toUpperCase()}.ID`}
        tag="AUTHORIZED EXPLORER"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-peach)',
                border: '3px solid var(--border-color)',
                boxShadow: 'var(--retro-shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.6rem',
                flexShrink: 0
              }}
            >
              🌟
            </div>
            <div style={{ minWidth: '180px' }}>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>
                {user.nickname}
              </h2>
              <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.78rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                {user.email} • Since {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="btn-secondary"
            onClick={handleLogout}
            style={{ padding: '8px 18px', fontSize: '0.88rem' }}
          >
            <LogOut size={15} />
            <span>Log Out</span>
          </button>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card-alt)',
            border: '2px dashed var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            marginBottom: '22px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Sparkles size={16} color="var(--color-orange)" />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--text-heading)' }}>
              Permanent Dream Album: {collection.length} Stickers Saved
            </h3>
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 0 }}>
            Every time you discover a new dream on the radar map, it is automatically cataloged in your account!
          </p>
        </div>

        <h3 style={{ fontSize: '1.2rem', marginBottom: '14px', color: 'var(--text-heading)' }}>
          Your Collected Dream Badges
        </h3>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>Fetching saved stickers...</p>
        ) : collection.length === 0 ? (
          <div
            style={{
              padding: '24px 16px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card-alt)',
              borderRadius: 'var(--radius-md)',
              border: '2px solid var(--border-color)'
            }}
          >
            <p style={{ color: 'var(--text-muted)', marginBottom: '12px' }}>
              You haven't discovered any dream stickers yet! Head over to the Radar Map to collect them.
            </p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => navigate('/#dream-map')}
            >
              Open Dream Radar Map
            </button>
          </div>
        ) : (
          <div className="sticker-album-grid">
            {collection.map((item) => (
              <div key={item.collectionId || item.dream?._id} className="album-sticker-item">
                <div
                  className="album-sticker-icon"
                  style={{ backgroundColor: item.dream?.color || 'var(--color-yellow)' }}
                >
                  <Star size={22} color="var(--color-soft-ink)" fill="var(--color-soft-ink)" />
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                  {item.dream?.title}
                </div>
                <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.7rem', color: 'var(--color-orange)' }}>
                  {item.dream?.destination}
                </span>
              </div>
            ))}
          </div>
        )}
      </RetroWindow>
    </div>
  );
};
