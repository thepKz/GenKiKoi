import express from "express";
import { createNewAppointment, getAppointmentsByUser } from "../controllers/appointmentController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getAppointmentsByUser);
router.put('/', authMiddleware, createNewAppointment)

export default router;
