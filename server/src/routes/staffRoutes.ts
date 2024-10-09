import express from "express";
import { getAllStaffs } from "../controllers/staffController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllStaffs);

export default router;
