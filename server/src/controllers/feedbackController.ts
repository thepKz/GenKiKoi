import { Response, Request } from "express";
import { AuthRequest } from "../types";
import { Appointment, Customer, Doctor, Feedback } from "../models";

export const createNewFeedback = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    const { appointmentId, rating, comment } = req.body;

    if (!appointmentId || !rating || !comment) {
      return res.status(400).json("Vui lòng điền đẩy đủ thông tin!");
    }

    const customer = await Customer.findOne({ userId });

    if (!customer) {
      return res.status(401).json({ message: "Không tìm thấy người dùng" });
    }

    const appointment = await Appointment.findOne({
      _id: appointmentId,
      status: "Đã hoàn thành",
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy cuộc hẹn hợp lệ" });
    }

    appointment.isFeedback = true;

    await appointment.save();

    const existingFeedback = await Feedback.findOne({ appointmentId });

    if (existingFeedback) {
      return res
        .status(400)
        .json({ message: "Bạn đã gửi đánh giá cho cuộc hẹn này rồi" });
    }

    const newFeedback = new Feedback({
      customerId: customer._id,
      appointmentId,
      doctorId: appointment.doctorId,
      serviceId: appointment.serviceId,
      rating,
      comment,
      feedbackDate: new Date(),
    });

    await newFeedback.save();

    res.status(201).json({
      message: "Đánh giá đã được gửi thành công",
      data: newFeedback,
    });
  } catch (error) {
    console.error("Lỗi khi tạo feedback:", error);
    res
      .status(500)
      .json({ message: "Đã xảy ra lỗi khi xử lý yêu cầu của bạn" });
  }
};

export const getFeedbacksByDoctorId = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const userId = req.user?._id;

    const doctor = await Doctor.findOne({ userId });

    if (!doctor) {
      return res.status(404).json({ message: "Không tìm thấy bác sĩ" });
    }

    const feedbacks = await Feedback.find({ doctorId: doctor._id })
      .populate({
        path: "customerId",
        populate: {
          path: "userId",
          select: "fullName",
        },
        select: "userId",
      })
      .populate({
        path: "serviceId",
        select: "serviceName",
      })
      .select("rating comment feedbackDate")
      .sort({ feedbackDate: -1 });

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "Danh sách đánh giá trống" });
    }

    const formattedData = feedbacks.map((feedback: any) => ({
      id: feedback._id,
      customerName: feedback.customerId.userId.fullName,
      serviceName: feedback.serviceId.serviceName,
      feedbackDate: feedback.feedbackDate,
      rating: feedback.rating,
      comment: feedback.comment,
    }));

    return res.status(200).json({ data: formattedData });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
