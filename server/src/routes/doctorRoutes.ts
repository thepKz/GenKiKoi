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

// Apply authMiddleware to all routes
router.use(authMiddleware);

router.get("/", getAllDoctors);
router.get("/all", getAllDoctorsForBooking);

router.get(
  "/schedules",
  roleMiddleware(["doctor"]),
  getAllDoctorSchedules
);

router.get(
  "/schedule/:id",
  roleMiddleware(["doctor"]),
  getScheduleById
);

router.post("/", roleMiddleware(["manager"]), addNewDoctor);
router.patch(
  "/:id",
  roleMiddleware(["manager"]),
  updateDoctorById
);
router.delete(
  "/:id",
  roleMiddleware(["manager"]),
  deleteDoctorById
);

export default router;
