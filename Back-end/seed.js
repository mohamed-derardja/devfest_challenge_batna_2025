require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Student = require('./models/Student');
const Course = require('./models/Course');

// Sample data
const courses = [
    {
        courseName: 'Data Structures and Algorithms',
        code: 'CS201',
        credits: 4,
        semester: 'Fall',
        year: 2024,
        topics: [
            {
                name: 'Arrays and Linked Lists',
                difficulty: 'Easy',
                examDate: new Date('2025-01-15'),
                description: 'Basic data structures: arrays, linked lists, stacks, queues',
                resources: [
                    { title: 'Arrays Tutorial', url: 'https://example.com/arrays', type: 'tutorial' },
                    { title: 'Linked Lists Video', url: 'https://example.com/linked-lists', type: 'video' }
                ]
            },
            {
                name: 'Trees and Graphs',
                difficulty: 'Medium',
                examDate: new Date('2025-02-20'),
                description: 'Binary trees, BST, graph traversal algorithms',
                resources: [
                    { title: 'Tree Algorithms', url: 'https://example.com/trees', type: 'article' }
                ]
            },
            {
                name: 'Dynamic Programming',
                difficulty: 'Hard',
                examDate: new Date('2025-03-25'),
                description: 'Advanced problem-solving with DP techniques',
                resources: [
                    { title: 'DP Masterclass', url: 'https://example.com/dp', type: 'video' }
                ]
            }
        ]
    },
    {
        courseName: 'Web Development',
        code: 'CS301',
        credits: 3,
        semester: 'Fall',
        year: 2024,
        topics: [
            {
                name: 'HTML & CSS Fundamentals',
                difficulty: 'Easy',
                examDate: new Date('2025-01-10'),
                description: 'Building responsive web pages',
                resources: [
                    { title: 'HTML Basics', url: 'https://example.com/html', type: 'documentation' }
                ]
            },
            {
                name: 'JavaScript & DOM Manipulation',
                difficulty: 'Medium',
                examDate: new Date('2025-02-15'),
                description: 'Interactive web applications with JavaScript'
            },
            {
                name: 'React Framework',
                difficulty: 'Hard',
                examDate: new Date('2025-03-20'),
                description: 'Modern frontend development with React'
            }
        ]
    },
    {
        courseName: 'Database Systems',
        code: 'CS202',
        credits: 4,
        semester: 'Spring',
        year: 2025,
        topics: [
            {
                name: 'SQL Basics',
                difficulty: 'Easy',
                examDate: new Date('2025-02-05'),
                description: 'SQL queries, joins, and basic operations'
            },
            {
                name: 'Database Design',
                difficulty: 'Medium',
                examDate: new Date('2025-03-10'),
                description: 'ER diagrams, normalization, schema design'
            },
            {
                name: 'NoSQL Databases',
                difficulty: 'Medium',
                examDate: new Date('2025-04-15'),
                description: 'MongoDB, document stores, and scalability'
            }
        ]
    },
    {
        courseName: 'Artificial Intelligence',
        code: 'CS401',
        credits: 3,
        semester: 'Spring',
        year: 2025,
        topics: [
            {
                name: 'Search Algorithms',
                difficulty: 'Medium',
                examDate: new Date('2025-02-25'),
                description: 'BFS, DFS, A* search'
            },
            {
                name: 'Machine Learning Basics',
                difficulty: 'Hard',
                examDate: new Date('2025-03-30'),
                description: 'Supervised and unsupervised learning'
            }
        ]
    },
    {
        courseName: 'Operating Systems',
        code: 'CS302',
        credits: 4,
        semester: 'Fall',
        year: 2024,
        topics: [
            {
                name: 'Process Management',
                difficulty: 'Medium',
                examDate: new Date('2025-01-20'),
                description: 'Processes, threads, scheduling'
            },
            {
                name: 'Memory Management',
                difficulty: 'Hard',
                examDate: new Date('2025-02-28'),
                description: 'Virtual memory, paging, segmentation'
            }
        ]
    }
];

