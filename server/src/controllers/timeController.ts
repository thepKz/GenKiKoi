import Time from "../models/TimeModel";
import { Request, Response } from "express";

export const getTimeSlots = async (req: Request, res: Response) => {
  try {
    const times = await Time.find();
    res.status(200).json(times);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getTimeSlotById = async (req: Request, res: Response) => {
  try {
    const time = await Time.findById(req.params.id);
    if (!time) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json(time);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const createTimeSlot = async (req: Request, res: Response) => {
  try {
    const time = await Time.create(req.body);
    await time.save();
    res.status(201).json(time);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const updateTimeSlot = async (req: Request, res: Response) => {
  try {
    const time = await Time.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!time) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json(time);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const deleteTimeSlot = async (req: Request, res: Response) => {
  try {
    const time = await Time.findByIdAndDelete(req.params.id);
    if (!time) {
      return res.status(404).json({ error: "Time slot not found" });
    }
    res.status(200).json({ message: "Time slot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
