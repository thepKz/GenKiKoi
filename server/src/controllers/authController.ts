import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError";
import { Customer } from "../models";
import User from "../models/User";
import { randomText, signToken } from "../utils";
/**
 * Người Làm: Thép
 * Người Test: Thép
 * Loại Test: API TEST (Đã xong), UNIT TEST (Đang làm), E2E TEST (Đã làm)
 * Chỉnh Sửa Lần Cuối : 15/10/2024
*/

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const formatUsername = username.trim().toLowerCase();
    const formatEmail = email.trim().toLowerCase();
    const formatPassword = password.trim();
    const formatConfirmPassword = confirmPassword.trim();

    const errors: any = {};

    if (!formatUsername || !formatEmail || !formatPassword || !formatConfirmPassword) {
      errors.message = "Vui lòng điền đầy đủ các trường!";
      throw new ValidationError(errors);
    }

    // Check username format
    if (formatUsername.length < 8 || formatUsername.length > 30) {
      errors.username = "Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!";
      throw new ValidationError(errors);
    }
    if (!/^(?:[a-zA-Z0-9_]{8,30})$/.test(formatUsername)) {
      errors.username = "Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!";
      throw new ValidationError(errors);
    }

    // Check email format
    if (!/^[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}$/.test(formatEmail)) {
      errors.email = "Email không hợp lệ!";
      throw new ValidationError(errors);
    }

    const existingUser = await User.findOne({
      $or: [{ username: formatUsername }, { email: formatEmail }],
    });

    if (existingUser) {
      if (existingUser.username === formatUsername) {
        errors.username = "Tên tài khoản này đã được sử dụng!";
      }
      if (existingUser.email === formatEmail) {
        errors.email = "Email này đã được sử dụng!";
      }
      throw new ValidationError(errors);
    }

    // Check password strength
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).{6,30}$/.test(formatPassword)) {
      errors.password = "Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!";
      throw new ValidationError(errors);
    }

    if (formatPassword !== formatConfirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
      throw new ValidationError(errors);
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(formatPassword, salt);
    const newUser = await User.create({
      username: formatUsername,
      email: formatEmail,
      password: hashedPass,
      isVerified: false, // Set to true since we're skipping email verification
    });

    // Create new customer
    await Customer.create({
      userId: newUser._id,
    });

    // Generate token
    const token = await signToken({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      isVerified: newUser.isVerified,
    });

    return res.status(201).json({
      message: "Đăng ký thành công!",
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isVerified: newUser.isVerified,
        token,
      },
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Đã xảy ra lỗi server" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const errors: any = {};

    const formatLogin = login.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!formatLogin || !trimmedPassword) {
      errors.message = "Vui lòng điền đẩy đủ các trường!";
      throw new ValidationError(errors);
    }

    const user = await User.findOne({
      $or: [{ email: formatLogin }, { username: formatLogin }],
    });

    if (!user) {
      errors.message = "Tài khoản không tồn tại!";
      errors.login = "Vui lòng kiểm tra lại!";
      throw new ValidationError(errors);
    }

    const comparePassword = await bcrypt.compare(
      trimmedPassword,
      user.password
    );

    if (!comparePassword) {
      errors.message = "Thông tin đăng nhập sai, vui lòng thử lại!";
      errors.login = "Vui lòng kiểm tra lại!";
      errors.password = "Vui lòng kiểm tra lại!";
      throw new ValidationError(errors);
    }

    const token = await signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        token,
      },
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

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
        isVerified: true, // Set isVerified to true for Google logins
      });

      // Create a new customer
      await Customer.create({
        userId: user._id,
      });
    }

    const token = await signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });

    return res.status(200).json({
      message: user.isNew ? "Đăng ký thành công!" : "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        photoUrl: user.photoUrl || photoUrl,
        isVerified: user.isVerified,
        token,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "ã xảy ra lỗi khi xử lý đăng nhập Google",
    });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const errors: any = {};

    const formatLogin = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!formatLogin || !trimmedPassword) {
      errors.message = "Vui lòng điền đẩy đủ các trường!";
      throw new ValidationError(errors);
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
      throw new ValidationError(errors);
    }

    const comparePassword = await bcrypt.compare(
      trimmedPassword,
      user.password
    );

    if (!comparePassword) {
      errors.message = "Thông tin đăng nhập sai, vui lòng thử lại!";
      errors.email = "Vui lòng kiểm tra lại!";
      errors.password = "Vui lòng kiểm tra lại!";
      throw new ValidationError(errors);
    }

    const token = await signToken({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    });

    return res.status(200).json({
      message: "Đăng nhập thành công!",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.body;

  const formatUsername = username.trim().toLowerCase();

  const user = await User.findOne({ username: formatUsername });
  return res.status(200).json({ exists: !!user, userId: user?._id });
};
// Check email (Update later)
export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const formatEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: formatEmail });
  return res.status(200).json({ exists: !!user, userId: user?._id });
};