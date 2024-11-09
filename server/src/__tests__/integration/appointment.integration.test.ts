import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../index";
import { Appointment, Customer, Doctor, DoctorSchedule, Service, User } from "../../models";

// Mock email services
jest.mock("../../services/emails", () => ({
  sendAppointmentConfirmationEmail: jest.fn().mockResolvedValue(true),
}));

// Mock auth middleware
jest.mock("../../middleware/authMiddleware", () => ({
  authMiddleware: (req: any, res: any, next: any) => {
    req.user = { id: 'test-user-id' };
    next();
  }
}));

describe("Appointment Integration Tests", () => {
  let mongoServer: MongoMemoryServer;
  let customerId: string;
  let doctorId: string;
  let serviceId: string;
  let doctorScheduleId: string;
        
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create test data
    const user = await User.create({
      username: "customer",
      email: "customer@test.com",
      password: "hash123",
    });

    const customer = await Customer.create({
      userId: user._id,
    });
    customerId = customer._id.toString();

    const doctor = await Doctor.create({
      userId: user._id,
      specialization: "Test Specialization",
      licenseNumber: "123456789",
    });
    doctorId = doctor._id.toString();

    const service = await Service.create({
      serviceName: "Test Service",
      price: 100000,
      description: "Test Description",
    });
    serviceId = service._id.toString();

    const schedule = await DoctorSchedule.create({
        doctorId: doctorId,
        weekSchedule: [{
          dayOfWeek: "01/01/2024",
          slots: [{
            slotTime: "9:00",
            isBooked: false,
            currentCount: 0,
            appointmentIds: [],
          }],
        }],
      });
      doctorScheduleId = (schedule._id as mongoose.Types.ObjectId).toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await Appointment.deleteMany({});
    jest.clearAllMocks();
  });

  describe("POST /api/appointments/customers/:customerId", () => {
    it("Tạo cuộc hẹn mới thành công", async () => {
      const appointmentData = {
        serviceName: "Test Service",
        doctorId: doctorId,
        typeOfConsulting: "Tại phòng khám",
        appointmentDate: "2024-01-01",
        slotTime: "9:00",
        reasons: "Test reason",
        doctorScheduleId: doctorScheduleId,
      };

      const res = await request(app)
        .post(`/api/appointments/customers/${customerId}`)
        .send(appointmentData);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Cuộc hẹn được tạo thành công!");
      expect(res.body.data).toHaveProperty("appointmentId");
    });

    it("Tạo cuộc hẹn thất bại khi không tìm thấy bác sĩ", async () => {
      const appointmentData = {
        serviceName: "Test Service",
        doctorId: new mongoose.Types.ObjectId(),
        typeOfConsulting: "Tại phòng khám",
        appointmentDate: "2024-01-01",
        slotTime: "9:00",
        reasons: "Test reason",
        doctorScheduleId: doctorScheduleId,
      };

      const res = await request(app)
        .post(`/api/appointments/customers/${customerId}`)
        .send(appointmentData);

      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("message", "Doctor not found!");
    });
  });

  describe("GET /api/appointments/customers/:customerId", () => {
    it("Lấy danh sách cuộc hẹn của khách hàng", async () => {
      // Create test appointment
      await Appointment.create({
        doctorId,
        customerId,
        serviceId,
        doctorScheduleId,
        appointmentDate: new Date("2024-01-01"),
        slotTime: "9:00",
        typeOfConsulting: "Tại phòng khám",
        status: "Đang chờ xử lý",
      });

      const res = await request(app)
        .get(`/api/appointments/customers/${customerId}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBe(1);
    });
  });

  describe("PATCH /api/appointments/:appointmentId/status", () => {
    it("Cập nhật trạng thái cuộc hẹn thành công", async () => {
      const appointment = await Appointment.create({
        doctorId,
        customerId,
        serviceId,
        doctorScheduleId,
        appointmentDate: new Date("2024-01-01"),
        slotTime: "9:00",
        typeOfConsulting: "Tại phòng khám",
        status: "Đang chờ xử lý",
      });

      const res = await request(app)
        .patch(`/api/appointments/${appointment._id}/status`)
        .send({
          status: "CANCELLED",
          notes: "Test cancellation",
        });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Đã cập nhật cuộc hẹn");
    });
  });
});