const students = [
    {
        name: 'Ahmed Benali',
        email: 'ahmed.benali@example.com',
        year: 3,
        department: 'Computer Science',
        averageGrade: 18.5,
        enrolledCourses: []
    },
    {
        name: 'Sarah Mansouri',
        email: 'sarah.mansouri@example.com',
        year: 2,
        department: 'Computer Science',
        averageGrade: 19.5,
        enrolledCourses: []
    },
    {
        name: 'Karim Zoubir',
        email: 'karim.zoubir@example.com',
        year: 4,
        department: 'Software Engineering',
        averageGrade: 17.5,
        enrolledCourses: []
    },
    {
        name: 'Fatima Amrani',
        email: 'fatima.amrani@example.com',
        year: 1,
        department: 'Computer Science',
        averageGrade: 19.0,
        enrolledCourses: []
    },
    {
        name: 'Youcef Bouazza',
        email: 'youcef.bouazza@example.com',
        year: 3,
        department: 'Information Systems',
        averageGrade: 17.0,
        enrolledCourses: []
    },
    {
        name: 'Amira Taleb',
        email: 'amira.taleb@example.com',
        year: 2,
        department: 'Computer Science',
        averageGrade: 18.0,
        enrolledCourses: []
    },
    {
        name: 'Mohamed Khelifi',
        email: 'mohamed.khelifi@example.com',
        year: 4,
        department: 'Software Engineering',
        averageGrade: 16.5,
        enrolledCourses: []
    },
    {
        name: 'Nadia Cherif',
        email: 'nadia.cherif@example.com',
        year: 1,
        department: 'Computer Science',
        averageGrade: 19.5,
        enrolledCourses: []
    },
    {
        name: 'Rachid Mekki',
        email: 'rachid.mekki@example.com',
        year: 3,
        department: 'Computer Science',
        averageGrade: 18.5,
        enrolledCourses: []
    },
    {
        name: 'Leila Hamdi',
        email: 'leila.hamdi@example.com',
        year: 2,
        department: 'Information Systems',
        averageGrade: 17.5,
        enrolledCourses: []
    }
];

const seedDatabase = async () => {
    try {
        // Connect to database
        await connectDB();

        // Clear existing data
        console.log('Clearing existing data...');
        await Student.deleteMany();
        await Course.deleteMany();

        // Create courses
        console.log('Creating courses...');
        const createdCourses = await Course.insertMany(courses);
        console.log(`✓ Created ${createdCourses.length} courses`);

        // Assign courses to students
        students[0].enrolledCourses = [
            { course: createdCourses[0]._id, status: 'active' }, // DS&A
            { course: createdCourses[1]._id, status: 'active' }  // Web Dev
        ];
        students[1].enrolledCourses = [
            { course: createdCourses[0]._id, status: 'active' },
            { course: createdCourses[2]._id, status: 'active' }  // Database
        ];
        students[2].enrolledCourses = [
            { course: createdCourses[1]._id, status: 'active' },
            { course: createdCourses[3]._id, status: 'active' },  // AI
            { course: createdCourses[4]._id, status: 'completed' } // OS
        ];
        students[3].enrolledCourses = [
            { course: createdCourses[0]._id, status: 'active' }
        ];
        students[4].enrolledCourses = [
            { course: createdCourses[2]._id, status: 'active' },
            { course: createdCourses[4]._id, status: 'active' }
        ];
        students[5].enrolledCourses = [
            { course: createdCourses[0]._id, status: 'active' },
            { course: createdCourses[1]._id, status: 'active' }
        ];
        students[6].enrolledCourses = [
            { course: createdCourses[3]._id, status: 'active' },
            { course: createdCourses[4]._id, status: 'completed' }
        ];
        students[7].enrolledCourses = [
            { course: createdCourses[0]._id, status: 'active' }
        ];
        students[8].enrolledCourses = [
            { course: createdCourses[0]._id, status: 'active' },
            { course: createdCourses[2]._id, status: 'active' },
            { course: createdCourses[3]._id, status: 'active' }
        ];
        students[9].enrolledCourses = [
            { course: createdCourses[2]._id, status: 'active' },
            { course: createdCourses[4]._id, status: 'active' }
        ];

        // Create students
        console.log('Creating students...');
        const createdStudents = await Student.insertMany(students);
        console.log(`✓ Created ${createdStudents.length} students`);

        console.log('\n✅ Database seeded successfully!');
        console.log('\nSummary:');
        console.log(`- ${createdCourses.length} courses with multiple topics`);
        console.log(`- ${createdStudents.length} students with enrolled courses`);
        console.log('\nYou can now test the API endpoints!');

        if (require.main === module) {
            process.exit(0);
        }
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
