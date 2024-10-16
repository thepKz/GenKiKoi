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
      !pondSize ||
      !notes ||
      !diagnosis
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
    return res.status(200).json({ data: pond });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
