import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { Customer } from "../models";

/**
 * API: api/users/
 * METHOD: GET
 * PROTECTED
 */
export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const customer: any = await Customer.findOne({ userId })
      .populate(
        "userId",
        "username email photoUrl fullName phoneNumber photoUrl"
      )
      .select("detailAddress city district ward gender");

    if (customer) {
      const formattedProfile = {
        email: customer.userId.email,
        username: customer.userId.username,
        fullName: customer.userId?.fullName || null,
        phoneNumber: customer.userId?.phoneNumber || null,
        photoUrl: customer.userId?.photoUrl || null,
        gender: customer?.gender || null,
        city: customer?.city || null,
        district: customer?.district || null,
        ward: customer?.ward || null,
        detailAddress: customer?.detailAddress || null,
      };
      return res.status(200).json({ data: formattedProfile });
    }
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
