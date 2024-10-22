import { Request, Response } from "express";
import { Doctor, DoctorSchedule } from "../models";

export const getAllDoctorSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await DoctorSchedule.find().populate("doctorId");

    if (!schedules || schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch làm việc nào" });
    }

    return res.status(200).json({ data: schedules });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy lịch trình",
      error: error.message,
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
    return res.status(200).json({ data: schedules });
  } catch (error: any) {
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy lịch trình",
      error: error.message,
    });
  }
};

export const getSlotsByDoctorAndDate = async (req: Request, res: Response) => {
  const { doctorId } = req.params;
  const { date } = req.query;

  if (!date || typeof date !== "string") {
    return res.status(400).json({ message: "Ngày không hợp lệ" });
  }

  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const schedule = await DoctorSchedule.findOne({
      doctorId,
      start: { $gte: startOfDay, $lt: endOfDay },
    });

    if (!schedule) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch làm việc cho ngày này" });
    }

    return res.status(200).json({ data: schedule.slots });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy slots",
      error: error.message,
    });
  }
};
