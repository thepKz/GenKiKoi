import Doctor from "../models/DoctorModel";
import { Request, Response } from "express";

export const getDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().populate("user_id");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getDoctorById = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user_id");
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
