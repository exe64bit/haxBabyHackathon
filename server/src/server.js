import app from './app.js';
import { config, validateEnv } from './config/env.js';
import { connectDatabase } from './config/database.js';
import mongoose from 'mongoose';

validateEnv();

const startServer = async () => {
  // Attempt connection to MongoDB if URI is configured
  await connectDatabase();

  const server = app.listen(config.port, () => {
    console.log(`
  🌙 ⭐ ✨ ---------------------------------------------------- ✨ ⭐ 🌙
     PIP'S MIDNIGHT OBSERVATORY — BACKEND API
  🌙 ⭐ ✨ ---------------------------------------------------- ✨ ⭐ 🌙
  🚀 Port:            http://localhost:${config.port}
  🌍 Client URL:      ${config.clientUrl}
  🩺 Health check:    http://localhost:${config.port}/api/health
  ⚙️  Environment:     ${config.nodeEnv}
  📦 Database:        ${config.mongodbUri ? 'Configured' : 'Missing MONGODB_URI in server/.env'}
  -------------------------------------------------------------
    `);
  });

  // Graceful shutdown
  const shutdown = async (signal) => {
    console.log(`\n🛑 Received ${signal}. Closing Observatory gently...`);
    server.close(async () => {
      console.log('💤 Express server closed.');
      if (mongoose.connection.readyState === 1) {
        await mongoose.connection.close();
        console.log('🌙 MongoDB connection closed.');
      }
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
};

startServer();

