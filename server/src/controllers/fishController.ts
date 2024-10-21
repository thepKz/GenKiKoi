import { Request, Response } from "express";
import Fish from "../models/Fish";
import { Customer, User } from "../models";

export const getAllFish = async (req: Request, res: Response) => {
  try {
    const fish = await Fish.find();
    return res.status(200).json({ data: fish });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Đoạn này t test thử
export const getAllFishesByCustomerId = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;
    const fishes = await Fish.find({ customerId });

    if (!fishes) {
      return res.status(404).json({ message: "Danh sách trống" });
    }

    return res.status(200).json({ data: fishes });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getFishByPhoneNumber = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.params;
    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const customer = await Customer.findOne({ userId: user._id });

    if (!customer) {
      return res.status(400).json({ message: "Khách hàng không tồn tại" });
    }
    const fish = await Fish.find({ customerId: customer._id });
    const formattedFish = fish.map((fish) => {
      return {
        id: fish._id,
        description: fish.description,
      };
    });
    return res.status(200).json({
      // customerName: user.fullName,
      data: formattedFish,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
