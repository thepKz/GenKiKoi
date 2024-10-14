import { Request, Response } from 'express';
import { sendVerificationEmail } from '../services/emailService';

// In-memory storage for OTPs (replace with database in production)
const otpStorage: { [email: string]: { otp: string; expires: Date } } = {};

// Object to track the last email sent time for each address
const lastEmailSent: { [email: string]: number } = {};

// Function to generate OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Helper function to validate email
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const sendVerificationEmailController = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  const now = Date.now();
  const lastSent = lastEmailSent[email] || 0;

  // Check if email was sent in the last minute
  if (now - lastSent < 60000) { // 60000 ms = 1 minute
    return res.status(429).json({ message: 'Please wait before requesting another verification email' });
  }

  try {
    // Generate OTP
    const otp = generateOTP();

    // Store OTP with expiration (10 minutes)
    const expirationTime = new Date(now + 10 * 60000);
    otpStorage[email] = { otp, expires: expirationTime };

    // Send verification email
    await sendVerificationEmail(email, otp);

    // Update last email sent time
    lastEmailSent[email] = now;

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Error in sendVerificationEmailController:', error);
    res.status(500).json({ message: 'Error sending verification email' });
  }
};

export const verifyOTPController = (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const storedOTPData = otpStorage[email];

  if (!storedOTPData) {
    return res.status(400).json({ message: 'No OTP found for this email' });
  }

  if (new Date() > storedOTPData.expires) {
    delete otpStorage[email];
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (otp !== storedOTPData.otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  // OTP is valid
  delete otpStorage[email];

  res.status(200).json({ message: 'Email verified successfully' });
};
// Reset rate limit
export const resetRateLimit = (req: Request, res: Response) => {
  const { email } = req.body;
  if (email) {
    delete lastEmailSent[email];
    res.status(200).json({ message: 'Rate limit reset successfully' });
  } else {
    res.status(400).json({ message: 'Email is required' });
  }
};