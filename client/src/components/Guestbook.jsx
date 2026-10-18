import React, { useState, useEffect } from 'react';
import { guestbookApi } from '../api/guestbookApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import { MessageSquare, Send, Sparkles, AlertCircle, CheckCircle } from 'lucide-react';

const STICKER_ICONS = {
  star: '⭐',
  cloud: '☁️',
  moon: '🌙',
  rocket: '🚀',
  heart: '💖',
  lantern: '🏮'
};

export const Guestbook = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [nickname, setNickname] = useState(user?.nickname || '');
  const [message, setMessage] = useState('');
  const [selectedSticker, setSelectedSticker] = useState('star');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync nickname if user logs in
  useEffect(() => {
    if (user?.nickname && !nickname) {
      setNickname(user.nickname);
    }
  }, [user]);

  const loadEntries = async () => {
    try {
      setLoading(true);
      const res = await guestbookApi.getGuestbookEntries(1, 25);
      if (res.data?.entries) {
        setEntries(res.data.entries);
      }
    } catch {
      // Offline fallback
      setEntries([
        {
          _id: 'default-1',
          nickname: 'Sleepy Bunny',
          message: 'The Lullaby music box put me to sleep in two minutes flat! Thank you Pip! 🐰',
          sticker: 'moon',
          createdAt: new Date().toISOString()
        },
        {
          _id: 'default-2',
          nickname: 'Starlight Owl',
          message: 'Hoo hoo! The bedside lantern is the coziest thing in the midnight forest.',
          sticker: 'lantern',
          createdAt: new Date().toISOString()
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedNick = nickname.trim();
    const trimmedMsg = message.trim();

    if (trimmedNick.length < 2 || trimmedNick.length > 40) {
      setFeedback({
        type: 'error',
        message: 'Nickname must be between 2 and 40 characters.'
      });
      return;
    }

    if (trimmedMsg.length < 2 || trimmedMsg.length > 500) {
      setFeedback({
        type: 'error',
        message: 'Message must be between 2 and 500 characters long.'
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await guestbookApi.createGuestbookEntry(
        trimmedNick,
        trimmedMsg,
        selectedSticker
      );

      setFeedback({
        type: 'success',
        message: res.message || 'Your note was pinned to Pip’s corkboard! 📌'
      });
      setMessage('');
      // Prepend new entry
      if (res.data?.entry) {
        setEntries((prev) => [res.data.entry, ...prev]);
      }
    } catch (err) {
      setFeedback({
        type: 'error',
        message: err.message || 'Could not post note right now. Database might be resting!'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="guestbook" className="section container">
      <div className="section-header">
        <span className="section-tag">
          <MessageSquare size={14} style={{ display: 'inline', verticalAlign: '-2px' }} /> Observatory Corkboard
        </span>
        <h2 className="section-title">Leave Pip a Sweet Note</h2>
        <p className="section-subtitle">
          Say hello, leave a bedtime wish, or send a star sticker across the midnight sky.
        </p>
      </div>

      <div className="guestbook-grid">
        {/* Form Card */}
        <div className="guestbook-form-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '14px', color: 'var(--text-heading)' }}>
            Write a Postcard 💌
          </h3>

          {feedback && (
            <div className={`alert-banner alert-${feedback.type}`}>
              {feedback.type === 'success' ? (
                <CheckCircle size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="guestbook-input-group">
              <label className="guestbook-label" htmlFor="gb-nickname">
                Your Nickname
              </label>
              <input
                id="gb-nickname"
                type="text"
                className="guestbook-input"
                placeholder="e.g. Dreamer Sam"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={40}
                required
              />
            </div>

            <div className="guestbook-input-group">
              <label className="guestbook-label" htmlFor="gb-message">
                Your Sleepy Message
              </label>
              <textarea
                id="gb-message"
                className="guestbook-textarea"
                placeholder="What did you dream about last night?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                required
              ></textarea>
            </div>

            <div className="guestbook-input-group">
              <label className="guestbook-label">Pick a Stamp Sticker</label>
              <div className="sticker-picker-row">
                {Object.entries(STICKER_ICONS).map(([key, emoji]) => (
                  <button
                    key={key}
                    type="button"
                    className={`sticker-option-btn ${selectedSticker === key ? 'selected' : ''}`}
                    onClick={() => setSelectedSticker(key)}
                  >
                    <span>{emoji}</span> {key}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', marginTop: '10px' }}
              disabled={submitting}
            >
              <Send size={15} />
              <span>{submitting ? 'Pinning Note...' : 'Pin to Corkboard'}</span>
            </button>
          </form>
        </div>

        {/* Entries Stream */}
        <div className="guestbook-entries-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-heading)' }}>
              Recent Messages ({entries.length})
            </h3>
            <button
              type="button"
              onClick={loadEntries}
              className="btn-secondary"
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              🔄 Refresh Notes
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              Gathering starlight messages... ✨
            </div>
          ) : entries.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              The corkboard is waiting for its first note! Be the first to write to Pip!
            </div>
          ) : (
            entries.map((entry) => (
              <div key={entry._id} className="guestbook-entry-card">
                <div className="entry-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>
                      {STICKER_ICONS[entry.sticker] || '⭐'}
                    </span>
                    <span className="entry-nickname">{entry.nickname}</span>
                  </div>
                  <span className="entry-time">
                    {new Date(entry.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="entry-message">{entry.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

