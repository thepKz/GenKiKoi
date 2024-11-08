import express from "express";
import {
  addNewStaff,
  deleteStaffById,
  getAllStaffs,
  getStaffByStaffId,
  updateStaffById,
} from "../controllers/staffController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", authMiddleware, getAllStaffs);

router.get("/:staffId", authMiddleware, getStaffByStaffId);

router.post("/", authMiddleware, addNewStaff);

router.patch("/:staffId", authMiddleware, updateStaffById);

router.delete("/:staffId", authMiddleware, deleteStaffById);

export default router;
