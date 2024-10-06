import { Request, Response } from 'express';
import MedicalRecord from '../models/MedicalRecordModel';
import Fish from '../models/FishModel';

export const createTreatment = async (req: Request, res: Response) => {
  try {
    const { customer_id, description, appointment_id, fish_id } = req.body;

    const newMedicalRecord = new MedicalRecord({
      customer_id,
      description,
      appointment_id
    });

    const savedMedicalRecord = await newMedicalRecord.save();

    // Update the fish with the new medical record
    await Fish.findByIdAndUpdate(fish_id, {
      $set: { medicalRecord_id: savedMedicalRecord._id },
      $inc: { numberOfTreatments: 1 }
    });

    res.status(201).json({
      message: 'Treatment created successfully',
      medicalRecord: savedMedicalRecord
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTreatments = async (req: Request, res: Response) => {
  try {
    const medicalRecords = await MedicalRecord.find().populate('customer_id appointment_id');
    res.status(200).json(medicalRecords);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTreatmentById = async (req: Request, res: Response) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id).populate('customer_id appointment_id');
    if (!medicalRecord) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    res.status(200).json(medicalRecord);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateTreatment = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      req.params.id,
      { description },
      { new: true }
    );
    if (!updatedMedicalRecord) {
      return res.status(404).json({ message: 'Treatment not found' });
    }
    res.status(200).json({
      message: 'Treatment updated successfully',
      medicalRecord: updatedMedicalRecord
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};