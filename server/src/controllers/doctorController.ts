import { Request, Response } from "express";
import { Doctor } from "../models";

/**
 * API: /api/doctors/
 * Method: GET
 * PROTECTED
 */
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "fullName email gender")
      .select("startDate movingService");

    if (!doctors) {
      return res.status(404).json({ message: "Danh sách bác sĩ trống!" });
    }

    const formatDoctor = doctors.map((doctor: any) => ({
      staffId: doctor._id,
      fullName: doctor.userId.fullName,
      gender: doctor.userId.gender,
      position: doctor.movingService,
      startDate: doctor.startDate,
      email: doctor.userId.email,
    }));

    return res.status(200).json({ data: formatDoctor });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/doctors/all
 * Method: GET
 * UNPROTECTED
 */
export const getAllDoctorsForBooking = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({}, "fullName").populate(
      "userId",
      "fullName"
    );

    if (!doctors || doctors.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ nào" });
    }

    const doctorList = doctors.map((doctor: any) => ({
      id: doctor._id,
      fullName: doctor.userId ? doctor.userId.fullName : doctor.fullName,
    }));

    return res.status(200).json({ data: doctorList });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
