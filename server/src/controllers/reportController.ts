import { Request, Response } from 'express';
import Appointment from '../models/AppointmentModel';
import Bill from '../models/BillModel';
import Fish from '../models/FishModel';
import Report from '../models/ReportModel';

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
    // Add other user properties as needed
  };
}

export const generateFinancialReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { startDate, endDate } = req.body;
    const bills = await Bill.find({
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    let totalRevenue = 0;

    bills.forEach(bill => {
      totalRevenue += bill.amount;
    });

    const report = new Report({
      type: 'financial',
      dateRange: { start: startDate, end: endDate },
      generatedBy: req.user?._id,
      data: {
        totalRevenue,
        billCount: bills.length
      }
    });

    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const generateAppointmentReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { startDate, endDate } = req.body;
    const appointments = await Appointment.find({
      appointmentDate: { $gte: new Date(startDate), $lte: new Date(endDate) }
    });

    const statusCounts = appointments.reduce((acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const report = new Report({
      type: 'appointment',
      dateRange: { start: startDate, end: endDate },
      generatedBy: req.user?._id,
      data: {
        totalAppointments: appointments.length,
        statusCounts
      }
    });

    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const generateFishHealthReport = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const fishes = await Fish.find();
    const healthStatusCounts = fishes.reduce((acc, fish) => {
      acc[fish.health_status] = (acc[fish.health_status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const report = new Report({
      type: 'fishHealth',
      dateRange: { start: new Date(), end: new Date() },
      generatedBy: req.user?._id,
      data: {
        totalFish: fishes.length,
        healthStatusCounts
      }
    });

    await report.save();

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getReportById = async (req: Request, res: Response) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};