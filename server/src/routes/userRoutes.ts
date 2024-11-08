import express from "express";
import { authMiddleware } from "../middleware";
import {
  changePassword,
  checkEmailWithPhoneNumber,
  checkPhoneNumber,
  forgotPassword,
  getAllUsers,
  getUser,
  resetPassword,
  toggleUserStatus,
  updateProfile,
} from "../controllers/userController";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.get("/all", authMiddleware, getAllUsers);
router.post("/check-phoneNumber", checkPhoneNumber);
router.post("/check-email-with-phoneNumber", checkEmailWithPhoneNumber)
router.patch("/update-profile", authMiddleware, updateProfile);
router.patch("/toggle-status/:userId", authMiddleware, toggleUserStatus);
router.patch("/change-password", authMiddleware, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
