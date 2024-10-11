import express from "express";
import {
  addNewDoctor,
  deleteDoctorById,
  getAllDoctors,
  getAllDoctorsForBooking,
  updateDoctorById,
} from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAllDoctors);
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
router.get("/all", getAllDoctorsForBooking);

export default router;
