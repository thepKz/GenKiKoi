import express from "express";
import { authMiddleware, roleMiddleware } from "../middleware";
import {
  getAllCustomers,
  getTotalCustomers,
} from "../controllers/customerController";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllCustomers);
router.get("/total", getTotalCustomers);
export default router;
