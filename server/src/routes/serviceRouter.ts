import { Router } from "express";
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "../controllers/serviceController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/getServices", authMiddleware, getServices);
router.get("/getServiceById/:id", authMiddleware, getServiceById);
router.post("/createService", authMiddleware, createService);
router.put("/updateService/:id", authMiddleware, updateService);
router.delete("/deleteService/:id", authMiddleware, deleteService);

export default router;
