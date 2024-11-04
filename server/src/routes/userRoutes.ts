import express from "express";
import { authMiddleware } from "../middleware";
import {
  changePassword,
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
router.patch("/change-password", authMiddleware, changePassword);

export default router;
