import express from 'express';
import {
    cancelAppointment,
    createAppointment,
    getAppointmentById,
    getAppointments,
    updateAppointment
} from '../controllers/appointmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, createAppointment);
router.get('/all', authMiddleware, getAppointments);
router.get('/:id', authMiddleware, getAppointmentById);
router.put('/update/:id', authMiddleware, updateAppointment);
router.delete('/cancel/:id', authMiddleware, cancelAppointment);

export default router;