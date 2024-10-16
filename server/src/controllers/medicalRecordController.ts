import { Request, Response } from "express";
import { Customer, MedicalRecord } from "../models";

export const getAllMedicalRecords = async (req: Request, res: Response) => {
  try {
    const medicalRecords = await MedicalRecord.find();
    return res.status(200).json({ data: medicalRecords });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

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

// chưa làm xong (đang sai)
export const createMedicalRecord = async (req: Request, res: Response) => {
  const {
    phoneNumber,
    doctorId,
    examType,
    images,
    diagnosis,
    treatment,
    medicines,
  } = req.body;
  try {
    const customer = await Customer.findOne({ phoneNumber });
    if (!customer) {
      return res.status(404).json({
        message:
          "Không tìm thấy khách hàng qua số điện thoại qua số điện thoại này",
      });
    }

    const medicalRecord = await MedicalRecord.create({
      customerId: customer._id,
      doctorId,
      examType,
      images,
      diagnosis,
      treatment,
      medicines,
    });
    return res.status(200).json({ data: medicalRecord });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
