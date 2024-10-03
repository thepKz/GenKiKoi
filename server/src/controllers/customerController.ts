import Customer from "../models/CustomerModel";
import { Request, Response } from "express";

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
