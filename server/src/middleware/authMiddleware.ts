import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!process.env.JWT_SECRET && !process.env.FALLBACK_SECRET) {
    throw new Error('JWT secret is not defined');
  }
  const jwtSecret = process.env.JWT_SECRET || process.env.FALLBACK_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};