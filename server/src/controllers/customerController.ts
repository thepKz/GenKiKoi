import { Request, Response } from "express";
import { Customer } from "../models";

export const getAllCustomers = async (req: Request, res: Response) => {
  const customers = await Customer.find().populate(
    "userId",
    "fullName email phoneNumber gender"
  );
  const formattedCustomers = customers.map((customer) => ({
    _id: customer._id,
    fullName: customer?.userId?.fullName,
    email: customer?.userId?.email,
    phoneNumber: customer?.userId?.phoneNumber,
    gender: customer?.userId?.gender,
  }));
  res.status(200).json(formattedCustomers);
};

export const getTotalCustomers = async (req: Request, res: Response) => {
  try {
    const totalCustomers = await Customer.countDocuments();

    return res.status(200).json({
      data: {
        totalCustomers,
      },
    });
  } catch (error: any) {
    console.error("Lỗi:", error);
    return res.status(500).json({
      message: "Lỗi khi lấy số lượng khách hàng",
    });
  }
};
