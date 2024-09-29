import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  console.log('Received token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY is not defined');
  }
  const jwtSecret = process.env.SECRET_KEY;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};