import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { ValidationError } from "../errors/ValidationError";
import { Customer } from "../models";
import User from "../models/User";
import { isStrongPassword, randomText, signToken } from "../utils";

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const formatUsername = username.trim().toLowerCase();
    const formatEmail = email.trim().toLowerCase();
    const formatPassword = password.trim();
    const formatConfirmPassword = confirmPassword.trim();

    const errors: any = {};

    if (
      !formatUsername ||
      !formatEmail ||
      !formatPassword ||
      !formatConfirmPassword
    ) {
      errors.message = "Vui lòng điền đầy đủ các trường!";
      throw new ValidationError(errors);
    }

    const existingUser = await User.findOne({
      $or: [{ username: formatUsername }, { email: formatEmail }],
    });

    if (existingUser) {
      const errors: any = {};
      if (existingUser.username === username) {
        errors.username = "Tên tài khoản này đã được sử dụng!";
      }
      if (existingUser.email === email) {
        errors.email = "Email này đã được sử dụng!";
      }
      throw new ValidationError(errors);
    }

    if (!isStrongPassword(formatPassword)) {
      errors.password = "Mật khẩu không đủ mạnh!";
      throw new ValidationError(errors);
    }

    if (formatPassword !== formatConfirmPassword) {
      errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
      throw new ValidationError(errors);
    }

    // Create new user
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      username: formatUsername,
      email: formatEmail,
      password: hashedPass,
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
    if (error instanceof ValidationError) {
      return res.status(400).json(error.errors);
    }
    res.status(500).json({ message: "Đã xảy ra lỗi server" });
  }
};

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /api/auth/login-google:
 *   post:
 *     summary: Login with Google
 *     description: Logs in a user using Google credentials
 *     tags: [Auth]
 *     requestBody:
 *       description: Google credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - photoUrl
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the user
 *               username:
 *                 type: string
 *                 description: Username of the user
 *               photoUrl:
 *                 type: string
 *                 description: Profile picture URL
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User ID
 *                     username:
 *                       type: string
 *                       description: Username
 *                     email:
 *                       type: string
 *                       description: Email
 *                     role:
 *                       type: string
 *                       description: User role
 *                     photoUrl:
 *                       type: string
 *                       description: Profile picture URL
 *                     token:
 *                       type: string
 *                       description: Authentication token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
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
    res.status(500).json({
      message: "ã xảy ra lỗi khi xử lý đăng nhập Google",
    });
  }
};

/**
 * @swagger
 * /api/auth/login-admin:
 *   post:
 *     summary: Login as an admin
 *     description: Logs in an admin user with the provided credentials
 *     tags: [Auth]
 *     requestBody:
 *       description: Admin credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email address of the admin
 *               password:
 *                 type: string
 *                 description: Password for the admin account
 *     responses:
 *       200:
 *         description: Admin logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Admin ID
 *                     username:
 *                       type: string
 *                       description: Admin username
 *                     email:
 *                       type: string
 *                       description: Admin email
 *                     role:
 *                       type: string
 *                       description: Admin role
 *                     token:
 *                       type: string
 *                       description: Authentication token
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *                   description: Validation errors
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
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

/**
 * @swagger
 * /api/auth/check-username:
 *   post:
 *     summary: Check if a username exists
 *     description: Checks if a given username is already in use
 *     tags: [Auth]
 *     requestBody:
 *       description: Username to check
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                 type: string
 *                 description: Username to check
 *     responses:
 *       200:
 *         description: Username existence check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   description: Indicates if the username exists
 *                 userId:
 *                   type: string
 *                   description: User ID if the username exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
export const checkUsername = async (req: Request, res: Response) => {
  const { username } = req.body;

  const formatUsername = username.trim().toLowerCase();

  const user = await User.findOne({ username: formatUsername });
  return res.status(200).json({ exists: !!user, userId: user?._id });
};

/**
 * @swagger
 * /api/auth/check-email:
 *   post:
 *     summary: Check if an email exists
 *     description: Checks if a given email is already in use
 *     tags: [Auth]
 *     requestBody:
 *       description: Email to check
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email to check
 *     responses:
 *       200:
 *         description: Email existence check result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   description: Indicates if the email exists
 *                 userId:
 *                   type: string
 *                   description: User ID if the email exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 */
export const checkEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  const formatEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: formatEmail });
  return res.status(200).json({ exists: !!user, userId: user?._id });
};