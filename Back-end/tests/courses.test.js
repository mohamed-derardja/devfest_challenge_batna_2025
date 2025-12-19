const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const connectDB = require('../config/db');
const Course = require('../models/Course');

let app;
let mongoServer;

beforeAll(async () => {
    process.env.NODE_ENV = 'test';
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();
    await connectDB();
    app = require('../server');
});

afterEach(async () => {
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    await mongoose.disconnect();
    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe('Course CRUD operations', () => {
    describe('GET /api/courses', () => {
        test('returns all courses', async () => {
            await Course.create([
                { courseName: 'Data Structures', code: 'CS201' },
                { courseName: 'Calculus I', code: 'MATH101' }
            ]);

            const res = await request(app).get('/api/courses');

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.count).toBe(2);
            expect(res.body.data).toHaveLength(2);
        });

        test('returns empty array when no courses exist', async () => {
            const res = await request(app).get('/api/courses');

            expect(res.status).toBe(200);
            expect(res.body.data).toHaveLength(0);
        });
    });

    describe('GET /api/courses/:id', () => {
        test('returns single course by id', async () => {
            const course = await Course.create({
                courseName: 'Algorithms',
                code: 'CS301'
            });

            const res = await request(app).get(`/api/courses/${course._id}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.courseName).toBe('Algorithms');
        });

        test('returns 404 for non-existent course', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).get(`/api/courses/${fakeId}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/not found/i);
        });

        test('returns 400 for invalid id format', async () => {
            const res = await request(app).get('/api/courses/invalid-id');

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/invalid/i);
        });
    });

    describe('POST /api/courses', () => {
        test('creates a new course with valid data', async () => {
            const courseData = {
                courseName: 'Database Systems',
                code: 'DB101',
                credits: 4,
                semester: 'Fall',
                year: 3
            };

            const res = await request(app)
                .post('/api/courses')
                .send(courseData);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.courseName).toBe('Database Systems');
            expect(res.body.data.code).toBe('DB101');
        });

        test('validates required fields', async () => {
            const res = await request(app)
                .post('/api/courses')
                .send({ courseName: 'Incomplete Course' });

            expect(res.status).toBe(400);
            expect(res.body.error).toBeDefined();
        });

        test('validates semester enum', async () => {
            const res = await request(app)
                .post('/api/courses')
                .send({
                    courseName: 'Test Course',
                    code: 'TEST101',
                    semester: 'Winter'
                });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/semester/i);
        });
    });

    describe('PUT /api/courses/:id', () => {
        test('updates course with valid data', async () => {
            const course = await Course.create({
                courseName: 'Networks',
                code: 'NET101'
            });

            const res = await request(app)
                .put(`/api/courses/${course._id}`)
                .send({ credits: 5, semester: 'Spring' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.credits).toBe(5);
            expect(res.body.data.semester).toBe('Spring');
        });

        test('returns 404 for non-existent course', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .put(`/api/courses/${fakeId}`)
                .send({ credits: 4 });

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/not found/i);
        });

        test('validates updated fields', async () => {
            const course = await Course.create({
                courseName: 'AI',
                code: 'AI101'
            });

            const res = await request(app)
                .put(`/api/courses/${course._id}`)
                .send({ semester: 'InvalidSemester' });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/semester/i);
        });
    });

    describe('DELETE /api/courses/:id', () => {
        test('deletes an existing course', async () => {
            const course = await Course.create({
                courseName: 'Compilers',
                code: 'COMP301'
            });

            const res = await request(app).delete(`/api/courses/${course._id}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);

            const deletedCourse = await Course.findById(course._id);
            expect(deletedCourse).toBeNull();
        });

        test('returns 404 for non-existent course', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app).delete(`/api/courses/${fakeId}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/not found/i);
        });

        test('returns 400 for invalid id format', async () => {
            const res = await request(app).delete('/api/courses/invalid-id');

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/invalid/i);
        });
    });
});

