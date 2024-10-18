import express from "express";
import {
  addNewDoctor,
  deleteDoctorById,
  getAllDoctors,
  getAllDoctorsForBooking,
  getDoctorById,
  updateByDoctorId,
} from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/all", getAllDoctorsForBooking);
router.get("/getById/:doctorId", getDoctorById); // lay bac si theo id

router.post("/", authMiddleware, roleMiddleware(["manager"]), addNewDoctor);
router.patch(
  "/updateByDoctorId/:doctorId",
  authMiddleware,
  // roleMiddleware(["manager", "doctor"]),
  updateByDoctorId
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteDoctorById
);

export default router;
