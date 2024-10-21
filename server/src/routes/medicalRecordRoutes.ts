import express from "express";
import {
  getAllMedicalRecords,
  getMedicalRecordByFishId,
  createMedicalRecord,
  getMedicalRecordById,
  getAllCustomers,
} from "../controllers/medicalRecordController";
import { authMiddleware } from "../middleware";

const router = express.Router();

// Lấy tất cả bệnh án
router.get("/", authMiddleware, getAllMedicalRecords);
// Tạo bệnh án mới
router.post("/", authMiddleware, createMedicalRecord);

router.get("/customers", authMiddleware, getAllCustomers);

router.get("/:medicalRecordId", authMiddleware, getMedicalRecordById);

// Lấy bệnh án theo ID của cá
router.get("/fishes/:fishId", authMiddleware, getMedicalRecordByFishId);

export default router;
