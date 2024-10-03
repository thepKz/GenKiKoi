import TimeService from "../models/timeServiceModel";
import { Request, Response } from "express";

export const getTimeServices = async (req: Request, res: Response) => {
  try {
    const timeServices = await TimeService.find()
      .populate("service_id")
      .populate("timeSlot_id");
    res.status(200).json(timeServices);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const getTimeServiceById = async (req: Request, res: Response) => {
  try {
    const timeService = await TimeService.findById(req.params.id)
      .populate("service_id")
      .populate("timeSlot_id");
    res.status(200).json(timeService);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
export const createTimeService = async (req: Request, res: Response) => {
  try {
    const timeService = await TimeService.create(req.body);
    res.status(201).json(timeService);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
