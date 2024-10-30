import express from "express";
import {
  createPaymentAtCenter,
  createPaymentOnline,
  getPaymentByAppointmentId,
  getPaymentById,
  getPaymentsByCustomerId,
  updatePaymentById,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/create-payment", createPaymentOnline);
router.post("/payment-at-center", createPaymentAtCenter);
router.get("/:customerId", getPaymentsByCustomerId);
router.get("/:paymentId", getPaymentById);
router.post("/:paymentId", updatePaymentById);
router.get("/appointments/:appointmentId", getPaymentByAppointmentId);

export default router;
