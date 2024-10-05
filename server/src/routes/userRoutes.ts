import express from "express";
import { authMiddleware } from "../middleware";
import { getUser, updateProfile } from "../controllers/userController";

const router = express.Router();

router.get("/", authMiddleware, getUser);
router.patch("/update-profile", authMiddleware, updateProfile);

export default router;
