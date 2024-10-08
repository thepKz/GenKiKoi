import express from "express";
import { getAllDoctors } from "../controllers/doctorController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllDoctors);

export default router;
