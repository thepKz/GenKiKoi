import { Response, Request } from "express";
import { Customer } from "../models";

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
