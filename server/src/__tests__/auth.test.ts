import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../index'; // Assuming your Express app is exported from app.ts
import User from '../models/User';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth Controller', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!',
          confirmPassword: 'Password123!'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Đăng ký thành công!');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should return error for existing username', async () => {
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'Password123!'
      });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'existinguser',
          email: 'new@example.com',
          password: 'Password123!',
          confirmPassword: 'Password123!'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.username).toBe('Tên tài khoản này đã được sử dụng!');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: '$2a$10$XOPbrlUPQdwdJUpSrIF6X.LbE14qsMmKGhM1A8W9iqDuy0q.w7n.K' // Password123!
      });
    });

    it('should login with correct credentials', async () => {
        const res = await request(app)
          .post('/api/auth/login')
          .send({
            login: 'testuser',
            password: 'Password123!'
          });
      
        console.log('Login response:', res.body);
      
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Đăng nhập thành công!');
        expect(res.body.data).toHaveProperty('token');
      });

    it('should return error for incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          login: 'testuser',
          password: 'WrongPassword123!'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Thông tin đăng nhập sai, vui lòng thử lại!');
    });
  });

  describe('POST /api/auth/check-username', () => {
    it('should return true for existing username', async () => {
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'Password123!'
      });

      const res = await request(app)
        .post('/api/auth/check-username')
        .send({ username: 'existinguser' });

      expect(res.statusCode).toBe(200);
      expect(res.body.exists).toBe(true);
    });

    it('should return false for non-existing username', async () => {
      const res = await request(app)
        .post('/api/auth/check-username')
        .send({ username: 'nonexistinguser' });

      expect(res.statusCode).toBe(200);
      expect(res.body.exists).toBe(false);
    });
  });

  describe('POST /api/auth/check-email', () => {
    it('should return true for existing email', async () => {
      await User.create({
        username: 'testuser',
        email: 'existing@example.com',
        password: 'Password123!'
      });

      const res = await request(app)
        .post('/api/auth/check-email')
        .send({ email: 'existing@example.com' });

      expect(res.statusCode).toBe(200);
      expect(res.body.exists).toBe(true);
    });

    it('should return false for non-existing email', async () => {
      const res = await request(app)
        .post('/api/auth/check-email')
        .send({ email: 'nonexisting@example.com' });

      expect(res.statusCode).toBe(200);
      expect(res.body.exists).toBe(false);
    });
  });
});

    