describe('Topic operations', () => {
    describe('POST /api/courses/:id/topics', () => {
        test('adds a topic to a course', async () => {
            const course = await Course.create({
                courseName: 'ML',
                code: 'ML101'
            });

            const topicData = {
                name: 'Linear Regression',
                difficulty: 'Medium',
                description: 'Introduction to linear models'
            };

            const res = await request(app)
                .post(`/api/courses/${course._id}/topics`)
                .send(topicData);

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.topics).toHaveLength(1);
            expect(res.body.data.topics[0].name).toBe('Linear Regression');
        });

        test('returns 404 for non-existent course', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const res = await request(app)
                .post(`/api/courses/${fakeId}/topics`)
                .send({ name: 'Test Topic', difficulty: 'Easy' });

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/course not found/i);
        });

        test('validates topic difficulty enum', async () => {
            const course = await Course.create({
                courseName: 'DL',
                code: 'DL101'
            });

            const res = await request(app)
                .post(`/api/courses/${course._id}/topics`)
                .send({ name: 'Neural Networks', difficulty: 'VeryHard' });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/difficulty/i);
        });
    });

    describe('PUT /api/courses/:id/topics/:topicId', () => {
        test('updates a topic in a course', async () => {
            const course = await Course.create({
                courseName: 'Web Dev',
                code: 'WEB101',
                topics: [{ name: 'HTML Basics', difficulty: 'Easy' }]
            });

            const topicId = course.topics[0]._id;

            const res = await request(app)
                .put(`/api/courses/${course._id}/topics/${topicId}`)
                .send({ difficulty: 'Medium', name: 'Advanced HTML' });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.topics[0].name).toBe('Advanced HTML');
            expect(res.body.data.topics[0].difficulty).toBe('Medium');
        });

        test('returns 404 for non-existent course', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const topicId = new mongoose.Types.ObjectId();

            const res = await request(app)
                .put(`/api/courses/${fakeId}/topics/${topicId}`)
                .send({ difficulty: 'Hard' });

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/course not found/i);
        });

        test('returns 404 for non-existent topic', async () => {
            const course = await Course.create({
                courseName: 'Security',
                code: 'SEC101'
            });

            const fakeTopicId = new mongoose.Types.ObjectId();

            const res = await request(app)
                .put(`/api/courses/${course._id}/topics/${fakeTopicId}`)
                .send({ difficulty: 'Hard' });

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/topic not found/i);
        });

        test('returns 400 for invalid topic id format', async () => {
            const course = await Course.create({
                courseName: 'Cloud',
                code: 'CLOUD101'
            });

            const res = await request(app)
                .put(`/api/courses/${course._id}/topics/invalid-id`)
                .send({ difficulty: 'Hard' });

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/invalid.*topic/i);
        });
    });

    describe('DELETE /api/courses/:id/topics/:topicId', () => {
        test('deletes a topic from a course', async () => {
            const course = await Course.create({
                courseName: 'Mobile Dev',
                code: 'MOB101',
                topics: [
                    { name: 'Android Basics', difficulty: 'Medium' },
                    { name: 'iOS Basics', difficulty: 'Medium' }
                ]
            });

            const topicId = course.topics[0]._id;

            const res = await request(app)
                .delete(`/api/courses/${course._id}/topics/${topicId}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.topics).toHaveLength(1);
            expect(res.body.data.topics[0].name).toBe('iOS Basics');
        });

        test('returns 404 for non-existent course', async () => {
            const fakeId = new mongoose.Types.ObjectId();
            const topicId = new mongoose.Types.ObjectId();

            const res = await request(app)
                .delete(`/api/courses/${fakeId}/topics/${topicId}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/course not found/i);
        });

        test('returns 404 for non-existent topic', async () => {
            const course = await Course.create({
                courseName: 'DevOps',
                code: 'DEVOPS101'
            });

            const fakeTopicId = new mongoose.Types.ObjectId();

            const res = await request(app)
                .delete(`/api/courses/${course._id}/topics/${fakeTopicId}`);

            expect(res.status).toBe(404);
            expect(res.body.error).toMatch(/topic not found/i);
        });

        test('returns 400 for invalid topic id format', async () => {
            const course = await Course.create({
                courseName: 'Blockchain',
                code: 'BLOCK101'
            });

            const res = await request(app)
                .delete(`/api/courses/${course._id}/topics/invalid-id`);

            expect(res.status).toBe(400);
            expect(res.body.error).toMatch(/invalid.*topic/i);
        });
    });
});
