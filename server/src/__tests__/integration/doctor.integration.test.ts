import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../index";
import { Doctor, DoctorSchedule, User } from "../../models";

// Mock email services
jest.mock('../../services/emails', () => ({
  sendVerificationEmail: jest.fn(),
  sendResetPasswordEmail: jest.fn(),
  sendAppointmentConfirmationEmail: jest.fn(),
  sendAppointmentCancellationEmail: jest.fn()
}));

describe("Doctor Schedule Integration Tests", () => {
  let mongoServer: MongoMemoryServer;
  let authToken: string;
  let doctorUser: any;
  let doctor: any;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());

    // Create doctor user
    const hashedPassword = await bcrypt.hash('Doctor@123', 10);
    doctorUser = await User.create({
      username: "doctor123",
      email: "doctor@test.com", 
      password: hashedPassword,
      role: "doctor",
      isVerified: true
    });

    doctor = await Doctor.create({
      userId: doctorUser._id,
      specialization: "Test Spec",
      licenseNumber: "12345"
    });

    authToken = jwt.sign(
      {
        id: doctorUser._id.toString(),
        role: doctorUser.role,
        email: doctorUser.email
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
    await DoctorSchedule.deleteMany({});
  });

  it("should create doctor schedule successfully", async () => {
    const schedule = {
      doctorId: doctor._id,
      weekSchedule: [{
        dayOfWeek: "01/01/2024",
        slots: [{
          slotTime: "09:00",
          isBooked: false,
          currentCount: 0
        }]
      }]
    };

    const res = await request(app)
      .post("/api/doctor-schedules")
      .set("Authorization", `Bearer ${authToken}`)
      .send(schedule);

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('doctorId');
  });

  it("should get doctor schedule by ID", async () => {
    const schedule = await DoctorSchedule.create({
      doctorId: doctor._id,
      weekSchedule: [{
        dayOfWeek: "01/01/2024",
        slots: [{
          slotTime: "09:00",
          isBooked: false,
          currentCount: 0
        }]
      }]
    });

    const res = await request(app)
      .get(`/api/doctor-schedules/${doctor._id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
  });
});