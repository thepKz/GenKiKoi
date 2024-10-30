import express from "express";
import { getAllCustomers, getCustomerByPhoneNumber, updateProfileByCustomerId } from "../controllers/customerController";

const router = express.Router();

router.get("/", getAllCustomers);

router.patch("/:customerId", updateProfileByCustomerId)

router.post("/phoneNumber", getCustomerByPhoneNumber)

export default router;
