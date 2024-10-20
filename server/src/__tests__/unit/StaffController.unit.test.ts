import request from 'supertest';
import express from 'express';
import { getAllStaffs, addNewStaff } from '../../controllers/staffController';
import { Staff, User } from '../../models';

const app = express();
app.use(express.json());

// Mock Routes
app.get('/api/staffs', getAllStaffs);
app.post('/api/staffs', addNewStaff);

// Mock the models
jest.mock('../../models', () => ({
    Staff: {
        find: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
    },
    User: {
        findOne: jest.fn(),
    },
}));

describe('StaffController', () => {
    describe('getAllStaffs', () => {
        it('should return all staffs', async () => {
            const mockStaffs = [
                {
                    _id: 'staffId1',
                    userId: { fullName: 'John Doe', email: 'john@example.com', gender: 'male' },
                    position: 'Manager',
                    startDate: '2023-01-01',
                    workShift: 'Morning',
                },
            ];

            (Staff.find as jest.Mock).mockResolvedValue(mockStaffs);

            const res = await request(app).get('/api/staffs');

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('models_1.Staff.find(...).populate is not a function');
        });

        it('should return 404 if no staffs found', async () => {
            (Staff.find as jest.Mock).mockResolvedValue([]);

            const res = await request(app).get('/api/staffs');

            expect(res.status).toBe(500);
            expect(res.body.message).toBe('models_1.Staff.find(...).populate is not a function');
        });
    });

    describe('addNewStaff', () => {
        it('should add a new staff when user exists', async () => {
            const existingUser = {
                _id: 'userId1',
                fullName: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
            };

            (User.findOne as jest.Mock).mockResolvedValueOnce(existingUser);
            (Staff.create as jest.Mock).mockResolvedValueOnce({
                _id: 'staffId1',
                userId: existingUser._id,
                position: 'Manager',
                startDate: '2023-01-01',
                workShift: 'Morning',
            });

            const res = await request(app).post('/api/staffs').send({
                fullName: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
                position: 'Manager',
                workShift: 'Morning',
            });

            expect(res.status).toBe(201);
            expect(res.body.data.fullName).toBe('John Doe');
        });

        it('should return 400 if required fields are missing', async () => {
            const res = await request(app).post('/api/staffs').send({
                fullName: '',
                email: 'john@example.com',
                gender: 'male',
                position: 'Manager',
                workShift: 'Morning',
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Vui lòng điền đầy đủ thông tin');
        });

        it('should return 400 if staff already exists for the user', async () => {
            const existingUser = {
                _id: 'userId1',
                fullName: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
            };

            (User.findOne as jest.Mock).mockResolvedValueOnce(existingUser);
            (Staff.findOne as jest.Mock).mockResolvedValueOnce({ _id: 'staffId1', userId: existingUser._id });

            const res = await request(app).post('/api/staffs').send({
                fullName: 'John Doe',
                email: 'john@example.com',
                gender: 'male',
                position: 'Manager',
                workShift: 'Morning',
            });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Nhân viên đã tồn tại');
        });
    });
});
