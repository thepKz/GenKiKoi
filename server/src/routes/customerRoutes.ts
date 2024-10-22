import express from "express";
import { authMiddleware, roleMiddleware } from "../middleware";
import { getAllCustomers } from "../controllers/customerController";

const router = express.Router();

router.get("/", authMiddleware, roleMiddleware(["manager"]), getAllCustomers);
export default router;
