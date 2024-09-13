import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { MongoError } from 'mongodb';
import User from '../models/User';

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
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
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }
    const token = signToken(user._id?.toString() || '');
    res.status(200).json({ 
      message: 'Login Successfully', 
      token, 
      user: { 
        id: user._id?.toString() || '', 
        username: user.username || '', 
        email: user.email || '', 
        role: user.role || '' 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ status: 'error', message: 'An error occurred during login' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ status: 'success' });
};