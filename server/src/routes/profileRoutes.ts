import express from "express";
import { changePassword, getProfile, updateProfile } from "../controllers/profileController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getProfile);
router.put("/", authMiddleware, updateProfile);
router.put("/change-password", authMiddleware, changePassword);

export default router;