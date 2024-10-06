import express from "express";
import {
  createCustomer,
  deleteCustomer,
  getCustomerById,
  getCustomers,
  searchCustomers
} from "../controllers/customerController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();
router.get("/getCustomers", authMiddleware, getCustomers);
router.get("/getCustomerById/:id", authMiddleware, getCustomerById);
router.post("/createCustomer", authMiddleware, createCustomer);
router.delete("/deleteCustomer/:id", authMiddleware, deleteCustomer);
router.get('/search', authMiddleware, searchCustomers);

export default router;
