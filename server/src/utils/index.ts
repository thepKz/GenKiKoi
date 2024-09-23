import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const isStrongPassword = (password: string): boolean => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  return (
    password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers
  );
};

export const signToken = async (payload: {
  _id: Types.ObjectId;
  email: string;
  username: string;
  role: string;
}) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string);
  return token;
};
