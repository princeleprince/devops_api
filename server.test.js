const request = require('supertest');
const app = require('./server');

describe('User API', () => {
  test('GET /api/users should return all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  test('GET /api/users/:id should return user', async () => {
    const res = await request(app).get('/api/users/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'Alice');
    expect(res.body).toHaveProperty('email', 'alice@example.com');
  });

  test('GET /api/users/:id should return 404 for non-existing user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'User not found');
  });

  test('POST /api/users should create a new user', async () => {
    const newUser = { name: 'Charlie', email: 'charlie@example.com' };
    const res = await request(app).post('/api/users').send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', 3);
    expect(res.body.name).toBe(newUser.name);
  });

  test('POST /api/users should return 400 if email missing', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Test' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Name and email required');
  });
});