# DevFest Challenge Batna 2025 - Back-end API

Student management system backend with complete CRUD operations, validation, testing, and API documentation.

## Features

- ✅ **Student CRUD Operations** - Create, read, update, delete students
- ✅ **Course CRUD Operations** - Manage courses and topics
- ✅ **Enrollment System** - Enroll students with validation (course exists, duplicate prevention, max active courses)
- ✅ **Request Validation** - express-validator for all endpoints
- ✅ **Error Handling** - Standardized error responses (400, 404, 409, 500)
- ✅ **Comprehensive Tests** - 44 integration tests using Jest + Supertest + MongoDB Memory Server
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

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `POST /api/students/:id/enroll` - Enroll student in course

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Topics
- `POST /api/courses/:id/topics` - Add topic to course
- `PUT /api/courses/:id/topics/:topicId` - Update topic
- `DELETE /api/courses/:id/topics/:topicId` - Delete topic

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
- **44 passing tests** across 3 test suites
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
│   ├── courseController.js # Course business logic
│   └── studentController.js # Student business logic
├── middleware/
│   ├── errorHandler.js    # Global error handler
│   └── validate.js        # Request validation middleware
├── models/
│   ├── Course.js          # Course schema
│   ├── Student.js         # Student schema
│   └── AIResult.js        # AI results schema
├── routes/
│   ├── courses.js         # Course routes + Swagger docs
│   └── students.js        # Student routes + Swagger docs
├── tests/
│   ├── courses.test.js    # Course integration tests
│   ├── students.test.js   # Student integration tests
│   └── enroll.test.js     # Enrollment tests
├── server.js              # Express app setup
├── jest.config.js         # Jest configuration
├── postman_collection.json # Postman collection
└── package.json           # Dependencies & scripts
```

## Next Steps (Production Ready)

- [ ] Add authentication (JWT)
- [ ] Add authorization (roles: admin, student, teacher)
- [ ] Add pagination/filtering/sorting for list endpoints
- [ ] Add rate limiting
- [ ] Add security headers (helmet)
- [ ] Add CORS whitelist for production
- [ ] Add structured logging
- [ ] Dockerize application
- [ ] Add CI/CD pipeline
- [ ] Add performance monitoring

## Technologies

- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - Database
- **express-validator** - Request validation
- **Swagger** - API documentation
- **Jest** + **Supertest** - Testing
- **mongodb-memory-server** - Test database

## License

ISC
