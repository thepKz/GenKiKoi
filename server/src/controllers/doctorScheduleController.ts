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

export const getScheduleByUserId = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const schedules = await DoctorSchedule.find({ doctorId: doctor._id });

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

    return res.status(200).json({ data: formatSchedule });
  } catch (error: any) {
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy lịch trình",
      error: error.message,
    });
  }
};
