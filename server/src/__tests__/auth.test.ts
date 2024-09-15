import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import connectDB from '../databases/database'; // Assuming this is the correct import path
import app from '../index';
import User from '../models/User';
let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
  await mongoose.disconnect();
  await connectDB();
});
beforeEach(async () => {
  await User.deleteMany({}); // Xóa tất cả users
  await User.create({
    username: 'testuserCHECK',
    email: 'validCHECK@example.com',
    password: 'ValidPass1!',
    role: 'customer'
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Auth API', () => {
  // Successful registration
  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'validuser',
        email: 'valid@example.com',
        password: 'ValidPass1!',
        role: 'customer'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toHaveProperty('id');
    expect(res.body.user.username).toBe('validuser');
    console.info('--- Test case completed ---');
  });

  // BR-1: Unique Username/Email
  it('should not register a user with an existing username', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'ValidPass2!',
        role: 'customer'
      });

    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'existinguser',
        email: 'new@example.com',
        password: 'ValidPass3!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Username already exists');
  });

  it('should not register a user with an existing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newuser',
        email: 'validCHECK@example.com',
        password: 'ValidPass4!',
        role: 'customer'
      });
      console.log('Response:', res.status, res.body);
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Email already exists');
  });

  // BR-2: Strong Passwords
  it('should not register a user with a short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'shortpass',
        email: 'short@example.com',
        password: 'Short1!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Password must be at least 8 characters long');
    expect(res.body.message).toContain('contain at least one uppercase letter, one lowercase letter, one number, and one special character');
  });

  it('should not register a user with a password missing uppercase', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'nouppercase',
        email: 'nouppercase@example.com',
        password: 'nouppercase1!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  });

  it('should not register a user with a password missing lowercase', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'nolowercase',
        email: 'nolowercase@example.com',
        password: 'NOLOWERCASE1!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  });

  it('should not register a user with a password missing digit', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'nodigit',
        email: 'nodigit@example.com',
        password: 'NoDigitPass!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  });

  it('should not register a user with a password missing special character', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'nospecial',
        email: 'nospecial@example.com',
        password: 'NoSpecialChar1',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.');
  });

  // Missing fields
  it('should not register a user with missing username', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'nousername@example.com',
        password: 'ValidPass5!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('User validation failed: username: Path `username` is required.');
  });

  it('should not register a user with missing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'noemail',
        password: 'ValidPass6!',
        role: 'customer'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('User validation failed: email: Path `email` is required.');
  });

  // Login tests
  it('should login an existing user successfully with email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        login: 'validCHECK@example.com',
        password: 'ValidPass1!'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should login an existing user successfully with username', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        login: 'testuserCHECK',
        password: 'ValidPass1!'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        login: 'valid@example.com',
        password: 'WrongPassword1!'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Incorrect login or password');
  });

  it('should not login with non-existent username or email', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        login: 'nonexistent',
        password: 'AnyPassword1!'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Incorrect login or password');
  });

  it('should not login without providing login', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        password: 'AnyPassword1!'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Please provide login and password');
  });

  it('should not login without providing password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        login: 'valid@example.com'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toContain('Please provide login and password');
  });
});
