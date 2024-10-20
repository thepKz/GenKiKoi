import express from "express";
import {
  createPayment,
  getPayment,
  updatePayment,
} from "../controllers/paymentController";

const router = express.Router();

router.post("/create-payment", createPayment);
router.get("/:paymentId", getPayment);
router.post("/:paymentId", updatePayment);

export default router;
