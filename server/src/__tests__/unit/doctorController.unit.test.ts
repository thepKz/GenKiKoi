import express from 'express';
import request from 'supertest';
import { addNewDoctor, deleteDoctorById, getAllDoctors, getAllDoctorSchedules, getAllDoctorsForBooking, getScheduleById, updateDoctorById } from '../../controllers/doctorController';
import { Doctor, DoctorSchedule, User } from '../../models';

const app = express();
app.use(express.json());

// Mock Routes
app.get('/api/doctors', getAllDoctors);
app.post('/api/doctors', addNewDoctor);
app.delete('/api/doctors/:id', deleteDoctorById);
app.patch('/api/doctors/:id', updateDoctorById);
app.get('/api/doctors/all', getAllDoctorsForBooking);
app.get('/api/doctors/schedules', getAllDoctorSchedules);
app.get('/api/doctors/schedule/:id', getScheduleById);

// Mock the models and bcrypt
jest.mock('../../models', () => ({
  Doctor: {
    find: jest.fn(),
    create: jest.fn(),
    findByIdAndDelete: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
  User: {
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
  DoctorSchedule: {
    find: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
}));

describe('Doctor Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllDoctors', () => {
    it('should return a list of doctors', async () => {
      const mockDoctors = [
        {
          _id: 'doctorId1',
          userId: {
            fullName: 'Doctor One',
            email: 'doctor1@example.com',
            gender: 'male',
          },
          specialization: 'Cardiology',
          licenseNumber: '12345',
          yearOfExperience: 10,
          movingService: true,
          startDate: new Date(),
        },
      ];

      (Doctor.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue(mockDoctors),
        }),
      });

      const res = await request(app).get('/api/doctors');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].fullName).toBe('Doctor One');
      expect(Doctor.find).toHaveBeenCalled();
    });

    it('should return empty array if no doctors are found', async () => {
      (Doctor.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue([]),
        }),
      });
    
      const res = await request(app).get('/api/doctors');
    
      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });

    it('should return 500 on server error', async () => {
      (Doctor.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnValue({
          select: jest.fn().mockRejectedValue(new Error('Server Error')),
        }),
      });

      const res = await request(app).get('/api/doctors');

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Server Error');
    });
  });

  describe('addNewDoctor', () => {
    const newDoctorData = {
      fullName: 'Doctor User',
      gender: 'female',
      email: 'doctor@example.com',
      specialization: 'Dermatology',
      licenseNumber: '54321',
      yearOfExperience: 5,
      movingService: false,
    };


    it('should return 400 if a doctor already exists for the user', async () => {
      const existingUser = {
        _id: 'userId1',
        fullName: 'Doctor User',
        email: 'doctor@example.com',
        gender: 'female',
      };

      (User.findOne as jest.Mock).mockResolvedValueOnce(existingUser);
      (Doctor.findOne as jest.Mock).mockResolvedValueOnce({ _id: 'doctorId1', userId: 'userId1' });

      const res = await request(app).post('/api/doctors').send(newDoctorData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Bác sĩ đã tồn tại');
    });

   
    it('should return 400 if required fields are missing', async () => {
      const incompleteData = { ...newDoctorData } as Partial<typeof newDoctorData>;
      delete incompleteData.fullName;

      const res = await request(app).post('/api/doctors').send(incompleteData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Vui lòng điền đầy đủ thông tin');
    });

    it('should return 500 on server error', async () => {
      (User.findOne as jest.Mock).mockRejectedValueOnce(new Error('Server Error'));

      const res = await request(app).post('/api/doctors').send(newDoctorData);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Server Error');
    });

    it('should create a new doctor when user does not exist', async () => {
      const newDoctorData = {
        fullName: 'New Doctor',
        gender: 'male',
        email: 'newdoctor@example.com',
        specialization: 'Pediatrics',
        licenseNumber: '12345',
        yearOfExperience: 5,
        movingService: true,
      };

      (User.findOne as jest.Mock).mockResolvedValueOnce(null);
      (User.create as jest.Mock).mockResolvedValueOnce({
        _id: 'newUserId',
        fullName: newDoctorData.fullName,
        gender: newDoctorData.gender,
        email: newDoctorData.email,
      });
      (Doctor.create as jest.Mock).mockResolvedValueOnce({
        _id: 'newDoctorId',
        userId: 'newUserId',
        ...newDoctorData,
      });

      const res = await request(app).post('/api/doctors').send(newDoctorData);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Nhân viên được thêm thành công!');
      expect(res.body.data.fullName).toBe(newDoctorData.fullName);
    });

    it('should create a new doctor when user exists but is not a doctor', async () => {
      const newDoctorData = {
        fullName: 'Existing User',
        gender: 'female',
        email: 'existinguser@example.com',
        specialization: 'Surgery',
        licenseNumber: '67890',
        yearOfExperience: 8,
        movingService: false,
      };

      const existingUser = {
        _id: 'existingUserId',
        fullName: newDoctorData.fullName,
        gender: newDoctorData.gender,
        email: newDoctorData.email,
      };

      (User.findOne as jest.Mock).mockResolvedValueOnce(existingUser);
      (Doctor.findOne as jest.Mock).mockResolvedValueOnce(null);
      (Doctor.create as jest.Mock).mockResolvedValueOnce({
        _id: 'newDoctorId',
        userId: 'existingUserId',
        ...newDoctorData,
      });

      const res = await request(app).post('/api/doctors').send(newDoctorData);

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('Nhân viên được thêm thành công!');
      expect(res.body.data.fullName).toBe(newDoctorData.fullName);
    });
  });

  describe('updateDoctorById', () => {
    const updateData = {
      fullName: 'Updated Doctor',
      gender: 'male',
      email: 'updated@example.com',
      specialization: 'Neurology',
      licenseNumber: '98765',
      yearOfExperience: 8,
      movingService: true,
    };

    it('should update a doctor successfully', async () => {
      const existingDoctor = {
        _id: 'doctorId1',
        userId: 'userId1',
      };

      (Doctor.findById as jest.Mock) = jest.fn().mockResolvedValue(existingDoctor);
      (User.findOne as jest.Mock).mockResolvedValueOnce(null);
      (Doctor.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updateData);
      (User.findByIdAndUpdate as jest.Mock).mockResolvedValueOnce(updateData);

      const res = await request(app).patch('/api/doctors/doctorId1').send(updateData);

      expect(res.status).toBe(200);
      expect(res.body.data.fullName).toBe('Updated Doctor');
      expect(Doctor.findByIdAndUpdate).toHaveBeenCalled();
      expect(User.findByIdAndUpdate).toHaveBeenCalled();
    });

    it('should return 404 if doctor is not found', async () => {
      (Doctor.findById as jest.Mock) = jest.fn().mockResolvedValue(null);

      const res = await request(app).patch('/api/doctors/nonexistentId').send(updateData);

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy bác sĩ');
    });

    it('should return 400 if email is already in use', async () => {
      const existingDoctor = {
        _id: 'doctorId1',
        userId: 'userId1',
      };

      (Doctor.findById as jest.Mock).mockResolvedValueOnce(existingDoctor);
      (User.findOne as jest.Mock).mockResolvedValueOnce({ _id: 'anotherUserId' });

      const res = await request(app).patch('/api/doctors/doctorId1').send(updateData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Email đã được sử dụng bởi người dùng khác');
    });

    it('should return 500 on server error', async () => {
      (Doctor.findById as jest.Mock).mockRejectedValueOnce(new Error('Server Error'));

      const res = await request(app).patch('/api/doctors/doctorId1').send(updateData);

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Server Error');
    });

    it('should return 400 if required fields are missing', async () => {
      const incompleteData = {
        fullName: 'Updated Doctor',
        // Missing other required fields
      };

      const res = await request(app).patch('/api/doctors/doctorId1').send(incompleteData);

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Vui lòng điền đầy đủ thông tin');
    });
  });

  describe('deleteDoctorById', () => {
    it('should delete a doctor by ID', async () => {
      (Doctor.findByIdAndDelete as jest.Mock).mockResolvedValueOnce({ _id: 'doctorId1' });

      const res = await request(app).delete('/api/doctors/doctorId1');

      expect(res.status).toBe(200);
      expect(res.body.message).toBe('Xóa thành công');
      expect(Doctor.findByIdAndDelete).toHaveBeenCalledWith('doctorId1');
    });

    it('should return 500 on server error', async () => {
      (Doctor.findByIdAndDelete as jest.Mock).mockRejectedValueOnce(new Error('Server Error'));

      const res = await request(app).delete('/api/doctors/doctorId1');

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Server Error');
    });
  });

  describe('getAllDoctorsForBooking', () => {
    it('should return a list of doctors for booking', async () => {
      const mockDoctors = [
        { _id: 'doctorId1', userId: { fullName: 'Doctor One' } },
        { _id: 'doctorId2', userId: { fullName: 'Doctor Two' } },
      ];

      (Doctor.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockDoctors),
      });

      const res = await request(app).get('/api/doctors/all');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0].fullName).toBe('Doctor One');
    });

    it('should return 404 if no doctors are found', async () => {
      (Doctor.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });

      const res = await request(app).get('/api/doctors/all');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy bác sĩ nào');
    });

    it('should return 500 on server error', async () => {
      (Doctor.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('Server Error')),
      });

      const res = await request(app).get('/api/doctors/all');

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Server Error');
    });
  });

  describe('getAllDoctorSchedules', () => {
    it('should return all doctor schedules', async () => {
      const mockSchedules = [
        { _id: 'scheduleId1', doctorId: 'doctorId1', title: 'Appointment 1' },
        { _id: 'scheduleId2', doctorId: 'doctorId2', title: 'Appointment 2' },
      ];

      (DoctorSchedule.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockSchedules),
      });

      const res = await request(app).get('/api/doctors/schedules');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.data[0].title).toBe('Appointment 1');
    });

    it('should return 404 if no schedules are found', async () => {
      (DoctorSchedule.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockResolvedValue([]),
      });

      const res = await request(app).get('/api/doctors/schedules');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy lịch làm việc nào');
    });

    it('should return 500 on server error', async () => {
      (DoctorSchedule.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockRejectedValue(new Error('Server Error')),
      });

      const res = await request(app).get('/api/doctors/schedules');

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('An error occurred while fetching all schedules');
    });
  });

  describe('getScheduleById', () => {
    it('should return a doctor\'s schedule', async () => {
      const mockDoctor = { _id: 'doctorId1' };
      const mockSchedules = [
        { _id: 'scheduleId1', title: 'Appointment 1', start: new Date(), end: new Date() },
      ];

      (Doctor.findOne as jest.Mock).mockResolvedValue(mockDoctor);
      (DoctorSchedule.find as jest.Mock).mockResolvedValue(mockSchedules);

      const res = await request(app).get('/api/doctors/schedule/userId1');

      expect(res.status).toBe(200);
      expect(res.body.data).toHaveLength(1);
      expect(res.body.data[0].id).toBe('scheduleId1');
    });

    it('should return 404 if doctor is not found', async () => {
      (Doctor.findOne as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/doctors/schedule/nonexistentId');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy bác sĩ');
    });

    it('should return 404 if no schedules are found', async () => {
      (Doctor.findOne as jest.Mock).mockResolvedValue({ _id: 'doctorId1' });
      (DoctorSchedule.find as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/doctors/schedule/userId1');

      expect(res.status).toBe(404);
      expect(res.body.message).toBe('Không tìm thấy lịch trình');
    });

    it('should return 500 on server error', async () => {
      (Doctor.findOne as jest.Mock).mockRejectedValue(new Error('Server Error'));

      const res = await request(app).get('/api/doctors/schedule/userId1');

      expect(res.status).toBe(500);
      expect(res.body.message).toBe('Đã xảy ra lỗi khi lấy lịch trình');
    });
  });
});