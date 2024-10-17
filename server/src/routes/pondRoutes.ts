import { Router } from "express";
import {
  createPond,
  getAllPonds,
  getPondByID,
} from "../controllers/PondController";
import { authMiddleware } from "../middleware";
const router = Router();

router.get("/all", authMiddleware, getAllPonds);
router.get("/getPondByID/:id", authMiddleware, getPondByID);

router.post("/create", authMiddleware, createPond); // chua phonenumber
export default router;
