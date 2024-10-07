import { Service } from "../models";
import { Request, Response } from "express";

/**
 * API: /api/services/
 * Method: GET
 * UNPROTECTED
 */
export const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();

    if (!services) {
      return res.status(404).json({ message: "Không có dịch vụ nào khả dụng" });
    }

    return res.status(200).json({ data: services });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/services/create-service
 * Method: PUT
 * PROTECTED
 */
export const createNewService = async (req: Request, res: Response) => {
  try {
    const { serviceName, price, availableAt, description } = req.body;
    const newService = new Service({
      serviceName,
      price,
      availableAt,
      description,
    });

    const existService = await Service.findOne({ serviceName });

    if (existService) {
      return res.status(400).json({ message: "Dịch vụ này đã tồn tại!" });
    }

    const createdService = await newService.save();

    return res.status(201).json({
      message: "Dịch vụ được tạo thành công!",
      data: createdService,
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};