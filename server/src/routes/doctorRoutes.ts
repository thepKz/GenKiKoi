import express from "express";
import {
  addNewDoctor,
  deleteDoctorById,
  getAllDoctors,
  getAllDoctorsForBooking,
  getDoctorById,
  updateDoctorById,
} from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/all", getAllDoctorsForBooking);
router.get("/getById/:id", getDoctorById); // lay bac si theo id

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
