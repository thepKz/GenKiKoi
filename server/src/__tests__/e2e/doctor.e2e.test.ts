import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../index';
import Doctor from '../../models/Doctor';
import User from '../../models/User';

let mongoServer: MongoMemoryServer;
let authToken: string;
let managerUser: any;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('Connected to in-memory MongoDB');

    // Create a test manager user and generate an auth token
    managerUser = await User.create({
        username: 'testmanager',
        email: 'manager@example.com',
        password: 'password123',
        role: 'manager',
        isVerified: true
    });

    authToken = jwt.sign({ _id: managerUser._id, role: 'manager' }, process.env.SECRET_KEY || 'your_jwt_secret', { expiresIn: '1h' });
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Doctor Controller', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        await Doctor.deleteMany({});
        // Recreate the manager user before each test
        managerUser = await User.create({
            username: 'testmanager',
            email: 'manager@example.com',
            password: 'password123',
            role: 'manager',
            isVerified: true
        });
        // Update the authToken with the new user's _id
        authToken = jwt.sign({ _id: managerUser._id, role: 'manager' }, process.env.SECRET_KEY || 'your_jwt_secret', { expiresIn: '1h' });
    });

    describe('POST /api/doctors', () => {
        it('should add a new doctor (E2E)', async () => {
            const res = await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. John Doe',
                    gender: 'nam',
                    email: 'john.doe@example.com',
                    specialization: 'Cardiology',
                    licenseNumber: 'LIC123456',
                    yearOfExperience: 10,
                    movingService: false
                });

            console.log('Response body:', res.body);

            expect(res.status).toBe(201);
            expect(res.body.message).toBe('Nhân viên được thêm thành công!');
            expect(res.body.data).toHaveProperty('_id');
            expect(res.body.data.fullName).toBe('Dr. John Doe');
        });

        it('should return error for missing required fields (E2E)', async () => {
            const res = await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. John Doe',
                    gender: 'nam',
                    // Missing other required fields
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('Vui lòng điền đầy đủ thông tin');
        });
    });

    describe('GET /api/doctors', () => {
        it('should get all doctors (E2E)', async () => {
            // First, add a doctor
            await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. Jane Doe',
                    gender: 'nữ',
                    email: 'jane.doe@example.com',
                    specialization: 'Neurology',
                    licenseNumber: 'LIC789012',
                    yearOfExperience: 8,
                    movingService: true
                });

            const res = await request(app)
                .get('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`);

            console.log('GET /api/doctors response:', res.body);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data.length).toBeGreaterThan(0);
            expect(res.body.data[0]).toHaveProperty('fullName');
        });

        it('should return 401 if no token is provided', async () => {
            const res = await request(app).get('/api/doctors');
            expect(res.status).toBe(401);
        });
    });

    describe('PATCH /api/doctors/:id', () => {
        it('should update a doctor (E2E)', async () => {
            // First, add a doctor
            const addRes = await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. Update Me',
                    gender: 'nam',
                    email: 'update.me@example.com',
                    specialization: 'General',
                    licenseNumber: 'LIC345678',
                    yearOfExperience: 5,
                    movingService: false
                });

            console.log('Doctor creation response:', addRes.body);

            expect(addRes.status).toBe(201);

            const doctorId = addRes.body.data._id;

            const updateRes = await request(app)
                .patch(`/api/doctors/${doctorId}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. Updated',
                    yearOfExperience: 6,
                    movingService: true
                });

            expect(updateRes.status).toBe(200);
            expect(updateRes.body.message).toBe('Cập nhật thông tin bác sĩ thành công');
            expect(updateRes.body.data.fullName).toBe('Dr. Updated');
            expect(updateRes.body.data.yearOfExperience).toBe(6);
            expect(updateRes.body.data.movingService).toBe(true);
        });
    });

    describe('DELETE /api/doctors/:id', () => {
        it('should delete a doctor (E2E)', async () => {
            // First, add a doctor
            const addRes = await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. Delete Me',
                    gender: 'nữ',
                    email: 'delete.me@example.com',
                    specialization: 'Pediatrics',
                    licenseNumber: 'LIC901234',
                    yearOfExperience: 7,
                    movingService: true
                });

            console.log('Doctor creation response:', addRes.body);

            expect(addRes.status).toBe(201);

            const doctorId = addRes.body.data._id;

            const deleteRes = await request(app)
                .delete(`/api/doctors/${doctorId}`)
                .set('Authorization', `Bearer ${authToken}`);

            expect(deleteRes.status).toBe(200);
            expect(deleteRes.body.message).toBe('Xóa thành công');

            // Verify the doctor is deleted
            const getRes = await request(app)
                .get('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`);
            expect(getRes.body.data.find((d: any) => d._id === doctorId)).toBeUndefined();
        });
    });

    describe('GET /api/doctors/all', () => {
        it('should get all doctors for booking (E2E)', async () => {
            // Add a couple of doctors
            await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. Booking One',
                    gender: 'nam',
                    email: 'booking.one@example.com',
                    specialization: 'Dermatology',
                    licenseNumber: 'LIC111111',
                    yearOfExperience: 9,
                    movingService: false
                });

            await request(app)
                .post('/api/doctors')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    fullName: 'Dr. Booking Two',
                    gender: 'nữ',
                    email: 'booking.two@example.com',
                    specialization: 'Ophthalmology',
                    licenseNumber: 'LIC222222',
                    yearOfExperience: 11,
                    movingService: true
                });

            const res = await request(app)
                .get('/api/doctors/all')
                .set('Authorization', `Bearer ${authToken}`);

            console.log('GET /api/doctors/all response:', res.body);

            expect(res.status).toBe(200);
            expect(res.body.data).toBeInstanceOf(Array);
            expect(res.body.data.length).toBe(2);
            expect(res.body.data[0]).toHaveProperty('fullName');
        });

        it('should return 401 if no token is provided', async () => {
            const res = await request(app).get('/api/doctors/all');
            expect(res.status).toBe(401);
        });
    });
});