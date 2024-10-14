// src/__tests__/unit/AuthController.unit.test.ts

import { Request, Response } from 'express';
import { register, login } from '../../controllers/authController';
import User from '../../models/User';

jest.mock('../../models/User');

describe('AuthController', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let json: jest.Mock;
    let status: jest.Mock;
    let cookie: jest.Mock;

    beforeEach(() => {
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        cookie = jest.fn();
        res = { status, cookie } as Partial<Response>;
    });


    describe('register', () => {
        beforeEach(() => {
            req = {
                body: {
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'Password123!',
                    confirmPassword: 'Password123!',
                },
            };
            (User.findOne as jest.Mock).mockResolvedValue(null);
        });

        it('should register a new user successfully', async () => {
            (User.create as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                role: 'user',
            });

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                message: 'Đã xảy ra lỗi server',
            });
        });

        it('should return validation error if username already exists', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                username: 'testuser',
            });

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                email: 'Email này đã được sử dụng!',
            });
        });

        it('should return validation error if email already exists', async () => {
            (User.findOne as jest.Mock).mockImplementation(({ email }) => {
                if (email === 'test@example.com') {
                    return Promise.resolve({ email: 'test@example.com' });
                }
                return Promise.resolve(null);
            });

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email này đã được sử dụng!',
            });
        });

        it('should return validation error if passwords do not match', async () => {
            req.body.confirmPassword = 'DifferentPassword123!';

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });

        it('should return validation error if password is too weak', async () => {
            req.body.password = '123';
            req.body.confirmPassword = '123';

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return validation error if email is invalid', async () => {
            req.body.email = 'invalid-email';

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return validation error if username is missing', async () => {
            delete req.body.username;

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản là bắt buộc!',
            });
        });

        it('should return validation error if password is missing', async () => {
            delete req.body.password;

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });

        it('should return validation error if confirmPassword is missing', async () => {
            delete req.body.confirmPassword;

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                confirmPassword: 'Xác nhận mật khẩu là bắt buộc!',
            });
        });

        it('should return validation error if email is missing', async () => {
            delete req.body.email;

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                email: 'Email là bắt buộc!',
            });
        });

        it('should return validation error if username is too short', async () => {
            req.body.username = 'ab';

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!',
            });
        });

        it('should return validation error if username is too long', async () => {
            req.body.username = 'a'.repeat(31); // Assuming max length is 30

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!',
            });
        });

        it('should return validation error if password is too short', async () => {
            req.body.password = 'Pass1!';
            req.body.confirmPassword = 'Pass1!';

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải có ít nhất 8 ký tự!',
            });
        });

        it('should return validation error if password is too long', async () => {
            const longPassword = 'P@ssw0rd'.repeat(10);
            req.body.password = longPassword;
            req.body.confirmPassword = longPassword;

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });

        it('should register a new user successfully with optional fields', async () => {
            req.body.optionalField = 'some optional data';
            (User.create as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                role: 'user',
                optionalField: 'some optional data',
            });

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                message: 'Đã xảy ra lỗi server',
            });
        });

        it('should hash the password before saving the user', async () => {
            (User.create as jest.Mock).mockImplementation((userData) => {
                expect(userData.password).not.toBe('Password123!');
                return Promise.resolve({
                    ...userData,
                    _id: '123',
                });
            });

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                message: 'Đã xảy ra lỗi server',
            });
        });

        it('should assign default role "user" to new user', async () => {
            (User.create as jest.Mock).mockImplementation((userData) => {
                expect(userData.role).toBe('user');
                return Promise.resolve({
                    ...userData,
                    _id: '123',
                });
            });

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                message: 'Đã xảy ra lỗi server',
            });
        });

        it('should return server error if user creation fails', async () => {
            (User.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            await register(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(500);
            expect(json).toHaveBeenCalledWith({
                message: 'Đã xảy ra lỗi server',
            });
        });

        // Basic test cases for registration
        it('should return error if username is too short', async () => {
            req.body.username = 'short';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!',
            });
        });


        it('should return error if username contains special characters', async () => {
            req.body.username = 'user@name';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if email is invalid', async () => {
            req.body.email = 'invalid-email';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if password is missing special characters', async () => {
            req.body.password = 'Password123';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });

        it('should return error if confirmPassword does not match', async () => {
            req.body.confirmPassword = 'DifferentPassword!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                confirmPassword: 'Mật khẩu xác nhận không khớp!',
            });
        });

        it('should return error if email is already registered', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ email: 'test@example.com' });
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email này đã được sử dụng!',
            });
        });

        it('should return error if username is already taken', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({ username: 'testuser' });
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản này đã được sử dụng!',
            });
        });

        it('should return error if password is too weak', async () => {
            req.body.password = '123';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if email is missing', async () => {
            delete req.body.email;
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email là bắt buộc!',
            });
        });

        it('should return error if username is missing', async () => {
            delete req.body.username;
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản là bắt buộc!',
            });
        });

        it('should return error if password is missing', async () => {
            delete req.body.password;
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });

        it('should return error if confirmPassword is missing', async () => {
            delete req.body.confirmPassword;
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                confirmPassword: 'Xác nhận mật khẩu là bắt buộc!',
            });
        });

        it('should return error if password is too long', async () => {
            req.body.password = 'P@ssw0rd'.repeat(10);
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không được vượt quá 100 ký tự!',
            });
        });

        it('should return error if username is too long', async () => {
            req.body.username = 'a'.repeat(31);
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không được vượt quá 30 ký tự!',
            });
        });

        it('should return error if email is too long', async () => {
            req.body.email = 'a'.repeat(256) + '@example.com';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if username contains spaces', async () => {
            req.body.username = 'user name';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if email contains spaces', async () => {
            req.body.email = 'test @example.com';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if password is empty', async () => {
            req.body.password = '';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });


        it('should return error if confirmPassword is empty', async () => {
            req.body.confirmPassword = '';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                confirmPassword: 'Xác nhận mật khẩu là bắt buộc!',
            });
        });

        it('should return error if username is only whitespace', async () => {
            req.body.username = '   ';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản là bắt buộc!',
            });
        });

        it('should return error if email is only whitespace', async () => {
            req.body.email = '   ';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email là bắt buộc!',
            });
        });

        it('should return error if password is only whitespace', async () => {
            req.body.password = '   ';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });

        it('should return error if confirmPassword is only whitespace', async () => {
            req.body.confirmPassword = '   ';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                confirmPassword: 'Xác nhận mật khẩu là bắt buộc!',
            });
        });

        it('should return error if password is too weak (no uppercase)', async () => {
            req.body.password = 'password123!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });

        it('should return error if password is too weak (no lowercase)', async () => {
            req.body.password = 'PASSWORD123!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });


        it('should return error if password is too weak (no number)', async () => {
            req.body.password = 'Password!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });

        it('should return error if password is too weak (no special character)', async () => {
            req.body.password = 'Password123';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu phải chứa chữ thường, in hoa, số, ký tự đặc biệt và từ 6 đến 30 ký tự!',
            });
        });

        it('should return error if username is a number', async () => {
            req.body.username = '12345678';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if email is a number', async () => {
            req.body.email = '12345678';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if password is only numbers', async () => {
            req.body.password = '12345678';
            req.body.confirmPassword = '12345678';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if username contains only special characters', async () => {
            req.body.username = '@#$%^&*';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if email is in uppercase', async () => {
            req.body.email = 'TEST@EXAMPLE.COM';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if password is too weak (no digits)', async () => {
            req.body.password = 'Password!';
            req.body.confirmPassword = 'Password!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if password is too weak (no lowercase)', async () => {
            req.body.password = 'PASSWORD123!';
            req.body.confirmPassword = 'PASSWORD123!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if password is too weak (no uppercase)', async () => {
            req.body.password = 'password123!';
            req.body.confirmPassword = 'password123!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if password is too weak (no special character)', async () => {
            req.body.password = 'Password123';
            req.body.confirmPassword = 'Password123';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if username is a single character', async () => {
            req.body.username = 'a';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản phải có độ dài từ 8 đến 30 ký tự!',
            });
        });

        it('should return error if email is a single character', async () => {
            req.body.email = 'a';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if username is a mix of letters and numbers', async () => {
            req.body.username = 'user123';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if email is missing "@" symbol', async () => {
            req.body.email = 'testexample.com';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if email is missing domain', async () => {
            req.body.email = 'test@.com';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                email: 'Email không hợp lệ!',
            });
        });

        it('should return error if password contains username', async () => {
            req.body.password = 'testuserPassword123!';
            req.body.confirmPassword = 'testuserPassword123!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không được chứa tên tài khoản!',
            });
        });

        it('should return error if password contains email', async () => {
            req.body.password = 'test@example.comPassword123!';
            req.body.confirmPassword = 'test@example.comPassword123!';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không được chứa email!',
            });
        });

        it('should return error if username is a palindrome', async () => {
            req.body.username = 'racecar';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if username is a common name', async () => {
            req.body.username = 'admin';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if username is a common word', async () => {
            req.body.username = 'password';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if username is a common phrase', async () => {
            req.body.username = 'letmein';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                username: 'Tên tài khoản không hợp lệ!',
            });
        });

        it('should return error if password is a common password', async () => {
            req.body.password = '123456';
            req.body.confirmPassword = '123456';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
        });

        it('should return error if password is a common password phrase', async () => {
            req.body.password = 'qwerty';
            req.body.confirmPassword = 'qwerty';
            await register(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu không đáp ứng yêu cầu!',
            });
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
            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: true,
                comparePassword: jest.fn().mockResolvedValue(true),
            });

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                message: 'Đăng nhập thành công!',
                user: {
                    _id: '123',
                    username: 'testuser',
                    email: 'test@example.com',
                },
                token: expect.any(String),
            });
        });

        it('should return error if user does not exist', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Vui lòng kiểm tra lại!',
                message: 'Thông tin đăng nhập sai, vui lòng thử lại!',
                password: 'Vui lòng kiểm tra lại!',
            });
        });

        it('should return error if password is incorrect', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                password: 'hashedPassword',
                isActive: true,
                comparePassword: jest.fn().mockResolvedValue(false),
            });

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Vui lòng kiểm tra lại!',
                message: 'Thông tin đăng nhập sai, vui lòng thử lại!',
                password: 'Vui lòng kiểm tra lại!',
            });
        });

        it('should return validation error if login field is missing', async () => {
            delete req.body.login;

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Tên đăng nhập hoặc email là bắt buộc!',
            });
        });

        it('should return validation error if password field is missing', async () => {
            delete req.body.password;

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });

        it('should return error if user is inactive', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: false,
                comparePassword: jest.fn().mockResolvedValue(true),
            });

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(403);
            expect(json).toHaveBeenCalledWith({
                message: 'Tài khoản của bạn đã bị vô hiệu hóa.',
            });
        });

        it('should log in successfully using email', async () => {
            req.body.login = 'test@example.com';

            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: true,
                comparePassword: jest.fn().mockResolvedValue(true),
            });

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                message: 'Đăng nhập thành công!',
                user: {
                    _id: '123',
                    username: 'testuser',
                    email: 'test@example.com',
                },
                token: expect.any(String),
            });
        });

        it('should return error if account is locked', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: true,
                isLocked: true,
                comparePassword: jest.fn().mockResolvedValue(true),
            });

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(403);
            expect(json).toHaveBeenCalledWith({
                message: 'Tài khoản của bạn đã bị khóa do nhiều lần đăng nhập thất bại.',
            });
        });

        it('should generate a JWT token upon successful login', async () => {
            const mockToken = 'jwt.token.here';

            jest.mock('../../utils/jwt', () => ({
                generateToken: jest.fn().mockReturnValue(mockToken),
            }));

            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: true,
                comparePassword: jest.fn().mockResolvedValue(true),
            });

            await login(req as Request, res as Response);

            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                message: 'Đăng nhập thành công!',
                user: {
                    _id: '123',
                    username: 'testuser',
                    email: 'test@example.com',
                },
                token: mockToken,
            });
        });


        it('should set a cookie with the JWT token upon successful login', async () => {
            const mockToken = 'jwt.token.here';
            res.cookie = cookie;

            jest.mock('../../utils/jwt', () => ({
                generateToken: jest.fn().mockReturnValue(mockToken),
            }));

            (User.findOne as jest.Mock).mockResolvedValue({
                _id: '123',
                username: 'testuser',
                email: 'test@example.com',
                password: 'hashedPassword',
                isActive: true,
                comparePassword: jest.fn().mockResolvedValue(true),
            });

            await login(req as Request, res as Response);

            expect(res.cookie).toHaveBeenCalledWith('token', mockToken, { httpOnly: true });
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                message: 'Đăng nhập thành công!',
                user: {
                    _id: '123',
                    username: 'testuser',
                    email: 'test@example.com',
                },
            });
        });


        // Basic test cases for login
        it('should return error if login field is missing', async () => {
            delete req.body.login;
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Tên đăng nhập hoặc email là bắt buộc!',
            });
        });


        it('should return error if password field is missing', async () => {
            delete req.body.password;
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });

        it('should return error if login field is empty', async () => {
            req.body.login = '';
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Tên đăng nhập hoặc email là bắt buộc!',
            });
        });

        it('should return error if password field is empty', async () => {
            req.body.password = '';
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                password: 'Mật khẩu là bắt buộc!',
            });
        });

        it('should return error if user is inactive', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                isActive: false,
            });
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(403);
            expect(json).toHaveBeenCalledWith({
                message: 'Tài khoản của bạn đã bị vô hiệu hóa.',
            });
        });

        it('should return error if user is locked', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                isLocked: true,
            });
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(403);
            expect(json).toHaveBeenCalledWith({
                message: 'Tài khoản của bạn đã bị khóa do nhiều lần đăng nhập thất bại.',
            });
        });

        it('should return error if login is an invalid email format', async () => {
            req.body.login = 'invalid-email';
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Tên đăng nhập hoặc email là bắt buộc!',
            });
        });

        it('should return error if login is a non-existing username', async () => {
            (User.findOne as jest.Mock).mockResolvedValue(null);
            req.body.login = 'nonexistinguser';
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Vui lòng kiểm tra lại!',
                message: 'Thông tin đăng nhập sai, vui lòng thử lại!',
                password: 'Vui lòng kiểm tra lại!',
            });
        });

        it('should return error if password is incorrect', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                comparePassword: jest.fn().mockResolvedValue(false),
            });
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(400);
            expect(json).toHaveBeenCalledWith({
                login: 'Vui lòng kiểm tra lại!',
                message: 'Thông tin đăng nhập sai, vui lòng thử lại!',
                password: 'Vui lòng kiểm tra lại!',
            });
        });

        it('should return success if login is correct', async () => {
            (User.findOne as jest.Mock).mockResolvedValue({
                comparePassword: jest.fn().mockResolvedValue(true),
            });
            await login(req as Request, res as Response);
            expect(status).toHaveBeenCalledWith(200);
            expect(json).toHaveBeenCalledWith({
                message: 'Đăng nhập thành công!',
                user: expect.any(Object),
                token: expect.any(String),
            });
        });
    });
});