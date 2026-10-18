import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { RetroWindow } from '../components/RetroWindow.jsx';
import { UserPlus, AlertCircle } from 'lucide-react';

export const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (nickname.trim().length < 2) {
      setErrorMsg('Nickname must be at least 2 characters long.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setSubmitting(true);

    try {
      await register(nickname.trim(), email.trim(), password);
      navigate('/profile');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please check your details.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '480px' }}>
      <RetroWindow title="REGISTER_STARRY_PASS.EXE" tag="NEW RECRUIT">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>⭐ 🍼 ☁️</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)' }}>
            Join Midnight Nursery!
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Create your account to permanently collect dream stickers and save your favorite lullabies.
          </p>
        </div>

        {errorMsg && (
          <div className="alert-banner alert-error">
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="guestbook-input-group">
            <label className="guestbook-label" htmlFor="reg-nickname">
              Choose a Nickname
            </label>
            <input
              id="reg-nickname"
              type="text"
              className="guestbook-input"
              placeholder="e.g. StarGazer_Pip"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              minLength={2}
              maxLength={30}
              required
            />
          </div>

          <div className="guestbook-input-group">
            <label className="guestbook-label" htmlFor="reg-email">
              Email Address
            </label>
            <input
              id="reg-email"
              type="email"
              className="guestbook-input"
              placeholder="you@midnight.nursery"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="guestbook-input-group">
            <label className="guestbook-label" htmlFor="reg-password">
              Password (min 6 characters)
            </label>
            <input
              id="reg-password"
              type="password"
              className="guestbook-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
            disabled={submitting}
          >
            <UserPlus size={15} />
            <span>{submitting ? 'Creating Pass...' : 'Create Starry Pass'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Already have an account? </span>
          <Link to="/login" style={{ fontWeight: 700 }}>
            Log in here!
          </Link>
        </div>
      </RetroWindow>
    </div>
  );
};

