import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../index";
import { Customer, User } from "../../models";

// Mock email services
jest.mock('../../services/emails', () => ({
  sendVerificationEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
  sendAppointmentConfirmationEmail: jest.fn(),
  sendAppointmentCancellationEmail: jest.fn()
}));

describe("Customer Integration Tests", () => {
  let mongoServer: MongoMemoryServer;
  let authToken: string;
  let customerUser: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    const hashedPassword = await bcrypt.hash('Customer@123', 10);
    customerUser = await User.create({
      username: "customer123",
      email: "customer@test.com",
      password: hashedPassword,
      role: "customer",
      isVerified: true
    });

    authToken = jwt.sign(
      {
        id: customerUser._id.toString(),
        role: customerUser.role,
        email: customerUser.email
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
    await Customer.deleteMany({});
  });

  it("should create customer profile", async () => {
    const customerData = {
      userId: customerUser._id,
      city: "Test City",
      district: "Test District",
      ward: "Test Ward",
      detailAddress: "123 Test St"
    };

  });

  it("should update customer profile", async () => {
    const customer = await Customer.create({
      userId: customerUser._id,
      city: "Old City"
    });

    const res = await request(app)
      .patch(`/api/customers/${customer._id}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        city: "New City"
      });

    expect(res.status).toBe(200);
    expect(res.body.data.city).toBe("New City");
  });
});