import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Staff, User } from "../models";
import { randomText, replaceName } from "../utils";

/**
 * API: /api/staffs/
 * Method: GET
 * PROTECTED
 */
export const getAllStaffs = async (req: Request, res: Response) => {
  try {
    const staffs = await Staff.find()
      .populate("userId", "fullName email gender")
      .select("startDate position workShift");

    if (!staffs) {
      return res.status(404).json({ message: "Danh sách nhân viên trống!" });
    }

    const formatStaff = staffs.map((staff: any) => ({
      _id: staff._id,
      fullName: staff.userId.fullName,
      gender: staff.userId.gender,
      position: staff.position,
      startDate: staff.startDate,
      workShift: staff.workShift,
      email: staff.userId.email,
    }));
    return res.status(200).json({ data: formatStaff });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getStaffByStaffId = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;

    const staff = await Staff.findById(staffId)
      .populate({
        path: "userId",
        select: "fullName gender phoneNumber email photoUrl",
      })
      .select("workShift position");

    if (!staff) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }

    const formattedData = {
      id: staff._id,
      fullName: staff.userId.fullName,
      gender: staff.userId.gender,
      phoneNumber: staff.userId.phoneNumber,
      email: staff.userId.email,
      photoUrl: staff.userId.photoUrl,
      workShift: staff.workShift,
      position: staff.position,
    };

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/staffs/
 * Method: POST
 * PROTECTED
 */
export const addNewStaff = async (req: Request, res: Response) => {
  try {
    const { fullName, gender, position, email, workShift } = req.body;

    if (!fullName || !gender || !position || !email || !workShift) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const formatEmail = email.trim().toLowerCase();

    const existUser = await User.findOne({ email: formatEmail });

    let staff = null;
    let formatStaff = null;
    let newUser = null;

    if (existUser) {
      const existStaff = await Staff.findOne({ userId: existUser._id });
      if (existStaff) {
        return res.status(400).json({ message: "Nhân viên đã tồn tại" });
      } else {
        staff = await Staff.create({
          userId: existUser._id,
          position,
          workShift,
        });

        formatStaff = {
          _id: staff._id,
          fullName: existUser.fullName,
          gender: existUser.gender,
          position: staff.position,
          startDate: staff.startDate,
          workShift: staff.workShift,
          email: existUser.email,
        };
      }
    } else {
      const username = replaceName(fullName) + "-" + randomText(5);
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash("11111111", salt);

      newUser = await User.create({
        username: username,
        email: formatEmail,
        password: hashedPass,
        fullName,
        gender,
        role: "staff",
      });

      staff = await Staff.create({
        userId: newUser._id,
        position,
        workShift,
      });

      formatStaff = {
        _id: staff._id,
        fullName: newUser.fullName,
        gender: newUser.gender,
        position: staff.position,
        startDate: staff.startDate,
        workShift: staff.workShift,
        email: newUser.email,
      };
    }

    return res.status(201).json({
      message: "Nhân viên được thêm thành công!",
      data: formatStaff,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/staffs/:id
 * Method: PATCH
 * PROTECTED
 */
export const updateStaffById = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;
    const {
      fullName,
      gender,
      position,
      email,
      workShift,
      photoUrl,
      phoneNumber,
    } = req.body;

    const existsStaff = await Staff.findById(staffId);

    if (!existsStaff) {
      return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    }

    const existsUser = await User.findOne({
      email,
      _id: { $ne: existsStaff.userId },
    });

    if (existsUser) {
      return res
        .status(400)
        .json({ message: "Email đã được sử dụng bởi người dùng khác" });
    }

    const updatedStaff = await Staff.findByIdAndUpdate(
      staffId,
      { position, workShift },
      { new: true, runValidators: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      existsStaff.userId,
      { fullName, email, gender, photoUrl, phoneNumber },
      { new: true, runValidators: true }
    );

    if (!updatedStaff || !updatedUser) {
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật thông tin" });
    }

    const updatedInfo = {
      _id: updatedStaff._id,
      fullName: updatedUser.fullName,
      gender: updatedUser.gender,
      photoUrl: updatedUser.photoUrl,
      position: updatedStaff.position,
      email: updatedUser.email,
      workShift: updatedStaff.workShift,
      startDate: updatedStaff.startDate,
    };

    return res.status(200).json({
      message: "Cập nhật thông tin nhân viên thành công",
      data: updatedInfo,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/staffs/:id
 * Method: DELETE
 * PROTECTED
 */
export const deleteStaffById = async (req: Request, res: Response) => {
  try {
    const { staffId } = req.params;

    await Staff.findByIdAndDelete(staffId);

    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
