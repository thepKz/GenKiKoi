import { Response, Request } from "express";
import PayOS from "@payos/node";
import dotenv from "dotenv";
import Payment from "../models/Payment";
import { Appointment, Customer } from "../models";

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
      cancelUrl: process.env.BASE_URL_CANCELLED_PAYMENT as string,
      returnUrl: process.env.BASE_URL_SUCCESS_PAYMENT as string,
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

    //Bước 2: Map và lấy thông tin chi tiết
    const result = await Promise.all(
      topCustomers.map(async (customer) => {
        try {
          const customerInfo = await Customer.findById(customer._id).populate(
            "userId",
            "fullName"
          );

          return {
            customerId: customer._id,
            name: customerInfo?.userId?.fullName || "Không xác định",
            totalAmount: customer.totalAmount,
            orderCount: customer.orderCount,
          };
        } catch (err) {
          // Nếu không tìm thấy thông tin khách hàng, vẫn trả về dữ liệu cơ bản
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
