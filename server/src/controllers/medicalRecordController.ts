import { Request, Response } from "express";
import { Customer, Fish, MedicalRecord, User } from "../models";

export const getAllMedicalRecords = async (req: Request, res: Response) => {
  try {
    const medicalRecords = await MedicalRecord.find();
    return res.status(200).json({ data: medicalRecords });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicalRecordByFishId = async (req: Request, res: Response) => {
  const fishId = req.params.fishId;
  try {
    const medicalRecords = await MedicalRecord.find({ fishId })
      .populate({
        path: "customerId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      });
    if (!medicalRecords || medicalRecords.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bệnh án" });
    }
    const formattedMedicalRecords = medicalRecords.map((medicalRecord) => {
      return {
        recordId: medicalRecord._id,
        customerName: medicalRecord.customerId.userId.fullName,
        date: medicalRecord.date,
        examType: medicalRecord.examType,
        serviceName: medicalRecord.serviceName,
        images: medicalRecord.images,
        diagnosis: medicalRecord.diagnosis,
        treatment: medicalRecord.treatment,
        medicines: medicalRecord.medicines,
        doctorName: medicalRecord.doctorId.userId.fullName,
      };
    });

    return res.status(200).json({ data: formattedMedicalRecords });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getMedicalRecordById = async (req: Request, res: Response) => {
  const medicalRecordId = req.params.medicalRecordId;
  try {
    const medicalRecord = await MedicalRecord.findById(medicalRecordId)
      .populate({
        path: "customerId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      })
      .populate({
        path: "doctorId",
        populate: {
          path: "userId",
          select: "fullName",
        },
      });
    if (!medicalRecord) {
      return res.status(404).json({ message: "Không tìm thấy bệnh án" });
    }
    const formattedMedicalRecord = {
      recordId: medicalRecord._id,
      customerName: medicalRecord.customerId.userId.fullName,
      doctorName: medicalRecord.doctorId.userId.fullName,
      date: medicalRecord.date,
      serviceName: medicalRecord.serviceName,
      examType: medicalRecord.examType,
      images: medicalRecord.images,
      diagnosis: medicalRecord.diagnosis,
      treatment: medicalRecord.treatment,
      medicines: medicalRecord.medicines,
    };
    return res.status(200).json({ data: formattedMedicalRecord });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const createMedicalRecord = async (req: Request, res: Response) => {
  let {
    phoneNumber,
    fishId,
    doctorId,
    serviceName,
    examType,
    images,
    diagnosis,
    treatment,
    medicines,
  } = req.body;
  try {
    if (!examType || !phoneNumber || !serviceName || !doctorId || !fishId) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }

    const user = await User.findOne({ phoneNumber });

    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }

    const customer = await Customer.findOne({ userId: user._id });

    if (!customer) {
      return res.status(404).json({
        message: "Không tìm thấy khách hàng",
      });
    }

    if (fishId === "newRecord") {
      const fish = await Fish.create({
        customerId: customer._id,
        description: "Cá mới",
        photoUrl: "https://placehold.co/150x150",
        size: 0,
        age: 0,
      });
      fishId = fish._id;
    }

    await MedicalRecord.create({
      customerId: customer._id,
      fishId,
      doctorId,
      examType,
      images,
      diagnosis,
      serviceName,
      treatment,
      medicines,
    });
    return res.status(200).json({
      message: "Đã tạo hồ sơ bệnh án thành công!",
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await MedicalRecord.aggregate([
      {
        $lookup: {
          from: "customers", // Tên collection của khách hàng
          localField: "customerId", // Trường nối từ bảng hiện tại (ví dụ, fish treatment hoặc appointment)
          foreignField: "_id", // Trường nối từ bảng khách hàng
          as: "customer", // Đặt tên cho mảng chứa dữ liệu khách hàng
        },
      },
      { $unwind: "$customer" }, // Tách mảng customer thành object đơn
      {
        $lookup: {
          from: "users", // Tên collection của user
          localField: "customer.userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }, // Tách mảng user thành object đơn
      {
        $group: {
          _id: "$customer._id", // Gom nhóm theo ID khách hàng
          customerName: { $first: "$user.fullName" }, // Lấy tên của khách hàng
          gender: { $first: "$user.gender" }, // Lấy giới tính của khách hàng
          phoneNumber: { $first: "$user.phoneNumber" }, // Lấy số điện thoại của khách hàng
          numberAppointment: { $sum: 1 }, // Đếm số lượng cuộc hẹn
        },
      },
    ]);

    if (!customers || customers.length === 0) {
      return res.status(404).json({ message: "Danh sách khách hàng trống" });
    }

    return res.status(200).json({ data: customers });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
