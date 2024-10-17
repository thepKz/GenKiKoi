import { Router } from "express";
import {
  getAllFish,
  getFishByPhoneNumber,
} from "../controllers/fishController";

const router = Router();

router.get("/all", getAllFish);
router.get("/getFishByPhoneNumber/:phoneNumber", getFishByPhoneNumber);

export default router;
