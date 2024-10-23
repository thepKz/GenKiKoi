import { Request, Response } from "express";
import mongoose from "mongoose";
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
    const schedules = await DoctorSchedule.findOne({ doctorId });

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
    const schedule = await DoctorSchedule.findOne({ doctorId });

    if (!schedule) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch làm việc cho bác sĩ này" });
    }

    const daySchedule = schedule.weekSchedule.find(
      (day) => day.dayOfWeek === date
    );

    if (!daySchedule) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch làm việc cho ngày này" });
    }

    return res.status(200).json({ data: daySchedule.slots });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi lấy slots",
      error: error.message,
    });
  }
};

export const updateBookAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { slotTime, appointmentId, appointmentDate } = req.body;

    console.log(doctorId, slotTime, appointmentId, appointmentDate);

    if (!slotTime || !appointmentId || !appointmentDate) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ các trường" });
    }

    const doctorSchedule = await DoctorSchedule.findOne({ doctorId });

    if (!doctorSchedule) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch làm việc của bác sĩ" });
    }

    // Chuyển đổi appointmentDate thành định dạng DD/MM/YYYY
    const date = new Date(appointmentDate);
    const formattedAppointmentDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    const scheduleDate = doctorSchedule.weekSchedule.find(
      (day) => day.dayOfWeek === formattedAppointmentDate
    );

    if (scheduleDate) {
      const time = scheduleDate.slots.find((time) => time.slotTime === slotTime);
      if (time) {
        time.isBooked = true;
        time.appointmentId = new mongoose.Types.ObjectId(appointmentId);
      } else {
        return res.status(404).json({ message: "Không tìm thấy slot thời gian này" });
      }
    } else {
      return res.status(404).json({ message: "Không tìm thấy ngày này trong lịch làm việc" });
    }

    await doctorSchedule.save();

    return res.status(200).json({ message: "Đặt slot thành công" });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      message: "Đã xảy ra lỗi khi cập nhật lịch làm việc",
      error: error.message,
    });
  }
};

// export const createOrUpdateDoctorSchedule = async (
//   req: Request,
//   res: Response
// ) => {
//   const { doctorId, weekSchedule } = req.body;

//   try {
//     let schedule = await DoctorSchedule.findOne({ doctorId });

//     if (schedule) {
//       schedule.weekSchedule = weekSchedule;
//       await schedule.save();
//     } else {
//       schedule = new DoctorSchedule({ doctorId, weekSchedule });
//       await schedule.save();
//     }

//     return res
//       .status(200)
//       .json({ message: "Lịch làm việc đã được cập nhật", data: schedule });
//   } catch (error: any) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Đã xảy ra lỗi khi cập nhật lịch làm việc",
//       error: error.message,
//     });
//   }
// };
