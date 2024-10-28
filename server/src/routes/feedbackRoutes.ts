import express from "express";
import { authMiddleware } from "../middleware";
import { createNewFeedback, getFeedbacksByDoctorId } from "../controllers/feedbackController";

const router = express.Router();

router.post("/", authMiddleware, createNewFeedback);

router.get("/doctor", authMiddleware, getFeedbacksByDoctorId)

export default router;
