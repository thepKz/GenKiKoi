import { Router } from "express";
import {
  createPond,
  getAllPonds,
  getPondByID,
} from "../controllers/PondController";
import { authMiddleware } from "../middleware";

const router = Router();

// Lấy tất cả các ao
router.get("/", authMiddleware, getAllPonds);

// Lấy ao theo ID
router.get("/:id", authMiddleware, getPondByID);

// Tạo ao mới
router.post("/", authMiddleware, createPond);

export default router;
