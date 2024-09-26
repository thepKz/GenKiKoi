import express from "express";
import {
  register,
  login,
  loginWithGoogle,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-google", loginWithGoogle);

export default router;
