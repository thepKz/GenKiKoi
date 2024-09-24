import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { isStrongPassword, signToken } from "../utils";

/**
 * API: api/auth/register
 * METHOD: POST
 * UNPROTECTED
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đẩy đủ các trường!" });
    }

    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
      return res
        .status(400)
        .json({ message: "Tên tài khoản này đã được sử dụng!" });
    }

    const emailExist = await User.findOne({ email: email.toLowerCase() });

    if (emailExist) {
      return res.status(400).json({ message: "Email này đã được sử dụng!" });
    }

    // Handling for extra safety
    if (!isStrongPassword(password)) {
      return res.status(400).json({ message: "Mật khẩu không đủ mạnh!" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Mật khẩu xác nhận không khớp!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPass,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Đăng ký thành công!",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        token: await signToken({
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

/**
 * API: api/auth/login
 * METHOD: POST
 * UNPROTECTED
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng điền đẩy đủ các trường!" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại!" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "Thông tin đăng nhập sai, vui lòng thử lại!" });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: await signToken({
          _id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
