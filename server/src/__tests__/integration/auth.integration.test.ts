import bcrypt from 'bcryptjs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../index';
import { User } from '../../models';
import * as emailService from '../../services/emails';

// Mock email services
jest.mock('../../services/emails', () => ({
  sendVerificationEmail: jest.fn().mockResolvedValue(true),
  sendResetPasswordEmail: jest.fn().mockResolvedValue(true),
  sendAppointmentConfirmation: jest.fn().mockResolvedValue(true),
}));

describe('Auth Integration Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Create an in-memory MongoDB instance
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    
    // Connect to the in-memory database
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    // Clean up and close connection
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Clear all collections and reset mocks before each test
    const collections = mongoose.connection.collections;
    for (const key in collections) {
      await collections[key].deleteMany({});
    }
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const username = 'TestUser123';
      const email = 'test@example.com';
      
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username,
          email,
          password: 'Password123!',
          confirmPassword: 'Password123!'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('message', 'Đăng ký thành công!');
      expect(response.body.data).toHaveProperty('token');
      
      // Verify email service was called with lowercase username
      expect(emailService.sendVerificationEmail).toHaveBeenCalledWith(
        email,
        username.toLowerCase(),
        expect.any(String)
      );

      // Verify user was created with lowercase username
      const createdUser = await User.findOne({ email });
      expect(createdUser).toBeTruthy();
      expect(createdUser?.username).toBe(username.toLowerCase());
    });

    it('should return error for existing email', async () => {
      // Create user first
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: await bcrypt.hash('Password123!', 10)
      });

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'NewUser123',
          email: 'existing@example.com',
          password: 'Password123!',
          confirmPassword: 'Password123!'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('email', 'Email này đã được sử dụng!');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      // Create test user with lowercase username
      await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: await bcrypt.hash('Password123!', 10)
      });
    });


    it('should return 400 for invalid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          login: 'test@example.com', // Changed from email to login
          password: 'WrongPassword123!'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Tài khoản không tồn tại!');
    });

    it('should return 400 for non-existent user', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          login: 'nonexistent@example.com', // Changed from email to login
          password: 'Password123!'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Tài khoản không tồn tại!');
    });
  });

  describe('POST /api/auth/login-admin', () => {
    beforeEach(async () => {
      // Create admin user with lowercase username
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('AdminPass123!', 10),
        role: 'manager'
      });
    });

    it('should login admin successfully', async () => {
      const response = await request(app)
        .post('/api/auth/login-admin')
        .send({
          email: 'admin@example.com',
          password: 'AdminPass123!'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Đăng nhập thành công!');
      expect(response.body.data).toHaveProperty('token');
      expect(response.body.data).toHaveProperty('role', 'manager');
    });

    it('should reject non-admin users', async () => {
      // Create regular user
      await User.create({
        username: 'user',
        email: 'user@example.com',
        password: await bcrypt.hash('UserPass123!', 10),
        role: 'customer'
      });

      const response = await request(app)
        .post('/api/auth/login-admin')
        .send({
          email: 'user@example.com',
          password: 'UserPass123!'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Tài khoản không tồn tại!');
    });
  });

  describe('POST /api/auth/check-username', () => {
    it('should check username availability', async () => {
      const response = await request(app)
        .post('/api/auth/check-username')
        .send({
          username: 'newuser'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('exists', false);
    });

    it('should handle existing username case-insensitively', async () => {
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: await bcrypt.hash('Password123!', 10)
      });

      const response = await request(app)
        .post('/api/auth/check-username')
        .send({
          username: 'ExistingUser'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('exists', true);
    });
  });

  describe('POST /api/auth/check-email', () => {
    it('should check email availability', async () => {
      const response = await request(app)
        .post('/api/auth/check-email')
        .send({
          email: 'new@example.com'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('exists', false);
    });

    it('should detect existing email', async () => {
      await User.create({
        username: 'existinguser',
        email: 'existing@example.com',
        password: await bcrypt.hash('Password123!', 10)
      });

      const response = await request(app)
        .post('/api/auth/check-email')
        .send({
          email: 'existing@example.com'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('exists', true);
    });
  });
});