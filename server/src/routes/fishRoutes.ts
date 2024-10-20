import { Router } from "express";
import {
  getAllFish,
  getAllFishesByCustomerId,
  getFishByPhoneNumber,
} from "../controllers/fishController";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/all", authMiddleware, getAllFish);

router.get("/:customerId", authMiddleware, getAllFishesByCustomerId);

router.get(
  "/getByPhoneNumber/:phoneNumber",
  authMiddleware,
  getFishByPhoneNumber
);

export default router;
