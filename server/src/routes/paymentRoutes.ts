import express from "express";
import {
  createPayment,
  getBookingsByMonth,
  getMoneyByMonth,
  getPaymentByAppointmentId,
  getPaymentById,
  getPaymentsByCustomerId,
  getStatistics,
  getTopCustomers,
  getTopServices,
  updatePaymentById,
} from "../controllers/paymentController";

const router = express.Router();

// Đặt các route cụ thể trước
router.post("/create-payment", createPayment);
router.get("/top-customers", getTopCustomers); // Đặt trước các route có params
router.get("/statistics", getStatistics);
router.get("/top-services", getTopServices);
router.get("/booking-by-month", getBookingsByMonth);
router.get("/money-by-month", getMoneyByMonth);
router.get("/appointments/:appointmentId", getPaymentByAppointmentId);

// Các route có params đặt sau
router.get("/:customerId", getPaymentsByCustomerId);
router.get("/:paymentId", getPaymentById);

router.post("/:paymentId", updatePaymentById);

export default router;
