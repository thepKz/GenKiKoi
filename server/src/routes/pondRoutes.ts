import { Router } from "express";
import {
  createPond,
  getAllCustomers,
  getAllPonds,
  getAllPondsByCustomerId,
  getPondByID,
} from "../controllers/PondController";
import { authMiddleware } from "../middleware";

const router = Router();

router.get("/", authMiddleware, getAllPonds);

router.post("/", authMiddleware, createPond);

router.get("/customers", authMiddleware, getAllCustomers);

router.get("/customers/:customerId", authMiddleware, getAllPondsByCustomerId);

router.get("/:id", authMiddleware, getPondByID);

export default router;
