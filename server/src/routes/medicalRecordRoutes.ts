import express from "express";
import {
  getAllMedicalRecords,
  getMedicalRecordByFishId,
  createMedicalRecord,
  getMedicalRecordById,
} from "../controllers/medicalRecordController";
import { authMiddleware } from "../middleware";

const router = express.Router();

// Lấy tất cả bệnh án
router.get("/", authMiddleware, getAllMedicalRecords);

// Lấy bệnh án theo ID
router.get("/:id", authMiddleware, getMedicalRecordById);

// Lấy bệnh án theo ID của cá
router.get("/fishes/:fishId/", authMiddleware, getMedicalRecordByFishId);

// Tạo bệnh án mới
router.post("/", authMiddleware, createMedicalRecord);

export default router;
