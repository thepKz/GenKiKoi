// UserController.unit.test.ts
import { Response } from 'express';
import { getUser, updateProfile } from '../../controllers/userController';
import { Customer, User } from '../../models';
import { AuthRequest } from '../../types';

jest.mock('../../models', () => ({
    Customer: {
        findOne: jest.fn(),
        create: jest.fn(),
        findById: jest.fn(),
        findOneAndUpdate: jest.fn()
    },
    User: {
        findById: jest.fn(),
        findOneAndUpdate: jest.fn()
    }
}));

describe('UserController', () => {
    let req: Partial<AuthRequest>;
    let res: Partial<Response>;
    let jsonMock: jest.Mock;
    let statusMock: jest.Mock;

    beforeEach(() => {
        jsonMock = jest.fn();
        statusMock = jest.fn().mockReturnValue({ json: jsonMock });
        res = { status: statusMock, json: jsonMock } as Partial<Response>;
        req = {
            user: {
                _id: 'testUserId',
                role: 'customer'
            }
        };
    });

    describe('getUser', () => {
        it('should return 401 if userId is not found', async () => {
            req.user = undefined;
            await getUser(req as AuthRequest, res as Response);
            expect(statusMock).toHaveBeenCalledWith(401);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Không tìm thấy ID người dùng" });
        });

        it('should return user profile if customer exists', async () => {
            const mockCustomer = {
                userId: {
                    email: 'test@example.com',
                    username: 'testuser',
                    fullName: 'Test User',
                    phoneNumber: '1234567890',
                    photoUrl: 'test.jpg',
                    gender: 'male'
                },
                city: 'Test City',
                district: 'Test District',
                ward: 'Test Ward',
                detailAddress: 'Test Address'
            };

            (Customer.findOne as jest.Mock).mockReturnValue({
                populate: jest.fn().mockReturnValue({
                    select: jest.fn().mockResolvedValue(mockCustomer)
                })
            });

            await getUser(req as AuthRequest, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                data: {
                    email: mockCustomer.userId.email,
                    username: mockCustomer.userId.username,
                    fullName: mockCustomer.userId.fullName,
                    phoneNumber: mockCustomer.userId.phoneNumber,
                    photoUrl: mockCustomer.userId.photoUrl,
                    gender: mockCustomer.userId.gender,
                    city: mockCustomer.city,
                    district: mockCustomer.district,
                    ward: mockCustomer.ward,
                    detailAddress: mockCustomer.detailAddress
                }
            });
        });
    });

    describe('updateProfile', () => {
        it('should successfully update user profile', async () => {
            const mockUpdatedUser = {
                _id: 'testUserId',
                username: 'testuser',
                email: 'test@example.com',
                photoUrl: 'test.jpg'
            };

            const mockUpdatedCustomer = {
                _id: 'testCustomerId'
            };

            const mockRequestBody = {
                username: 'TestUser',
                fullName: 'Test User',
                phoneNumber: '1234567890',
                gender: 'male',
                city: 'Test City',
                district: 'Test District',
                ward: 'Test Ward',
                photoUrl: 'test.jpg',
                detailAddress: 'Test Address'
            };

            req.body = mockRequestBody;

            (User.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);
            (Customer.findOneAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedCustomer);

            await updateProfile(req as AuthRequest, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Cập nhật thành công!",
                data: {
                    id: mockUpdatedUser._id,
                    username: mockUpdatedUser.username,
                    email: mockUpdatedUser.email,
                    photoUrl: mockUpdatedUser.photoUrl,
                    customerId: mockUpdatedCustomer._id
                }
            });
        });

        it('should return 500 if update fails', async () => {
            const mockRequestBody = {
                username: undefined
            };
            req.body = mockRequestBody;
            
            await updateProfile(req as AuthRequest, res as Response);
            
            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Cannot read properties of undefined (reading 'toLowerCase')"
            });
        });
    });
});
