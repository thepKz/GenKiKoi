import express from "express";
import {
  createDoctor,
  deleteDoctor,
  getDoctorById,
  getDoctors,
  updateDoctor,
} from "../controllers/doctorController";

const router = express.Router();
router.get("/getDoctors", getDoctors);
router.get("/getDoctorById/:id", getDoctorById);
router.post("/createDoctor", createDoctor);
router.put("/updateDoctor/:id", updateDoctor);
router.delete("/deleteDoctor/:id", deleteDoctor);

export default router;
