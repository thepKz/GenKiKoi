import mongoose from "mongoose";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import { app } from "../../src/index";
import { Staff, User } from "../models";

let mongoServer: MongoMemoryServer;
let managerToken: string;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());

  const res = await request(app).post("/api/auth/register").send({
    username: "manager123",
    email: "manager@test.com",
    password: "Manager@123",
    confirmPassword: "Manager@123",
    role: "manager",
  });

  managerToken = res.body.data.token;
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Staff.deleteMany({});
  await User.deleteMany({ role: "staff" });
});

describe("Staff Routes", () => {
  it("Tạo nhân viên mới thành công", async () => {
    const res = await request(app)
      .post("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        fullName: "Staff Test",
        gender: "nam",
        position: "Tiếp tân",
        email: "staff@test.com",
        workShift: "Sáng",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Nhân viên được thêm thành công!"
    );
    expect(res.body.data).toHaveProperty("fullName", "Staff Test");
  });

  it("Tạo nhân viên với email đã tồn tại", async () => {
    await request(app)
      .post("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        fullName: "Staff One",
        gender: "nam",
        position: "Tiếp tân",
        email: "staff@test.com",
        workShift: "Sáng",
      });

    const res = await request(app)
      .post("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        fullName: "Staff Two",
        gender: "nữ",
        position: "Tiếp tân",
        email: "staff@test.com", // Email trùng
        workShift: "Chiều",
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Nhân viên được thêm thành công!"
    );
  });

  it("Lấy danh sách nhân viên", async () => {
    await request(app)
      .post("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        fullName: "Staff Test",
        gender: "nam",
        position: "Tiếp tân",
        email: "staff@test.com",
        workShift: "Sáng",
      });

    const res = await request(app)
      .get("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
  });

  it("Tạo nhân viên với ca làm việc không hợp lệ", async () => {
    const res = await request(app)
      .post("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        fullName: "Staff Test",
        gender: "nam",
        position: "Tiếp tân",
        email: "staff@test.com",
        workShift: "Tối", // Ca làm việc không hợp lệ
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty(
      "message",
      "Nhân viên được thêm thành công!"
    );
  });

  it("Xóa nhân viên", async () => {
    const createRes = await request(app)
      .post("/api/staffs")
      .set("Authorization", `Bearer ${managerToken}`)
      .send({
        fullName: "Staff Test",
        gender: "nam",
        position: "Tiếp tân",
        email: "staff@test.com",
        workShift: "Sáng",
      });

    const staffId = createRes.body.data._id;

    const deleteRes = await request(app)
      .delete(`/api/staffs/${staffId}`)
      .set("Authorization", `Bearer ${managerToken}`);

    expect(deleteRes.status).toBe(200);
    expect(deleteRes.body).toHaveProperty("message", "Xóa thành công");
  });
});
