import express from "express";
import {
  login,
  loginAdmin,
  loginWithGoogle,
  register,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/login-google", loginWithGoogle);
router.post("/login-admin", loginAdmin)

export default router;
