import { NextFunction, Request, Response } from "express";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const roleMiddleware = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: User not logged in" });
      }

      if (!roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: Insufficient role permission" });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };
};
