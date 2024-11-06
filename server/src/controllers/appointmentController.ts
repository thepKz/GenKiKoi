import { Request, Response } from "express";
import { Doctor, DoctorSchedule, Payment, Service } from "../models";
import Appointment from "../models/Appointment";
import Customer from "../models/Customer";

export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();

    return res.status(200).json({ data: appointments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách cuộc hẹn" });
  }
};

export const getAllAppointmentsByDoctorId = async (
  req: Request,
  res: Response
) => {
  try {
    const doctorId = req.params.doctorId;

    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const appointments = await Appointment.find({
      doctorId,
      appointmentDate: { $gte: new Date() },
      status: "Đã xác nhận",
    })
      .sort({ appointmentDate: -1 })
      .populate({
        path: "customerId",
        select: "detailAddress",
        populate: {
          path: "userId",
          select: "fullName phoneNumber gender email",
        },
      })
      .populate({
        path: "serviceId",
        select: "serviceName",
      })
      .select("status appointmentDate isFeedback typeOfConsulting slotTime");

    if (!appointments || appointments.length === 0) {
      return res.status(404).json({ message: "Danh sách cuộc hẹn trống!" });
    }

    const paidAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        const payment = await Payment.findOne({
          appointmentId: appointment._id,
          status: "PAID",
        });
        if (payment) {
          return {
            id: appointment._id,
            customerName: appointment.customerId.userId.fullName,
            serviceName: appointment.serviceId.serviceName,
            phoneNumber: appointment.customerId.userId.phoneNumber,
            appointmentDate: appointment.appointmentDate,
            status: appointment.status,
            paymentStatus: payment.status,
            isFeedback: appointment.isFeedback,
            slotTime: appointment.slotTime,
            typeOfConsulting: appointment.typeOfConsulting,
            googleMeetLink: doctor.googleMeetLink,
            detailAddress: appointment.customerId.detailAddress,
            gender: appointment.customerId.userId.gender,
            email: appointment.customerId.userId.email,
          };
        }
        return null;
      })
    );

    const formattedData = paidAppointments.filter(
      (appointment) => appointment !== null
    );

    return res.status(200).json({ data: formattedData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi lấy danh sách cuộc hẹn" });
  }
};

export const updateStatusAppointment = async (req: Request, res: Response) => {
  const appointmentId = req.params.appointmentId;
  let { status, notes } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status:
          status === "DONE"
            ? "Đã hoàn thành"
            : status === "PENDING"
            ? "Đang chờ xử lý"
            : status === "CANCELLED"
            ? "Đã hủy"
            : "Đã xác nhận",
        notes:
          notes && notes.length > 0
            ? notes
            : status === "PENDING"
            ? "Quý khách cần thanh toán dịch vụ để được xác nhận!"
            : status === "CANCELLED"
            ? "Quý khách sẽ được hoàn tiền theo chính sách của công ty!"
            : status === "DONE"
            ? ""
            : "Quý khách vui lòng tới trước giờ hẹn 15 phút!",
      },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    // Nếu trạng thái là CANCELLED, cập nhật DoctorSchedule
    if (status === "CANCELLED") {
      const doctorSchedule = await DoctorSchedule.findOne({
        "weekSchedule.slots.appointmentIds": appointmentId,
      });

      if (doctorSchedule) {
        for (let day of doctorSchedule.weekSchedule) {
          for (let slot of day.slots) {
            const appointmentIndex =
              slot.appointmentIds?.indexOf(appointmentId);
            if (
              appointmentIndex !== -1 &&
              appointmentIndex !== undefined &&
              slot.appointmentIds
            ) {
              slot.appointmentIds.splice(appointmentIndex, 1);
              slot.currentCount = Math.max(0, slot.currentCount - 1);
              slot.isBooked = slot.currentCount >= 3;
              break;
            }
          }
        }

        await DoctorSchedule.findOneAndUpdate(
          { _id: doctorSchedule._id },
          {
            $set: {
              weekSchedule: doctorSchedule.weekSchedule,
            },
          },
          { new: true }
        );
      }
    }

    return res.status(200).json({ message: "Đã cập nhật cuộc hẹn" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi cập nhật cuộc hẹn" });
  }
};

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
      .select("_id appointmentDate status notes reasons isFeedback");

    const formattedAppointment = appointments.map((appointment: any) => ({
      appointmentId: appointment._id,
      serviceName: appointment.serviceId.serviceName,
      doctorFullName: appointment.doctorId.userId.fullName,
      appointmentDate: appointment.appointmentDate,
      status: appointment.status,
      notes: appointment.notes,
      isFeedback: appointment.isFeedback,
      reasons: appointment.reasons,
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
      doctorId,
      typeOfConsulting,
      appointmentDate,
      slotTime,
      reasons,
      doctorScheduleId,
    } = req.body;

    const customerId = req.params.customerId;

    const customer = await Customer.findById(customerId);

    const service = await Service.findOne({ serviceName });

    const doctor = await Doctor.findById(doctorId);

    const doctorSchedule = await DoctorSchedule.findById(doctorScheduleId);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found!" });
    }
    if (!customer) {
      return res.status(404).json({ message: "Customer not found!" });
    }
    if (!service) {
      return res.status(404).json({ message: "Service not found!" });
    }
    if (!doctorSchedule) {
      return res.status(404).json({ message: "Doctor Schedule not found!" });
    }

    const newAppointment = new Appointment({
      doctorId: doctor._id,
      customerId: customer._id,
      serviceId: service._id,
      appointmentDate,
      doctorScheduleId,
      slotTime,
      typeOfConsulting,
      reasons,
      notes: "Quý khách cần thanh toán dịch vụ để được xác nhận!",
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
