import express from "express";
import { createBill, getBillsByCustomer, updateBillStatus } from "../controllers/billController";
import { authMiddleware, roleMiddleware } from "../middleware";
const billRoutes = express.Router();

// Allow manager, doctor, and staff to create a bill
billRoutes.post("/create", authMiddleware, roleMiddleware(["manager", "staff"]), createBill);

// Allow manager, doctor, and staff to update bill status
billRoutes.patch("/update-status", authMiddleware, roleMiddleware(["manager", "staff"]), updateBillStatus);

// Customers can still access their own bills
billRoutes.get("/customer/:customerId", authMiddleware, getBillsByCustomer);

export default billRoutes;
