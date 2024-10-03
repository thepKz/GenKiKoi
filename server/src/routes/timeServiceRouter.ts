import { Router } from "express";
import {
  createTimeService,
  getTimeServiceById,
  getTimeServices,
} from "../controllers/timeServiceController";
const router = Router();

router.get("/getTimeServices", getTimeServices);
router.get("/getTimeServiceById/:id", getTimeServiceById);
router.post("/createTimeService", createTimeService);

export default router;
