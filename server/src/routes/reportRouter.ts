import express from 'express';
import {
    getDailyAppointmentsReport,
    getMonthlyRevenueReport
} from '../controllers/reportController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/daily-appointments', authMiddleware, getDailyAppointmentsReport);
router.get('/monthly-revenue', authMiddleware, getMonthlyRevenueReport);

export default router; 