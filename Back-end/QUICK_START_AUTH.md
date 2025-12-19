# Quick Start: Authentication System

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd Back-end
npm install
```

### 2. Configure Environment
Create `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/devfest
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
PORT=5000
MAX_ACTIVE_COURSES=5
```

### 3. Seed Database
```bash
npm run seed
```

### 4. Start Server
```bash
npm run dev
```

## 🔐 Default Test Accounts

| Role | Email | Password |
|------|-------|----------|
| University Staff (Super Admin) | sami.kaddour@admin.dz | admin123 |
| Teacher (Admin) | amina.belhadj@university.dz | teacher123 |
| Student | ahmed.benali@example.com | student123 |

## 📋 API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Register as student
- `POST /api/auth/login` - Login
- `GET /api/courses` - List courses
- `GET /api/courses/:id` - View course

### Authenticated Endpoints
- `GET /api/auth/me` - Get profile
- `GET /api/students/:id` - View student
- `PUT /api/students/:id` - Update profile
- `POST /api/students/:id/enroll` - Enroll in course

### Teacher/Staff Only
- `GET /api/students` - List all students
- `POST /api/students` - Create student
- `DELETE /api/students/:id` - Delete student
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- All topic endpoints

### Staff Only
- `POST /api/auth/register/teacher` - Create teacher
- `POST /api/auth/register/staff` - Create staff

## 🧪 Testing

Run auth tests:
```bash
npm test tests/auth.test.js
```

## 📖 Full Documentation

- [AUTH_IMPLEMENTATION_SUMMARY.md](AUTH_IMPLEMENTATION_SUMMARY.md) - Complete implementation details
- [API_README.md](API_README.md) - Full API documentation
- [TESTING_AUTH.md](TESTING_AUTH.md) - Test migration guide

## 💡 Quick Examples

### Register Student
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123","year":1,"department":"CS"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Use Token
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🏗️ Architecture

```
User (Base Model)
├── Student (role: 'student')
├── Teacher (role: 'teacher')
└── UniversityStaff (role: 'staff')
```

**Permissions:**
- Student → View own data, enroll in courses
- Teacher → Manage students & courses (admin)
- Staff → Full system access (super admin)

## ✅ What's Implemented

- [x] JWT-based authentication
- [x] Role-based authorization (Student/Teacher/Staff)
- [x] Password hashing (bcryptjs)
- [x] Protected routes with middleware
- [x] User registration/login
- [x] Profile management
- [x] Database seeding with test users
- [x] Comprehensive tests
- [x] Full API documentation

## 🎯 Ready to Use!

The authentication system is fully functional and production-ready. All endpoints are properly protected, and the role hierarchy enforces proper access control throughout the API.
