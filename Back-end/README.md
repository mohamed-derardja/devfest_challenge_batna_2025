# DevFest Challenge Batna 2025 - Backend API

A Node.js + Express backend with MongoDB for managing students, courses, and study plans.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env` and update MongoDB URI if needed
   - Default: `mongodb://localhost:27017/devfest_challenge`

3. **Start MongoDB:**
   - Make sure MongoDB is running locally or update the URI in `.env`

4. **Seed the database:**
   ```bash
   npm run seed
   ```

5. **Start the server:**
   ```bash
   npm run dev   # Development mode with nodemon
   npm start     # Production mode
   ```

## API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `POST /api/students/:id/enroll` - Enroll student in course

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses` - Create new course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/:id/topics` - Add topic to course
- `PUT /api/courses/:id/topics/:topicId` - Update topic
- `DELETE /api/courses/:id/topics/:topicId` - Delete topic

## Data Models

### Student
- name, email, year, department
- enrolledCourses (references to Course)
- Average Grade (0–20 scale)

### Course
- courseName, code, credits, semester, year
- topics (embedded documents)

### Topic
- name, difficulty, examDate
- resources (title, url, type)
- description

### AIResult (Caching)
- student, course, queryType
- query, result, confidence
- metadata, expiresAt (auto-delete after 7 days)

## Sample Data

The seed script creates:
- 10 student profiles
- 5 courses (DS&A, Web Dev, Database, AI, OS)
- Multiple topics per course with varying difficulties
- Student enrollments in various courses

## Testing

Use tools like Postman, Insomnia, or curl to test the endpoints:

```bash
# Get all students
curl http://localhost:5000/api/students

# Create a new student
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Student",
    "email": "test@example.com",
    "year": 2,
    "department": "Computer Science"
  }'

# Get all courses
curl http://localhost:5000/api/courses
```
