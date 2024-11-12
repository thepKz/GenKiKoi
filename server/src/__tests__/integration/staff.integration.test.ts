// Test get all staffs(GET /api/staffs)
// Test create staff(POST /api/staffs)
// Model: Staff, User
import express from 'express';
import request from 'supertest';
import { Staff, User } from '../../models';
import staffRoutes from '../../routes/staffRoutes';

// Mock models
jest.mock('../../models', () => ({
  Staff: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  }
}));

// Mock middleware
jest.mock('../../middleware', () => ({
  authMiddleware: (req: any, res: any, next: any) => next(),
  roleMiddleware: () => (req: any, res: any, next: any) => next()
}));

const app = express();
app.use(express.json());
app.use('/api/staffs', staffRoutes);

describe('Staff Integration Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });



  describe('POST /api/staffs', () => {
    const newStaff = {
      fullName: 'New Staff',
      gender: 'male',
      position: 'Staff',
      email: 'newstaff@example.com',
      workShift: 'Morning'
    };

    it('should create new staff', async () => {
      // Mock existing user check
      (User.findOne as jest.Mock).mockResolvedValue(null);

      // Mock user creation
      (User.create as jest.Mock).mockResolvedValue({
        _id: 'user-123',
        ...newStaff,
        role: 'staff'
      });

      // Mock staff creation
      (Staff.create as jest.Mock).mockResolvedValue({
        _id: 'staff-123',
        userId: 'user-123',
        position: newStaff.position,
        workShift: newStaff.workShift
      });

      const res = await request(app)
        .post('/api/staffs')
        .send(newStaff);

      expect(res.status).toBe(201);
      expect(res.body).toEqual({
        message: 'Nhân viên được thêm thành công!',
        data: expect.objectContaining({
          _id: 'staff-123',
          fullName: newStaff.fullName,
          position: newStaff.position
        })
      });
    });

    it('should return 400 if staff already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        _id: 'existing-user',
        email: newStaff.email
      });

      (Staff.findOne as jest.Mock).mockResolvedValue({
        _id: 'existing-staff'
      });

      const res = await request(app)
        .post('/api/staffs')
        .send(newStaff);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({
        message: 'Nhân viên đã tồn tại'
      });
    });
  });
});