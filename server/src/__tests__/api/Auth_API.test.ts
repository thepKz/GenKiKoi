import request from "supertest";
import app from "../../app"; // Ensure this path points to your Express app

describe("Auth API", () => {
  describe("POST /register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "TestUser123",
        email: "test@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("message", "Đăng ký thành công!");
    });

    it("should return error if email already exists", async () => {
      const response = await request(app).post("/api/auth/register").send({
        username: "TestUser123",
        email: "existing@example.com",
        password: "Password123!",
        confirmPassword: "Password123!",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "email",
        "Email này đã được sử dụng!"
      );
    });
  });

  describe("POST /login", () => {
    it("should log in a user successfully", async () => {
      const response = await request(app).post("/api/auth/login").send({
        login: "testuser",
        password: "Password123!",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message", "Đăng nhập thành công!");
    });

    it("should return error for invalid credentials", async () => {
      const response = await request(app).post("/api/auth/login").send({
        login: "nonexistentuser",
        password: "WrongPassword!",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        "message",
        "Tài khoản không tồn tại!"
      );
    });
  });

  // Add more tests for other routes like /verify-email, /login-google, etc.
});
