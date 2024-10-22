import express from "express";
import {
  getAllDoctorSchedules,
  getScheduleByDoctorId,
  getSlotsByDoctorAndDate

} from "../controllers/doctorScheduleController";
import { authMiddleware } from "../middleware";

const router = express.Router();

// Lấy tất cả lịch trình bác sĩ
router.get("/", authMiddleware, getAllDoctorSchedules);

// Lấy lịch trình bác sĩ theo userId
router.get("/:doctorId", authMiddleware, getScheduleByDoctorId);

router.get("/:doctorId/slots", authMiddleware, getSlotsByDoctorAndDate);

export default router;
