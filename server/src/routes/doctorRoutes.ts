import express from "express";
import {
  addNewDoctor,
  checkLicenseNumber,
  deleteDoctorById,
  getAllDoctors,
  getAllDoctorsForBooking,
  getDoctorById,
  getScheduleByDoctorId,
  updateByDoctorId,
  updateDoctorSchedule,
} from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAllDoctors);

router.get("/all", getAllDoctorsForBooking);

router.get("/:doctorId", authMiddleware, getDoctorById);

router.get("/:doctorId/schedule", authMiddleware, getScheduleByDoctorId);

router.patch("/:doctorId/schedule", authMiddleware, updateDoctorSchedule);

router.post("/", authMiddleware, roleMiddleware(["manager"]), addNewDoctor);

router.post("/check-licenseNumber", authMiddleware, checkLicenseNumber);

router.patch("/:doctorId", authMiddleware, updateByDoctorId);

router.delete(
  "/:doctorId",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteDoctorById
);

export default router;
