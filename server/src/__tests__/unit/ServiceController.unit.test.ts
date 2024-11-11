import { Request, Response } from 'express';
import { deleteServiceById, getAllServices, updateServiceById } from '../../controllers/serviceController';
import { Service } from '../../models';

// Create a mock class for Service
class MockService {
  private data: any;

  constructor(data: any) {
    this.data = { ...data };
  }

  save = jest.fn().mockImplementation(() => Promise.resolve(this.data));
}

// Mock Service model
jest.mock('../../models', () => ({
  Service: {
    find: jest.fn(),
    findOne: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    prototype: {
      save: jest.fn(),
    },
    // Add constructor mock
    mockConstructor: function(data: any) {
      return new MockService(data);
    }
  }
}));

describe('ServiceController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = { status: statusMock, json: jsonMock } as Partial<Response>;
    req = {} as Partial<Request>;
    jest.clearAllMocks();

    // Set up the constructor mock before each test
    (Service as any).mockImplementation = function(data: any) {
      return (Service as any).mockConstructor(data);
    };
  });

  describe('getAllServices', () => {
    it('should return all services', async () => {
      const mockServices = [
        { _id: '1', serviceName: 'Service 1', price: 100 },
        { _id: '2', serviceName: 'Service 2', price: 200 }
      ];
      
      (Service.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockServices)
      });

      await getAllServices(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ data: mockServices });
    });

    it('should return 404 if no services found', async () => {
      (Service.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockResolvedValue([])
      });

      await getAllServices(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Danh sách dịch vụ trống!" });
    });

    it('should handle errors', async () => {
      (Service.find as jest.Mock).mockReturnValue({
        sort: jest.fn().mockRejectedValue(new Error('Database error'))
      });

      await getAllServices(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Database error' });
    });
  });



  describe('deleteServiceById', () => {
    beforeEach(() => {
      req.params = { id: 'testId' };
    });

    it('should soft delete service successfully', async () => {
      const mockUpdatedService = {
        _id: 'testId',
        isDeleted: true
      };

      (Service.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedService);

      await deleteServiceById(req as Request, res as Response);

      expect(Service.findByIdAndUpdate).toHaveBeenCalledWith(
        'testId',
        { isDeleted: true },
        { new: true }
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Xóa thành công" });
    });

    it('should handle delete error', async () => {
      (Service.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Delete error'));

      await deleteServiceById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Delete error' });
    });
  });

  describe('updateServiceById', () => {
    beforeEach(() => {
      req.params = { id: 'testId' };
      req.body = {
        serviceName: 'Updated Service',
        price: 150,
        availableAt: '2024-02-01',
        description: 'Updated description'
      };
    });

    it('should update service successfully', async () => {
      const mockUpdatedService = {
        _id: 'testId',
        ...req.body
      };

      (Service.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedService);

      await updateServiceById(req as Request, res as Response);

      expect(Service.findByIdAndUpdate).toHaveBeenCalledWith(
        'testId',
        req.body,
        {
          new: true,
          runValidators: true
        }
      );
      expect(statusMock).toHaveBeenCalledWith(200);
      expect(jsonMock).toHaveBeenCalledWith({
        message: "Cập nhật dịch vụ thành công",
        data: mockUpdatedService
      });
    });

    it('should return 404 if service not found', async () => {
      (Service.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

      await updateServiceById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ message: "Không tìm thấy dịch vụ" });
    });

    it('should handle update error', async () => {
      (Service.findByIdAndUpdate as jest.Mock).mockRejectedValue(new Error('Update error'));

      await updateServiceById(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ message: 'Update error' });
    });
  });
});