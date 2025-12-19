const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const connectDB = require('../config/db');
const Student = require('../models/Student');

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

describe('Student CRUD operations', () => {
    describe('GET /api/students', () => {
        test('returns all students', async () => {
            await Student.create([
                { name: 'Alice', email: 'alice@test.com', year: 1, department: 'CS', password: 'password123' },
                { name: 'Bob', email: 'bob@test.com', year: 2, department: 'Math', password: 'password123' }
            ]);

            const res = await request(app).get('/api/students');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.count).toBe(2);
            expect(res.body.data).toHaveLength(2);
        });

        test('returns empty array when no students exist', async () => {
            const res = await request(app).get('/api/students');

            expect(res.status).toBe(200);
            expect(res.body.data).toHaveLength(0);
        });
    });

    describe('GET /api/students/:id', () => {
        test('returns single student by id', async () => {
            const student = await Student.create({
                name: 'Charlie',
                email: 'charlie@test.com',
                year: 3,
                department: 'Physics',
                password: 'password123'
            });

            const res = await request(app).get(`/api/students/${student._id}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('Charlie');
        });

        test('returns 404 for non-existent student', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/students/${fakeId}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/not found/i);
        });

        test('returns 400 for invalid id format', async () => {
            const res = await request(app).get('/api/students/invalid-id');

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/invalid/i);
        });
    });

    describe('POST /api/students', () => {
        test('creates a new student with valid data', async () => {
            const studentData = {
                name: 'Dave',
                email: 'dave@test.com',
                year: 1,
                department: 'Engineering',
                password: 'password123'
            };

            const res = await request(app)
                .post('/api/students')
                .send(studentData);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.name).toBe('Dave');
            expect(res.body.data.email).toBe('dave@test.com');
        });

        test('validates required fields', async () => {
            const res = await request(app)
                .post('/api/students')
                .send({ name: 'Eve' });

            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        test('validates email format', async () => {
            const res = await request(app)
                .post('/api/students')
                .send({
                    name: 'Frank',
                    email: 'invalid-email',
                    year: 1,
                    department: 'CS'
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/email/i);
        });

        test('validates year range', async () => {
            const res = await request(app)
                .post('/api/students')
                .send({
                    name: 'Grace',
                    email: 'grace@test.com',
                    year: 10,
                    department: 'CS'
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/year/i);
        });
    });

    describe('PUT /api/students/:id', () => {
        test('updates student with valid data', async () => {
            const student = await Student.create({
                name: 'Ivan',
                email: 'ivan@test.com',
                year: 1,
                department: 'CS',
                password: 'password123'
            });

            const res = await request(app)
                .put(`/api/students/${student._id}`)
                .send({ year: 2, department: 'Engineering' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.year).toBe(2);
            expect(res.body.data.department).toBe('Engineering');
        });

        test('returns 404 for non-existent student', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .put(`/api/students/${fakeId}`)
                .send({ year: 3 });

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/not found/i);
        });

        test('validates updated fields', async () => {
            const student = await Student.create({
                name: 'Jane',
                email: 'jane@test.com',
                year: 2,
                department: 'Math',
                password: 'password123'
            });

            const res = await request(app)
                .put(`/api/students/${student._id}`)
                .send({ email: 'invalid-email' });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/email/i);
        });
    });

    describe('DELETE /api/students/:id', () => {
        test('deletes an existing student', async () => {
            const student = await Student.create({
                name: 'Karen',
                email: 'karen@test.com',
                year: 4,
                department: 'Physics',
                password: 'password123'
            });

            const res = await request(app).delete(`/api/students/${student._id}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);

            const deletedStudent = await Student.findById(student._id);
            expect(deletedStudent).toBeNull();
        });

        test('returns 404 for non-existent student', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).delete(`/api/students/${fakeId}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/not found/i);
        });

        test('returns 400 for invalid id format', async () => {
            const res = await request(app).delete('/api/students/invalid-id');

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/invalid/i);
        });
    });
});
