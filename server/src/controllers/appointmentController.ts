import { Request, Response } from 'express';
import Appointment from '../models/AppointmentModel';
import Customer from '../models/CustomerModel';
import Doctor from '../models/DoctorModel';
import TimeService from '../models/TimeServiceModel';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { customerId, doctorId, timeServiceId, notes } = req.body;

    // Validate input
    if (!customerId || !doctorId || !timeServiceId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if time service exists and is available
    const timeService = await TimeService.findById(timeServiceId);
    if (!timeService || timeService.status !== 'available') {
      return res.status(400).json({ message: 'Invalid or unavailable time slot' });
    }

    // Create new appointment
    const newAppointment = new Appointment({
      customer: customerId,
      doctor: doctorId,
      timeService: timeServiceId,
      notes: notes || ''
    });

    await newAppointment.save();

    // Update time service status
    timeService.status = 'booked';
    await timeService.save();

    res.status(201).json({
      message: 'Appointment created successfully',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find()
      .populate('customer')
      .populate('doctor')
      .populate({
        path: 'timeService',
        populate: { path: 'serviceId' }
      });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAppointmentById = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('customer')
      .populate('doctor')
      .populate({
        path: 'timeService',
        populate: { path: 'serviceId' }
      });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { customerId, doctorId, timeServiceId, notes, status } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update fields if provided
    if (customerId) appointment.customer = customerId;
    if (doctorId) appointment.doctor = doctorId;
    if (notes !== undefined) appointment.notes = notes;
    if (status) appointment.status = status;

    // Handle time service change
    if (timeServiceId && timeServiceId !== appointment.timeService.toString()) {
      const oldTimeService = await TimeService.findById(appointment.timeService);
      const newTimeService = await TimeService.findById(timeServiceId);

      if (!newTimeService || newTimeService.status !== 'available') {
        return res.status(400).json({ message: 'Invalid or unavailable new time slot' });
      }

      // Update old time service status
      if (oldTimeService) {
        oldTimeService.status = 'available';
        await oldTimeService.save();
      }

      // Update new time service status
      newTimeService.status = 'booked';
      await newTimeService.save();

      appointment.timeService = timeServiceId;
    }

    await appointment.save();

    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const cancelAppointment = async (req: Request, res: Response) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Update appointment status
    appointment.status = 'cancelled';
    await appointment.save();

    // Update time service status
    const timeService = await TimeService.findById(appointment.timeService);
    if (timeService) {
      timeService.status = 'available';
      await timeService.save();
    }

    res.status(200).json({ message: 'Appointment cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};