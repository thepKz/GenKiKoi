import express from "express";
import {
  addNewDoctor,
  deleteDoctorById,
  getAllDoctors,
  getAllDoctorsForBooking,
  // getDoctorById,
  updateByDoctorId,
} from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

// Lấy tất cả bác sĩ
router.get("/", getAllDoctors);

router.get("/all", getAllDoctorsForBooking);

// Lấy thông tin bác sĩ theo Id
// router.get("/:doctorId", getDoctorById);

// Thêm bác sĩ mới
router.post("/", authMiddleware, roleMiddleware(["manager"]), addNewDoctor);

// Cập nhật thông tin bác sĩ theo ID
router.patch(
  "/:doctorId",
  authMiddleware,
  // roleMiddleware(["manager", "doctor"]),
  updateByDoctorId
);

// Xóa bác sĩ theo ID
router.delete(
  "/:doctorId",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteDoctorById
);

export default router;
