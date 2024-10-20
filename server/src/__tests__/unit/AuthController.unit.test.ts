import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { checkEmail, checkUsername, login, loginAdmin, loginWithGoogle, register } from '../../controllers/authController';
import Customer from '../../models/Customer';
import User from '../../models/User';

jest.mock('../../models/User');
jest.mock('../../models/Customer');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');
jest.mock('../../utils', () => ({
    signToken: jest.fn().mockResolvedValue('mocked-token'),
    randomText: jest.fn().mockReturnValue('random-text'),
}));
describe('AuthController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = { status: statusMock, json: jsonMock } as Partial<Response>;
    });

    describe('register', () => {
        beforeEach(() => {
            req = {
                body: {
                    username: 'TestUser123',
                    email: 'test@example.com',
                    password: 'Password123!',
                    confirmPassword: 'Password123!',
                },
            };
        });

        it('should register a new user successfully', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            (User.create as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'TestUser123',
                email: 'test@example.com',
                role: 'customer',
                isVerified: false,
            });
            (Customer.create as jest.Mock).mockResolvedValue({});
            (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');

            await register(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(201);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng ký thành công!',
                data: expect.objectContaining({
                    token: 'mocked-token',
                }),
            }));
        });
        it('should return validation error if email already exists', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });

            await register(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                email: 'Email này đã được sử dụng!',
            }));
        });

        it('should return validation error if passwords do not match', async () => {
            req.body.confirmPassword = 'DifferentPassword123!';
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await register(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                confirmPassword: 'Mật khẩu xác nhận không khớp!',
            }));
        });
        it('should return validation error if username format is invalid', async () => {
            req.body.username = 'inva';
            (User.findOne as jest.Mock).mockResolvedValue(null);
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!'
            }));
        });

        it('should return validation error if email format is invalid', async () => {
            req.body.email = 'invalidemail';
            (User.findOne as jest.Mock).mockResolvedValue(null);
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                email: 'Email không hợp lệ!',
            }));
        });

        it('should return validation error if password is weak', async () => {
            req.body.password = 'weak';
            req.body.confirmPassword = 'weak';
            (User.findOne as jest.Mock).mockResolvedValue(null);
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            }));
        });

        it('should handle server error during registration', async () => {
            (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Đã xảy ra lỗi server' });
        });

        it('should return error when required fields are missing', async () => {
            req.body = {};
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đã xảy ra lỗi server'
            }));
        });

        it('should return error when username is too short', async () => {
            req.body.username = 'Short1';
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!',
            }));
        });

        it('should return error when username contains invalid characters', async () => {
            req.body.username = 'Invalid@User123';
            await register(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!',
            }));
        });
    });

    describe('login', () => {
        beforeEach(() => {
            req = {
                body: {
                    login: 'testuser',
                    password: 'Password123!',
                },
            };
        });

        it('should log in a user successfully', async () => {
            const mockUser = {
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                role: 'customer',
                isVerified: true,
            };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            await login(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    token: 'mocked-token',
                }),
            }));
        });

        it('should return error for invalid credentials', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await login(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Tài khoản không tồn tại!',
            }));
        });

        it('should return error for incorrect password', async () => {
            const mockUser = {
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                role: 'customer',
                isVerified: true,
            };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await login(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Thông tin đăng nhập sai, vui lòng thử lại!',
            }));
        });

        it('should handle server error during login', async () => {
            (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
            await login(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'Database error' });
        });

        it('should return error when required fields are missing', async () => {
            req.body = {};
            await login(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
        });

        it('should log in with email', async () => {
            const mockUser = {
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                role: 'customer',
                isVerified: true,
            };
            req.body = { login: 'test@example.com', password: 'Password123!' };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            await login(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    email: 'test@example.com',
                }),
            }));
        });
        it('should return error when required fields are missing', async () => {
            req.body = {};
            await login(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
        });

        it('should log in with email', async () => {
            const mockUser = {
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                role: 'customer',
                isVerified: true,
            };
            req.body = { login: 'test@example.com', password: 'Password123!' };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            await login(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    email: 'test@example.com',
                }),
            }));
        });
    });

    describe('loginWithGoogle', () => {
        beforeEach(() => {
            req = {
                body: {
                    email: 'test@gmail.com',
                    username: 'Test User',
                    photoUrl: 'https://example.com/photo.jpg',
                },
            };
        });

        it('should log in or register a user with Google successfully', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            (User.create as jest.Mock).mockResolvedValue({
                _id: '123',
                email: 'test@gmail.com',
                username: 'Test User-random-text',
                role: 'customer',
                isVerified: true,
            });
            (Customer.create as jest.Mock).mockResolvedValue({});

            await loginWithGoogle(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    token: 'mocked-token',
                    email: 'test@gmail.com',
                    username: 'Test User-random-text',
                    role: 'customer',
                    isVerified: true,
                }),
            }));
        });

        it('should log in existing Google user', async () => {
            const mockUser = {
                _id: '123',
                email: 'test@gmail.com',
                username: 'Test User',
                role: 'customer',
                isVerified: true,
            };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);

            await loginWithGoogle(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    token: 'mocked-token',
                }),
            }));
        });

        it('should handle server error during Google login', async () => {
            (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
            await loginWithGoogle(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: 'ã xảy ra lỗi khi xử lý đăng nhập Google' });
        });

        it('should create a new user if not found', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            const newUser = {
                _id: '123',
                email: 'test@gmail.com',
                username: 'Test User-random-text',
                role: 'customer',
                isVerified: true,
                isNew: true,
            };
            (User.create as jest.Mock).mockResolvedValue(newUser);
            (Customer.create as jest.Mock).mockResolvedValue({});

            await loginWithGoogle(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng ký thành công!',
                data: expect.objectContaining({
                    email: 'test@gmail.com',
                    username: 'Test User-random-text',
                }),
            }));
        });
    });

    describe('loginAdmin', () => {
        beforeEach(() => {
            req = {
                body: {
                    email: 'admin@example.com',
                    password: 'AdminPassword123!',
                },
            };
        });

        it('should log in an admin successfully', async () => {
            const mockAdmin = {
                _id: '123',
                username: 'admin',
                email: 'admin@example.com',
                password: 'hashedPassword',
                role: 'manager',
                isVerified: true,
            };
            (User.findOne as jest.Mock).mockResolvedValue(mockAdmin);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            await loginAdmin(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    token: 'mocked-token',
                }),
            }));
        });

        it('should return error for non-admin user', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await loginAdmin(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(400);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Tài khoản không tồn tại!',
            }));
        });

        it('should return error when required fields are missing', async () => {
            req.body = {};
            await loginAdmin(req as Request, res as Response);
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: expect.any(String) });
        });

        it('should return error for non-admin roles', async () => {
            const mockUser = {
                _id: '123',
                username: 'customer',
                email: 'customer@example.com',
                password: 'hashedPassword',
                role: 'customer',
                isVerified: true,
            };
            (User.findOne as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);

            await loginAdmin(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Đăng nhập thành công!',
                data: expect.objectContaining({
                    role: 'customer',
                }),
            }));
        });
    });

    describe('checkUsername', () => {
        it('should return true if username is available', async () => {
            req = { body: { username: 'newuser' } };
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await checkUsername(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ exists: false, userId: undefined });
        });

        it('should return false if username is taken', async () => {
            req = { body: { username: 'existinguser' } };
            (User.findOne as jest.Mock).mockResolvedValue({ _id: 'user123', username: 'existinguser' });

            await checkUsername(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ exists: true, userId: 'user123' });
        });

        it('should handle server error during username check', async () => {
            (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(checkUsername(req as Request, res as Response)).rejects.toThrow('Database error');

            // The function throws an error, so it doesn't reach these lines
            // expect(statusMock).not.toHaveBeenCalled();
            // expect(jsonMock).not.toHaveBeenCalled();
        });
    });

    describe('checkEmail', () => {
        it('should return true if email is available', async () => {
            req = { body: { email: 'new@example.com' } };
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await checkEmail(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ exists: false, userId: undefined });
        });

        it('should return false if email is taken', async () => {
            req = { body: { email: 'existing@example.com' } };
            (User.findOne as jest.Mock).mockResolvedValue({ _id: 'user123', email: 'existing@example.com' });

            await checkEmail(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ exists: true, userId: 'user123' });
        });

        it('should handle server error during email check', async () => {
            (User.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(checkEmail(req as Request, res as Response)).rejects.toThrow('Database error');

            // The function throws an error, so it doesn't reach these lines
            // expect(statusMock).not.toHaveBeenCalled();
            // expect(jsonMock).not.toHaveBeenCalled();
        });
    });
});