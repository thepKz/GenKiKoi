import { Request, Response } from "express";
import Assignment from "../models/AssignmentModel";

export const getAssignments = async (req: Request, res: Response) => {
  try {
    const assignments = await Assignment.find()
      .populate("timeService_id")
      .populate("doctor_id");
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};
