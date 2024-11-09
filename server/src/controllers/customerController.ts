import { Response, Request } from "express";
import { Appointment, Customer, User } from "../models";

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find()
      .populate({
        path: "userId",
        select: "fullName gender phoneNumber email",
      })
      .select("userId")
      .sort({ createdAt: -1 });

    const customersWithAppointments = await Promise.all(
      customers.map(async (customer) => {
        const appointmentCount = await Appointment.countDocuments({
          customerId: customer._id,
        });
        return appointmentCount > 0 ? customer : null;
      })
    );

    const filteredCustomers = customersWithAppointments.filter(
      (customer) => customer !== null
    );

    if (!filteredCustomers || filteredCustomers.length === 0) {
      return res.status(404).json({ message: "Danh sách khách hàng trống" });
    }

    const formattedData = filteredCustomers.map((customer) => ({
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

export const updateProfileByCustomerId = async (
  req: Request,
  res: Response
) => {
  try {
    const { customerId } = req.params;

    const { fullName, gender, city, district, ward, detailAddress } = req.body;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json("Không tìm thấy khách hàng");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: customer.userId },
      {
        fullName,
        gender,
      },
      { new: true }
    );

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: customerId },
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

    const formattedData = {
      id: updatedCustomer._id,
      email: updatedUser.email,
      fullName: updatedUser.fullName,
      phoneNumber: updatedUser.phoneNumber,
      gender: updatedUser.gender,
      city: updatedCustomer.city,
      district: updatedCustomer.district,
      ward: updatedCustomer.ward,
      detailAddress: updatedCustomer.detailAddress,
    };

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
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
