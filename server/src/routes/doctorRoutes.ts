import express from "express";
import {
  getAllDoctors,
  getAllDoctorsForBooking,
} from "../controllers/doctorController";

const router = express.Router();

router.get("/", getAllDoctors);
router.get("/all", getAllDoctorsForBooking);

export default router;
