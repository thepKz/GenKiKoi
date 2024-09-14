import request from 'supertest';
import app from '../index';
import { sendVerificationEmail } from '../services/emailService';

// Mock the email service
jest.mock('../services/emailService', () => ({
    sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
  }));

describe('Email API', () => {
  beforeEach(async () => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Reset rate limiter for a test email
    await request(app).post('/api/mail/reset-rate-limit').send({ email: 'test@example.com' });
  });

  // Test 1: Email không hợp lệ
  it('should return error for invalid email', async () => {
    const res = await request(app)
      .post('/api/mail/send-verification')
      .send({ email: 'invalid-email' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid email format');
  });

  // Test 2: OTP sai
  it('should return error for incorrect OTP', async () => {
    const email = 'test1@example.com';
    // First, send a verification email
    await request(app)
      .post('/api/mail/send-verification')
      .send({ email });

    // Then, try to verify with incorrect OTP
    const res = await request(app)
      .post('/api/mail/verify-otp')
      .send({ email, otp: '000000' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Invalid OTP');
  });

  // Test 3: OTP hết hạn
  it('should return error for expired OTP', async () => {
    const email = 'test2@example.com';
    jest.useFakeTimers();
    
    // Send verification email
    await request(app)
      .post('/api/mail/send-verification')
      .send({ email });

    // Advance time by 11 minutes
    jest.advanceTimersByTime(11 * 60 * 1000);

    // Try to verify
    const res = await request(app)
      .post('/api/mail/verify-otp')
      .send({ email, otp: '123456' });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'OTP has expired');

    jest.useRealTimers();
  });

  // Test 4: Gửi nhiều yêu cầu xác thực liên tiếp
  it('should handle multiple verification requests', async () => {
    const email = 'test3@example.com';
    
    // First request should succeed
    const firstResponse = await request(app)
      .post('/api/mail/send-verification')
      .send({ email });
    expect(firstResponse.statusCode).toEqual(200);
    expect(firstResponse.body).toHaveProperty('message', 'Verification email sent successfully');
  
    // Subsequent requests within 1 minute should be rate limited
    const subsequentResponses = await Promise.all(
      Array(4).fill(null).map(() => 
        request(app)
          .post('/api/mail/send-verification')
          .send({ email })
      )
    );
  
    subsequentResponses.forEach(res => {
      expect(res.statusCode).toEqual(429);
      expect(res.body).toHaveProperty('message', 'Please wait before requesting another verification email');
    });
  
    // Verify that sendVerificationEmail was called only once
    expect(sendVerificationEmail).toHaveBeenCalledTimes(1);
    expect(sendVerificationEmail).toHaveBeenCalledWith(email, expect.any(String));
  });
});