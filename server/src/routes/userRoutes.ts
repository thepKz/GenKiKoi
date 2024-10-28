import express from "express";
import { authMiddleware } from "../middleware";
import {
  checkPhoneNumber,
  getAllUsers,
  getUser,
  toggleUserStatus,
  updateProfile,
} from "../controllers/userController";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.get("/all", authMiddleware, getAllUsers);
router.post("/check-phoneNumber", checkPhoneNumber);
router.patch("/update-profile", authMiddleware, updateProfile);
router.patch("/toggle-status/:userId", authMiddleware, toggleUserStatus);

export default router;
