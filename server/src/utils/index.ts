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

export const isValidUserName = (username: string): boolean => {
  const hasUpperCase = /[A-Z]/.test(username);
  const hasLowerCase = /[a-z]/.test(username);
  const hasNumbers = /\d/.test(username);

  return hasUpperCase && hasLowerCase && hasNumbers;
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

export const randomText = (num: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";

  for (let index = 0; index < characters.length; index++) {
    if (text.length <= (num ? num : 10)) {
      const str = characters[Math.floor(Math.random() * characters.length)];
      text += str;
    }
  }
  return text;
};