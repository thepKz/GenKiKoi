import express from "express";
import {
  createPaymentAtCenter,
  createPaymentOnline,
  getBookingsByDay,
  getMoneyByDay,
  getPaymentByAppointmentId,
  // getPaymentById,
  getPaymentsByCustomerId,
  getStatistics,
  getTopCustomers,
  getTopServices,
  updatePaymentById,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/create-payment", createPaymentOnline);
router.post("/payment-at-center", createPaymentAtCenter);
// router.get("/:paymentId", getPaymentById);
router.post("/:paymentId", updatePaymentById);
router.get("/top-customers", getTopCustomers); // Đặt trước các route có params
router.get("/statistics", getStatistics);
router.get("/top-services", getTopServices);
router.get("/booking-by-day", getBookingsByDay);
router.get("/money-by-day", getMoneyByDay);
router.get("/appointments/:appointmentId", getPaymentByAppointmentId);
router.get("/:customerId", getPaymentsByCustomerId);

export default router;
