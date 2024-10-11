import express from 'express';
import { createPayment, vnpayReturn } from '../controllers/vnpayController';
import { authMiddleware } from "../middleware";

const routes = express.Router();

routes.post('/create_payment_url', authMiddleware, createPayment);
routes.get('/vnpay_return', vnpayReturn); // Không cần xác thực cho route này vì VNPay sẽ gọi trực tiếp

export const vnpayRoutes = routes;