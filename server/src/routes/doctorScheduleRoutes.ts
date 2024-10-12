// server/src/routes/doctorScheduleRoutes.ts
import express from "express";
import {
  getAllDoctorSchedules,
  getScheduleByDoctorId,
} from "../controllers/doctorScheduleController";

const router = express.Router();

router.get("/getAll", getAllDoctorSchedules);
router.get("/getByDoctorId/:doctorId", getScheduleByDoctorId);

// ... existing routes ...

export default router;
