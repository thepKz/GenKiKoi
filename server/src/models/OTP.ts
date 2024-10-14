import mongoose from 'mongoose';

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 } // OTP sẽ tự động xóa sau 10 phút
});

export default mongoose.model('OTP', OTPSchema);