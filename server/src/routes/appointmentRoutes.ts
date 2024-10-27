import express from "express";
import {
  createNewAppointment,
  getAllAppointments,
  getAllAppointmentsByDoctorId,
  getAppointmentsByCustomerId,
  updateStatusAppointment,
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

router.patch("/:appointmentId/status", authMiddleware, updateStatusAppointment);

export default router;
