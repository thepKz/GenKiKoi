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

router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllStaffs);

router.get("/:staffId", authMiddleware, getStaffByStaffId);

router.post("/", authMiddleware, roleMiddleware(["manager"]), addNewStaff);

router.patch(
  "/:staffId",
  authMiddleware,
  updateStaffById
);

router.delete(
  "/:staffId",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteStaffById
);

export default router;
