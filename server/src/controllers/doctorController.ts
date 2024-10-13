import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { Doctor, User } from "../models";
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
 * API: /api/staffs/:id
 * Method: PATCH
 * PROTECTED
 */
export const updateDoctorById = async (req: Request, res: Response) => {
  try {
    const doctorId = req.params.id;
    const {
      fullName,
      gender,
      email,
      specialization,
      licenseNumber,
      yearOfExperience,
      movingService,
    } = req.body;

    // if (
    //   !fullName ||
    //   !gender ||
    //   !specialization ||
    //   !email ||
    //   !licenseNumber ||
    //   !yearOfExperience ||
    //   !movingService
    // ) {
    //   return res
    //     .status(400)
    //     .json({ message: "Vui lòng điền đầy đủ thông tin" });
    // }

    const existsDoctor = await Doctor.findById(doctorId);

    if (!existsDoctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const existsUser = await User.findOne({
      email,
      _id: { $ne: existsDoctor.userId },
    });

    if (existsUser) {
      return res
        .status(400)
        .json({ message: "Email đã được sử dụng bởi người dùng khác" });
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      {
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
        fullName,
        gender,
        email,
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
      fullName: updatedUser.fullName,
      gender: updatedUser.gender,
      movingService: updatedDoctor.movingService,
      specialization: updatedDoctor.specialization,
      licenseNumber: updatedDoctor.licenseNumber,
      yearOfExperience: updatedDoctor.yearOfExperience,
      startDate: updatedDoctor.startDate,
      email: updatedUser.email,
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
    const doctorId = req.params.id;

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
