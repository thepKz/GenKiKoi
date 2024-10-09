import { Response } from "express";
import { Customer, User } from "../models";
import { AuthRequest } from "../types";
import { ICustomer } from "../types/customer";

/**
 * API: api/users/
 * METHOD: GET
 * PROTECTED
 */
export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Không tìm thấy ID người dùng" });
    }

    const customer: ICustomer | null = await Customer.findOne({ userId })
      .populate(
        "userId",
        "username email photoUrl fullName phoneNumber photoUrl gender"
      )
      .select("detailAddress city district ward");

    console.log(customer);

    if (!customer) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin khách hàng" });
    }

    const formattedProfile = {
      email: customer.userId.email,
      username: customer.userId.username,
      fullName: customer.userId.fullName || null,
      phoneNumber: customer.userId.phoneNumber || null,
      photoUrl: customer.userId.photoUrl || null,
      gender: customer.userId.gender || null,
      city: customer.city || null,
      district: customer.district || null,
      ward: customer.ward || null,
      detailAddress: customer.detailAddress || null,
    };
    return res.status(200).json({ data: formattedProfile });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi xử lý yêu cầu",
    });
  }
};

/**
 * API: /api/users/update-profile
 * METHOD: PATCH
 * PROTECTED
 */
export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
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

    await User.findOneAndUpdate(
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

    await Customer.findOneAndUpdate(
      { userId },
      {
        city,
        district,
        ward,
        detailAddress,
      },
      { new: true }
    );

    return res.status(200).json({ message: "Cập nhật thành công!" });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};