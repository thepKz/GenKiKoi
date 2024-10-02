import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/UserModel";
import { isStrongPassword, randomText, signToken } from "../utils";

/**
 * API: api/auth/register
 * METHOD: POST
 * UNPROTECTED
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const errors: any = {
      message: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Apply the trim method for all fields, with existence check
    const formatUsername = username ? username.trim().toLowerCase() : "";
    const formatEmail = email ? email.trim().toLowerCase() : "";
    const trimmedPassword = password ? password.trim() : "";
    const trimmedConfirmPassword = confirmPassword
      ? confirmPassword.trim()
      : "";

    if (!formatUsername || !formatEmail || !trimmedPassword) {
      errors.message = "Vui lòng điền đẩy đủ các trường!";
      return res.status(400).json(errors);
    }

    const usernameExist = await User.findOne({ username: formatUsername });

    if (usernameExist) {
      errors.username = "Tên tài khoản này đã được sử dụng!";
      return res.status(400).json(errors);
    }

    const emailExist = await User.findOne({
      email: formatEmail,
    });

    if (emailExist) {
      errors.email = "Email này đã được sử dụng!";
      return res.status(400).json(errors);
    }

    // Handling for extra safety
    if (!isStrongPassword(trimmedPassword)) {
      errors.password = "Mật khẩu không đủ mạnh!";
      return res.status(400).json(errors);
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
      return res.status(400).json(errors);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(trimmedPassword, salt);
    const newUser = await User.create({
      username: formatUsername,
      email: formatEmail,
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

/**
 * API: api/auth/login-google
 * METHOD: POST
 * UNPROTECTED
 */
export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { email, username, photoUrl } = req.body;

    const formatEmail = email.trim().toLowerCase();

    const user = await User.findOne({ formatEmail });

    if (user) {
      return res.status(200).json({
        message: "Đăng nhập thành công!",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          photoUrl,
          token: await signToken({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
          }),
        },
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(randomText(6), salt);
      const newUser = await User.create({
        username: (username + randomText(4)).toLowerCase,
        email: formatEmail,
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
          photoUrl,
          token: await signToken({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            role: newUser.role,
          }),
        },
      });
    }
  } catch (error: any) {
    res.status(404).json({
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
