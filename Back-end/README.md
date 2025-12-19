# DevFest Challenge Batna 2025 - Backend API

A robust Node.js + Express backend API with AI-powered study assistance, PDF processing, OCR capabilities, and MongoDB integration.

## Features

- **AI Study Assistant** - Powered by Google Gemini AI
- **PDF Text Extraction** - Extract and analyze PDF documents
- **OCR Support** - Extract text from images using Tesseract.js
- **Study Planning** - Generate personalized study schedules
- **Resource Recommendations** - AI-powered learning resource suggestions
- **Exercise Generator** - Create practice quizzes and exercises
- **Student Management** - CRUD operations for students
- **Course Management** - CRUD operations for courses with topics

## Tech Stack

- **Runtime**: Node.js 18+ (LTS)
- **Framework**: Express.js 4.x
- **Database**: MongoDB with Mongoose ODM
- **AI**: Google Generative AI (Gemini)
- **File Processing**: pdf-parse, Tesseract.js, Jimp
- **Security**: Helmet, express-rate-limit, CORS
- **Documentation**: Swagger/OpenAPI

---

## Quick Start

### Prerequisites

- Node.js 18.x or higher (LTS recommended)
- MongoDB (local or Atlas)
- Google Gemini API key

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Back-end

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit .env with your configuration
# Required: MONGO_URI, GEMINI_API_KEY
```

### Configuration

Edit `.env` file:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/devfest_db
GEMINI_API_KEY=your_gemini_api_key_here
CORS_ORIGIN=http://localhost:3000
```

### Running the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start

# Run tests
npm test

# Seed database with sample data
npm run seed
```

The server will start at `http://localhost:5000`

---

## API Documentation

Interactive API documentation is available at `/api-docs` when the server is running.

### Endpoints Overview

| Category | Endpoint | Description |
|----------|----------|-------------|
| Health | `GET /health` | Server health check |
| Docs | `GET /api-docs` | Swagger documentation |
| Students | `GET /api/students` | List all students |
| Students | `POST /api/students` | Create student |
| Students | `GET /api/students/:id` | Get student by ID |
| Students | `PUT /api/students/:id` | Update student |
| Students | `DELETE /api/students/:id` | Delete student |
| Students | `POST /api/students/:id/enroll` | Enroll in course |
| Courses | `GET /api/courses` | List all courses |
| Courses | `POST /api/courses` | Create course |
| Courses | `GET /api/courses/:id` | Get course by ID |
| Courses | `PUT /api/courses/:id` | Update course |
| Courses | `DELETE /api/courses/:id` | Delete course |
| Courses | `POST /api/courses/:id/topics` | Add topic |
| Study | `POST /api/study` | AI Study Assistant |
| Study | `POST /api/study/summarize` | Summarize content |
| Study | `POST /api/study/plan` | Generate study plan |
| Study | `POST /api/study/resources` | Get resource recommendations |
| Study | `POST /api/study/exam` | Generate exercises |
| Study | `GET /api/study/interships` | Get internship listings |
| Study | `GET /api/study/scholarships` | Get scholarship listings |

### AI Study Assistant

Upload documents (PDF, images, text files) or send text prompts:

```bash
# Text prompt only
curl -X POST http://localhost:5000/api/study \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain quantum computing basics"}'

# With file upload
curl -X POST http://localhost:5000/api/study \
  -F "prompt=Summarize this document" \
  -F "document=@/path/to/file.pdf"
```

---

## Deployment

### Vercel Deployment (Serverless)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Configure environment variables** in Vercel dashboard:
   - `MONGO_URI`
   - `GEMINI_API_KEY`
   - `NODE_ENV=production`
   - `CORS_ORIGIN` (your frontend URL)

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Production deployment**:
   ```bash
   vercel --prod
   ```

#### Vercel Limitations

- **Cold starts**: First request may be slow
- **Max execution time**: 30 seconds
- **File uploads**: Stored temporarily, cleaned after request
- **OCR**: May have performance limitations

### Local/VPS Deployment

1. **Clone and configure**:
   ```bash
   git clone <repo>
   cd Back-end
   npm install --production
   cp .env.example .env
   # Edit .env with production values
   ```

2. **Use PM2 for process management**:
   ```bash
   npm install -g pm2
   pm2 start server.js --name devfest-api
   pm2 save
   pm2 startup
   ```

3. **Nginx reverse proxy** (optional):
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Project Structure

```
Back-end/
├── config/
│   ├── db.js              # MongoDB connection
│   └── swagger.js         # Swagger configuration
├── controllers/
│   ├── aiController.js    # AI mock endpoints
│   ├── courseController.js
│   ├── studentController.js
│   └── studyController.js # AI Study Assistant
├── middleware/
│   ├── auth.js            # JWT authentication
│   ├── errorHandler.js    # Global error handler
│   ├── upload.js          # File upload (multer)
│   └── validate.js        # Request validation
├── models/
│   ├── Course.js
│   ├── Student.js
│   └── ...
├── routes/
│   ├── courses.js
│   ├── students.js
│   └── studyRoutes.js
├── uploads/               # Temporary file storage
├── .env.example           # Environment template
├── package.json
├── server.js              # App entry point
└── vercel.json            # Vercel configuration
```

---

## Fixes Applied

### Issues Fixed

1. **ESM/CommonJS Conflict**: Converted `studyController.js` from ESM to CommonJS
2. **pdf-parse Serverless Fix**: Using direct import path `pdf-parse/lib/pdf-parse`
3. **Google Gemini SDK**: Corrected SDK import and API usage
4. **Puppeteer Removed**: Replaced with static data + axios scraping
5. **Sharp Replaced**: Using Jimp for serverless-compatible image processing
6. **Tesseract.js**: Made optional with graceful fallback
7. **Memory Leaks**: Added proper cleanup and timeouts
8. **Security**: Added Helmet, rate limiting, input validation
9. **Error Handling**: Comprehensive error handler with proper status codes
10. **CORS**: Configurable CORS with production support

### Why These Fixes?

| Issue | Cause | Solution |
|-------|-------|----------|
| Runtime crashes | Mixed ESM/CommonJS | Unified to CommonJS |
| pdf-parse failures | Test file execution | Direct module path import |
| Gemini API errors | Incorrect SDK usage | Updated to @google/generative-ai |
| Deployment fails | Native dependencies | Replaced with pure JS alternatives |
| Memory warnings | Unclosed resources | Added cleanup and limits |

---

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | 5000 | Server port |
| `NODE_ENV` | No | development | Environment mode |
| `MONGO_URI` | **Yes** | - | MongoDB connection string |
| `GEMINI_API_KEY` | **Yes** | - | Google Gemini API key |
| `CORS_ORIGIN` | No | * | Allowed CORS origins |
| `JWT_SECRET` | No | - | JWT signing secret |
| `MAX_FILE_SIZE` | No | 10485760 | Max upload size (bytes) |

---

## Future Improvements

1. **Caching**: Add Redis for API response caching
2. **Queue System**: Use Bull for background job processing
3. **WebSockets**: Real-time updates for study sessions
4. **Authentication**: Complete JWT auth flow
5. **Testing**: Increase test coverage
6. **Monitoring**: Add APM (Application Performance Monitoring)
7. **CDN**: Store uploaded files in cloud storage (S3, Cloudinary)

---

## License

ISC
