import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodbUri: process.env.MONGODB_URI || '',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  sessionSecret: process.env.SESSION_SECRET || 'pip-midnight-observatory-secret-dev-key',
  sessionName: process.env.SESSION_NAME || 'pip.sid',
  isProd: process.env.NODE_ENV === 'production'
};

export const validateEnv = () => {
  if (!config.mongodbUri) {
    console.warn(
      '\n⚠️  [DATABASE WARNING] MONGODB_URI is not set in server/.env.\n' +
      '   Database features (authentication, dream saving, guestbook, visitor count) will be unavailable\n' +
      '   until you provide a valid connection string in server/.env.\n' +
      '   GET /api/health will report { database: "disconnected" }.\n'
    );
  }
};

