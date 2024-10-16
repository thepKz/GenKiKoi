import express from "express";
import {
  getAllMedicalRecords,
  getMedicalRecordByFishId,
} from "../controllers/medicalRecordController";

const router = express.Router();

router.get("/all", getAllMedicalRecords);
router.get("/getByFishId/:id", getMedicalRecordByFishId);

export default router;
