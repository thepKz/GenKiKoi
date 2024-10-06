import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createNewAppointment, getAppointmentsByUser } from "../controllers/appointmentController";

const router = express.Router();

router.get("/", authMiddleware, getAppointmentsByUser);
router.put('/', authMiddleware, createNewAppointment)

export default router;
