import express from 'express';
import { login, logout, register } from '../controllers/authController';
import { sendVerificationEmailController, verifyOTPController } from '../controllers/mailController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/send-verification', sendVerificationEmailController);
router.post('/verify-otp', verifyOTPController);

export default router;