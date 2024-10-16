import { Router } from "express";
import { createPond, getAllPonds } from "../controllers/PondController";
const router = Router();

router.get("/all", getAllPonds);
router.post("/create", createPond);

export default router;
