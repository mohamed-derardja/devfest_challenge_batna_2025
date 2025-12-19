const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const connectDB = require('../config/db');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const UniversityStaff = require('../models/UniversityStaff');

let app;
let mongoServer;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    await connectDB();
    app = require('../server');
}, 30000);

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe('Auth operations', () => {
    describe('POST /api/auth/register', () => {
        test('registers a new student', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Alice Student',
                    email: 'alice@example.com',
                    password: 'password123',
                    year: 2,
                    department: 'CS'
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.token).toBeDefined();
            expect(res.body.data.role).toBe('student');
        });

        test('prevents duplicate email registration', async () => {
            await Student.create({
                name: 'Bob',
                email: 'bob@example.com',
                password: 'pass123',
                year: 1,
                department: 'Math'
            });

            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Bob2',
                    email: 'bob@example.com',
                    password: 'pass456',
                    year: 2,
                    department: 'CS'
                });

            expect(res.status).toBe(409);
            expect(res.body.error).toMatch(/already in use/i);
        });

        test('validates required student fields', async () => {
            const res = await request(app)
                .post('/api/auth/register')
                .send({
                    name: 'Charlie',
                    email: 'charlie@example.com',
                    password: 'pass'
                });

            expect(res.status).toBe(400);
        });
    });

    describe('POST /api/auth/login', () => {
        test('logs in a student with correct credentials', async () => {
            await Student.create({
                name: 'Dave',
                email: 'dave@example.com',
                password: 'password123',
                year: 3,
                department: 'CS'
            });

            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'dave@example.com', password: 'password123' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.token).toBeDefined();
            expect(res.body.data.role).toBe('student');
        });

        test('rejects invalid password', async () => {
            await Student.create({
                name: 'Eve',
                email: 'eve@example.com',
                password: 'correctpass',
                year: 2,
                department: 'Math'
            });

            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'eve@example.com', password: 'wrongpass' });

            expect(res.status).toBe(401);
            expect(res.body.error).toMatch(/invalid/i);
        });

        test('rejects non-existent user', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({ email: 'nobody@example.com', password: 'password123' });

            expect(res.status).toBe(401);
        });
    });

    describe('GET /api/auth/me', () => {
        test('returns user profile with valid token', async () => {
            const student = await Student.create({
                name: 'Frank',
                email: 'frank@example.com',
                password: 'password123',
                year: 1,
                department: 'CS'
            });

            const loginRes = await request(app)
                .post('/api/auth/login')
                .send({ email: 'frank@example.com', password: 'password123' });

            const token = loginRes.body.token;

            const res = await request(app)
                .get('/api/auth/me')
                .set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBe('frank@example.com');
        });

        test('rejects request without token', async () => {
            const res = await request(app).get('/api/auth/me');

            expect(res.status).toBe(401);
        });
    });

    describe('Role-based authorization', () => {
        test('staff can register teachers', async () => {
            const staff = await UniversityStaff.create({
                name: 'Admin',
                email: 'admin@university.dz',
                password: 'admin123',
                position: 'Registrar',
                role: 'staff'
            });

            const staffLogin = await request(app)
                .post('/api/auth/login')
                .send({ email: 'admin@university.dz', password: 'admin123' });

            const res = await request(app)
                .post('/api/auth/register/teacher')
                .set('Authorization', `Bearer ${staffLogin.body.token}`)
                .send({
                    name: 'Prof. Smith',
                    email: 'smith@university.dz',
                    password: 'teacher123',
                    department: 'CS',
                    title: 'Professor'
                });

            expect(res.status).toBe(201);
            expect(res.body.data.role).toBe('teacher');
        });

        test('students cannot register teachers', async () => {
            const student = await Student.create({
                name: 'Greg',
                email: 'greg@example.com',
                password: 'pass123',
                year: 2,
                department: 'CS'
            });

            const studentLogin = await request(app)
                .post('/api/auth/login')
                .send({ email: 'greg@example.com', password: 'pass123' });

            const res = await request(app)
                .post('/api/auth/register/teacher')
                .set('Authorization', `Bearer ${studentLogin.body.token}`)
                .send({
                    name: 'Prof. X',
                    email: 'x@university.dz',
                    password: 'teacher123',
                    department: 'Math'
                });

            expect(res.status).toBe(403);
        });
    });
});
