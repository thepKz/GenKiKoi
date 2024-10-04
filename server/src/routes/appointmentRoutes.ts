import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { getAppointmentsByUser } from "../controllers/appointmentController";

const router = express.Router();

router.get("/", authMiddleware, getAppointmentsByUser);

export default router;
