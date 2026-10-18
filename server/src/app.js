import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { config } from './config/env.js';
import { isDatabaseConnected } from './config/database.js';
import { generalLimiter } from './middleware/rateLimiters.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import dreamRoutes from './routes/dreamRoutes.js';
import guestbookRoutes from './routes/guestbookRoutes.js';
import visitorRoutes from './routes/visitorRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();

// Trust reverse proxy (required for secure cookies and rate-limiting on Render / Heroku / proxies)
app.set('trust proxy', 1);

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow client scripts, styles, and fonts in dev/prod
    crossOriginEmbedderPolicy: false
  })
);

// CORS configuration - allows client origin, localhost, Render domain, and same-origin requests
const allowedOrigins = [
  config.clientUrl,
  'http://localhost:5173',
  'http://localhost:5000'
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like same-origin, mobile apps, or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.endsWith('.onrender.com')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Request parsing
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));
app.use(cookieParser());

// Request logging (skip in test environment)
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// General API rate limiter
app.use('/api', generalLimiter);

// Configure Session Store
const sessionConfig = {
  name: config.sessionName,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: config.isProd,
    sameSite: 'lax', // 'lax' is ideal for single-server same-origin deployment
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
};

if (config.mongodbUri && config.nodeEnv !== 'test') {
  sessionConfig.store = MongoStore.create({
    mongoUrl: config.mongodbUri,
    collectionName: 'sessions',
    ttl: 7 * 24 * 60 * 60,
    touchAfter: 24 * 3600,
    autoRemove: 'native'
  });
}

app.use(session(sessionConfig));

// ----------------------
// HEALTH CHECK ENDPOINT
// ----------------------
app.get('/api/health', (req, res) => {
  const dbConnected = isDatabaseConnected();
  const statusCode = req.query.requireDb === 'true' && !dbConnected ? 503 : 200;

  res.status(statusCode).json({
    success: true,
    message: 'Pip’s Midnight Observatory API is shining ✨',
    data: {
      status: 'operational',
      environment: config.nodeEnv,
      database: dbConnected ? 'connected' : 'disconnected',
      databaseConfigured: Boolean(config.mongodbUri),
      uptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString()
    }
  });
});

// ----------------------
// API ROUTES
// ----------------------
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dreams', dreamRoutes);
app.use('/api/guestbook', guestbookRoutes);
app.use('/api/visitors', visitorRoutes);

// ----------------------
// SERVE STATIC FRONTEND (SINGLE-SERVER DEPLOYMENT ON RENDER)
// ----------------------
if (fs.existsSync(clientDistPath)) {
  console.log(`📦 [SERVER] Serving compiled frontend from ${clientDistPath}`);
  app.use(express.static(clientDistPath));

  // SPA fallback for non-API client routes
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// ----------------------
// ERROR HANDLING (API 404 and Error Handler)
// ----------------------
app.use(notFound);
app.use(errorHandler);

export default app;
