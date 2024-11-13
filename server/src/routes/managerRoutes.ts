import express from "express";
import { authMiddleware } from "../middleware";
import {
  getManagerById,
  updateByManagerId,
} from "../controllers/managerController";

const router = express.Router();

router.get("/:managerId", authMiddleware, getManagerById);
router.patch("/:managerId", authMiddleware, updateByManagerId);

export default router;
