import { Request, Response } from "express";
import { Staff, User } from "../models";

/**
 * API: /api/staffs/
 * Method: GET
 * PROTECTED
 */
export const getAllStaffs = async (req: Request, res: Response) => {
  try {
    const staffs = await Staff.find()
      .populate("userId", "fullName email gender")
      .select("startDate position");

    if (!staffs) {
      return res.status(404).json({ message: "Danh sách nhân viên trống!" });
    }

    const formatStaff = staffs.map((staff: any) => ({
      staffId: staff._id,
      fullName: staff.userId.fullName,
      gender: staff.userId.gender,
      position: staff.position,
      startDate: staff.startDate,
      email: staff.userId.email,
    }));
    return res.status(200).json({ data: formatStaff });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
