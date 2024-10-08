import User from "../models/User";
import { isStrongPassword } from "../utils";
import { ValidationError } from "../errors/ValidationError";

export const validateRegistrationInput = (
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: any = {};

  if (!username || !email || !password || !confirmPassword) {
    errors.message = "Vui lòng điền đầy đủ các trường!";
  }

  if (!isStrongPassword(password)) {
    errors.password = "Mật khẩu không đủ mạnh!";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Mật khẩu xác nhận không khớp!";
  }

  if (Object.keys(errors).length > 0) {
    throw new ValidationError(errors);
  }
};

export const checkExistingUser = async (username: string, email: string) => {
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
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
};
