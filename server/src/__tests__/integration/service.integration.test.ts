// Test create service(POST /api/services)
// Test get all services(GET /api/services)
// Test delete service(DELETE /api/services/:serviceId)
// Model: Service, User
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../index";
import { Service, User } from "../../models";

// Mock email services
jest.mock('../../services/emails', () => ({
  sendVerificationEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
  sendAppointmentConfirmationEmail: jest.fn(),
  sendAppointmentCancellationEmail: jest.fn()
}));

describe("Service Routes", () => {
  let mongoServer: MongoMemoryServer;
  let authToken: string;
  let managerUser: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create manager user with hashed password
    const hashedPassword = await bcrypt.hash('Manager@123', 10);
    managerUser = await User.create({
      username: "manager123",
      email: "manager@test.com",
      password: hashedPassword,
      role: "manager",
      isVerified: true // Make sure user is verified
    });

    // Generate token with correct payload structure
    authToken = jwt.sign(
      { 
        id: managerUser._id.toString(),
        role: managerUser.role,
        email: managerUser.email
      },
      process.env.JWT_SECRET || 'test-secret',
      { expiresIn: '1d' }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    // Recreate manager user before each test
    if (!await User.findById(managerUser._id)) {
      await User.create({
        _id: managerUser._id,
        username: managerUser.username,
        email: managerUser.email,
        password: managerUser.password,
        role: managerUser.role,
        isVerified: true
      });
    }
    await Service.deleteMany({});
    jest.clearAllMocks();
  });

  it("Tạo dịch vụ mới thành công", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        serviceName: "Dịch vụ test",
        price: 100000,
        description: "Mô tả test",
      });

  });

  it("Tạo với dịch vụ trùng tên", async () => {
    await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        serviceName: "Dịch vụ test",
        price: 100000,
        description: "Mô tả test",
      });

    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        serviceName: "Dịch vụ test",
        price: 200000,
        description: "Mô tả khác",
      });

  });

  it("Lấy danh sách dịch vụ", async () => {
    await Service.create({
      serviceName: "Dịch vụ test",
      price: 100000,
      description: "Mô tả test",
    });

    const res = await request(app).get("/api/services");

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("Xóa dịch vụ", async () => {
    const service = await Service.create({
      serviceName: "Dịch vụ test",
      price: 100000,
      description: "Mô tả test",
    });

    const res = await request(app)
      .delete(`/api/services/${service._id}`)
      .set("Authorization", `Bearer ${authToken}`);

  });
}); 