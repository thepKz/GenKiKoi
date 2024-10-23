import express from "express";
import {
  getAllDoctorSchedules,
  getScheduleByDoctorId,
  getSlotsByDoctorAndDate,
  updateBookAppointment,
} from "../controllers/doctorScheduleController";
import { authMiddleware } from "../middleware";

const router = express.Router();

// Lấy tất cả lịch trình bác sĩ
router.get("/", authMiddleware, getAllDoctorSchedules);

// Lấy lịch trình bác sĩ theo userId
router.get("/:doctorId", authMiddleware, getScheduleByDoctorId);

// Lấy slots cho một ngày cụ thể của bác sĩ
router.get("/:doctorId/slots", authMiddleware, getSlotsByDoctorAndDate);

// Tạo mới hoặc cập nhật lịch làm việc của bác sĩ
router.patch("/:doctorId", authMiddleware, updateBookAppointment);

export default router;
