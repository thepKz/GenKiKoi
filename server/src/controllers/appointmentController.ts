import { Response } from "express";
import Appointment from "../models/Appointment";
import { AuthRequest } from "../middleware/authMiddleware";
import Customer from "../models/Customer";

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
