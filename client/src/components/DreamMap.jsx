import React, { useState, useEffect } from 'react';
import { dreamApi } from '../api/dreamApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Sparkles, Check, Bookmark, MapPin, Compass, AlertCircle } from 'lucide-react';
import { Sticker } from './Sticker.jsx';

const DEFAULT_DREAMS = [
  {
    _id: 'seed-dream-1',
    title: 'The Cloud Castle Dream',
    slug: 'cloud-castle-dream',
    description:
      'Floating high above sleepy treetops, this castle is made of spun sugar and marshmallow pillows. Sleepers get to slide down rainbow banisters straight into bed.',
    destination: 'Cumulus Heights',
    color: '#9AB2D4',
    rarity: 'Common',
    illustration: 'cloud-castle',
    coordinates: { x: 22, y: 28 },
    deliveryStatus: 'Dispatched via Cloud Express'
  },
  {
    _id: 'seed-dream-2',
    title: 'The Moon Garden Dream',
    slug: 'moon-garden-dream',
    description:
      'A secret garden on the silver crescent where silver bellflowers ring soft chimes and sleepy bunnies sip chamomile tea with silver spoons.',
    destination: 'Crescent Crater',
    color: '#CDBCDB',
    rarity: 'Rare',
    illustration: 'moon-garden',
    coordinates: { x: 78, y: 20 },
    deliveryStatus: 'Blooming under moonbeams'
  },
  {
    _id: 'seed-dream-3',
    title: 'The Tiny Rocket Dream',
    slug: 'tiny-rocket-dream',
    description:
      'A retro wooden rocket ship fueled by bubble-tea fizz that gently orbits the planet Saturn before returning home in time for breakfast pancakes.',
    destination: 'Saturn Rings',
    color: '#F0743E',
    rarity: 'Rare',
    illustration: 'tiny-rocket',
    coordinates: { x: 80, y: 68 },
    deliveryStatus: 'Drifting at gentle orbital speed'
  },
  {
    _id: 'seed-dream-4',
    title: 'The Sleepy Dinosaur Dream',
    slug: 'sleepy-dinosaur-dream',
    description:
      'A giant pastel brontosaurus who wears a gigantic knit nightcap. Children can climb up his soft tail to read bedtime stories under the stars.',
    destination: 'Fern Valley',
    color: '#AAD59E',
    rarity: 'Common',
    illustration: 'sleepy-dinosaur',
    coordinates: { x: 20, y: 72 },
    deliveryStatus: 'Snoring softly in the moss'
  },
  {
    _id: 'seed-dream-5',
    title: 'The Rainbow Treehouse Dream',
    slug: 'rainbow-treehouse-dream',
    description:
      'A seven-story wooden treehouse wrapped in glowing fairy lights with a rope ladder, telescope balcony, and secret cookie jar.',
    destination: 'Whispering Canopy',
    color: '#F6C3AE',
    rarity: 'Legendary',
    illustration: 'rainbow-treehouse',
    coordinates: { x: 50, y: 46 },
    deliveryStatus: 'Lanterns glowing warmly'
  },
  {
    _id: 'seed-dream-6',
    title: 'The Starfish Balloon Dream',
    slug: 'starfish-balloon-dream',
    description:
      'Gliding through an ocean of deep twilight indigo, riding atop a giant friendly golden starfish balloon carrying sleepy wishes to the stars.',
    destination: 'Starlight Lagoon',
    color: '#FDD848',
    rarity: 'Cosmic',
    illustration: 'starfish-balloon',
    coordinates: { x: 48, y: 82 },
    deliveryStatus: 'Floating gently on midnight currents'
  }
];

