import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Doctor, DoctorSchedule, User } from "../models";
import { randomText, replaceName } from "../utils";

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management
 */

/**
 * API: /api/doctors/
 * Method: GET
 * PROTECTED
 */
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find()
      .populate("userId", "fullName email gender")
      .select(
        "startDate movingService specialization licenseNumber yearOfExperience"
      );

    if (!doctors) {
      return res.status(404).json({ message: "Danh sách bác sĩ trống!" });
    }

    const formatDoctor = doctors.map((doctor: any) => ({
      _id: doctor._id,
      fullName: doctor.userId.fullName,
      gender: doctor.userId.gender,
      movingService: doctor.movingService,
      startDate: doctor.startDate,
      specialization: doctor.specialization,
      licenseNumber: doctor.licenseNumber,
      yearOfExperience: doctor.yearOfExperience,
      email: doctor.userId.email,
    }));

    return res.status(200).json({ data: formatDoctor });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/doctors/
 * METHOD: POST
 * PROTECTED
 */
export const addNewDoctor = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      gender,
      email,
      specialization,
      licenseNumber,
      yearOfExperience,
      movingService,
    } = req.body;

    if (
      !fullName ||
      !gender ||
      !specialization ||
      !email ||
      !licenseNumber ||
      !yearOfExperience ||
      !movingService
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const formatEmail = email.trim().toLowerCase();

    const existUser = await User.findOne({ email: formatEmail });

    let doctor = null;
    let formatDoctor = null;
    let newUser = null;

    if (existUser) {
      const existDoctor = await Doctor.findOne({ userId: existUser._id });
      if (existDoctor) {
        return res.status(400).json({ message: "Bác sĩ đã tồn tại" });
      } else {
        doctor = await Doctor.create({
          userId: existUser._id,
          specialization,
          licenseNumber,
          yearOfExperience,
          movingService,
        });

        formatDoctor = {
          _id: doctor._id,
          fullName: existUser.fullName,
          gender: existUser.gender,
          movingService: doctor.movingService,
          specialization: doctor.specialization,
          licenseNumber: doctor.licenseNumber,
          yearOfExperience: doctor.yearOfExperience,
          startDate: doctor.startDate,
          email: existUser.email,
        };
      }
    } else {
      const username = replaceName(fullName) + "-" + randomText(5);
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash("11111111", salt);

      newUser = await User.create({
        username: username,
        email: formatEmail,
        password: hashedPass,
        fullName,
        gender,
        role: "doctor",
      });

      doctor = await Doctor.create({
        userId: newUser._id,
        specialization,
        licenseNumber,
        yearOfExperience,
        movingService,
      });

      formatDoctor = {
        _id: doctor._id,
        fullName: newUser.fullName,
        gender: newUser.gender,
        movingService: doctor.movingService,
        specialization: doctor.specialization,
        licenseNumber: doctor.licenseNumber,
        yearOfExperience: doctor.yearOfExperience,
        startDate: doctor.startDate,
        email: newUser.email,
      };
    }

    return res.status(201).json({
      message: "Nhân viên được thêm thành công!",
      data: formatDoctor,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/doctors/:id
 * Method: PATCH
 * PROTECTED
 */
export const updateByDoctorId = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;
    const {
      photoUrl,
      images,
      fullName,
      gender,
      email,
      phoneNumber,
      specialization,
      licenseNumber,
      yearOfExperience,
      movingService,
      introduction,
    } = req.body;

    const existsDoctor = await Doctor.findById(doctorId);

    if (!existsDoctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    // check email khong duoc trung voi tai khoan khac
    const checkEmail = await User.findOne({
      email,
      _id: { $ne: existsDoctor.userId },
    });

    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "Email đã được sử dụng bởi người dùng khác" });
    }
    // check sdt k ddc trung voi tai khoan khac
    const checkPhoneNumber = await User.findOne({
      phoneNumber,
      _id: { $ne: existsDoctor.userId },
    });

    if (checkPhoneNumber) {
      return res
        .status(400)
        .json({ message: "Số điện thoại đã được sử dụng bởi người dùng khác" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
        images,
        introduction,
        specialization,
        licenseNumber,
        yearOfExperience,
        movingService,
      },
      { new: true, runValidators: true }
    );

    const updatedUser = await User.findByIdAndUpdate(
      existsDoctor.userId,
      {
        photoUrl,
        fullName,
        gender,
        email,
        phoneNumber,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor || !updatedUser) {
      return res
        .status(500)
        .json({ message: "Có lỗi xảy ra khi cập nhật thông tin" });
    }

    const updatedInfo = {
      _id: updatedDoctor._id,
      images: updatedDoctor.images,
      photoUrl: updatedUser.photoUrl,
      fullName: updatedUser.fullName,
      gender: updatedUser.gender,
      movingService: updatedDoctor.movingService,
      specialization: updatedDoctor.specialization,
      licenseNumber: updatedDoctor.licenseNumber,
      yearOfExperience: updatedDoctor.yearOfExperience,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      introduction: updatedDoctor.introduction,
    };

    return res.status(200).json({
      message: "Cập nhật thông tin bác sĩ thành công",
      data: updatedInfo,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/doctors/:id
 * METHOD: DELETE
 * PROTECTED
 */
export const deleteDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;

    await Doctor.findByIdAndDelete(doctorId);

    return res.status(200).json({ message: "Xóa thành công" });
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

/**
 * API: /api/doctors/:doctorId
 * METHOD: GET
 * PROTECTED
 */
export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;
    const doctor = await Doctor.findById(doctorId).populate(
      "userId",
      "photoUrl images email fullName phoneNumber gender"
    );

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }
    const formatDoctor = {
      _id: doctor._id,
      photoUrl: doctor.userId.photoUrl,
      images: doctor.images,
      email: doctor.userId.email,
      fullName: doctor.userId.fullName,
      phoneNumber: doctor.userId.phoneNumber,
      gender: doctor.userId.gender,
      movingService: doctor.movingService,
      specialization: doctor.specialization,
      licenseNumber: doctor.licenseNumber,
      yearOfExperience: doctor.yearOfExperience,
      introduction: doctor.introduction,
    };

    return res.status(200).json({
      data: formatDoctor,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getScheduleByDoctorId = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;

    const doctor = await Doctor.findById(doctorId)
      .populate({
        path: "userId",
        select: "fullName photoUrl email gender",
      })
      .select("startDate movingService");

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const doctorSchedule = await DoctorSchedule.findOne({ doctorId }).select(
      "weekSchedule.dayOfWeek"
    );

    const listDates = doctorSchedule?.weekSchedule.map(
      (date) => date.dayOfWeek
    );

    if (!doctorSchedule) {
      return res.status(404).json({ message: "Không tìm thấy lịch bác sĩ" });
    }

    const formattedData = {
      doctorName: doctor.userId.fullName,
      photoUrl: doctor.userId.photoUrl,
      email: doctor.userId.email,
      gender: doctor.userId.gender,
      startDate: doctor.startDate,
      movingService: doctor.movingService,
      doctorSchedule: listDates,
    };

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDoctorSchedule = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.doctorId;
    const { doctorSchedule, movingService } = req.body;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    doctor.movingService = movingService;
    await doctor.save();

    let schedule = await DoctorSchedule.findOne({ doctorId });
    if (!schedule) {
      schedule = new DoctorSchedule({ doctorId, weekSchedule: [] });
    }

    // Tạo một map các ngày hiện có
    const existingDays = new Map(
      schedule.weekSchedule.map((day) => [day.dayOfWeek, day])
    );

    // Cập nhật hoặc thêm mới các ngày
    const updatedWeekSchedule = doctorSchedule.map((date: any) => {
      const [day, month, year] = date.split("/").map(Number);
      const formattedDate = new Date(year, month - 1, day);
      const dayOfWeek = formattedDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      if (existingDays.has(dayOfWeek)) {
        // Giữ lại các slot đã đặt
        return existingDays.get(dayOfWeek);
      } else {
        // Thêm ngày mới với các slot trống
        return {
          dayOfWeek,
          slots: [
            { slotTime: "8:00", isBooked: false },
            { slotTime: "9:00", isBooked: false },
            { slotTime: "10:00", isBooked: false },
            { slotTime: "11:00", isBooked: false },
            { slotTime: "13:00", isBooked: false },
            { slotTime: "14:00", isBooked: false },
            { slotTime: "15:00", isBooked: false },
            { slotTime: "16:00", isBooked: false },
          ],
        };
      }
    });

    schedule.weekSchedule = updatedWeekSchedule;
    await schedule.save();

    // Lấy thông tin đã cập nhật để trả về
    const updatedDoctor = await Doctor.findById(doctorId).populate(
      "userId",
      "fullName photoUrl email gender"
    );

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const updatedSchedule = await DoctorSchedule.findOne({ doctorId }).select(
      "weekSchedule.dayOfWeek"
    );

    if (!updatedSchedule) {
      return res.status(404).json({ message: "Không tìm thấy lịch làm việc" });
    }

    const formattedData = {
      doctorName: updatedDoctor.userId.fullName,
      photoUrl: updatedDoctor.userId.photoUrl,
      email: updatedDoctor.userId.email,
      gender: updatedDoctor.userId.gender,
      startDate: updatedDoctor.startDate,
      movingService: updatedDoctor.movingService,
      doctorSchedule: updatedSchedule.weekSchedule.map((day) => day.dayOfWeek),
    };

    return res.status(200).json({
      message: "Cập nhật lịch làm việc thành công",
      data: formattedData,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
