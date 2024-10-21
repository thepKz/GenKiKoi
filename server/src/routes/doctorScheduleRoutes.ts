import express from "express";
import {
  getAllDoctorSchedules,
  getScheduleByUserId,
} from "../controllers/doctorScheduleController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

// Lấy tất cả lịch trình bác sĩ
router.get("/", authMiddleware, getAllDoctorSchedules);

// Lấy lịch trình bác sĩ theo userId
router.get("/user/:userId/", getScheduleByUserId);
export default router;
