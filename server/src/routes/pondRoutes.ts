import { Router } from "express";
import {
  createPond,
  getAllPonds,
  getPondByID,
} from "../controllers/PondController";
const router = Router();

router.get("/all", getAllPonds);
router.get("/getPondByID/:id", getPondByID);

router.post("/create", createPond);
export default router;
