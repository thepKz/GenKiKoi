import { Request, Response } from "express";
import { Staff, User } from "../models";

/**
 * API: /api/staffs/
 * Method: GET
 * PROTECTED
 */
export const getAllStaffs = async (req: Request, res: Response) => {
  try {
    const staffs = await Staff.find().populate("userId", "fullName email").select("isAvailable startDate position");

    if (!staffs) {
      return res.status(404).json({ message: "Danh sách nhân viên trống!" });
    }

    return res.status(200).json({ data: staffs });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
