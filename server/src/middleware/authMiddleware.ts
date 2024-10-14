import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User"; // Import User model
import { AuthRequest } from "../types";

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as {
      _id: string;
      role: string;
    };

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const allowedRoles = ["staff", "doctor", "manager"];
    if (!user.isVerified && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Email not verified" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
