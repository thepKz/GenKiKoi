import { Response } from "express";
import { Doctor, Service, User } from "../models";
import Appointment from "../models/Appointment";
import Customer from "../models/Customer";
import { AuthRequest } from "../types";
/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /api/appointments:
 *   get:
 *     summary: Retrieve user appointments
 *     description: Fetches a list of appointments for the authenticated user.
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Appointment list retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AppointmentList'
 *       401:
 *         description: Unauthorized - Invalid or missing token.
 *       500:
 *         description: Internal server error.
 */

export const getAppointmentsByUser = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    let customer = await Customer.findOne({ userId });

    if (!customer) {
      // If customer is not found, create a new one
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      customer = await Customer.create({ userId: user._id });
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

/**
 * @swagger
 * /api/appointments:
 *   post:
 *     summary: Create a new appointment
 *     description: Create a new appointment for a user
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Appointment details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceName
 *               - doctorName
 *               - typeOfConsulting
 *               - appointmentDate
 *               - slotTime
 *               - reasons
 *             properties:
 *               serviceName:
 *                 type: string
 *               doctorName:
 *                 type: string
 *               typeOfConsulting:
 *                 type: string
 *               appointmentDate:
 *                 type: string
 *                 format: date
 *               slotTime:
 *                 type: string
 *               reasons:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment created successfully
 *       404:
 *         description: Doctor, customer, or service not found
 *       500:
 *         description: Internal server error
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

    const userId = req.user?._id;

    const customer = await Customer.findOne({ userId });

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

    await newAppointment.save();

    return res.status(200).json({ message: "Cuộc hẹn được tạo thành công!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Lỗi khi tạo cuộc hẹn" });
  }
};
