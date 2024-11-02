import express from "express";
import { authMiddleware, roleMiddleware } from "../middleware";

import {
  getAllCustomers,
  getCustomerByPhoneNumber,
  updateProfileByCustomerId,
  getTotalCustomers,
} from "../controllers/customerController";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["manager", "staff"]),
  getAllCustomers
);

router.patch("/:customerId", updateProfileByCustomerId);

router.post("/phoneNumber", getCustomerByPhoneNumber);

router.get("/total", getTotalCustomers);

export default router;
