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
router.get("/getByID/:id", authMiddleware, getMedicalRecordById);
router.get("/getByFishId/:id", authMiddleware, getMedicalRecordByFishId);

router.post("/create", authMiddleware, createMedicalRecord);

export default router;
