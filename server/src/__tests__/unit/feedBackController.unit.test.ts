// Test createNewFeedback(FeedbackController.ts)
// Test getFeedbacksByDoctorId(FeedbackController.ts)
// Mock models: Appointment, Customer, Doctor, Feedback
import { Response } from 'express';
import { createNewFeedback, getFeedbacksByDoctorId } from '../../controllers/feedbackController';
import { Appointment, Customer, Doctor, Feedback } from '../../models';
import { AuthRequest } from '../../types';

// Mock models
jest.mock('../../models', () => ({
  Appointment: {
    findOne: jest.fn(),
  },
  Customer: {
    findOne: jest.fn(),
  },
  Doctor: {
    findOne: jest.fn(),
  },
  Feedback: {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    prototype: {
      save: jest.fn(),
    },
  },
}));

describe('FeedbackController', () => {
  let req: Partial<AuthRequest>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock } as Partial<Response>;
    jest.clearAllMocks();
  });

  describe('createNewFeedback', () => {
    beforeEach(() => {
      req = {
        user: {
          _id: 'testUserId',
          role: 'customer'
        },
        body: {
          appointmentId: 'testAppointmentId',
          rating: 5,
          comment: 'Great service!',
        },
      };
    });

    

    it('should return 400 if required fields are missing', async () => {
      req.body = {};
      await createNewFeedback(req as AuthRequest, res as Response);
      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith('Vui lòng điền đẩy đủ thông tin!');
    });

    it('should return 401 if customer not found', async () => {
      (Customer.findOne as jest.Mock).mockResolvedValue(null);
      await createNewFeedback(req as AuthRequest, res as Response);
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Không tìm thấy người dùng' });
    });

    it('should return 404 if appointment not found', async () => {
      const mockCustomer = { _id: 'customerId' };
      (Customer.findOne as jest.Mock).mockResolvedValue(mockCustomer);
      (Appointment.findOne as jest.Mock).mockResolvedValue(null);

      await createNewFeedback(req as AuthRequest, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Không tìm thấy cuộc hẹn hợp lệ' });
    });

    it('should return 400 if feedback already exists', async () => {
      const mockCustomer = { _id: 'customerId' };
      const mockAppointment = {
        _id: 'appointmentId',
        status: 'Đã hoàn thành',
      };
      const mockExistingFeedback = { _id: 'feedbackId' };

      (Customer.findOne as jest.Mock).mockResolvedValue(mockCustomer);
      (Appointment.findOne as jest.Mock).mockResolvedValue(mockAppointment);
      (Feedback.findOne as jest.Mock).mockResolvedValue(mockExistingFeedback);

      await createNewFeedback(req as AuthRequest, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ 
        message: 'Bạn đã gửi đánh giá cho cuộc hẹn này rồi' 
      });
    });

    it('should handle server error', async () => {
      (Customer.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));
      await createNewFeedback(req as AuthRequest, res as Response);
      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ 
        message: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn' 
      });
    });
  });

  describe('getFeedbacksByDoctorId', () => {
    beforeEach(() => {
      req = {
        user: {
          _id: 'testUserId',
          role: 'customer'
        },
      };
    });

    it('should get feedbacks successfully', async () => {
      const mockDoctor = { _id: 'doctorId' };
      const mockFeedbacks = [
        {
          _id: 'feedback1',
          customerId: {
            userId: { fullName: 'Customer 1' },
          },
          serviceId: { serviceName: 'Service 1' },
          rating: 5,
          comment: 'Great!',
          feedbackDate: new Date(),
        },
      ];

      (Doctor.findOne as jest.Mock).mockResolvedValue(mockDoctor);
      (Feedback.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue(mockFeedbacks),
      });

      await getFeedbacksByDoctorId(req as AuthRequest, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        data: expect.arrayContaining([
          expect.objectContaining({
            id: 'feedback1',
            customerName: 'Customer 1',
            serviceName: 'Service 1',
          }),
        ]),
      });
    });

    it('should return 404 if doctor not found', async () => {
      (Doctor.findOne as jest.Mock).mockResolvedValue(null);

      await getFeedbacksByDoctorId(req as AuthRequest, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Không tìm thấy bác sĩ' });
    });

    it('should return 404 if no feedbacks found', async () => {
      const mockDoctor = { _id: 'doctorId' };
      (Doctor.findOne as jest.Mock).mockResolvedValue(mockDoctor);
      (Feedback.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        sort: jest.fn().mockResolvedValue([]),
      });

      await getFeedbacksByDoctorId(req as AuthRequest, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Danh sách đánh giá trống' });
    });

    it('should handle server error', async () => {
      (Doctor.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

      await getFeedbacksByDoctorId(req as AuthRequest, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });
});