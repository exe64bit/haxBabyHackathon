import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { dreamApi } from '../api/dreamApi.js';
import { Bookmark, Lock, Sparkles, Star } from 'lucide-react';
import { RetroWindow } from './RetroWindow.jsx';

const ALL_DREAMS_META = [
  { slug: 'cloud-castle-dream', title: 'Cloud Castle', color: '#9AB2D4', icon: '🏰' },
  { slug: 'moon-garden-dream', title: 'Moon Garden', color: '#CDBCDB', icon: '🌙' },
  { slug: 'tiny-rocket-dream', title: 'Tiny Rocket', color: '#F0743E', icon: '🚀' },
  { slug: 'sleepy-dinosaur-dream', title: 'Sleepy Dinosaur', color: '#AAD59E', icon: '🦕' },
  { slug: 'rainbow-treehouse-dream', title: 'Rainbow Treehouse', color: '#F6C3AE', icon: '🏡' },
  { slug: 'starfish-balloon-dream', title: 'Starfish Balloon', color: '#FDD848', icon: '⭐' }
];

export const DreamCollection = () => {
  const { user, isAuthenticated, localStickers } = useAuth();
  const [unlockedSlugs, setUnlockedSlugs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchUserAlbum = async () => {
      if (isAuthenticated) {
        setLoading(true);
        try {
          const res = await dreamApi.getUserCollection();
          if (mounted && res.data?.items) {
            const slugs = res.data.items.map((i) => i.dream?.slug);
            setUnlockedSlugs(slugs);
          }
        } catch {
          // If offline, use local
          setUnlockedSlugs(localStickers);
        } finally {
          if (mounted) setLoading(false);
        }
      } else {
        setUnlockedSlugs(localStickers);
      }
    };

    fetchUserAlbum();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, localStickers]);

  const unlockedCount = ALL_DREAMS_META.filter((d) =>
    unlockedSlugs.includes(d.slug)
  ).length;

  return (
    <section id="collection" className="section container">
      <div className="section-header">
        <span className="section-tag">
          <Bookmark size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Collector’s Album
        </span>
        <h2 className="section-title">Pip’s Dream Sticker Album</h2>
        <p className="section-subtitle">
          Discovered dreams appear here as collectible stickers. Can you find all 6?
        </p>
      </div>

      <RetroWindow
        title="STICKER_ALBUM_99.EXE"
        tag={`${unlockedCount} / ${ALL_DREAMS_META.length} STICKERS FOUND`}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>
              Collection Progress: {unlockedCount} of {ALL_DREAMS_META.length} Discovered
            </h3>
            <span style={{ fontFamily: 'var(--font-retro)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {isAuthenticated
                ? `Logged in as ${user.nickname} • Permanent cloud storage active`
                : 'Browsing anonymously • Saved in local visitor memory'}
            </span>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              border: '2px solid var(--border-color)',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 16px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.88rem'
            }}
          >
            {unlockedCount === 6 ? '🏆 MASTER DREAM WEAVER' : '🔭 EXPLORATION IN PROGRESS'}
          </div>
        </div>

        <div className="sticker-album-grid">
          {ALL_DREAMS_META.map((item) => {
            const isUnlocked = unlockedSlugs.includes(item.slug);
            return (
              <div
                key={item.slug}
                className={`album-sticker-item ${isUnlocked ? '' : 'locked'}`}
              >
                <div
                  className="album-sticker-icon"
                  style={{
                    backgroundColor: isUnlocked ? item.color : 'var(--bg-card-alt)'
                  }}
                >
                  {isUnlocked ? (
                    <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                  ) : (
                    <Lock size={18} color="var(--text-muted)" />
                  )}
                </div>

                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                  {item.title}
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-retro)',
                    fontSize: '0.72rem',
                    color: isUnlocked ? 'var(--color-orange)' : 'var(--text-muted)'
                  }}
                >
                  {isUnlocked ? '★ UNLOCKED' : 'UNDISCOVERED'}
                </span>
              </div>
            );
          })}
        </div>
      </RetroWindow>
    </section>
  );
};

