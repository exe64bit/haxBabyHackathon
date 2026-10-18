import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

describe('Pip’s Midnight Observatory Backend API Tests', () => {
  test('GET /api/health returns operational status', async () => {
    const res = await request(app).get('/api/health');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.status, 'operational');
    assert.equal(typeof res.body.data.database, 'string');
  });

  test('GET /api/health?requireDb=true returns 503 when database is offline', async () => {
    const res = await request(app).get('/api/health?requireDb=true');
    assert.equal(res.status, 503);
    assert.equal(res.body.data.database, 'disconnected');
  });

  test('GET /api/visitors returns 200 with fallback counter when offline', async () => {
    const res = await request(app).get('/api/visitors');
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(typeof res.body.data.totalVisits, 'number');
  });

  test('POST /api/auth/register fails with 503 when DB is offline', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        nickname: 'StarGazer',
        email: 'star@hax.baby',
        password: 'password123'
      });
    assert.equal(res.status, 503);
    assert.equal(res.body.success, false);
    assert.ok(res.body.errors.includes('DATABASE_UNAVAILABLE'));
  });

  test('POST /api/guestbook fails with 503 when DB is offline', async () => {
    const res = await request(app)
      .post('/api/guestbook')
      .send({
        nickname: 'MoonBunny',
        message: 'Hello Pip! I love your star music box.'
      });
    assert.equal(res.status, 503);
    assert.equal(res.body.success, false);
  });

  test('GET /api/nonexistent returns 404 with sweet error message', async () => {
    const res = await request(app).get('/api/nonexistent-route-1999');
    assert.equal(res.status, 404);
    assert.equal(res.body.success, false);
    assert.ok(res.body.message.includes('Observatory telescope cannot find'));
  });
});

