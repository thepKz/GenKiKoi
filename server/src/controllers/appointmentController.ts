import { Response } from "express";
import Appointment from "../models/Appointment";
import { AuthRequest } from "../middleware/authMiddleware";
import Customer from "../models/Customer";
import { Doctor, Service, User } from "../models";

/**
 * API: /api/appointments/
 * Method: GET
 * PROTECTED
 */
export const getAppointmentsByUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    const customer = await Customer.findOne({ userId });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }

    const appointments = await Appointment.find({
      customerId: customer._id,
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
        path: "doctorSlotId",
        select: "timeServiceId",
        populate: {
          path: "timeServiceId",
          select: "serviceId",
          populate: {
            path: "serviceId",
            select: "serviceName",
          },
        },
      })
      .select("_id appointmentDate status notes");

    const formattedAppointment = appointments.map((appointment: any) => ({
      appointmentId: appointment._id,
      serviceName: appointment.doctorSlotId.timeServiceId.serviceId.serviceName,
      doctorFullName: appointment.doctorId.userId.fullName,
      appointmentDate: appointment.appointmentDate,
      status: appointment.status,
      notes: appointment.notes,
    }));

    return res.status(200).json(formattedAppointment);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách cuộc hẹn", error });
  }
};

/**
 * API: /api/appointments/
 * Method: PUT
 * PROTECTED
 */
export const createNewAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const {
      serviceName,
      doctorName,
      typeOfConsulting,
      appointmentDate,
      slotTime,
      reasons,
    } = req.body;

    const userId = req.user._id;

    const customer = await Customer.findOne({ userId });

    const service = await Service.findOne({ serviceName });

    const doctorAccount = await User.findOne({
      fullName: doctorName,
      role: "doctor",
    });

    const doctor = await Doctor.findOne({ userId: doctorAccount?._id });

    const newAppointment = new Appointment({
      doctorId: doctor?._id,
      customerId: customer?._id,
      serviceId: service?._id,
      appointmentDate,
      slotTime,
      typeOfConsulting,
      reasons,
    });

    await newAppointment.save();

    return res.status(200).json({ message: "Cuộc hẹn được tạo thành công!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi tạo cuộc hẹn"});
  }
};
