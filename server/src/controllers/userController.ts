import { Response, Request } from "express";
import { Customer, User } from "../models";
import { AuthRequest } from "../types";
import { ICustomer } from "../models/Customer";
import { IUser } from "../models/User";
import bcrypt from "bcryptjs";

export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Không tìm thấy ID người dùng" });
    }

    let customer: ICustomer | null = await Customer.findOne({ userId: userId })
      .populate(
        "userId",
        "username email photoUrl fullName phoneNumber photoUrl gender"
      )
      .select("detailAddress city district ward");

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

    const userUpdateData: any = {
      fullName,
      phoneNumber,
      photoUrl,
      gender,
    };

    if (username) {
      userUpdateData.username = username.toLowerCase();
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      userUpdateData,
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
      id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      photoUrl: updatedUser.photoUrl,
      customerId: updatedCustomer._id,
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

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    if (!users || users.length === 0) {
      return res.status(404).json("Danh sách tài khoản trống");
    }

    const formattedData = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      photoUrl: user.photoUrl ?? "",
      fullName: user.fullName ?? "",
      phoneNumber: user.phoneNumber ?? "",
      role: user.role,
      isDisabled: user.isDisabled,
    }));

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    user.isDisabled = !user.isDisabled;
    await user.save();

    return res.status(200).json({
      data: user,
    });
  } catch (error: any) {
    return res.status(500).json({
      message:
        error.message || "Đã xảy ra lỗi khi cập nhật trạng thái tài khoản",
    });
  }
};

export const checkPhoneNumber = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  const user = await User.findOne({ phoneNumber });
  return res.status(200).json({ exists: !!user, userId: user?._id });
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { password, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        message: "Mật khẩu hiện tại không đúng",
        password: "Mật khẩu hiện tại không đúng"
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message || "Đã xảy ra lỗi khi đổi mật khẩu"
    });
  }
};
