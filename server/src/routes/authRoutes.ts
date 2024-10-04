import express from "express";
import {
  getCustomer,
  login,
  loginWithGoogle,
  register,
} from "../controllers/authController";

import { authMiddleware } from "../middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-google", loginWithGoogle);
router.get("/", authMiddleware, getCustomer);

export default router;
