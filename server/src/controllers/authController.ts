import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { randomText, signToken } from "../utils";
import {
  checkExistingUser,
  validateRegistrationInput,
} from "../services/authService";

/**
 * API: api/auth/register
 * METHOD: POST
 * UNPROTECTED
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const errors: any = {};
    
    // Validate input
    validateRegistrationInput(
      username.trim(),
      email.trim(),
      password.trim(),
      confirmPassword.trim()
    );

    // Format input
    const formatUsername = username.trim().toLowerCase();
    const formatEmail = email.trim().toLowerCase();

    // Check if username or email already exists
    await checkExistingUser(formatUsername, formatEmail);

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username: formatUsername,
      email: formatEmail,
      password: hashedPass,
    });

    // Generate token
    const token = signToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });

    return res.status(201).json({
      message: "Đăng ký thành công!",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Đã xảy ra lỗi server" });
  }
};

/**
 * API: api/auth/login
 * METHOD: POST
 * UNPROTECTED
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const errors: any = {
      message: "",
      login: "",
      password: "",
    };

    const formatLogin = login.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!formatLogin || !trimmedPassword) {
      errors.message = "Vui lòng điền đẩy đủ các trường!";
      return res.status(400).json(errors);
    }

    const user = await User.findOne({
      $or: [{ email: formatLogin }, { username: formatLogin }],
    });

    if (!user) {
      errors.message = "Tài khoản không tồn tại!";
      errors.login = "Vui lòng kiểm tra lại!";
      return res.status(400).json(errors);
    }

    const comparePassword = await bcrypt.compare(
      trimmedPassword,
      user.password
    );

    if (!comparePassword) {
      errors.message = "Thông tin đăng nhập sai, vui lòng thử lại!";
      errors.login = "Vui lòng kiểm tra lại!";
      errors.password = "Vui lòng kiểm tra lại!";
      return res.status(400).json(errors);
    }

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: await signToken({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * API: api/auth/login-google
 * METHOD: POST
 * UNPROTECTED
 */
export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { email, username, photoUrl } = req.body;

    const formatEmail = email.trim().toLowerCase();
    const formatUserName = username + "-" + randomText(5);

    let user = await User.findOne({ email: formatEmail });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(randomText(12), salt);
      user = await User.create({
        username: formatUserName,
        email: formatEmail,
        password: hashedPass,
        photoUrl,
      });
    }

    const token = await signToken({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    return res.status(200).json({
      message: user.isNew ? "Đăng ký thành công!" : "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl || photoUrl,
        token,
      },
    });
  } catch (error: any) {
    console.error("Lỗi đăng nhập Google:", error);
    res.status(500).json({
      message: "Đã xảy ra lỗi khi xử lý đăng nhập Google",
    });
  }
};

/**
 * API: api/auth/login-admin
 * METHOD: POST
 * UNPROTECTED
 */

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const errors: any = {
      message: "",
      email: "",
      password: "",
    };

    const formatLogin = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!formatLogin || !trimmedPassword) {
      errors.message = "Vui lòng điền đẩy đủ các trường!";
      return res.status(400).json(errors);
    }

    const user = await User.findOne({
      $and: [
        { email: formatLogin },
        { role: { $in: ["manager", "doctor", "staff"] } },
      ],
    });

    if (!user) {
      errors.message = "Tài khoản không tồn tại!";
      errors.email = "Vui lòng kiểm tra lại!";
      return res.status(400).json(errors);
    }

    const comparePassword = await bcrypt.compare(
      trimmedPassword,
      user.password
    );

    if (!comparePassword) {
      errors.message = "Thông tin đăng nhập sai, vui lòng thử lại!";
      errors.email = "Vui lòng kiểm tra lại!";
      errors.password = "Vui lòng kiểm tra lại!";
      return res.status(400).json(errors);
    }

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: await signToken({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        }),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * API: api/auth/check-username
 * Method: POST
 * UNPROTECTED
 */
export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.body;

  const formatUsername = username.toLowerCase();

  const user = await User.findOne({ username: formatUsername });
  return res.status(200).json({ exists: !!user });
};

/**
 * API: api/auth/check-email
 * Method: POST
 * UNPROTECTED
 */
export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const formatEmail = email.toLowerCase();

  const user = await User.findOne({ email: formatEmail });
  return res.status(200).json({ exists: !!user });
};
