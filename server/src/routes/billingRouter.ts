import express from 'express';
import {
    createInvoice,
    getInvoiceById,
    getInvoices,
    processPayment
} from '../controllers/billingController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create-invoice', authMiddleware, createInvoice);
router.get('/invoices', authMiddleware, getInvoices);
router.get('/invoice/:id', authMiddleware, getInvoiceById);
router.post('/process-payment', authMiddleware, processPayment);

export default router;