import express from "express";
import {
  addNewStaff,
  deleteStaffById,
  getAllStaffs,
  getStaffById,
  updateStaffById,
} from "../controllers/staffController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllStaffs);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager", "staff"]),
  getStaffById
);

router.post("/", authMiddleware, roleMiddleware(["manager"]), addNewStaff);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  updateStaffById
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteStaffById
);

export default router;
