import { Router } from "express";
import {
  getAllFish,
  getAllFishesByCustomerId,
  getFishByPhoneNumber,
} from "../controllers/fishController";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/", authMiddleware, getAllFish);

router.get("/:customerId", authMiddleware, getAllFishesByCustomerId);

router.get("/phone/:phoneNumber/", authMiddleware, getFishByPhoneNumber);

export default router;
