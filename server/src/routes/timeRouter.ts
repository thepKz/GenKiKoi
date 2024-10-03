import { Router } from "express";
import {
  createTimeSlot,
  deleteTimeSlot,
  getTimeSlotById,
  getTimeSlots,
  updateTimeSlot,
} from "../controllers/timeController";
const router = Router();

router.get("/getTimes", getTimeSlots);
router.get("/getTimeById/:id", getTimeSlotById);
router.post("/createTime", createTimeSlot);
router.put("/updateTime/:id", updateTimeSlot);
router.delete("/deleteTime/:id", deleteTimeSlot);

export default router;
