import { Request, Response } from 'express';
import Appointment from '../models/AppointmentModel.ts';
import Bill from '../models/BillModel';

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const { appointment_id, service_price, medicine_price } = req.body;

    const appointment = await Appointment.findById(appointment_id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    const newBill = new Bill({
      appointment_id,
      appointmentDate: appointment.appointmentDate,
      service_price,
      medicine_price,
      total_price: service_price + medicine_price,
      status: 'pending'
    });

    const savedBill = await newBill.save();

    res.status(201).json({
      message: 'Invoice created successfully',
      bill: savedBill
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const bills = await Bill.find().populate('appointment_id');
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getInvoiceById = async (req: Request, res: Response) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('appointment_id');
    if (!bill) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const processPayment = async (req: Request, res: Response) => {
  try {
    const { bill_id, payment_method } = req.body;

    const bill = await Bill.findById(bill_id);
    if (!bill) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Here you would integrate with the actual payment gateway (Banking, MOMO, or Visa/MasterCard)
    // For this example, we'll just update the status
    bill.status = 'paid';
    await bill.save();

    res.status(200).json({
      message: 'Payment processed successfully',
      bill: bill
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};