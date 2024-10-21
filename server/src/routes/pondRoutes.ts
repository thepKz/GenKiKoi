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

// Lấy tất cả các ao
router.get("/", authMiddleware, getAllPonds);

router.post("/", authMiddleware, createPond);

router.get("/customers", authMiddleware, getAllCustomers);

router.get("/customers/:customerId", authMiddleware, getAllPondsByCustomerId);

// Lấy ao theo ID
router.get("/:id", authMiddleware, getPondByID);

// Tạo ao mới

export default router;
