import { Request, Response } from "express";
import { Doctor } from "../models";

/**
 * API: /api/doctors/
 * Method: GET
 * PROTECTED
 */
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();

    if (!doctors) {
      return res.status(404).json({ message: "Danh sách bác sĩ trống!" });
    }

    return res.status(200).json({ data: doctors });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
