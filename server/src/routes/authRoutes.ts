import express from "express";
import {
  checkEmail,
  checkUsername,
  login,
  loginAdmin,
  loginWithGoogle,
  register,
} from "../controllers/authController";

const router = express.Router();
console.log("Log message on backend");
router.post("/register", register);
router.post("/login", login);
router.post("/login-google", loginWithGoogle);
router.post("/login-admin", loginAdmin)
router.post("/check-username", checkUsername);
router.post("/check-email", checkEmail);

export default router;
