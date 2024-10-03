import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/getDoctors", authMiddleware, getDoctors);
router.get("/getDoctorById/:id", authMiddleware, getDoctorById);
router.post("/createDoctor", authMiddleware, createDoctor);
router.put("/updateDoctor/:id", authMiddleware, updateDoctor);
router.delete("/deleteDoctor/:id", authMiddleware, deleteDoctor);

export default router;
