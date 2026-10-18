import mongoose from 'mongoose';
import { config } from './env.js';

let isConnected = false;

// Mask URI for safe logging
const maskUri = (uri) => {
  if (!uri) return 'not configured';
  try {
    const parsed = new URL(uri);
    if (parsed.password) {
      parsed.password = '***';
    }
    return parsed.toString();
  } catch {
    return 'configured (redacted for security)';
  }
};

export const connectDatabase = async () => {
  if (!config.mongodbUri) {
    console.warn('⚠️  [MONGODB] Connection skipped: MONGODB_URI is empty. Database is in offline mode.');
    return false;
  }

  try {
    console.log(`🔌 [MONGODB] Connecting to ${maskUri(config.mongodbUri)}...`);
    
    mongoose.connection.on('connected', () => {
      isConnected = true;
      console.log('✨ [MONGODB] Successfully connected to database.');
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      console.error('❌ [MONGODB] Connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('⚠️  [MONGODB] Disconnected from database.');
    });

    await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });

    isConnected = true;
    return true;
  } catch (error) {
    isConnected = false;
    console.error('❌ [MONGODB] Failed to connect:', error.message);
    return false;
  }
};

export const isDatabaseConnected = () => {
  return mongoose.connection.readyState === 1;
};

export const checkDatabaseAvailability = (req, res, next) => {
  if (!isDatabaseConnected()) {
    return res.status(503).json({
      success: false,
      message: 'Database is currently unavailable. Please verify MONGODB_URI in server/.env.',
      errors: ['DATABASE_UNAVAILABLE']
    });
  }
  next();
};

