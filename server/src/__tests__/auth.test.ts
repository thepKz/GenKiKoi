import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../src/index";
import { User, Customer } from "../models";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await User.deleteMany({});
  await Customer.deleteMany({});
});

describe("Auth Routes", () => {
  describe("POST /api/auth/register", () => {
    const validUser = {
      username: "testuser123",
      email: "test@example.com",
      password: "Test@123",
      confirmPassword: "Test@123",
    };

    it("Đăng ký thành công với dữ liệu hợp lệ", async () => {
      const res = await request(app).post("/api/auth/register").send(validUser);

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message", "Đăng ký thành công!");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data).toHaveProperty("username", validUser.username);
    });

    it("Đăng ký với username ngắn", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          ...validUser,
          username: "test", // < 8 ký tự
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message", "Đăng ký thành công!");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data).toHaveProperty("username", validUser.username);
    });

    it("Đăng ký với email sai định dạng", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser123",
        email: "invalid.email",
        password: "Test@123",
        confirmPassword: "Test@123",
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("message", "Đăng ký thành công!");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data).toHaveProperty("username", validUser.username);
    });
  });

  describe("POST /api/auth/login", () => {
    beforeEach(async () => {
      const user = {
        username: "testuser123",
        email: "test@example.com",
        password: "Test@123",
        confirmPassword: "Test@123",
      };
      await request(app).post("/api/auth/register").send(user);
    });

    it("Đăng nhập với email", async () => {
      const res = await request(app).post("/api/auth/login").send({
        login: "test@example.com",
        password: "Test@123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Đăng nhập thành công!");
      expect(res.body.data).toHaveProperty("token");
    });

    it("Đăng nhập với username", async () => {
      const res = await request(app).post("/api/auth/login").send({
        login: "testuser123",
        password: "Test@123",
      });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message", "Đăng nhập thành công!");
      expect(res.body.data).toHaveProperty("token");
    });

    it("Đăng nhập với tài khoản không tồn tại", async () => {
      const res = await request(app).post("/api/auth/login").send({
        login: "nonexistent@example.com",
        password: "Test@123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("message", "Tài khoản không tồn tại!");
    });

    it("Đăng nhập khi sai mật khẩu", async () => {
      const res = await request(app).post("/api/auth/login").send({
        login: "test@example.com",
        password: "WrongPass@123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Thông tin đăng nhập sai, vui lòng thử lại!"
      );
    });

    it("Đăng nhập khi tài khoản bị khóa", async () => {
      // Khóa tài khoản test
      await User.findOneAndUpdate(
        { email: "test@example.com" },
        { isDisabled: true }
      );

      const res = await request(app).post("/api/auth/login").send({
        login: "test@example.com",
        password: "Test@123",
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty(
        "message",
        "Tài khoản của bạn đã bị khóa! Vui lòng liên hệ quản trị viên để được hỗ trợ"
      );
    });
  });
});
