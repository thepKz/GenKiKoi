import { Response, Request } from "express";

import PayOS from "@payos/node";
import dotenv from "dotenv";
import Payment from "../models/Payment";
import { Appointment } from "../models";

dotenv.config();

const payOS = new PayOS(
  process.env.CLIENT_ID as string,
  process.env.API_KEY as string,
  process.env.CHECKSUM_KEY as string
);

export const createPayment = async (req: Request, res: Response) => {
  const { totalPrice, customerId, serviceName, appointmentId } = req.body;
  try {
    const body = {
      orderCode: Number(String(Date.now()).slice(-6)),
      amount: totalPrice,
      description: `Thanh toan don hang`,
      cancelUrl: "http://localhost:5173/payment-cancel",
      returnUrl: "http://localhost:5173/payment-success",
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

    if (status === "PAID") {
      const appointment = await Appointment.findById(payment.appointmentId);

      if (!appointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
      }
      appointment.status = "Đã xác nhận";
      appointment.notes = "Quý khách vui lòng tới trước giờ hẹn 15 phút!";

      await appointment.save();
    }

    if (status === "CANCELLED") {
      const appointment = await Appointment.findById(payment.appointmentId);

      if (!appointment) {
        return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
      }

      appointment.status = "Đã hủy";
      appointment.notes =
        "Quý khách sẽ được hoàn tiền theo chính sách của công ty!";

      await appointment.save();
    }

    await payment.save();

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getPaymentByAppointmentId = async (req: Request, res: Response) => {
  const appointmentId = req.params.appointmentId;
  try {
    const payment = await Payment.findOne({ appointmentId });

    if (!payment) {
      return res.status(404).json({ message: "Không tìm thấy thông tin thanh toán cho cuộc hẹn này" });
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
    return res.status(500).json({ message: "Lỗi khi lấy thông tin thanh toán", error: error.message });
  }
};


