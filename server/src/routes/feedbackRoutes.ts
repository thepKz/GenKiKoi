import express from "express";
import { createNewFeedback, getAllPublicFeedbacks, getFeedbacksByDoctorId } from "../controllers/feedbackController";
import { authMiddleware } from "../middleware";

const router = express.Router();

router.post("/", authMiddleware, createNewFeedback);

router.get("/doctor", authMiddleware, getFeedbacksByDoctorId)

router.get("/public", getAllPublicFeedbacks);
export default router;
