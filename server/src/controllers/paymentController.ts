import { Response, Request } from "express";
import PayOS from "@payos/node";
import dotenv from "dotenv";
import Payment from "../models/Payment";
import { Appointment, DoctorSchedule, Customer } from "../models";
import {
  sendAppointmentConfirmationEmail,
  sendOnlineAppointmentEmail,
} from "../services/emails";

dotenv.config();

const payOS = new PayOS(
  process.env.CLIENT_ID as string,
  process.env.API_KEY as string,
  process.env.CHECKSUM_KEY as string
);

export const createPaymentOnline = async (req: Request, res: Response) => {
  const { totalPrice, customerId, serviceName, appointmentId } = req.body;
  try {
    const body = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: totalPrice,
      description: `Thanh toan don hang`,
      cancelUrl: process.env.BASE_URL_CANCELLED_PAYMENT as string,
      returnUrl: process.env.BASE_URL_SUCCESS_PAYMENT as string,
      expiredAt: Math.floor(Date.now() / 1000) + 15 * 60,
    };

    const paymentLinkResponse = await payOS.createPaymentLink(body);

    await Payment.create({
      customerId: customerId,
      serviceName,
      appointmentId,
      date: new Date(),
      totalPrice,
      status: paymentLinkResponse.status,
      accountNumber: paymentLinkResponse.accountNumber,
      accountName: paymentLinkResponse.accountName,
      description: paymentLinkResponse.description,
      paymentLinkId: paymentLinkResponse.paymentLinkId,
    });

    return res.status(200).json({
      data: {
        checkoutUrl: paymentLinkResponse.checkoutUrl,
      },
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createPaymentAtCenter = async (req: Request, res: Response) => {
  const { totalPrice, customerId, serviceName, appointmentId } = req.body;
  try {
    await Payment.create({
      customerId,
      serviceName,
      appointmentId,
      date: new Date(),
      totalPrice,
      status: "PAID",
      description: "Đã thanh toán tại quầy",
    });

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    appointment.status = "Đã xác nhận";
    appointment.notes = "Quý khách vui lòng tới trước giờ hẹn 15 phút!";

    await appointment.save();

    return res.status(201).json({ message: "Tạo hóa đơn thành công" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  const paymentId = req.params.paymentId;
  try {
    const paymentLink = await payOS.getPaymentLinkInformation(paymentId);
    return res.status(200).json({ data: paymentLink });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPaymentsByCustomerId = async (req: Request, res: Response) => {
  const customerId = req.params.customerId;
  try {
    const payments = await Payment.find({ customerId });

    const formattedPayments = payments.map((payment) => ({
      date: payment.date,
      serviceName: payment.serviceName,
      totalPrice: payment.totalPrice,
      status: payment.status,
      paymentLinkId: payment.paymentLinkId,
    }));

    return res.status(200).json({ data: formattedPayments });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const updatePaymentById = async (req: Request, res: Response) => {
  const paymentId = req.params.paymentId;
  const { status } = req.body;

  try {
    const payment = await Payment.findOne({ paymentLinkId: paymentId });

    if (!payment) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    if (status) {
      payment.status = status;
    }

    const appointment = await Appointment.findById(payment.appointmentId)
      .populate({
        path: "serviceId",
        select: "serviceName",
      })
      .populate({
        path: "doctorId",
        select: "userId googleMeetLink",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .populate({
        path: "customerId",
        select: "userId",
        populate: {
          path: "userId",
          select: "fullName email",
        },
      });

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    if (status === "PAID") {
      appointment.status = "Đã xác nhận";
      appointment.notes = "Quý khách vui lòng tới trước giờ hẹn 15 phút!";

      await appointment.save();

      if (
        appointment.typeOfConsulting === "Tại phòng khám" ||
        appointment.typeOfConsulting === "Tại nhà"
      ) {
        await sendAppointmentConfirmationEmail(
          appointment.appointmentDate,
          appointment.doctorId.userId.fullName || "",
          appointment.slotTime,
          appointment.serviceId.serviceName,
          appointment.customerId.userId.fullName || "",
          appointment.typeOfConsulting,
          appointment.customerId.userId.email
        );
      } else {
        await sendOnlineAppointmentEmail(
          appointment.appointmentDate,
          appointment.doctorId.userId.fullName || "",
          appointment.slotTime,
          appointment.serviceId.serviceName,
          appointment.customerId.userId.fullName || "",
          appointment.typeOfConsulting,
          appointment.customerId.userId.email,
          appointment.doctorId.googleMeetLink
        );
      }
    }

    if (status === "CANCELLED") {
      appointment.status = "Đã hủy";
      appointment.notes = "";

      await appointment.save();
    }

    if (status === "CANCELLED") {
      const doctorSchedule = await DoctorSchedule.findOne({
        "weekSchedule.slots.appointmentIds": appointment._id.toString(),
      });

      if (doctorSchedule) {
        for (let day of doctorSchedule.weekSchedule) {
          for (let slot of day.slots) {
            const appointmentIndex = slot.appointmentIds?.indexOf(
              appointment._id.toString()
            );
            if (
              appointmentIndex !== -1 &&
              appointmentIndex !== undefined &&
              slot.appointmentIds
            ) {
              slot.appointmentIds.splice(appointmentIndex, 1);
              slot.currentCount = Math.max(0, slot.currentCount - 1);
              slot.isBooked = slot.currentCount >= 2;
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

    await payment.save();

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPaymentByAppointmentId = async (
  req: Request,
  res: Response
) => {
  const appointmentId = req.params.appointmentId;
  try {
    const payment = await Payment.findOne({ appointmentId });

    if (!payment) {
      return res.status(404).json({
        message: "Không tìm thấy thông tin thanh toán cho cuộc hẹn này",
      });
    }

    const formattedPayment = {
      date: payment.date,
      serviceName: payment.serviceName,
      totalPrice: payment.totalPrice,
      status: payment.status,
      paymentLinkId: payment.paymentLinkId,
    };

    return res.status(200).json({ data: formattedPayment });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({
      message: "Lỗi khi lấy thông tin thanh toán",
      error: error.message,
    });
  }
};

export const getTopCustomers = async (req: Request, res: Response) => {
  try {
    const topCustomers = await Payment.aggregate([
      {
        $match: {
          status: "PAID",
        },
      },
      {
        $group: {
          _id: "$customerId",
          totalAmount: { $sum: "$totalPrice" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          totalAmount: -1,
        },
      },
    ]);

    const result = await Promise.all(
      topCustomers.map(async (customer) => {
        try {
          const customerInfo = await Customer.findById(customer._id).populate(
            "userId",
            "fullName"
          );

          return {
            customerId: customer._id,
            customerName: customerInfo?.userId.fullName,
            totalAmount: customer.totalAmount,
            orderCount: customer.orderCount,
          };
        } catch (err) {
          return {
            customerId: customer._id,
            name: "Không xác định",
            totalAmount: customer.totalAmount,
            orderCount: customer.orderCount,
          };
        }
      })
    );

    return res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    console.error("Lỗi khi lấy top khách hàng:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy top khach hang",
      error: error.message,
    });
  }
};

export const getStatistics = async (req: Request, res: Response) => {
  try {
    const statistics = await Payment.aggregate([
      {
        $match: {
          status: "PAID",
        },
      },
      {
        $group: {
          _id: null,
          totalEarning: { $sum: "$totalPrice" },
          totalBooking: { $sum: 1 },
        },
      },
    ]);

    // Vì group by null nên kết quả là array với 1 phần tử
    const result = statistics[0] || {
      totalEarning: 0,
      totalBooking: 0,
    };

    return res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    console.error("Lỗi:", error);
    return res.status(500).json({
      success: false,
      message: "Lỗi khi lấy thống kê thanh toán",
      error: error.message,
    });
  }
};

export const getTopServices = async (req: Request, res: Response) => {
  try {
    const totalPayments = await Payment.countDocuments({ status: "PAID" });
    const statistics = await Payment.aggregate([
      {
        $match: {
          status: "PAID",
        },
      },
      {
        $group: {
          _id: "$serviceName",
          count: { $sum: 1 },
          firstId: { $first: "$_id" },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const result = statistics.map((item) => ({
      id: item.firstId,
      serviceName: item._id,
      count: item.count,
      percentage: ((item.count / totalPayments) * 100).toFixed(2),
    }));

    return res.status(200).json({
      data: result,
    });
  } catch (error: any) {
    console.error("Lỗi:", error);
    return res.status(500).json({
      message: "Lỗi khi lấy thống kê dịch vụ",
    });
  }
};

export const getBookingsByMonth = async (req: Request, res: Response) => {
  try {
    const bookingsByMonth = await Payment.aggregate([
      {
        $match: {
          status: "PAID",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          value: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: { $concat: ["T", { $toString: "$_id.month" }] },
          value: 1,
        },
      },
    ]);

    return res.status(200).json({
      data: bookingsByMonth,
    });
  } catch (error: any) {
    console.error("Lỗi:", error);
    return res.status(500).json({
      message: "Lỗi khi lấy thống kê cuộc hẹn theo tháng",
      error: error.message,
    });
  }
};

export const getMoneyByMonth = async (req: Request, res: Response) => {
  try {
    const moneyByMonth = await Payment.aggregate([
      {
        $match: {
          status: "PAID",
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          value: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: { $concat: ["T", { $toString: "$_id.month" }] },
          value: 1,
        },
      },
    ]);

    return res.status(200).json({
      data: moneyByMonth,
    });
  } catch (error: any) {
    console.error("Lỗi:", error);
    return res.status(500).json({
      message: "Lỗi khi lấy thống kê doanh thu theo tháng",
      error: error.message,
    });
  }
};
