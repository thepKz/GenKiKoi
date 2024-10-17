import express from "express";
import {
  getAllMedicalRecords,
  getMedicalRecordByFishId,
  createMedicalRecord,
  getMedicalRecordById,
} from "../controllers/medicalRecordController";

const router = express.Router();

router.get("/all", getAllMedicalRecords);
router.get("/getByID/:id", getMedicalRecordById);
router.get("/getByFishId/:id", getMedicalRecordByFishId);

router.post("/create", createMedicalRecord);

export default router;
