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
  } catch (error) {}
};

export const getFishByPhoneNumber = async (req: Request, res: Response) => {
  try {
    const phoneNumber = req.params.phoneNumber;
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
      customerName: user.fullName,
      data: formattedFish,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateFish = async (req: Request, res: Response) => {
  try {
    const fishId = req.params.id;
    const { description, size, age, photoUrl, healthStatus, gender } = req.body;
    if (!description || !size || !age || !healthStatus || !gender) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }
    const fish = await Fish.findByIdAndUpdate(fishId, {
      description,
      size,
      age,
      photoUrl,
      healthStatus,
      gender,
    });
    const formattedFish = {
      _id: fish?._id,
      size: fish?.size,
      age: fish?.age,
      photoUrl: fish?.photoUrl,
      healthStatus: fish?.healthStatus,
      gender: fish?.gender,
      description: fish?.description,
    };
    return res
      .status(200)
      .json({
        message: "Cập nhật thông tin cá thành công",
        data: formattedFish,
      });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
