import express from "express";
import {
  addNewDoctor,
  deleteDoctorById,
  getAllDoctors,
  getAllDoctorSchedules,
  getAllDoctorsForBooking,
  getScheduleById,
  updateDoctorById,
} from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAllDoctors);

router.get("/all", getAllDoctorsForBooking);

router.get(
  "/schedules",
  authMiddleware,
  roleMiddleware(["doctor"]),
  getAllDoctorSchedules
);

router.get(
  "/:id/schedules",
  authMiddleware,
  roleMiddleware(["doctor"]),
  getScheduleById
);

router.post("/", authMiddleware, roleMiddleware(["manager"]), addNewDoctor);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  updateDoctorById
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteDoctorById
);

export default router;
