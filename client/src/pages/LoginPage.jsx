import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { RetroWindow } from '../components/RetroWindow.jsx';
import { LogIn, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/profile');
    } catch (err) {
      setErrorMsg(err.message || 'Invalid email or password.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 20px', maxWidth: '480px' }}>
      <RetroWindow title="OBSERVATORY_LOGIN.EXE" tag="SECURE KEYPAD">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{ fontSize: '2.4rem', marginBottom: '8px' }}>🌙 🔑</div>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)' }}>
            Welcome Back, Explorer!
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Log in to view your permanent dream sticker album and stats.
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
            <label className="guestbook-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="guestbook-input"
              placeholder="you@starry.world"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="guestbook-input-group">
            <label className="guestbook-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              className="guestbook-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', marginTop: '10px' }}
            disabled={submitting}
          >
            <LogIn size={15} />
            <span>{submitting ? 'Authenticating...' : 'Enter Observatory'}</span>
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>First time here? </span>
          <Link to="/register" style={{ fontWeight: 700 }}>
            Register your baby pass!
          </Link>
        </div>
      </RetroWindow>
    </div>
  );
};

