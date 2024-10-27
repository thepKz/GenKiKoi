import { Request, Response } from "express";
import { Service } from "../models";


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
 * API: /api/services/
 * Method: POST
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

/**
 * API: /api/services/:id
 * Method: DELETE
 * PROTECTED
 */
export const deleteServiceById = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;

    await Service.findByIdAndDelete(serviceId);

    return res.status(200).json({ message: "Xóa thành công" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

/**
 * API: /api/services/:id
 * Method: PATCH
 * PROTECTED
 */
export const updateServiceById = async (req: Request, res: Response) => {
  try {
    const serviceId = req.params.id;
    const { serviceName, price, availableAt, description } = req.body;

    const updatedService = await Service.findByIdAndUpdate(
      serviceId,
      {
        serviceName,
        price,
        availableAt,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedService) {
      return res.status(404).json({ message: "Không tìm thấy dịch vụ" });
    }

    return res
      .status(200)
      .json({ message: "Cập nhật dịch vụ thành công", data: updatedService });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
