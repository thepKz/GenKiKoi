// Import necessary modules and models
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/UserModel";

// Extend the Request interface to include user property
interface AuthRequest extends Request {
    user?: any;
}

// Controller function to get user profile
export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user._id; // Get user ID from request (set by middleware)
        // Find user by ID and select specific fields
        const user = await User.findById(userId).select("username email photoUrl fullName phoneNumber");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to update user profile
export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const { fullName, phoneNumber, photoUrl } = req.body;

        // Update user and return updated document
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, phoneNumber, photoUrl },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to change user password
export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user._id;
        const { currentPassword, newPassword } = req.body;

        // Find user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if current password is correct
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};