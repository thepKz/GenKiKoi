import express from "express";
import { getAllCustomers } from "../controllers/customerController";

const router = express.Router();

router.get("/", getAllCustomers);

export default router;
