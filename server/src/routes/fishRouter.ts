import express from "express";
import { getFishes, getFishById } from "../controllers/fishController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/getFishes", getFishes);
router.get("/getFishById/:id", getFishById);

export default router;
