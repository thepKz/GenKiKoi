import express from 'express';
import { resetRateLimit, sendVerificationEmailController, verifyOTPController } from '../controllers/mailController';
const router = express.Router();

router.post('/send-verification', sendVerificationEmailController);
router.post('/verify-otp', verifyOTPController);
router.post('/reset-mail-rate-limit', resetRateLimit);
export default router;