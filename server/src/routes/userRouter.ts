import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/getUsers", authMiddleware, getUsers);
router.get("/getUserById/:id", authMiddleware, getUserById);
router.post("/createUser", authMiddleware, createUser);
router.put("/updateUser/:id", authMiddleware, updateUser);
router.delete("/deleteUser/:id", authMiddleware, deleteUser);

export default router;
