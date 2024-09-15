import express from 'express';
import { getProfile, login, logout, register } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

export default router;