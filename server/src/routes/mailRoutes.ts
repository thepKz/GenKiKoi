import express from 'express';
import { resetRateLimit, sendVerificationEmailController, verifyOTPController } from '../controllers/mailController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
const router = express.Router();

router.post('/send-verification', authMiddleware, sendVerificationEmailController);
router.post('/verify-otp', authMiddleware, verifyOTPController);
router.post('/reset-mail-rate-limit', authMiddleware, roleMiddleware(["manager", "staff"]), resetRateLimit);
export default router;