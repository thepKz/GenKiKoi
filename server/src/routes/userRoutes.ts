import express from "express";
import { changePassword, getUser, updateProfile } from "../controllers/userController";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.patch("/update-profile", authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);
export default router;
