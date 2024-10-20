import { Response, Request } from "express";

import PayOS from "@payos/node";
import dotenv from "dotenv";
import Payment from "../models/Payment";

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

    await payment.save();

    return res.status(200).json({ message: "Cập nhật thành công" });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
