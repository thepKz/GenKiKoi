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

router.post("/", authMiddleware, roleMiddleware(["manager"]), createNewService);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  deleteServiceById
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["manager"]),
  updateServiceById
);

export default router;
