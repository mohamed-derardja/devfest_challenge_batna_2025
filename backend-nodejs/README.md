# Node.js Backend with MongoDB & Gemini AI - Complete Platform

Complete backend server for the Student Success Platform with MongoDB database, Google Gemini AI integration, and comprehensive features.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd backend-nodejs
npm install
```

### 2. Environment Setup
The `.env` file is already configured with:
- MongoDB Atlas connection
- Gemini AI API key
- Port 5000
- JWT secret

### 3. Seed Sample Data (Optional)
```bash
npm run seed
```

### 4. Start the Server
```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

Server will run at: **http://localhost:5000**

## ✨ Features

### 🤖 AI-Powered Features
- **Quiz Generation** - Gemini AI generates custom quizzes
- **Document Summarization** - AI-powered text summarization
- **Item Matching** - Smart matching for lost & found items
- **News Summarization** - Automatic summary generation for news
- **Document Search** - AI-powered opportunity recommendations

### 💾 Database (MongoDB)
- User authentication & profiles
- Lost & found item storage
- Tasks & rewards management
- News updates tracking
- Documents & opportunities database
- Full CRUD operations
- Mongoose ODM for data modeling

### 🔐 Authentication
- JWT-based authentication
- Bcrypt password hashing
- Protected routes
- Token verification

### 🏆 Rewards System
- Task completion tracking
- Points management
- Reward redemption
- Leaderboard
- User statistics

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /verify` - Verify JWT token

### Lost & Found (`/api/lost-found`)
- `GET /lost` - Get all lost items
- `POST /lost` - Create lost item
- `GET /found` - Get all found items
- `POST /found` - Create found item
- `GET /matches` - Get AI matches
- `GET /heatmap` - Get heatmap data

### Exam Prep (`/api/exam-prep`)
- `POST /quiz/generate` - Generate quiz with Gemini AI
- `POST /summarize` - Summarize text with Gemini AI
- `GET /resources` - Get learning resources

### Notifications (`/api/notifications`)
- `GET /` - Get user notifications
- `GET /unread-count` - Get unread count
- `PUT /:id/read` - Mark as read

### Rewards & Tasks (`/api/rewards`)
- `GET /tasks` - Get all tasks
- `GET /tasks/completed` - Get completed tasks
- `POST /tasks/:id/complete` - Complete a task
- `GET /rewards` - Get all rewards
- `POST /rewards/:id/redeem` - Redeem a reward
- `GET /rewards/redeemed` - Get redeemed rewards
- `GET /leaderboard` - Get points leaderboard
- `GET /stats` - Get user reward stats

### News (`/api/news`)
- `GET /` - Get all news updates
- `GET /:id` - Get single news update
- `POST /` - Create news update (auto AI summary)
- `GET /critical/latest` - Get critical updates

### Documents & Opportunities (`/api/documents`)
- `GET /` - Get all documents/opportunities
- `GET /:id` - Get single document
- `POST /` - Create document
- `POST /search/ai` - AI-powered search
- `GET /type/scholarships` - Get scholarships
- `GET /type/internships` - Get internships
- `GET /type/grants` - Get grants
- `POST /:id/apply` - Track application

### Profile (`/api/profile`)
- `GET /` - Get user profile
- `PUT /` - Update profile
- `GET /stats` - Get user statistics
- `GET /activity` - Get activity history
- `PUT /password` - Change password
- `GET /achievements` - Get user achievements

## 🔧 Configuration

### Environment Variables (.env)
```env
PORT=5000
GEMINI_API_KEY=AIzaSyC_wEMvvzIdVSzXijccWkoW5tbB_LDceiQ
MONGO_URI=mongodb+srv://rarodz04_db_user:Shando@cluster0.o9xmxyh.mongodb.net/backendPractice?appName=Cluster0
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
FRONTEND_URL=http://localhost:3000
```

## 📁 Project Structure
```
backend-nodejs/
├── server.js           # Main server file
├── .env               # Environment variables
├── package.json       # Dependencies
├── models/            # Mongoose models
│   ├── User.js
│   ├── LostItem.js
│   └── FoundItem.js
├── routes/            # API routes
│   ├── auth.js
│   ├── lostFound.js
│   ├── examPrep.js
│   └── notifications.js
└── middleware/        # Custom middleware
    └── auth.js        # JWT authentication
```

## 🧪 Testing

### Create a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.com",
    "password": "password123",
    "name": "Test Student",
    "role": "student"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@university.com",
    "password": "password123"
  }'
```

### Generate AI Quiz
```bash
curl -X POST http://localhost:5000/api/exam-prep/quiz/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "subject": "Mathematics",
    "difficulty": "medium"
  }'
```

## 🔗 Connect Frontend

Update frontend `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Railway
```bash
railway login
railway init
railway up
```

### Render
1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy

### Heroku
```bash
heroku create
git push heroku main
```

## 📝 Notes

- **MongoDB**: Using MongoDB Atlas (cloud database)
- **Gemini AI**: Google's latest AI model for text generation
- **JWT Secret**: Change in production for security
- **CORS**: Configured for localhost:3000, update for production

## 🔒 Security

- Passwords hashed with bcrypt
- JWT tokens expire in 7 days
- Protected routes require authentication
- CORS enabled for frontend origin

## 🆘 Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB URI is correct
- Verify network access in MongoDB Atlas

**Gemini AI Error:**
- Verify API key is valid
- Check Google Cloud billing is enabled

**Port Already in Use:**
```bash
# Change PORT in .env file
PORT=5001
```

## 📚 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **@google/generative-ai** - Gemini AI SDK
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **cors** - CORS middleware
- **dotenv** - Environment variables

## ✅ Ready to Use!

The server is configured and ready to connect with your frontend. Just run `npm install` and `npm start`!
