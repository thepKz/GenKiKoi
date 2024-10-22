import express from "express";
import {
  createNewAppointment,
  getAllAppointments,
  getAllAppointmentsByDoctorId,
  getAppointmentsByCustomerId,
  updateCompletedAppointment,
} from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/", authMiddleware, getAllAppointments);
router.get("/doctors/:doctorId", authMiddleware, getAllAppointmentsByDoctorId);
router.get(
  "/customers/:customerId",
  authMiddleware,
  getAppointmentsByCustomerId
);
router.post("/customers/:customerId", authMiddleware, createNewAppointment);

router.patch(
  "/completed/:appointmentId",
  authMiddleware,
  updateCompletedAppointment
);

export default router;
