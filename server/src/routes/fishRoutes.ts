import { Router } from "express";
import {
  getAllFish,
  getAllFishesByCustomerId,
  getFishByPhoneNumber,
  updateFish,
} from "../controllers/fishController";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/", authMiddleware, getAllFish);

router.get("/:customerId", authMiddleware, getAllFishesByCustomerId);

router.patch("/:fishId", authMiddleware, updateFish);

router.get("/customers/:phoneNumber", authMiddleware, getFishByPhoneNumber);

export default router;
