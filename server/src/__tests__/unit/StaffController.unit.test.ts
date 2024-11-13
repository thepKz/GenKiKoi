// Test getAllStaffs(staffController.ts)
// Test getStaffByStaffId(staffController.ts)
// Test updateStaffById(staffController.ts)
// Test deleteStaffById(staffController.ts)
// Model: Staff, User
import express from 'express';
import request from 'supertest';
import {
  addNewStaff,
  deleteStaffById,
  getAllStaffs,
  getStaffByStaffId,
  updateStaffById,
} from '../../controllers/staffController';
import { Staff, User } from '../../models';

const app = express();
app.use(express.json());

// Mock Routes
app.get('/api/', getAllStaffs);
app.post('/api/staffs', addNewStaff);
app.get('/api/staffs/:staffId', getStaffByStaffId);
app.patch('/api/staffs/:staffId', updateStaffById);
app.delete('/api/staffs/:staffId', deleteStaffById);

// Mock the models with chained methods
jest.mock('../../models', () => ({
  Staff: {
    find: jest.fn(() => ({
      populate: jest.fn(() => ({
        select: jest.fn(() => ({
          sort: jest.fn().mockResolvedValue([{
            _id: 'staffId1',
            userId: { fullName: 'John Doe', email: 'john@example.com', gender: 'male' },
            position: 'Manager',
            startDate: '2023-01-01',
            workShift: 'Morning',
          }])
        }))
      }))
    })),
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn(() => ({
      populate: jest.fn(() => ({
        select: jest.fn().mockResolvedValue({
          _id: 'staffId1',
          userId: { 
            fullName: 'John Doe', 
            email: 'john@example.com', 
            gender: 'male',
            phoneNumber: '123456789',
            photoUrl: 'photo.jpg'
          },
          position: 'Manager',
          workShift: 'Morning',
        })
      }))
    })),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

describe('StaffController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllStaffs', () => {
    it('should return all staffs', async () => {
      const res = await request(app).get('/api/');

      expect(res.status).toBe(200);
      expect(res.body.data[0].fullName).toBe('John Doe');
    });

    it('should return 404 if no staffs found', async () => {
      (Staff.find as jest.Mock).mockImplementationOnce(() => ({
        populate: jest.fn(() => ({
          select: jest.fn(() => ({
            sort: jest.fn().mockResolvedValue([])
          }))
        }))
      }));

      const res = await request(app).get('/api/');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Danh sách nhân viên trống!');
    });
  });

  describe('getStaffByStaffId', () => {
    it('should return staff by ID', async () => {
      const res = await request(app).get('/api/staffs/staffId1');

      expect(res.status).toBe(200);
      expect(res.body.data.fullName).toBe('John Doe');
    });

    it('should return 404 if staff not found', async () => {
      (Staff.findById as jest.Mock).mockImplementationOnce(() => ({
        populate: jest.fn(() => ({
          select: jest.fn().mockResolvedValue(null)
        }))
      }));

      const res = await request(app).get('/api/staffs/staffId1');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy nhân viên');
    });
  });

  describe('updateStaffById', () => {
    it('should update staff by ID', async () => {
      const mockStaff = {
        _id: 'staffId1',
        userId: 'userId1',
        position: 'Manager',
        workShift: 'Morning',
      };

      const mockUser = {
        _id: 'userId1',
        fullName: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        photoUrl: 'photo.jpg',
        phoneNumber: '123456789',
      };

      (Staff.findById as jest.Mock).mockResolvedValue(mockStaff);
      (User.findOne as jest.Mock).mockResolvedValue(null);
      (Staff.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockStaff);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUser);

      const res = await request(app).patch('/api/staffs/staffId1').send({
        fullName: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        position: 'Manager',
        workShift: 'Morning',
        photoUrl: 'photo.jpg',
        phoneNumber: '123456789',
      });

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Cập nhật thông tin nhân viên thành công');
    });

    it('should return 404 if staff not found', async () => {
      (Staff.findById as jest.Mock).mockResolvedValue(null);

      const res = await request(app).patch('/api/staffs/staffId1').send({
        fullName: 'John Doe',
        email: 'john@example.com',
        gender: 'male',
        position: 'Manager',
        workShift: 'Morning',
      });

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy nhân viên');
    });
  });

  describe('deleteStaffById', () => {
    it('should delete staff by ID', async () => {
      (Staff.findById as jest.Mock).mockResolvedValue({
        _id: 'staffId1',
        userId: 'userId1'
      });
      
      (Staff.findByIdAndDelete as jest.Mock).mockResolvedValue({});

      const res = await request(app).delete('/api/staffs/staffId1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Xóa thành công');
    });

    it('should return 500 if there is a server error', async () => {
      (Staff.findById as jest.Mock).mockResolvedValue(null);
      
      const res = await request(app).delete('/api/staffs/staffId1');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy nhân viên này');
    });
  });
});
