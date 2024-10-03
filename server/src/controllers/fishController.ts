import Fish from "../models/FishModel";
import { Request, Response } from "express";

export const getFishes = async (req: Request, res: Response) => {
  try {
    const fish = await Fish.find().populate({
      path: "customer_id",
      populate: {
        path: "user_id",
        //select: "username email", // Chỉ lấy các trường cần thiết của User
      },
    });
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getFishById = async (req: Request, res: Response) => {
  try {
    const fish = await Fish.findById(req.params.id).populate("customer_id");
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
