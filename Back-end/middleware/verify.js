const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Student = require('../models/Student');
const Course = require('../models/Course');

const runVerification = async () => {
    console.log('Starting verification...');

    // 1. Start Memory Server
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('InMemory MongoDB running at:', uri);

    // 2. Set Env Vars BEFORE requiring server
    process.env.MONGO_URI = uri;
    process.env.PORT = '5001'; // Use different port
    process.env.NODE_ENV = 'test';

    // 3. Start Server (it will connect to our MS)
    // We suppress console.log from server to keep output clean
    // const originalLog = console.log;
    // console.log = () => {}; 
    const app = require('../server');
    // console.log = originalLog;

    // Wait a bit for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 4. Seed Data
    console.log('Seeding data...');
    const courseData = [
        {
            courseName: 'Test Course',
            code: 'TEST101',
            topics: [
                { name: 'Topic A', difficulty: 'Easy', examDate: new Date() },
                { name: 'Topic B', difficulty: 'Hard', examDate: new Date() }
            ]
        }
    ];

    // Create course
    const createdCourses = await Course.insertMany(courseData);
    const courseId = createdCourses[0]._id;

    // Create student
    const studentData = {
        name: 'Test Student',
        email: 'test@example.com',
        year: 1,
        department: 'CS',
        enrolledCourses: [
            { course: courseId, status: 'active' }
        ]
    };
    const createdStudent = await Student.create(studentData);
    console.log('Seeded Student ID:', createdStudent._id);

    // 5. Test Endpoints
    const baseUrl = 'http://localhost:5001/api';

    try {
        // Test GET /topics
        console.log('\nTesting GET /topics...');
        const topicsRes = await fetch(`${baseUrl}/topics`);
        const topicsJson = await topicsRes.json();
        console.log('Topics Response Status:', topicsRes.status);
        console.log('Topics Count:', topicsJson.count);

        if (topicsJson.success && topicsJson.count >= 2) {
            console.log('PASS: Topics list retrieved.');
        } else {
            console.error('FAIL: Topics list invalid.', topicsJson);
        }

        // Test GET /courses/:id/topics
        console.log('\nTesting GET /courses/:id/topics...');
        const crsTopicsRes = await fetch(`${baseUrl}/courses/${courseId}/topics`);
        const crsTopicsJson = await crsTopicsRes.json();
        if (crsTopicsJson.success && crsTopicsJson.count === 2) {
            console.log('PASS: Course topics retrieved.');
        } else {
            console.error('FAIL: Course topics invalid.', crsTopicsJson);
        }

        // Test POST /ai/study-plan
        console.log('\nTesting POST /ai/study-plan...');
        const aiRes = await fetch(`${baseUrl}/ai/study-plan`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentId: createdStudent._id })
        });
        const aiJson = await aiRes.json();
        console.log('AI Response Status:', aiRes.status);

        if (aiJson.success && aiJson.data.aiResponse) {
            console.log('PASS: AI Study Plan generated.');
            console.log('Plan:', aiJson.data.aiResponse.plan);
            console.log('Input sent to AI:', JSON.stringify(aiJson.data.inputSentToAI, null, 2));
        } else {
            console.error('FAIL: AI Study Plan failed.', aiJson);
        }

    } catch (err) {
        console.error('Verification failed with error:', err);
    }

    // Cleanup
    console.log('\nStopping server...');
    await mongoose.disconnect();
    await mongod.stop();
    process.exit(0);
};

runVerification();
