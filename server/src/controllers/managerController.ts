import { Request, Response } from "express";
import Manager from "../models/Manager";
import User from "../models/User";

export const getManagerById = async (req: Request, res: Response) => {
  try {
    const { managerId } = req.params;

    const manager = await Manager.findById(managerId).populate({
      path: "userId",
      select: "email fullName phoneNumber gender photoUrl",
    });

    if (!manager) {
      return res.status(404).json({ message: "Không tìm thấy quản lý" });
    }

    const formattedData = {
      email: manager.userId.email,
      fullName: manager.userId.fullName,
      phoneNumber: manager.userId.phoneNumber,
      gender: manager.userId.gender,
      photoUrl: manager.userId.photoUrl,
      position: manager.position,
      startDate: manager.startDate,
    };

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateByManagerId = async (req: Request, res: Response) => {
  try {
    const managerId = req.params.managerId;
    const {
      photoUrl,
      fullName,
      gender,
      email,
      phoneNumber,
    } = req.body;

    const existsManager = await Manager.findById(managerId);

    if (!existsManager) {
      return res.status(404).json({ message: "Không tìm thấy quản lý" });
    }

    // Kiểm tra email không được trùng với tài khoản khác
    if (email) {
      const checkEmail = await User.findOne({
        email,
        _id: { $ne: existsManager.userId },
      });

      if (checkEmail) {
        return res
          .status(400)
          .json({ message: "Email đã được sử dụng bởi người dùng khác" });
      }
    }

    // Kiểm tra số điện thoại không được trùng với tài khoản khác
    if (phoneNumber) {
      const checkPhoneNumber = await User.findOne({
        phoneNumber,
        _id: { $ne: existsManager.userId },
      });

      if (checkPhoneNumber) {
        return res.status(400).json({
          message: "Số điện thoại đã được sử dụng bởi người dùng khác",
        });
      }
    }

    // Cập nhật thông tin user
    const updatedUser = await User.findByIdAndUpdate(
      existsManager.userId,
      {
        photoUrl,
        fullName,
        gender,
        email,
        phoneNumber,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật thông tin" });
    }

    const updatedInfo = {
      id: existsManager._id,
      photoUrl: updatedUser.photoUrl,
      fullName: updatedUser.fullName,
      gender: updatedUser.gender,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      position: existsManager.position,
      startDate: existsManager.startDate,
    };

    return res.status(200).json({
      message: "Cập nhật thông tin quản lý thành công",
      data: updatedInfo,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
