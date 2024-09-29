import express from "express";
import {
  login,
  loginWithGoogle,
  register,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-google", loginWithGoogle);

export default router;
// HElllo