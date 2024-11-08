import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../src/index";
import { Service, User } from "../models";

let mongoServer: MongoMemoryServer;
let authToken: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const res = await request(app).post("/api/auth/register").send({
    username: "manager123",
    email: "manager@test.com",
    password: "Manager@123",
    confirmPassword: "Manager@123",
  });

  authToken = res.body.data.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Service.deleteMany({});
});

describe("Service Routes", () => {
  it("Tạo dịch vụ mới thành công", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        serviceName: "Dịch vụ test",
        price: 100000,
        description: "Mô tả test",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Dịch vụ được tạo thành công!");
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

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Dịch vụ được tạo thành công!");
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

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Xóa thành công");
  });
});
