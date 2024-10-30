import { Response, Request } from "express";
import { Customer, User } from "../models";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find()
      .populate({
        path: "userId",
        select: "fullName gender phoneNumber email",
      })
      .select("userId");

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "Danh sách khách hàng trống" });
    }

    const formattedData = customers.map((customer) => ({
      id: customer._id,
      email: customer.userId.email,
      customerName: customer.userId.fullName ?? "",
      phoneNumber: customer.userId.phoneNumber ?? "",
      gender: customer.userId.gender ?? "",
    }));

    return res.status(200).json({ data: formattedData });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách người dùng" });
  }
};

export const getCustomerByPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res
        .status(200)
        .json({ message: "Khách hàng này chưa có trong hệ thống!" });
    }

    const customer = await Customer.findOne({ userId: user._id })
      .populate({
        path: "userId",
        select: "fullName email phoneNumber gender",
      })
      .select("city district ward detailAddress");

    if (!customer) {
      return res
        .status(200)
        .json({ message: "Khách hàng này chưa có trong hệ thống!" });
    }

    const formattedData = {
      id: customer._id,
      email: customer.userId.email,
      fullName: customer.userId.fullName,
      phoneNumber: customer.userId.phoneNumber,
      gender: customer.userId.gender,
      city: customer.city,
      district: customer.district,
      ward: customer.ward,
      detailAddress: customer.detailAddress,
    };

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
