import express from "express";
import {
  getAllDoctorSchedules,
  getScheduleByUserId,
} from "../controllers/doctorScheduleController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get(
  "/all",
  authMiddleware,

  getAllDoctorSchedules
);

router.get("/getByUserId/:id", getScheduleByUserId);
export default router;
