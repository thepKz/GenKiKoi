import { Request, Response } from "express";
import DoctorSchedule from "../models/DoctorSchedule";

export const getAllDoctorSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await DoctorSchedule.find().populate("doctorId");
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while fetching all schedules",
      error,
    });
  }
};

export const getScheduleByDoctorId = async (req: Request, res: Response) => {
  const doctorId = req.params.doctorId;
  try {
    const schedules = await DoctorSchedule.find({ doctorId });
    if (!schedules) {
      return res.status(404).json({ message: "Không tìm thấy lịch trình" });
    }
    const formatSchedule = schedules.map((schedule) => ({
      id: schedule._id,
      title: schedule.title,
      start: schedule.start,
      end: schedule.end,
      description: schedule.description,
    }));

    return res.status(200).json(formatSchedule);
  } catch (error: any) {
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy lịch trình",
      error: error.message,
    });
  }
};
