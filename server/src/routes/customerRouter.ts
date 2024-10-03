import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
} from "../controllers/customerController";

const router = express.Router();
router.get("/getCustomers", authMiddleware, getCustomers);
router.get("/getCustomerById/:id", authMiddleware, getCustomerById);
router.post("/createCustomer", authMiddleware, createCustomer);
router.delete("/deleteCustomer/:id", authMiddleware, deleteCustomer);

export default router;