export const DreamMap = () => {
  const { user, isAuthenticated, localStickers, addLocalSticker } = useAuth();
  const [dreams, setDreams] = useState(DEFAULT_DREAMS);
  const [selectedDream, setSelectedDream] = useState(DEFAULT_DREAMS[0]);
  const [collectedIds, setCollectedIds] = useState([]);
  const [collecting, setCollecting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // Fetch dreams from API
  useEffect(() => {
    let mounted = true;
    const loadDreams = async () => {
      try {
        const res = await dreamApi.getDreams();
        if (mounted && res.data?.dreams?.length > 0) {
          setDreams(res.data.dreams);
          setSelectedDream(res.data.dreams[0]);
        }
      } catch {
        // Fallback dreams remain active
      }
    };

    loadDreams();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch user collected dreams if authenticated
  useEffect(() => {
    let mounted = true;
    const fetchUserCollection = async () => {
      if (isAuthenticated) {
        try {
          const res = await dreamApi.getUserCollection();
          if (mounted && res.data?.items) {
            const ids = res.data.items.map((i) => i.dream?._id || i.dream);
            setCollectedIds(ids);
          }
        } catch {
          setCollectedIds(localStickers);
        }
      } else {
        setCollectedIds(localStickers);
      }
    };

    fetchUserCollection();
    return () => {
      mounted = false;
    };
  }, [isAuthenticated, localStickers]);

  const isCollected = (dream) => {
    return (
      collectedIds.includes(dream._id) ||
      collectedIds.includes(dream.slug) ||
      localStickers.includes(dream._id) ||
      localStickers.includes(dream.slug)
    );
  };

  const handleCollectDream = async () => {
    if (!selectedDream) return;

    setCollecting(true);
    setFeedback(null);

    const dreamKey = selectedDream._id || selectedDream.slug;

    if (isAuthenticated) {
      try {
        const res = await dreamApi.collectDream(dreamKey);
        setCollectedIds((prev) => [...prev, selectedDream._id]);
        setFeedback({
          type: 'success',
          message: res.message || `Saved "${selectedDream.title}" to your permanent account album! ⭐`
        });
      } catch (err) {
        addLocalSticker(dreamKey);
        setCollectedIds((prev) => [...prev, dreamKey]);
        setFeedback({
          type: 'info',
          message: `Saved "${selectedDream.title}" to your temporary sticker album (server offline).`
        });
      } finally {
        setCollecting(false);
      }
    } else {
      addLocalSticker(dreamKey);
      setCollectedIds((prev) => [...prev, dreamKey]);
      setCollecting(false);
      setFeedback({
        type: 'info',
        message: `Sticker collected locally! Log in or create an account to save it permanently.`
      });
    }
  };

  return (
    <section id="dream-map" className="section container">
      <div className="section-header">
        <span className="section-tag">
          <Compass size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Interactive Radar Map
        </span>
        <h2 className="section-title">Pip’s Dream Discovery Map</h2>
        <p className="section-subtitle">
          Click on any star beacon across the midnight sky to inspect Pip’s destination routes and collect dream stickers!
        </p>
      </div>

      {/* Quick Destination Selectors (Touch and Mobile Friendly) */}
      <div className="dream-destination-chips" aria-label="Quick destination selector">
        {dreams.map((d) => {
          const active = selectedDream?.slug === d.slug;
          const collected = isCollected(d);
          return (
            <button
              key={d.slug}
              type="button"
              className={`dest-chip ${active ? 'active' : ''}`}
              onClick={() => {
                setSelectedDream(d);
                setFeedback(null);
              }}
              style={{
                borderColor: active ? 'var(--color-orange)' : 'var(--border-color)',
                backgroundColor: active ? 'var(--color-orange)' : 'var(--bg-card)',
                color: active ? 'var(--color-white)' : 'var(--text-main)'
              }}
            >
              <span>{collected ? '⭐' : '✨'}</span>
              <span>{d.destination}</span>
            </button>
          );
        })}
      </div>

      <div className="dream-map-wrapper">
        {/* Interactive Map Visual Area */}
        <div className="dream-map-canvas-area" role="region" aria-label="Dream navigation map">
          <div className="map-radar-ring ring-1" aria-hidden="true"></div>
          <div className="map-radar-ring ring-2" aria-hidden="true"></div>
          <div className="map-radar-ring ring-3" aria-hidden="true"></div>

          {dreams.map((d) => {
            const active = selectedDream?.slug === d.slug;
            const collected = isCollected(d);
            return (
              <button
                type="button"
                key={d.slug}
                className={`destination-node ${active ? 'active' : ''}`}
                style={{
                  left: `${d.coordinates?.x ?? 50}%`,
                  top: `${d.coordinates?.y ?? 50}%`
                }}
                onClick={() => {
                  setSelectedDream(d);
                  setFeedback(null);
                }}
                title={`${d.destination}: ${d.title}`}
                aria-label={`Select ${d.title} at ${d.destination}`}
              >
                <div
                  className="node-pin"
                  style={{
                    backgroundColor: d.color || 'var(--color-yellow)'
                  }}
                >
                  {collected ? '⭐' : '✨'}
                </div>
                <span className="node-label">
                  {d.destination}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Dream Details Card */}
        <div className="dream-detail-panel">
          <div>
            <div className="dream-detail-header">
              <span className="sticker sticker-peach">DESTINATION: {selectedDream.destination}</span>
              <h3 className="dream-detail-title">{selectedDream.title}</h3>
            </div>

            <p className="dream-detail-desc">{selectedDream.description}</p>

            <div className="dream-meta-row">
              <Sticker color="yellow">Rarity: {selectedDream.rarity}</Sticker>
              <Sticker color="mint">Status: {selectedDream.deliveryStatus}</Sticker>
            </div>

            {feedback && (
              <div className={`alert-banner alert-${feedback.type}`}>
                <Sparkles size={16} />
                <span>{feedback.message}</span>
              </div>
            )}
          </div>

          <div style={{ marginTop: '20px' }}>
            <button
              type="button"
              className={isCollected(selectedDream) ? 'btn-mint' : 'btn-primary'}
              onClick={handleCollectDream}
              disabled={collecting}
              style={{ width: '100%' }}
            >
              {isCollected(selectedDream) ? (
                <>
                  <Check size={16} /> Sticker Collected in Album!
                </>
              ) : (
                <>
                  <Bookmark size={16} /> Collect This Dream Sticker
                </>
              )}
            </button>

            <p
              style={{
                fontFamily: 'var(--font-retro)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '10px'
              }}
            >
              {isAuthenticated
                ? '★ Synced with your Midnight Nursery account'
                : '★ Saved locally — Log in to keep forever'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
