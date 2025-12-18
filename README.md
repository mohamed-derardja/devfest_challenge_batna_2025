# Student Success Platform

A comprehensive web application designed to help students excel in their academic journey with AI-powered tools for exam preparation, resource discovery, lost & found management, and more.

## 🎯 Features

### 1. **Exam Preparation Assistant**
- AI-powered quiz generation with customizable difficulty levels
- PDF summarizer to extract key concepts and generate study materials
- Smart study planner with Pomodoro timer
- Resource recommendations (books, videos, courses)
- Progress tracking and analytics

### 2. **AI Document & Opportunity Helper**
- Natural language search for academic resources
- Document finder with library catalog integration
- Student lending network
- Internship opportunities matched to your profile
- Scholarship discovery and application tracking
- Deadline calendar

### 3. **Lost & Found System**
- AI-powered matching between lost and found items
- Security verification system
- Heatmap showing common lost item locations
- Real-time notifications when matches are found
- Photo upload and description-based search

### 4. **Notification System**
- Smart reminders (3 days, 1 day, 1 hour before deadlines)
- Multi-channel notifications (email, SMS, push, in-app)
- Customizable notification preferences
- Filter by category (deadlines, tasks, matches, opportunities)

### 5. **Task & Reward System**
- Gamification with XP points and levels
- Real rewards (+1 TD point for early submissions)
- Penalty system for late work
- Leaderboard to compete with peers
- Achievements and badges
- Rewards store with campus perks

### 6. **Program Change Summarizer**
- AI-summarized news about program changes
- Impact analysis (high, medium, low)
- Schedule comparison (before/after)
- Category-based filtering
- Important dates calendar

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository** (or navigate to the project folder):
   \`\`\`bash
   cd defest_gdg_batna
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Run the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser** and navigate to:
   \`\`\`
   http://localhost:3000
   \`\`\`

## 📁 Project Structure

\`\`\`
defest_gdg_batna/
├── app/
│   ├── components/
│   │   └── Navbar.tsx          # Navigation component
│   ├── exam-prep/
│   │   └── page.tsx            # Exam Preparation feature
│   ├── documents/
│   │   └── page.tsx            # Document & Opportunity Helper
│   ├── lost-found/
│   │   └── page.tsx            # Lost & Found system
│   ├── notifications/
│   │   └── page.tsx            # Notification center
│   ├── rewards/
│   │   └── page.tsx            # Task & Reward system
│   ├── news/
│   │   └── page.tsx            # Program updates
│   ├── profile/
│   │   └── page.tsx            # User profile
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── public/                     # Static assets
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
\`\`\`

## 🎨 Technology Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts (for analytics)
- **Date Handling**: date-fns

## 🌟 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Dashboard with all features overview |
| Exam Prep | `/exam-prep` | AI quiz generator, PDF summarizer, study planner |
| Documents | `/documents` | Resource finder, internships, scholarships |
| Lost & Found | `/lost-found` | Report/find lost items with AI matching |
| Notifications | `/notifications` | Centralized notification center |
| Rewards | `/rewards` | Tasks, points, leaderboard, rewards store |
| News | `/news` | AI-summarized program updates |
| Profile | `/profile` | User profile and settings |

## 🎯 Future Enhancements

### Backend Integration (Next Steps)
To make this fully functional, you'll need to add:

1. **Authentication**
   - User login/registration
   - Student ID verification
   - Role-based access control

2. **Database**
   - User profiles
   - Lost & found items
   - Tasks and rewards
   - Documents and resources
   - Notifications

3. **AI Integration**
   - OpenAI API for quiz generation
   - PDF processing for summarization
   - Image recognition for lost items
   - Natural language search

4. **Real-time Features**
   - WebSocket for live notifications
   - Real-time matching for lost & found
   - Chat system for student communication

5. **File Storage**
   - PDF upload and storage
   - Image upload for lost items
   - Document sharing

### Recommended Backend Stack
- **Database**: Supabase or Firebase
- **AI**: OpenAI API or Google Gemini
- **Storage**: AWS S3 or Cloudinary
- **Authentication**: NextAuth.js
- **APIs**: tRPC or REST

## 🔧 Configuration

### Environment Variables
Create a \`.env.local\` file in the root directory:

\`\`\`env
# AI Services
OPENAI_API_KEY=your_openai_api_key

# Database
DATABASE_URL=your_database_url

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# File Storage
CLOUDINARY_URL=your_cloudinary_url
\`\`\`

## 📱 Mobile Responsiveness

All features are fully responsive and work seamlessly on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (< 768px)

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Success**: Green (#10B981)
- **Warning**: Orange (#F59E0B)
- **Danger**: Red (#EF4444)
- **Info**: Purple (#8B5CF6)
- **Accent**: Pink (#EC4899)

### Typography
- **Headings**: Bold, Sans-serif
- **Body**: Regular, Sans-serif
- **Mono**: Code blocks

## 🤝 Contributing

This is a student project. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational purposes.

## 🙋 Support

For questions or issues:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🎓 Credits

Developed for GDG Batna students to enhance their academic experience.

---

**Made with ❤️ for students, by students**
