import { Request, Response } from "express";
import Customer from "../models/CustomerModel";

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find().populate("user_id");
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("user_id");
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const searchCustomers = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    const customers = await Customer.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { phone: { $regex: query, $options: 'i' } }
      ]
    }).populate('user_id');

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
