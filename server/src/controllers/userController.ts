import bcrypt from 'bcrypt';
import { Response } from "express";
import { Customer, User } from "../models";
import { AuthRequest } from "../types";
import { ICustomer } from "../types/customer";
import { IUser } from "../types/user";

/**
 * Người Làm: Thép, Dũng
 * Người Test: Thép
 * Loại Test: API TEST (Đã xong), UNIT TEST (Đang làm), E2E TEST (Đang làm)
 * Chỉnh Sửa Lần Cuối : 14/10/2024 (Thép)
*/


export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    console.log("userId:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Không tìm thấy ID người dùng" });
    }

    let customer: ICustomer | null = await Customer.findOne({ userId: userId })
      .populate(
        "userId",
        "username email photoUrl fullName phoneNumber photoUrl gender isVerified"
      )
      .select("detailAddress city district ward");

    console.log("customer:", customer);

    if (!customer) {
      // If customer is not found, create a new one
      const user = await User.findById(userId);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Không tìm thấy thông tin người dùng" });
      }
      const newCustomer = await Customer.create({ userId: user._id });
      customer = await Customer.findById(newCustomer._id).populate<{
        userId: IUser;
      }>(
        "userId",
        "username email photoUrl fullName phoneNumber photoUrl gender"
      );
      if (!customer) {
        throw new Error("Failed to create and populate new customer");
      }
    }

    const formattedProfile = {
      email: customer?.userId.email,
      username: customer?.userId.username,
      fullName: customer?.userId.fullName,
      phoneNumber: customer?.userId.phoneNumber,
      photoUrl: customer?.userId.photoUrl,
      gender: customer?.userId.gender,
      isVerified: customer?.userId.isVerified,
      city: customer?.city || null,
      district: customer?.district || null,
      ward: customer?.ward || null,
      detailAddress: customer?.detailAddress || null,
    };
    return res.status(200).json({ data: formattedProfile });
  } catch (error: any) {
    console.log("Error in getUser:", error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi xử lý yêu cầu",
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const {
      username,
      fullName,
      phoneNumber,
      gender,
      city,
      district,
      ward,
      photoUrl,
      detailAddress,
    } = req.body;

    const formatUsername = username.toLowerCase();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      {
        username: formatUsername,
        fullName,
        phoneNumber,
        photoUrl,
        gender,
      },
      { new: true }
    );

    const updatedCustomer = await Customer.findOneAndUpdate(
      { userId },
      {
        city,
        district,
        ward,
        detailAddress,
      },
      { new: true }
    );

    if (!updatedCustomer || !updatedUser) {
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật thông tin" });
    }

    const formattedUser = {
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      photoUrl: updatedUser.photoUrl,
    };

    return res
      .status(200)
      .json({ message: "Cập nhật thành công!", data: formattedUser });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Không tìm thấy ID người dùng" });
    }

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "Mật khẩu mới không khớp" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Mật khẩu hiện tại không đúng" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedNewPassword;
    await user.save();

    return res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
