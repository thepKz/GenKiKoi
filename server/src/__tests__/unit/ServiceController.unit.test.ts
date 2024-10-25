import { Request, Response } from 'express';
import { deleteServiceById, getAllServices, updateServiceById } from '../../controllers/serviceController';
import { Service } from '../../models';

// Mock Service model methods
jest.mock('../../models', () => ({
    Service: {
        find: jest.fn(),
        findOne: jest.fn(),
        findByIdAndDelete: jest.fn(),
        findByIdAndUpdate: jest.fn(),
        save: jest.fn(),
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
    });

    describe('getAllServices', () => {
        it('should return all services', async () => {
            const mockServices = [
                { _id: '1', serviceName: 'Service 1', price: 100 },
                { _id: '2', serviceName: 'Service 2', price: 200 }
            ];
            (Service.find as jest.Mock).mockResolvedValue(mockServices);

            await getAllServices(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ data: mockServices });
        });

        it('should return 404 if no services found', async () => {
            (Service.find as jest.Mock).mockResolvedValue(null);

            await getAllServices(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Không có dịch vụ nào khả dụng" });
        });

        it('should handle errors', async () => {
            const error = new Error('Database error');
            (Service.find as jest.Mock).mockRejectedValue(error);

            await getAllServices(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: error.message });
        });
    });


    describe('deleteServiceById', () => {
        it('should delete service successfully', async () => {
            req.params = { id: 'testId' };
            (Service.findByIdAndDelete as jest.Mock).mockResolvedValue({});

            await deleteServiceById(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Xóa thành công" });
        });

        it('should handle delete error', async () => {
            req.params = { id: 'testId' };
            const error = new Error('Delete error');
            (Service.findByIdAndDelete as jest.Mock).mockRejectedValue(error);

            await deleteServiceById(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: error.message });
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
            const updatedService = { ...req.body, _id: 'testId' };
            (Service.findByIdAndUpdate as jest.Mock).mockResolvedValue(updatedService);

            await updateServiceById(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(200);
            expect(jsonMock).toHaveBeenCalledWith({
                message: "Cập nhật dịch vụ thành công",
                data: updatedService
            });
        });

        it('should return 404 if service not found', async () => {
            (Service.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

            await updateServiceById(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(404);
            expect(jsonMock).toHaveBeenCalledWith({ message: "Không tìm thấy dịch vụ" });
        });

        it('should handle update error', async () => {
            const error = new Error('Update error');
            (Service.findByIdAndUpdate as jest.Mock).mockRejectedValue(error);

            await updateServiceById(req as Request, res as Response);

            expect(statusMock).toHaveBeenCalledWith(500);
            expect(jsonMock).toHaveBeenCalledWith({ message: error.message });
        });
    });
});
