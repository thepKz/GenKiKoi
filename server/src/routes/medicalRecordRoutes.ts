import express from "express";
import {
  getAllMedicalRecords,
  getMedicalRecordByFishId,
  createMedicalRecord,
  getMedicalRecordById,
} from "../controllers/medicalRecordController";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.get("/all", authMiddleware, getAllMedicalRecords);

router.get("/:medicalRecordId", authMiddleware, getMedicalRecordById);

router.get("/fishes/:fishId", authMiddleware, getMedicalRecordByFishId);

router.post("/", authMiddleware, createMedicalRecord);

export default router;
