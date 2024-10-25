import express from "express";
import { authMiddleware } from "../middleware";
import { createNewFeedback } from "../controllers/feedbackController";

const router = express.Router();

router.post("/", authMiddleware, createNewFeedback);

export default router;
