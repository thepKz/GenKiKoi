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

// lay ra Danh Sach medicalRecord theo fishID
export const getMedicalRecordByFishId = async (req: Request, res: Response) => {
  const fishId = req.params.id;
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
        customerName: medicalRecord.customerId.userId.fullName,
        date: medicalRecord.createdAt,
        examType: medicalRecord.examType,
        images: medicalRecord.images,
        diagnosis: medicalRecord.diagnosis,
        treatment: medicalRecord.treatment,
        medicines: medicalRecord.medicines,
        doctorName: medicalRecord.doctorId.userId.fullName,
      };
    });

    return res.status(200).json({ data: formattedMedicalRecords });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// lay medical record theo id
export const getMedicalRecordById = async (req: Request, res: Response) => {
  const medicalRecordId = req.params.id;
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
      customerName: medicalRecord.customerId.userId.fullName,
      doctorName: medicalRecord.doctorId.userId.fullName,
      date: medicalRecord.createdAt,
      examType: medicalRecord.examType,
      images: medicalRecord.images,
      diagnosis: medicalRecord.diagnosis,
      treatment: medicalRecord.treatment,
      medicines: medicalRecord.medicines,
    };
    return res.status(200).json({ data: formattedMedicalRecord });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// chưa làm xong (đang sai)
export const createMedicalRecord = async (req: Request, res: Response) => {
  let {
    phoneNumber,
    fishId,
    doctorId,
    examType,
    images,
    diagnosis,
    treatment,
    medicines,
  } = req.body;
  try {
    if (
      !examType ||
      !images ||
      !diagnosis ||
      !treatment ||
      !medicines ||
      !phoneNumber ||
      !fishId ||
      !doctorId
    ) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đầy đủ thông tin" });
    }
    // lay ra customer theo phoneNumber
    if (!phoneNumber)
      return res.status(404).json({ message: "Vui lòng nhập số điện thoại " });
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({ message: "Người dùng không tồn tại" });
    }
    const customer = await Customer.findOne({ userId: user._id });
    if (!customer) {
      return res.status(404).json({
        message:
          "Không tìm thấy khách hàng qua số điện thoại qua số điện thoại này",
      });
    }

    //neu fishId == null thi tao mot fish moi
    if (!fishId) {
      const fish = await Fish.create({
        customerId: customer._id,
        description: "Cá mới",
        size: 0,
        age: 0,
        photoUrl: "",
        healthStatus: "Chưa xác định",
      });
      fishId = fish._id;
    }

    const medicalRecord = await MedicalRecord.create({
      customerId: customer._id,
      fishId,
      doctorId,
      examType,
      images,
      diagnosis,
      treatment,
      medicines,
    });
    return res.status(200).json({
      message: "Đã tạo hồ sơ bệnh án thành công!",
      data: medicalRecord,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
