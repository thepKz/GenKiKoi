import { Response, Request } from "express";
import { Doctor, Service, User } from "../models";
import Appointment from "../models/Appointment";
import Customer from "../models/Customer";
import { AuthRequest } from "../types";
/**
 * Người Làm: ĐIỀN VÀO :)
 * Người Test: Thép
 * Loại Test: API TEST (Đã xong), UNIT TEST (Đang làm), E2E TEST (Đang làm)
 * Chỉnh Sửa Lần Cuối : 13/10/2024 (Thép)
 */

export const getAppointmentsByCustomerId = async (
  req: Request,
  res: Response
) => {
  try {
    const customerId = req.params.customerId;

    const appointments = await Appointment.find({
      customerId: customerId,
    })
      .populate({
        path: "doctorId",
        select: "userId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .populate({
        path: "serviceId",
        select: "serviceName",
      })
      .select("_id appointmentDate status notes");

    const formattedAppointment = appointments.map((appointment: any) => ({
      appointmentId: appointment._id,
      serviceName: appointment.serviceId.serviceName,
      doctorFullName: appointment.doctorId.userId.fullName,
      appointmentDate: appointment.appointmentDate,
      status: appointment.status,
      notes: appointment.notes,
    }));

    return res.status(200).json({ data: formattedAppointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách cuộc hẹn" });
  }
};

export const createNewAppointment = async (req: Request, res: Response) => {
  try {
    const {
      serviceName,
      doctorName,
      typeOfConsulting,
      appointmentDate,
      slotTime,
      reasons,
    } = req.body;

    const customerId = req.params.customerId;

    const customer = await Customer.findById(customerId);

    const service = await Service.findOne({ serviceName });

    const doctorAccount = await User.findOne({
      fullName: doctorName,
      role: "doctor",
    });

    const doctor = await Doctor.findOne({ userId: doctorAccount?._id });

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }
    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }

    const newAppointment = new Appointment({
      doctorId: doctor._id,
      customerId: customer._id,
      serviceId: service._id,
      appointmentDate,
      slotTime,
      typeOfConsulting,
      reasons,
    });

    const savedAppointment = await newAppointment.save();

    return res.status(200).json({
      message: "Cuộc hẹn được tạo thành công!",
      data: {
        appointmentId: savedAppointment._id,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi tạo cuộc hẹn" });
  }
};
