import express from "express";
import {
  checkEmail,
  checkUsername,
  login,
  loginWithGoogle,
  register,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-google", loginWithGoogle);
router.post("/check-username", checkUsername);
router.post("/check-email", checkEmail);

export default router;
