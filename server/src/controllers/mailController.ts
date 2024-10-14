import { Request, Response } from 'express';
import OTP from '../models/OTP';
import User from '../models/User'; // Import User model
import { sendVerificationEmail } from '../services/emailService';

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

  try {
    const otp = generateOTP();

    // Lưu OTP vào MongoDB
    await OTP.create({ email, otp });

    // Gửi email xác thực
    await sendVerificationEmail(email, otp);

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.error('Error in sendVerificationEmailController:', error);
    res.status(500).json({ message: 'Error sending verification email' });
  }
};

export const verifyOTPController = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    const otpRecord = await OTP.findOne({ email, otp });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP has expired
    if (otpRecord.createdAt.getTime() + 600000 < Date.now()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // OTP is valid, delete it from the database
    await OTP.deleteOne({ _id: otpRecord._id });

    // Find the user by email and update isVerified
    const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error in verifyOTPController:', error);
    res.status(500).json({ message: 'Error verifying OTP' });
  }
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


