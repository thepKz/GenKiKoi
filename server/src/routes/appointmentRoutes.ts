import express from "express";
import { createNewAppointment, getAppointmentsByCustomerId } from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/:customerId", authMiddleware, getAppointmentsByCustomerId);
router.post('/:customerId', authMiddleware, createNewAppointment)

export default router;
