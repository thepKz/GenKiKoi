import express from "express";
import {
  createNewService,
  getAllServices,
} from "../controllers/serviceController";

const router = express.Router();

router.get("/", getAllServices);
router.post("/create-service", createNewService);

export default router;
