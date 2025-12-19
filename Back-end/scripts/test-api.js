// API Endpoint Testing Script
// Run with: node test-api.js

const axios = require('axios');

const baseUrl = 'http://localhost:5000';
let testResults = [];
let studentToken = null;
let teacherToken = null;
let staffToken = null;
let existingStudentToken = null;
let studentId = null;
let courseId = null;

function logSection(title) {
    console.log('\n' + '='.repeat(80));
    console.log(title);
    console.log('='.repeat(80));
}

function logTest(method, endpoint, description) {
    console.log(`\n[${method}] ${endpoint}`);
    console.log(`Description: ${description}`);
}

async function testEndpoint(method, endpoint, description, data = null, token = null) {
    logTest(method, endpoint, description);

    try {
        const config = {
            method,
            url: `${baseUrl}${endpoint}`,
            headers: { 'Content-Type': 'application/json' }
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (data) {
            config.data = data;
        }

        const response = await axios(config);

        console.log('✓ SUCCESS (Status:', response.status + ')');
        console.log('Response:', JSON.stringify(response.data, null, 2));

        testResults.push({ endpoint: `${method} ${endpoint}`, status: 'PASS', description });
        return response.data;
    } catch (error) {
        const status = error.response ? error.response.status : 'Network Error';
        console.log('✗ FAILED (Status:', status + ')');

        if (error.response && error.response.data) {
            console.log('Error:', JSON.stringify(error.response.data, null, 2));
        } else {
            console.log('Error:', error.message);
        }

        testResults.push({ endpoint: `${method} ${endpoint}`, status: 'FAIL', description: `${description} (${status})` });
        return null;
    }
}

async function runTests() {
    console.log('='.repeat(80));
    console.log('API ENDPOINT TESTING - DevFest Challenge Batna 2025');
    console.log('='.repeat(80));

    // Test 1: Root endpoint
    logSection('ROOT ENDPOINT');
    await testEndpoint('GET', '/', 'Root API info');

    // AUTHENTICATION TESTS
    logSection('AUTHENTICATION TESTS');

    // Test 2: Student Registration
    const studentData = {
        name: 'Test Student',
        email: `teststudent${Date.now()}@example.com`,
        password: 'password123',
        year: 2,
        department: 'Computer Science'
    };
    const registerResponse = await testEndpoint('POST', '/api/auth/register', 'Register new student', studentData);
    if (registerResponse) studentToken = registerResponse.token;

    // Test 3: Login as staff
    const staffLoginData = { email: 'sami.kaddour@admin.dz', password: 'admin123' };
    const staffLoginResponse = await testEndpoint('POST', '/api/auth/login', 'Login as staff', staffLoginData);
    if (staffLoginResponse) staffToken = staffLoginResponse.token;

    // Test 4: Login as teacher
    const teacherLoginData = { email: 'amina.belhadj@university.dz', password: 'teacher123' };
    const teacherLoginResponse = await testEndpoint('POST', '/api/auth/login', 'Login as teacher', teacherLoginData);
    if (teacherLoginResponse) teacherToken = teacherLoginResponse.token;

    // Test 5: Login as existing student
    const studentLoginData = { email: 'ahmed.benali@example.com', password: 'student123' };
    const studentLoginResponse = await testEndpoint('POST', '/api/auth/login', 'Login as existing student', studentLoginData);
    if (studentLoginResponse) {
        existingStudentToken = studentLoginResponse.token;
        studentId = studentLoginResponse.data.id;
    }

    // Test 6: Get current user profile
    if (studentToken) {
        await testEndpoint('GET', '/api/auth/me', 'Get authenticated user profile', null, studentToken);
    }

    // Test 7: Register teacher (staff only)
    if (staffToken) {
        const teacherData = {
            name: 'Test Teacher',
            email: `testteacher${Date.now()}@university.dz`,
            password: 'teacher123',
            department: 'Mathematics',
            title: 'Associate Professor'
        };
        await testEndpoint('POST', '/api/auth/register/teacher', 'Register teacher (staff only)', teacherData, staffToken);
    }

    // STUDENT ENDPOINTS
    logSection('STUDENT ENDPOINTS');

    // Test 8: Get all students (teacher/staff only)
    if (teacherToken) {
        const studentsResponse = await testEndpoint('GET', '/api/students', 'Get all students (teacher)', null, teacherToken);
        if (studentsResponse && studentsResponse.data && studentsResponse.data.length > 0) {
            studentId = studentsResponse.data[0]._id;
        }
    }

    // Test 9: Get single student
    if (teacherToken && studentId) {
        await testEndpoint('GET', `/api/students/${studentId}`, 'Get student by ID', null, teacherToken);
    }

    // Test 10: Create student (teacher/staff only)
    if (teacherToken) {
        const newStudentData = {
            name: 'Created Student',
            email: `created${Date.now()}@example.com`,
            year: 1,
            department: 'Physics',
            averageGrade: 15.5
        };
        await testEndpoint('POST', '/api/students', 'Create student (teacher)', newStudentData, teacherToken);
    }

    // Test 11: Update student
    if (teacherToken && studentId) {
        const updateData = { averageGrade: 18.5 };
        await testEndpoint('PUT', `/api/students/${studentId}`, 'Update student', updateData, teacherToken);
    }

    // COURSE ENDPOINTS
    logSection('COURSE ENDPOINTS');

    // Test 12: Get all courses (public)
    const coursesResponse = await testEndpoint('GET', '/api/courses', 'Get all courses (public)');
    if (coursesResponse && coursesResponse.data && coursesResponse.data.length > 0) {
        courseId = coursesResponse.data[0]._id;
    }

    // Test 13: Get single course (public)
    if (courseId) {
        await testEndpoint('GET', `/api/courses/${courseId}`, 'Get course by ID (public)');
    }

    // Test 14: Create course (teacher/staff only)
    if (teacherToken) {
        const courseData = {
            courseName: `Test Course ${Date.now()}`,
            code: `TEST${Math.floor(Math.random() * 900) + 100}`,
            credits: 3,
            semester: 'Fall',
            year: 2025
        };
        const newCourseResponse = await testEndpoint('POST', '/api/courses', 'Create course (teacher)', courseData, teacherToken);
        if (newCourseResponse && newCourseResponse.data) {
            courseId = newCourseResponse.data._id;
        }
    }

    // Test 15: Update course
    if (teacherToken && courseId) {
        const updateCourseData = { credits: 4 };
        await testEndpoint('PUT', `/api/courses/${courseId}`, 'Update course', updateCourseData, teacherToken);
    }

    // TOPIC ENDPOINTS
    logSection('TOPIC ENDPOINTS');

    // Test 16: Add topic to course
    if (teacherToken && courseId) {
        const topicData = {
            name: 'Test Topic',
            difficulty: 'Medium',
            description: 'This is a test topic'
        };
        const topicResponse = await testEndpoint('POST', `/api/courses/${courseId}/topics`, 'Add topic to course', topicData, teacherToken);

        if (topicResponse && topicResponse.data.topics && topicResponse.data.topics.length > 0) {
            const topicId = topicResponse.data.topics[topicResponse.data.topics.length - 1]._id;

            // Test 17: Update topic
            const updateTopicData = { difficulty: 'Hard' };
            await testEndpoint('PUT', `/api/courses/${courseId}/topics/${topicId}`, 'Update topic', updateTopicData, teacherToken);
        }
    }

    // ENROLLMENT
    logSection('ENROLLMENT ENDPOINTS');

    // Test 18: Enroll student in course
    if (existingStudentToken && courseId && studentId) {
        const enrollData = { courseId };
        await testEndpoint('POST', `/api/students/${studentId}/enroll`, 'Enroll student in course', enrollData, existingStudentToken);
    }

    // AI ENDPOINTS
    logSection('AI ENDPOINTS');

    // Test 19: Generate study plan
    const studyPlanData = {
        topic: 'Data Structures',
        difficulty: 'Medium',
        duration: '2 weeks'
    };
    await testEndpoint('POST', '/api/ai/study-plan', 'Generate AI study plan', studyPlanData);

    // Test 20: Summarize topic
    const summarizeData = {
        topic: 'Binary Search Trees',
        details: 'Explain the concept of binary search trees including insertion, deletion, and search operations'
    };
    await testEndpoint('POST', '/api/ai/summarize', 'AI summarize topic', summarizeData);

    // STUDY ENDPOINTS
    logSection('STUDY ENDPOINTS');

    // Test 21: Study assistant
    const studyData = { prompt: 'Explain the concept of recursion with examples' };
    await testEndpoint('POST', '/api/study', 'Study assistant', studyData);

    // Test 22: Summarize content
    const contentData = {
        content: 'Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems.'
    };
    await testEndpoint('POST', '/api/study/summarize', 'Summarize content', contentData);

    // Test 23: Fetch internships
    await testEndpoint('GET', '/api/study/internships', 'Fetch internships');

    // ERROR HANDLING TESTS
    logSection('ERROR HANDLING TESTS');

    // Test 24: Invalid login credentials
    const invalidLogin = { email: 'nonexistent@example.com', password: 'wrongpassword' };
    await testEndpoint('POST', '/api/auth/login', 'Login with invalid credentials (should fail)', invalidLogin);

    // Test 25: Unauthorized access
    await testEndpoint('GET', '/api/students', 'Get students without auth (should fail)');

    // Test 26: Invalid student ID
    if (teacherToken) {
        await testEndpoint('GET', '/api/students/invalid-id', 'Get student with invalid ID (should fail)', null, teacherToken);
    }

    // Test 27: Student trying to access admin endpoint
    if (studentToken) {
        await testEndpoint('GET', '/api/students', 'Student accessing admin endpoint (should fail)', null, studentToken);
    }

    // SUMMARY
    logSection('TEST SUMMARY');

    const passCount = testResults.filter(r => r.status === 'PASS').length;
    const failCount = testResults.filter(r => r.status === 'FAIL').length;
    const total = testResults.length;

    console.log(`\nTotal Tests: ${total}`);
    console.log(`Passed: ${passCount}`);
    console.log(`Failed: ${failCount}`);
    console.log(`Success Rate: ${((passCount / total) * 100).toFixed(2)}%`);

    console.log('\n\nDetailed Results:');
    console.log('-'.repeat(80));
    testResults.forEach((result, index) => {
        const status = result.status === 'PASS' ? '✓' : '✗';
        console.log(`${index + 1}. ${status} ${result.endpoint} - ${result.description}`);
    });

    console.log(`\nTest completed at ${new Date().toISOString()}`);
}

// Run tests
runTests().catch(error => {
    console.error('Fatal error running tests:', error.message);
    process.exit(1);
});
