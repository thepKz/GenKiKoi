import express from 'express';
import {
    createTreatment,
    getTreatmentById,
    getTreatments,
    updateTreatment
} from '../controllers/treatmentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', authMiddleware, createTreatment);
router.get('/all', authMiddleware, getTreatments);
router.get('/:id', authMiddleware, getTreatmentById);
router.put('/update/:id', authMiddleware, updateTreatment);

export default router;