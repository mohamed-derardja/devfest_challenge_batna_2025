# DevFest Challenge Batna 2025 - Back-end API

Student management system backend with complete CRUD operations, validation, testing, and API documentation.

## Features

- ✅ **Authentication & Authorization** - JWT-based auth with role-based access control
- ✅ **Role-Based Hierarchy** - Student (user), Teacher (admin), University Staff (super admin)
- ✅ **Student CRUD Operations** - Create, read, update, delete students
- ✅ **Course CRUD Operations** - Manage courses and topics
- ✅ **Enrollment System** - Enroll students with validation (course exists, duplicate prevention, max active courses)
- ✅ **Request Validation** - express-validator for all endpoints
- ✅ **Error Handling** - Standardized error responses (400, 401, 403, 404, 409, 500)
- ✅ **Comprehensive Tests** - 60+ integration tests using Jest + Supertest + MongoDB Memory Server
- ✅ **API Documentation** - Swagger/OpenAPI at `/api-docs`
- ✅ **Postman Collection** - Ready-to-import collection with auto-variable capture

## Quick Start

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/devfest
PORT=5000
NODE_ENV=development
MAX_ACTIVE_COURSES=5
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
```

### Run Development Server

```bash
npm run dev
```

### Run Tests

```bash
npm test
```

### Seed Database

```bash
npm run seed
```

## API Documentation

### Swagger UI
Open [http://localhost:5000/api-docs](http://localhost:5000/api-docs) for interactive API documentation.

### Postman Collection
Import `postman_collection.json` into Postman for quick testing. Collection includes:
- Auto-capture of IDs (studentId, courseId, topicId)
- Pre-configured environment variables
- All CRUD operations for students, courses, and topics

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student (public)
- `POST /api/auth/login` - Login with email/password (returns JWT)
- `GET /api/auth/me` - Get current user profile (protected)
- `POST /api/auth/register/teacher` - Register teacher (staff only)
- `POST /api/auth/register/staff` - Register staff (staff only)

### Students
- `GET /api/students` - Get all students (teacher/staff only)
- `GET /api/students/:id` - Get student by ID (authenticated)
- `POST /api/students` - Create student (teacher/staff only)
- `PUT /api/students/:id` - Update student (authenticated, own profile or admin)
- `DELETE /api/students/:id` - Delete student (teacher/staff only)
- `POST /api/students/:id/enroll` - Enroll student in course (authenticated)

### Courses
- `GET /api/courses` - Get all courses (public)
- `GET /api/courses/:id` - Get course by ID (public)
- `POST /api/courses` - Create course (teacher/staff only)
- `PUT /api/courses/:id` - Update course (teacher/staff only)
- `DELETE /api/courses/:id` - Delete course (teacher/staff only)

### Topics
- `POST /api/courses/:id/topics` - Add topic to course (teacher/staff only)
- `PUT /api/courses/:id/topics/:topicId` - Update topic (teacher/staff only)
- `DELETE /api/courses/:id/topics/:topicId` - Delete topic (teacher/staff only)

## Authorization & Roles

The system implements three user roles:

- **Student** (`student`) - Regular users, can view their profile, enroll in courses
- **Teacher** (`teacher`) - Admins, can manage courses, topics, and view all students
- **University Staff** (`staff`) - Super admins, can create teachers and staff, full system access

Protected endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

## Validation Rules

### Student
- **name**: Required, string
- **email**: Required, valid email, unique
- **year**: Required, integer 1-5
- **department**: Required, string
- **averageGrade**: Optional, float 0-20

### Course
- **courseName**: Required, string
- **code**: Required, string, unique, uppercase
- **credits**: Optional, integer ≥ 0
- **semester**: Optional, enum (Fall, Spring, Summer)
- **year**: Optional, integer ≥ 1

### Topic
- **name**: Required, string
- **difficulty**: Optional, enum (Easy, Medium, Hard)
- **examDate**: Optional, ISO 8601 date
- **description**: Optional, string

## Error Handling

The API returns standardized error responses:

- **400 Bad Request** - Validation errors, invalid ObjectIds, business rule violations
- **401 Unauthorized** - Missing or invalid authentication token
- **403 Forbidden** - Insufficient permissions for the requested operation
- **404 Not Found** - Resource not found
- **409 Conflict** - Duplicate email/code, already enrolled
- **500 Internal Server Error** - Unexpected errors

Example error response:
```json
{
  "success": false,
  "error": "Student not found"
}
```

## Testing

### Test Coverage
- **60+ passing tests** across 4 test suites
- Authentication & Authorization (12 tests)
- Student CRUD (13 tests)
- Course CRUD + Topics (27 tests)
- Enrollment flow (4 tests)

### Run Tests
```bash
npm test
```

Tests use:
- **Jest** - Test runner
- **Supertest** - HTTP assertions
- **MongoDB Memory Server** - In-memory database for isolation

## Business Logic

### Enrollment
- Validates student and course existence
- Prevents duplicate enrollments (409)
- Enforces max active courses limit (configurable via `MAX_ACTIVE_COURSES`)
- Validates courseId format

### Topic Management
- Validates course and topic existence
- Returns 404 for missing resources
- Supports full CRUD operations within courses

## Project Structure

```
Back-end/
├── config/
│   ├── db.js              # MongoDB connection
│   └── swagger.js         # Swagger/OpenAPI configuration
├── controllers/
│   ├── authController.js  # Auth & registration logic
│   ├── courseController.js # Course business logic
│   └── studentController.js # Student business logic
├── middleware/
│   ├── auth.js            # JWT authentication & authorization
│   ├── errorHandler.js    # Global error handler
│   └── validate.js        # Request validation middleware
├── models/
│   ├── User.js            # Base user schema with discriminators
│   ├── Student.js         # Student discriminator schema
│   ├── Teacher.js         # Teacher discriminator schema
│   ├── UniversityStaff.js # University staff discriminator schema
│   ├── Course.js          # Course schema
│   └── AIResult.js        # AI results schema
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── courses.js         # Course routes + Swagger docs
│   └── students.js        # Student routes + Swagger docs
├── tests/
│   ├── auth.test.js       # Authentication tests
│   ├── courses.test.js    # Course integration tests
│   ├── students.test.js   # Student integration tests
│   └── enroll.test.js     # Enrollment tests
├── server.js              # Express app setup
├── jest.config.js         # Jest configuration
├── postman_collection.json # Postman collection
└── package.json           # Dependencies & scripts
```

## Next Steps (Production Ready)

- [x] Add authentication (JWT)
- [x] Add authorization (roles: student, teacher, staff)
- [ ] Add pagination/filtering/sorting for list endpoints
- [ ] Add rate limiting
- [ ] Add security headers (helmet)
- [ ] Add CORS whitelist for production
- [ ] Add structured logging
- [ ] Dockerize application
- [ ] Add CI/CD pipeline
- [ ] Add performance monitoring
- [ ] Add password reset functionality
- [ ] Add email verification

## Technologies

- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - Database
- **express-validator** - Request validation
- **Swagger** - API documentation
- **Jest** + **Supertest** - Testing
- **mongodb-memory-server** - Test database

## License

ISC
