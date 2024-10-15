import { Request, Response } from 'express';
import OTP from '../models/OTP';
import User from '../models/User'; // Import User model

/**
 * Người Làm: Thép
 * Người Test: Thép
 * Loại Test: API TEST (Đã xong), UNIT TEST (Đang làm), E2E TEST (Đã làm)
 * Chỉnh Sửa Lần Cuối : 13/10/2024
*/

// In-memory storage for OTPs (replace with database in production)
const otpStorage: { [email: string]: { otp: string; expires: Date } } = {};

// Object to track the last email sent time for each address
const lastEmailSent: { [email: string]: number } = {};

// Thời gian giới hạn (1 phút = 60000 milliseconds)
const RATE_LIMIT_WINDOW = 10000;
// Số lượng email tối đa có thể gửi trong khoảng thời gian giới hạn
const MAX_EMAILS_PER_WINDOW = 3;

// Đối tượng để theo dõi số lượng email đã gửi và thời gian gửi
interface EmailTracker {
  count: number;
  firstEmailSentAt: number;
}

const emailTrackers: { [email: string]: EmailTracker } = {};

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

  // Kiểm tra rate limit
  const now = Date.now();
  if (email in emailTrackers) {
    const tracker = emailTrackers[email];
    if (now - tracker.firstEmailSentAt < RATE_LIMIT_WINDOW) {
      if (tracker.count >= MAX_EMAILS_PER_WINDOW) {
        return res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
      }
      tracker.count++;
    } else {
      // Reset tracker nếu đã qua khoảng thời gian giới hạn
      tracker.count = 1;
      tracker.firstEmailSentAt = now;
    }
  } else {
    // Khởi tạo tracker cho email mới
    emailTrackers[email] = { count: 1, firstEmailSentAt: now };
  }

  try {
    // const otp = generateOTP();
    const otp: string = '123456'; // Fixed OTP for testing

    // Lưu OTP vào MongoDB
    await OTP.create({ email, otp });
   
    // Instead of sending an email, just log the OTP
    console.log(`OTP for ${email}: ${otp}`);

    // Gửi email xác thực (đã được comment out)
    // await sendVerificationEmail(email, otp);

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Error in sendVerificationEmailController:', error);
    res.status(500).json({ message: 'Error sending verification email' });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  console.log('Received email:', email);
  console.log('Received OTP:', otp);

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const otpRecord = await OTP.findOne({ email, otp });
    console.log('OTP record:', otpRecord);

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (otpRecord.createdAt.getTime() + 600000 < Date.now()) {
      console.log('OTP expired. Created at:', otpRecord.createdAt, 'Current time:', new Date());
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid, delete it from the database
    await OTP.deleteOne({ _id: otpRecord._id });

    // Find the user by email and update isVerified
    const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
    console.log('User updated:', user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error in verifyOTPController:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
};

export const resetRateLimit = (req: Request, res: Response) => {
  const { email } = req.body;
  if (email) {
    delete emailTrackers[email];
    res.status(200).json({ message: 'Rate limit reset successfully' });
  } else {
    res.status(400).json({ message: 'Email is required' });
  }
};
