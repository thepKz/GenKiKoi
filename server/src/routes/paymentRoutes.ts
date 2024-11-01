import express from "express";
import {
  createPaymentAtCenter,
  createPaymentOnline,
  getBookingsByMonth,
  getMoneyByMonth,
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
router.get("/booking-by-month", getBookingsByMonth);
router.get("/money-by-month", getMoneyByMonth);
router.get("/appointments/:appointmentId", getPaymentByAppointmentId);
router.get("/:customerId", getPaymentsByCustomerId);

export default router;
