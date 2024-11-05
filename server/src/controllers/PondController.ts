import { Request, Response } from "express";
import Pond from "../models/Pond";
import User from "../models/User";
import Customer from "../models/Customer";

export const getAllPonds = async (req: Request, res: Response) => {
  try {
    const ponds = await Pond.find();
    return res.status(200).json({ data: ponds });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createPond = async (req: Request, res: Response) => {
  try {
    const {
      doctorId,
      phoneNumber,
      status,
      images,
      ph,
      ammoniaLevel,
      nitrateLevel,
      oxygenLevel,
      waterTemperature,
      cleanliness,
      filtrationSystem,
      pondSize,
      notes,
      diagnosis,
    } = req.body;
    if (!phoneNumber)
      return res.status(404).json({ message: "Vui lòng nhập số điện thoại" });
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const customer = await Customer.findOne({ userId: user._id });
    if (!customer) {
      return res.status(400).json({ message: "Khách hàng không tồn tại" });
    }
    if (
      !phoneNumber ||
      !status ||
      !images ||
      !ph ||
      !ammoniaLevel ||
      !nitrateLevel ||
      !oxygenLevel ||
      !waterTemperature ||
      !cleanliness ||
      !filtrationSystem ||
      !pondSize
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }
    const pond = await Pond.create({
      customerId: customer._id,
      doctorId,
      status,
      images,
      ph,
      ammoniaLevel,
      nitrateLevel,
      oxygenLevel,
      waterTemperature,
      cleanliness,
      filtrationSystem,
      pondSize,
      notes,
      diagnosis,
    });

    return res.status(200).json({
      message: "Đã tạo hồ sơ Hồ cá thành công !",
      data: pond,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getPondByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pond = await Pond.findById(id)
      .populate({
        path: "customerId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      });
    if (!pond) {
      return res.status(400).json({ message: "Hồ không tồn tại" });
    }
    const formattedPond = {
      customerName: pond.customerId.userId.fullName,
      doctorName: pond.doctorId.userId.fullName,
      date: pond.createdAt,
      images: pond.images,
      ph: pond.ph,
      status: pond.status,
      ammoniaLevel: pond.ammoniaLevel,
      nitrateLevel: pond.nitrateLevel,
      oxygenLevel: pond.oxygenLevel,
      waterTemperature: pond.waterTemperature,
      cleanliness: pond.cleanliness,
      filtrationSystem: pond.filtrationSystem,
      pondSize: pond.pondSize,
      treatment: pond.treatment,
      notes: pond.notes,
      diagnosis: pond.diagnosis,
    };
    return res.status(200).json({ data: formattedPond });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Pond.aggregate([
      {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer",
        },
      },
      { $unwind: "$customer" },
      {
        $lookup: {
          from: "users",
          localField: "customer.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $group: {
          _id: "$customer._id",
          customerName: { $first: "$user.fullName" },
          gender: { $first: "$user.gender" },
          phoneNumber: { $first: "$user.phoneNumber" },
          numberPond: { $sum: 1 },
        },
      },
    ]);

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "Danh sách khách hàng trống" });
    }

    return res.status(200).json({ data: customers });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllPondsByCustomerId = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;
    const ponds = await Pond.find({ customerId });

    if (!ponds) {
      return res.status(404).json({ message: "Danh sách trống" });
    }

    const formattedPond = ponds.map((pond) => ({
      recordId: pond._id,
      pondSize: pond.pondSize,
      status: pond.status,
      filtrationSystem: pond.filtrationSystem,
      notes: pond.notes,
    }));

    return res.status(200).json({ data: formattedPond });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
