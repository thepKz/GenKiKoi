import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';
import User from '../models/User';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

// Add this function to validate password strength
const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*()~`_+\-={}|[\]:;<>,.?/]/.test(password);

  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if password is strong enough
    if (!isStrongPassword(password)) {
      return res.status(400).json({ 
        status: 'fail', 
        message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' 
      });
    }

    const user = await User.create({ username, email, password, role });
    const token = signToken(user._id?.toString() || '');
    res.status(201).json({ 
      status: 'success', 
      token, 
      user: { 
        id: user._id?.toString() || '', 
        username: user.username, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      // Duplicate key error
      const keyValue = (error as any).keyValue;
      const field = Object.keys(keyValue)[0];
      res.status(400).json({ 
        status: 'fail', 
        message: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists. Please choose a different one.` 
      });
    } else {
      res.status(400).json({ status: 'fail', message: (error as Error).message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    // Check if login and password are provided
    if (!login || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide login and password' });
    }

    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username: login }, { email: login }]
    }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect login or password' });
    }

    // If everything ok, send token to client
    const token = signToken(user._id?.toString() || '');
    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: (error as Error).message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ status: 'success' });
};

export const getProfile = (req: Request, res: Response) => {
  const user = (req as any).user;
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    }
  });
};