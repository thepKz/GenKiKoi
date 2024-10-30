import express from "express";
import { getAllCustomers, getCustomerByPhoneNumber } from "../controllers/customerController";

const router = express.Router();

router.get("/", getAllCustomers);

router.post("/phoneNumber", getCustomerByPhoneNumber)

export default router;
