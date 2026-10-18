import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import { config } from '../src/config/env.js';
import { User } from '../src/models/User.js';
import { GuestbookEntry } from '../src/models/GuestbookEntry.js';
import { DreamCollection } from '../src/models/DreamCollection.js';

describe('Pip’s Midnight Observatory Live MongoDB Integration Tests', () => {
  const testUser = {
    nickname: 'StarSeeker_Test',
    email: `starseeker_${Date.now()}@hax.baby`,
    password: 'password123'
  };

  let sessionCookie = null;
  let sampleDreamSlug = null;

  before(async () => {
    if (!config.mongodbUri) {
      console.warn('Skipping live DB tests: MONGODB_URI not configured.');
      return;
    }
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(config.mongodbUri, { serverSelectionTimeoutMS: 8000 });
    }
  });

  after(async () => {
    // Clean up test user & their data
    if (mongoose.connection.readyState === 1) {
      const user = await User.findOne({ email: testUser.email });
      if (user) {
        await DreamCollection.deleteMany({ user: user._id });
        await GuestbookEntry.deleteMany({ user: user._id });
        await User.deleteOne({ _id: user._id });
      }
      await mongoose.connection.close();
    }
    setTimeout(() => process.exit(0), 200);
  });

  test('GET /api/health reports connected database status', async () => {
    const res = await request(app).get('/api/health?requireDb=true');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.database, 'connected');
  });

  test('GET /api/projects returns seeded projects', async () => {
    const res = await request(app).get('/api/projects');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.projects.length >= 3);
    const slugs = res.body.data.projects.map((p) => p.slug);
    assert.ok(slugs.includes('the-lullaby-lab'));
    assert.ok(slugs.includes('nightlight-collection'));
    assert.ok(slugs.includes('dream-delivery-routes'));
  });

  test('GET /api/dreams returns seeded dreams', async () => {
    const res = await request(app).get('/api/dreams');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.dreams.length >= 6);
    sampleDreamSlug = res.body.data.dreams[0].slug;
  });

  test('POST /api/auth/register creates a new user session', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.user.nickname, testUser.nickname);
    assert.equal(res.body.data.user.email, testUser.email);
    assert.equal(res.body.data.user.passwordHash, undefined);

    // Save session cookie
    const cookies = res.headers['set-cookie'];
    assert.ok(cookies, 'Expected session cookie to be set');
    sessionCookie = cookies;
  });

  test('POST /api/auth/register rejects duplicate registration with 409', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    assert.equal(res.status, 409);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors.includes('EMAIL_ALREADY_REGISTERED'));
  });

  test('GET /api/auth/me returns authenticated user details', async () => {
    const req = request(app).get('/api/auth/me');
    if (sessionCookie) {
      req.set('Cookie', sessionCookie);
    }
    const res = await req;
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.user?.email, testUser.email);
  });

  test('POST /api/dreams/:id/collect collects dream sticker idempotently', async () => {
    assert.ok(sampleDreamSlug, 'Sample dream slug needed');
    const req1 = request(app).post(`/api/dreams/${sampleDreamSlug}/collect`);
    if (sessionCookie) {
      req1.set('Cookie', sessionCookie);
    }
    const res1 = await req1;
    assert.equal(res1.status, 201);
    assert.equal(res1.body.data.alreadyCollected, false);

    // Test idempotent second collection
    const req2 = request(app).post(`/api/dreams/${sampleDreamSlug}/collect`);
    if (sessionCookie) {
      req2.set('Cookie', sessionCookie);
    }
    const res2 = await req2;
    assert.equal(res2.status, 200);
    assert.equal(res2.body.data.alreadyCollected, true);
  });

  test('GET /api/dreams/collection returns user’s saved sticker album', async () => {
    const req = request(app).get('/api/dreams/collection');
    if (sessionCookie) {
      req.set('Cookie', sessionCookie);
    }
    const res = await req;
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.collectedCount >= 1);
  });

  test('POST /api/guestbook creates approved guestbook entry in MongoDB', async () => {
    const req = request(app)
      .post('/api/guestbook')
      .send({
        nickname: testUser.nickname,
        message: 'Testing guestbook integration with MongoDB! Good night Pip! ⭐',
        sticker: 'star'
      });
    if (sessionCookie) {
      req.set('Cookie', sessionCookie);
    }
    const res = await req;
    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.entry.nickname, testUser.nickname);
  });

  test('GET /api/visitors returns atomic visitor counter from MongoDB', async () => {
    const res = await request(app).get('/api/visitors');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.isOffline, false);
    assert.ok(typeof res.body.data.totalVisits === 'number');
  });

  test('POST /api/auth/logout logs out user session cleanly', async () => {
    const req = request(app).post('/api/auth/logout');
    if (sessionCookie) {
      req.set('Cookie', sessionCookie);
    }
    const res = await req;
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);

    // Confirm session is cleared
    const checkReq = request(app).get('/api/auth/me');
    const checkRes = await checkReq;
    assert.equal(checkRes.body.data.user, null);
  });
});
