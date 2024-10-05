import express from "express";
import { authMiddleware } from "../middleware";
import { getUser } from "../controllers/userController";

const router = express.Router();

router.get("/", authMiddleware, getUser);

export default router;
