import { Request, Response } from "express";
import mongoose from "mongoose";
import Appointment from "../models/Appointment";
import Bill from "../models/Bill";
import Customer from "../models/Customer"; // Import Customer model
import Doctor from "../models/Doctor"; // Import Doctor model
import Payment from "../models/Payment";
import Service from "../models/Service";
import User from "../models/User";
/**
 * Người Làm: Thép
 * Người Test: Thép
 * Loại Test: API TEST (Đã xong), UNIT TEST (Đang làm), E2E TEST (Đã làm)
 * Chỉnh Sửa Lần Cuối : 13/10/2024
*/

export const createBill = async (req: Request, res: Response) => {
  try {
    const { appointmentId, medicinePrice, movingPrice } = req.body;

    // Validate appointmentId
    if (!mongoose.Types.ObjectId.isValid(appointmentId)) {
      return res.status(400).json({ message: "Invalid appointmentId format" });
    }

    // Fetch the appointment with populated doctorId, customerId, and serviceId
    const appointment = await Appointment.findById(appointmentId)
      .populate('doctorId')
      .populate('customerId')
      .populate('serviceId');

    if (!appointment) {
      return res.status(404).json({ message: "Không tìm thấy cuộc hẹn" });
    }

    // Ensure doctorId and customerId are populated
    if (!appointment.doctorId || !appointment.customerId || !appointment.serviceId) {
      return res.status(404).json({ message: "Không tìm thấy thông tin bác sĩ, khách hàng hoặc dịch vụ" });
    }

    // Fetch Doctor and Customer documents
    const doctorRecord = await Doctor.findById(appointment.doctorId._id);
    const customerRecord = await Customer.findById(appointment.customerId._id);

    if (!doctorRecord || !customerRecord) {
      return res.status(404).json({ message: "Không tìm thấy thông tin bác sĩ hoặc khách hàng" });
    }

    // Fetch User documents for Doctor and Customer
    const doctorUser = await User.findById(doctorRecord.userId, 'fullName');
    const customerUser = await User.findById(customerRecord.userId, 'fullName');

    if (!doctorUser || !customerUser) {
      return res.status(404).json({ message: "Không tìm thấy thông tin người dùng của bác sĩ hoặc khách hàng" });
    }

    // Check if fullName fields are populated
    if (!doctorUser.fullName) {
      return res.status(400).json({ message: "Tên bác sĩ không được để trống" });
    }

    if (!customerUser.fullName) {
      return res.status(400).json({ message: "Tên khách hàng không được để trống" });
    }

    const service = await Service.findById(appointment.serviceId._id);
    if (!service) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    }

    const totalPrice = service.price + (medicinePrice || 0) + (movingPrice || 0);

    // Create a new Payment
    const newPayment = new Payment({
      orderId: `ORD-${Date.now()}`,
      amount: totalPrice,
      orderInfo: `Thanh toán cho cuộc hẹn ${appointmentId}`,
      orderType: 'billpayment',
      transactionStatus: 'pending',
      paymentMethod: 'vnpay',
    });

    const savedPayment = await newPayment.save();

    // Create a new Bill
    const newBill = new Bill({
      appointmentId: appointment._id,
      customerId: customerRecord._id,
      doctorId: doctorRecord._id,
      serviceId: service._id,
      paymentId: savedPayment._id,
      appointmentDate: appointment.appointmentDate,
      servicePrice: service.price,
      medicinePrice,
      movingPrice,
      totalPrice,
      paymentMethod: 'vnpay',
      doctorName: doctorUser.fullName,
      customerName: customerUser.fullName,
      serviceName: service.serviceName,
      typeOfConsulting: appointment.typeOfConsulting,
      status: "Đang xử lý",
    });

    await newBill.save();

    res.status(201).json({ message: "Tạo hóa đơn thành công", bill: newBill, payment: savedPayment });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const updateBillStatus = async (req: Request, res: Response) => {
  try {
    const { billId, status } = req.body;

    // Validate billId
    if (!mongoose.Types.ObjectId.isValid(billId)) {
      return res.status(400).json({ message: "Invalid billId format" });
    }

    // Validate status
    const validStatuses = ["Đang xử lý", "Hoàn thành", "Lỗi thanh toán", "Hủy"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Trạng thái không hợp lệ" });
    }

    const updatedBill = await Bill.findByIdAndUpdate(
      billId,
      { status },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
    }

    res.status(200).json({ message: "Cập nhật trạng thái thành công", bill: updatedBill });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

export const getBillsByCustomer = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;

    // Validate customerId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ message: "Invalid customerId format" });
    }

    const bills = await Bill.find({ customerId })
      .populate('serviceId')
      .populate('doctorId')
      .populate('paymentId');

    res.status(200).json(bills);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
