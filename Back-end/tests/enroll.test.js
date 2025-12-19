const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const connectDB = require('../config/db');
const Student = require('../models/Student');
const Course = require('../models/Course');

let app;
let mongoServer;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    process.env.MAX_ACTIVE_COURSES = '2';

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

describe('Student enrollment', () => {
    test('enrolls a student in a course', async () => {
        const course = await Course.create({ courseName: 'Algorithms', code: 'CS101' });
        const student = await Student.create({
            name: 'Jane Doe',
            email: 'jane@example.com',
            year: 1,
            department: 'CS',
            password: 'password123'
        });

        const res = await request(app)
            .post(`/api/students/${student._id}/enroll`)
            .send({ courseId: course._id.toString() });

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.enrolledCourses).toHaveLength(1);
        const enrolled = res.body.data.enrolledCourses[0];
        const enrolledCourseId = typeof enrolled.course === 'string' ? enrolled.course : enrolled.course._id;
        expect(enrolledCourseId).toBe(course._id.toString());
    });

    test('prevents duplicate enrollment', async () => {
        const course = await Course.create({ courseName: 'Databases', code: 'DB101' });
        const student = await Student.create({
            name: 'John Smith',
            email: 'john@example.com',
            year: 2,
            department: 'CS',
            password: 'password123'
        });

        await request(app)
            .post(`/api/students/${student._id}/enroll`)
            .send({ courseId: course._id.toString() });

        const res = await request(app)
            .post(`/api/students/${student._id}/enroll`)
            .send({ courseId: course._id.toString() });

        expect(res.status).toBe(409);
        expect(res.body.error).toMatch(/already enrolled/i);
    });

    test('fails when course does not exist', async () => {
        const fakeCourseId = new mongoose.Types.ObjectId();
        const student = await Student.create({
            name: 'Alice',
            email: 'alice@example.com',
            year: 3,
            department: 'CS',
            password: 'password123'
        });

        const res = await request(app)
            .post(`/api/students/${student._id}/enroll`)
            .send({ courseId: fakeCourseId.toString() });

        expect(res.status).toBe(404);
        expect(res.body.error).toMatch(/course not found/i);
    });

    test('enforces max active courses limit', async () => {
        const courses = await Course.create([
            { courseName: 'OS', code: 'OS101' },
            { courseName: 'Networks', code: 'NW101' },
            { courseName: 'AI', code: 'AI101' }
        ]);

        const student = await Student.create({
            name: 'Bob',
            email: 'bob@example.com',
            year: 4,
            department: 'CS',
            password: 'password123'
        });

        await request(app).post(`/api/students/${student._id}/enroll`).send({ courseId: courses[0]._id.toString() });
        await request(app).post(`/api/students/${student._id}/enroll`).send({ courseId: courses[1]._id.toString() });

        const res = await request(app)
            .post(`/api/students/${student._id}/enroll`)
            .send({ courseId: courses[2]._id.toString() });

        expect(res.status).toBe(400);
        expect(res.body.error).toMatch(/max active courses/i);
    });
});
