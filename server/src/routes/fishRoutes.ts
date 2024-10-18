import { Router } from "express";
import {
  getAllFish,
  getFishByPhoneNumber,
} from "../controllers/fishController";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/all", authMiddleware, getAllFish);
router.get(
  "/getByPhoneNumber/:phoneNumber",
  authMiddleware,
  getFishByPhoneNumber
);

export default router;
