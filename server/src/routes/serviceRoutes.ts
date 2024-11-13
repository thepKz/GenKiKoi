import express from "express";
import {
  createNewService,
  deleteServiceById,
  getAllServices,
  updateServiceById,
} from "../controllers/serviceController";
import { authMiddleware, roleMiddleware } from "../middleware";

const router = express.Router();

router.get("/", getAllServices);

router.post("/", authMiddleware, createNewService);

router.delete("/:id", authMiddleware, deleteServiceById);

router.patch("/:id", authMiddleware, updateServiceById);

export default router;
