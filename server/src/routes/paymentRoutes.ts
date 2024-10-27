import express from "express";
import {
  createPayment,
  getPaymentByAppointmentId,
  getPaymentById,
  getPaymentsByCustomerId,
  getTopCustomers,
  updatePaymentById,
} from "../controllers/paymentController";

const router = express.Router();

// Đặt các route cụ thể trước
router.post("/create-payment", createPayment);
router.get("/top-customers", getTopCustomers); // Đặt trước các route có params
router.get("/appointments/:appointmentId", getPaymentByAppointmentId);

// Các route có params đặt sau
router.get("/:customerId", getPaymentsByCustomerId);
router.get("/:paymentId", getPaymentById);
router.post("/:paymentId", updatePaymentById);

export default router;
