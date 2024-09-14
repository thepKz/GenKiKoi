import express from 'express';
import { sendVerificationEmailController, verifyOTPController } from '../controllers/mailController';

const router = express.Router();

router.post('/send-verification', sendVerificationEmailController);
router.post('/verify-otp', verifyOTPController);
router.post('/reset-rate-limit', (req, res) => {
    // Reset rate limit logic here
    res.status(200).json({ message: 'Rate limit reset successfully' });
  });
export default router;