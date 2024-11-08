import { Request, Response } from "express";
import { Doctor, DoctorSchedule } from "../models";

export const getAllDoctorSchedules = async (req: Request, res: Response) => {
  try {
    const schedules = await DoctorSchedule.find()
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "fullName email gender photoUrl",
        },
        select: "movingService _id",
      })
      .select("weekSchedule.dayOfWeek");

    if (!schedules || schedules.length === 0) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch làm việc nào" });
    }

    const formattedData = schedules.map((schedule) => ({
      id: schedule._id,
      doctorId: schedule.doctorId._id,
      doctorName: schedule.doctorId.userId.fullName,
      photoUrl: schedule.doctorId.userId.photoUrl,
      email: schedule.doctorId.userId.email,
      gender: schedule.doctorId.userId.gender,
      movingService: schedule.doctorId.movingService,
      weekSchedule: schedule.weekSchedule,
    }));

    return res.status(200).json({ data: formattedData });
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

export const getViewCalendarByDoctorId = async (
  req: Request,
  res: Response
) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId)
      .populate({
        path: "userId",
        select: "fullName",
      })
      .select("userId");

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const doctorName = doctor.userId.fullName;

    const schedule = await DoctorSchedule.findOne({ doctorId });

    if (!schedule) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy lịch của bác sĩ" });
    }

    const formattedSchedule = schedule.weekSchedule.flatMap((day) => {
      const [dayPart, monthPart, yearPart] = day.dayOfWeek.split("/");
      const date = new Date(`${yearPart}-${monthPart}-${dayPart}`);
      const dateString = date.toISOString().split("T")[0];

      const morningSlots = day.slots.filter((slot) => {
        const hour = parseInt(slot.slotTime.split(":")[0]);
        return hour >= 8 && hour < 12;
      });

      const afternoonSlots = day.slots.filter((slot) => {
        const hour = parseInt(slot.slotTime.split(":")[0]);
        return hour >= 13 && hour < 17;
      });

      const events = [];

      if (morningSlots.length > 0) {
        events.push({
          id: `${dateString}-morning`,
          title: "Ca sáng",
          start: `${dateString} 08:00`,
          end: `${dateString} 12:00`,
          description: "Ca sáng",
        });
      }

      if (afternoonSlots.length > 0) {
        events.push({
          id: `${dateString}-afternoon`,
          title: "Ca chiều",
          start: `${dateString} 13:00`,
          end: `${dateString} 17:00`,
          description: "Ca chiều",
        });
      }

      return events;
    });

    return res
      .status(200)
      .json({ data: { schedules: formattedSchedule, doctorName: doctorName } });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: "Lỗi server", error: error.message });
  }
};

export const updateBookAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorId } = req.params;
    const { slotTime, appointmentId, appointmentDate } = req.body;

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
    const formattedAppointmentDate = `${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    const scheduleDate = doctorSchedule.weekSchedule.find(
      (day) => day.dayOfWeek === formattedAppointmentDate
    );

    if (!scheduleDate) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy ngày này trong lịch làm việc" });
    }

    const slot = scheduleDate.slots.find((time) => time.slotTime === slotTime);

    if (!slot) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy slot thời gian này" });
    }

    // Kiểm tra số lượng bệnh nhân trong slot
    if (slot.currentCount >= 2) {
      return res
        .status(400)
        .json({ message: "Slot này đã đạt số lượng tối đa" });
    }

    // Cập nhật thông tin slot
    slot.currentCount += 1;

    // Khởi tạo mảng appointmentIds nếu chưa có
    if (!Array.isArray(slot.appointmentIds)) {
      slot.appointmentIds = [];
    }

    // Thêm appointmentId mới vào mảng
    slot.appointmentIds.push(appointmentId);

    // Cập nhật trạng thái isBooked nếu đạt số lượng tối đa
    slot.isBooked = slot.currentCount >= 2;

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
