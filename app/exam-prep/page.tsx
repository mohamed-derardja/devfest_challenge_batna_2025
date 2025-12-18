'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  Upload, 
  Brain, 
  Calendar, 
  Target,
  FileText, 
  Clock, 
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Trophy,
  Settings,
  BarChart3,
  Zap,
  Award,
  AlertCircle,
  Plus,
  Minus,
  Pause,
  Play,
  Users,
  Lightbulb,
  Timer,
  X
} from 'lucide-react';

export default function ExamPrepPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'pdf' | 'resources' | 'planner'>('dashboard');
  const [quizInputMethod, setQuizInputMethod] = useState<'text' | 'upload'>('text');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  
  // Study Planner States
  const [showPersonalDataForm, setShowPersonalDataForm] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyStreak, setStudyStreak] = useState(7);
  const [totalStudyHours, setTotalStudyHours] = useState(34.5);
  
  // Personal Study Preferences
  const [personalData, setPersonalData] = useState({
    studyGoal: 'Increase grades',
    availableHoursPerDay: 4,
    preferredStudyTime: 'morning',
    learningStyle: 'visual',
    difficultyLevel: 'intermediate',
    breakDuration: 5,
    sessionsPerDay: 4,
    focusSubjects: ['Mathematics', 'Physics'],
    weakAreas: ['Chemistry'],
    examDates: [
      { subject: 'Mathematics', date: '2025-12-25' },
      { subject: 'Physics', date: '2025-12-28' }
    ]
  });
  
  // Performance Tracking
  const [performanceData, setPerformanceData] = useState([
    { date: '2025-12-11', hoursStudied: 3.5, focusScore: 85, topicsCompleted: 4 },
    { date: '2025-12-12', hoursStudied: 4.0, focusScore: 90, topicsCompleted: 5 },
    { date: '2025-12-13', hoursStudied: 3.0, focusScore: 75, topicsCompleted: 3 },
    { date: '2025-12-14', hoursStudied: 5.0, focusScore: 92, topicsCompleted: 6 },
    { date: '2025-12-15', hoursStudied: 4.5, focusScore: 88, topicsCompleted: 5 },
    { date: '2025-12-16', hoursStudied: 4.0, focusScore: 85, topicsCompleted: 4 },
    { date: '2025-12-17', hoursStudied: 3.5, focusScore: 80, topicsCompleted: 4 },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            Exam Preparation Assistant
          </h1>
          <p className="text-gray-600 mt-2">AI-powered study tools to help you excel</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'quiz'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              AI Quiz Generator
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'pdf'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              PDF Summarizer
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'resources'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Resources
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'planner'
                  ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Study Planner
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Trophy className="w-8 h-8 opacity-80" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">This Week</span>
                </div>
                <div className="text-3xl font-bold mb-1">12</div>
                <div className="text-sm opacity-90">Quizzes Completed</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Target className="w-8 h-8 opacity-80" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Average</span>
                </div>
                <div className="text-3xl font-bold mb-1">85%</div>
                <div className="text-sm opacity-90">Quiz Score</div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <Clock className="w-8 h-8 opacity-80" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
                </div>
                <div className="text-3xl font-bold mb-1">24h</div>
                <div className="text-sm opacity-90">Study Time</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-8 h-8 opacity-80" />
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Trend</span>
                </div>
                <div className="text-3xl font-bold mb-1">+15%</div>
                <div className="text-sm opacity-90">Improvement</div>
              </div>
            </div>

            {/* Upcoming Exams */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-600" />
                Upcoming Exams
              </h2>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics', date: 'Dec 25, 2025', days: 7, progress: 65 },
                  { subject: 'Physics', date: 'Dec 28, 2025', days: 10, progress: 45 },
                  { subject: 'Chemistry', date: 'Jan 02, 2026', days: 15, progress: 30 },
                ].map((exam) => (
                  <div key={exam.subject} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{exam.subject}</h3>
                      <span className="text-sm text-gray-600">{exam.days} days left</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>{exam.date}</span>
                      <span>{exam.progress}% prepared</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${exam.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Quizzes Completed</h3>
                  <Brain className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">24</p>
                <p className="text-sm text-green-600 mt-1">+6 this week</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Study Hours</h3>
                  <Clock className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">42h</p>
                <p className="text-sm text-green-600 mt-1">+8h this week</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Average Score</h3>
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">85%</p>
                <p className="text-sm text-green-600 mt-1">+5% improvement</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <Brain className="w-6 h-6 text-blue-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Generate Quiz</div>
                    <div className="text-sm text-gray-600">AI-powered practice questions</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('pdf')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors"
                >
                  <Upload className="w-6 h-6 text-green-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Summarize PDF</div>
                    <div className="text-sm text-gray-600">Upload and get key points</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('resources')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-orange-50 hover:border-orange-300 transition-colors"
                >
                  <FileText className="w-6 h-6 text-orange-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Browse Resources</div>
                    <div className="text-sm text-gray-600">Books, videos, courses</div>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveTab('planner')}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors"
                >
                  <Target className="w-6 h-6 text-purple-600" />
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Plan Study Time</div>
                    <div className="text-sm text-gray-600">AI-optimized schedule</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Generator Tab */}
        {activeTab === 'quiz' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                AI Quiz Generator
              </h2>

              {/* Input Method Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Choose Input Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setQuizInputMethod('text')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      quizInputMethod === 'text'
                        ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-500/20'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <FileText className={`w-8 h-8 mx-auto mb-2 ${
                      quizInputMethod === 'text' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <div className="text-center">
                      <h3 className={`font-bold ${
                        quizInputMethod === 'text' ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        Text Input
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Paste or type your content
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => setQuizInputMethod('upload')}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      quizInputMethod === 'upload'
                        ? 'border-purple-600 bg-purple-50 shadow-lg shadow-purple-500/20'
                        : 'border-gray-200 hover:border-purple-300 bg-white'
                    }`}
                  >
                    <Upload className={`w-8 h-8 mx-auto mb-2 ${
                      quizInputMethod === 'upload' ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <div className="text-center">
                      <h3 className={`font-bold ${
                        quizInputMethod === 'upload' ? 'text-purple-900' : 'text-gray-900'
                      }`}>
                        Upload File
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        PDF or TXT document
                      </p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Text Input Method */}
              {quizInputMethod === 'text' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Content for Quiz Generation
                  </label>
                  <textarea
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="Paste your study material, lecture notes, or any text content here. The AI will analyze it and generate questions based on the content.

Example:
- Copy text from your textbook
- Paste lecture notes
- Enter topic descriptions
- Add formulas or concepts"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[200px] font-mono text-sm"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500">
                      {textContent.length} characters • {textContent.split(/\s+/).filter(Boolean).length} words
                    </p>
                    {textContent.length > 0 && (
                      <button
                        onClick={() => setTextContent('')}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* File Upload Method */}
              {quizInputMethod === 'upload' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Document
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors bg-gradient-to-br from-purple-50 to-pink-50">
                    <input
                      type="file"
                      accept=".pdf,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="quiz-file-upload"
                    />
                    <label htmlFor="quiz-file-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      {uploadedFile ? (
                        <div className="space-y-2">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-300 rounded-lg">
                            <FileText className="w-5 h-5 text-purple-600" />
                            <span className="font-medium text-purple-900">{uploadedFile.name}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setUploadedFile(null);
                              }}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              ✕
                            </button>
                          </div>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      ) : (
                        <>
                          <p className="text-lg font-semibold text-gray-900 mb-2">
                            Drop your file here or click to browse
                          </p>
                          <p className="text-sm text-gray-600 mb-4">
                            Supports PDF and TXT files (Max 10MB)
                          </p>
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                            <Upload className="w-4 h-4" />
                            Choose File
                          </div>
                        </>
                      )}
                    </label>
                  </div>
                  <div className="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <p className="text-xs text-purple-800 font-medium">
                      💡 AI will extract text from your document and generate relevant questions
                    </p>
                  </div>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Subject
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Mathematics</option>
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Biology</option>
                    <option>Computer Science</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic/Chapter
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Calculus, Thermodynamics, Organic Chemistry"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty Level
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Questions
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>5</option>
                      <option>10</option>
                      <option>15</option>
                      <option>20</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Question Types
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Multiple Choice</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">True/False</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Fill in the Blank</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                      <span className="ml-2 text-sm text-gray-700">Short Answer</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Brain className="w-5 h-5" />
                Generate Quiz
              </button>
            </div>

            {/* Sample Quiz Results */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Quizzes</h3>
              <div className="space-y-3">
                {[
                  { subject: 'Mathematics - Calculus', score: 85, date: 'Dec 15, 2025', questions: 10 },
                  { subject: 'Physics - Mechanics', score: 92, date: 'Dec 14, 2025', questions: 15 },
                  { subject: 'Chemistry - Periodic Table', score: 78, date: 'Dec 13, 2025', questions: 10 },
                ].map((quiz, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div>
                      <h4 className="font-semibold text-gray-900">{quiz.subject}</h4>
                      <p className="text-sm text-gray-600">{quiz.date} • {quiz.questions} questions</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-2xl font-bold ${quiz.score >= 80 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {quiz.score}%
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PDF Summarizer Tab */}
        {activeTab === 'pdf' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-green-600" />
                PDF Summarizer
              </h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Upload your study materials
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Drag and drop PDF files here, or click to browse
                </p>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Choose File
                </button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">AI will generate:</h4>
                <ul className="space-y-1 text-sm text-blue-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Key concepts and main ideas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Important definitions and formulas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Example problems with solutions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Practice exercises
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Flashcard suggestions
                  </li>
                </ul>
              </div>
            </div>

            {/* Recent Summaries */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Summaries</h3>
              <div className="space-y-3">
                {[
                  { title: 'Linear Algebra Chapter 3.pdf', pages: 24, date: 'Dec 15, 2025' },
                  { title: 'Thermodynamics Notes.pdf', pages: 18, date: 'Dec 14, 2025' },
                  { title: 'Organic Chemistry Textbook.pdf', pages: 42, date: 'Dec 13, 2025' },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-red-500" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{doc.title}</h4>
                        <p className="text-sm text-gray-600">{doc.pages} pages • {doc.date}</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Summary
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-600" />
                Recommended Resources
              </h2>
              
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search for courses, books, videos..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Resource Categories */}
              <div className="space-y-6">
                {/* Books */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Recommended Books
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Calculus: Early Transcendentals', author: 'James Stewart', available: 'Library - 3rd floor', status: 'Available' },
                      { title: 'Introduction to Algorithms', author: 'Cormen et al.', available: 'Library - 2nd floor', status: 'Borrowed' },
                    ].map((book, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900">{book.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600">{book.available}</span>
                          <span className={`text-xs px-2 py-1 rounded ${book.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {book.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Videos */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-red-600" />
                    Video Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { 
                        title: 'MIT OpenCourseWare - Linear Algebra', 
                        duration: '34 videos', 
                        platform: 'YouTube',
                        thumbnail: 'https://img.youtube.com/vi/J7DzL2_Na80/maxresdefault.jpg',
                        channel: 'MIT OpenCourseWare',
                        views: '2.1M views'
                      },
                      { 
                        title: '3Blue1Brown - Essence of Calculus', 
                        duration: '12 videos', 
                        platform: 'YouTube',
                        thumbnail: 'https://img.youtube.com/vi/WUvTyaaNkzM/maxresdefault.jpg',
                        channel: '3Blue1Brown',
                        views: '8.5M views'
                      },
                    ].map((video, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                        {/* Thumbnail */}
                        <div className="relative h-40 bg-gray-900 overflow-hidden">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225"><rect fill="%23ddd" width="400" height="225"/><text fill="%23999" x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="18">Video Thumbnail</text></svg>';
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <PlayCircle className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {video.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{video.channel}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{video.views}</span>
                            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 font-semibold">
                              {video.platform}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Online Courses */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Online Courses
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: 'Data Structures and Algorithms', platform: 'Coursera', rating: 4.8 },
                      { title: 'Machine Learning Specialization', platform: 'edX', rating: 4.9 },
                    ].map((course, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-semibold text-gray-900">{course.title}</h4>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600">{course.platform}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm font-semibold">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Study Planner Tab */}
        {activeTab === 'planner' && (
          <div className="space-y-6">
            {/* Personal Data Settings Card */}
            {showPersonalDataForm && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-blue-600" />
                    Personal Study Settings
                  </h2>
                  <button
                    onClick={() => setShowPersonalDataForm(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Study Goal</label>
                    <select 
                      value={personalData.studyGoal}
                      onChange={(e) => setPersonalData({...personalData, studyGoal: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Increase grades">Increase grades</option>
                      <option value="Pass exams">Pass exams</option>
                      <option value="Master subject">Master subject</option>
                      <option value="Competitive exam">Competitive exam</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Hours/Day</label>
                    <input
                      type="number"
                      value={personalData.availableHoursPerDay}
                      onChange={(e) => setPersonalData({...personalData, availableHoursPerDay: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="1"
                      max="12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Study Time</label>
                    <select 
                      value={personalData.preferredStudyTime}
                      onChange={(e) => setPersonalData({...personalData, preferredStudyTime: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="morning">Morning (6AM-12PM)</option>
                      <option value="afternoon">Afternoon (12PM-5PM)</option>
                      <option value="evening">Evening (5PM-10PM)</option>
                      <option value="night">Night (10PM-2AM)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Learning Style</label>
                    <select 
                      value={personalData.learningStyle}
                      onChange={(e) => setPersonalData({...personalData, learningStyle: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="visual">Visual (diagrams, videos)</option>
                      <option value="auditory">Auditory (lectures, discussions)</option>
                      <option value="reading">Reading/Writing (notes, texts)</option>
                      <option value="kinesthetic">Kinesthetic (hands-on practice)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Difficulty Level</label>
                    <select 
                      value={personalData.difficultyLevel}
                      onChange={(e) => setPersonalData({...personalData, difficultyLevel: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Break Duration (minutes)</label>
                    <input
                      type="number"
                      value={personalData.breakDuration}
                      onChange={(e) => setPersonalData({...personalData, breakDuration: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      min="5"
                      max="30"
                    />
                  </div>
                </div>

                {/* Exam Dates Section (Optional) */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Upcoming Exam Dates (Optional)
                  </h3>
                  <div className="space-y-3">
                    {personalData.examDates.map((exam, idx) => (
                      <div key={idx} className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Subject name"
                          value={exam.subject}
                          onChange={(e) => {
                            const newExamDates = [...personalData.examDates];
                            newExamDates[idx].subject = e.target.value;
                            setPersonalData({...personalData, examDates: newExamDates});
                          }}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <input
                            type="date"
                            value={exam.date}
                            onChange={(e) => {
                              const newExamDates = [...personalData.examDates];
                              newExamDates[idx].date = e.target.value;
                              setPersonalData({...personalData, examDates: newExamDates});
                            }}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            onClick={() => {
                              const newExamDates = personalData.examDates.filter((_, i) => i !== idx);
                              setPersonalData({...personalData, examDates: newExamDates});
                            }}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setPersonalData({
                          ...personalData,
                          examDates: [...personalData.examDates, { subject: '', date: '' }]
                        });
                      }}
                      className="w-full px-4 py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Exam Date
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowPersonalDataForm(false)}
                  className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Save Preferences & Update Schedule
                </button>
              </div>
            )}

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Study Streak</p>
                    <p className="text-3xl font-bold">{studyStreak} days</p>
                  </div>
                  <Zap className="w-10 h-10 text-blue-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Total Hours</p>
                    <p className="text-3xl font-bold">{totalStudyHours}h</p>
                  </div>
                  <Clock className="w-10 h-10 text-purple-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Avg Focus</p>
                    <p className="text-3xl font-bold">86%</p>
                  </div>
                  <Brain className="w-10 h-10 text-green-200" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Topics Done</p>
                    <p className="text-3xl font-bold">31</p>
                  </div>
                  <Trophy className="w-10 h-10 text-orange-200" />
                </div>
              </div>
            </div>

            {/* Main Planner Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Smart Study Planner
                </h2>
                <button
                  onClick={() => setShowPersonalDataForm(!showPersonalDataForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Customize
                </button>
              </div>
              
              {/* AI Recommendations - Enhanced with Personal Data */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
                <div className="flex items-start gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-900 mb-2">AI-Powered Recommendations (Personalized for You):</h4>
                    <ul className="space-y-2 text-sm text-purple-800">
                      <li className="flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        <span>Focus on <strong>{personalData.focusSubjects[0]}</strong> (Exam in 7 days) - Priority: HIGH</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Best study time: {personalData.preferredStudyTime === 'morning' ? '9:00 AM - 11:00 AM' : 
                          personalData.preferredStudyTime === 'afternoon' ? '2:00 PM - 4:00 PM' :
                          personalData.preferredStudyTime === 'evening' ? '6:00 PM - 8:00 PM' : '10:00 PM - 12:00 AM'} 
                          (Peak focus hours based on your preference)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Brain className="w-4 h-4" />
                        <span>Recommended: {personalData.sessionsPerDay}x 25-minute Pomodoro sessions with {personalData.breakDuration}-min breaks</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        <span>Weak area detected: <strong>Chemistry</strong> - Schedule extra review time</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>Learning style: <strong>{personalData.learningStyle}</strong> - Use {
                          personalData.learningStyle === 'visual' ? 'diagrams and videos' :
                          personalData.learningStyle === 'auditory' ? 'recorded lectures' :
                          personalData.learningStyle === 'reading' ? 'detailed notes' : 'practice exercises'
                        }</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Performance Analytics */}
              <div className="mb-6 p-4 bg-white border border-gray-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Weekly Performance Analytics
                </h3>
                <div className="space-y-4">
                  {/* Hours Graph */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Study Hours (Last 7 days)</p>
                    <div className="flex items-end gap-2 h-32">
                      {performanceData.map((day, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div className="w-full bg-blue-100 rounded-t relative" style={{height: `${(day.hoursStudied / 5) * 100}%`}}>
                            <div className="w-full bg-blue-500 rounded-t absolute bottom-0" style={{height: '100%'}}></div>
                          </div>
                          <span className="text-xs text-gray-600 mt-1">{day.date.split('-')[2]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>0h</span>
                      <span>5h</span>
                    </div>
                  </div>

                  {/* Focus Score */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Average Focus Score</p>
                      <p className="text-2xl font-bold text-green-600">
                        {Math.round(performanceData.reduce((acc, d) => acc + d.focusScore, 0) / performanceData.length)}%
                      </p>
                      <p className="text-xs text-green-700 mt-1">↑ 5% from last week</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Topics Completed</p>
                      <p className="text-2xl font-bold text-purple-600">
                        {performanceData.reduce((acc, d) => acc + d.topicsCompleted, 0)}
                      </p>
                      <p className="text-xs text-purple-700 mt-1">This week</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Calendar */}
              <div className="mb-6">
                <h3 className="font-bold text-gray-900 mb-3">Weekly Overview</h3>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                    <div key={day} className={`text-center p-3 rounded-lg border-2 ${
                      idx === 2 ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-transparent'
                    }`}>
                      <div className="text-xs font-semibold text-gray-600">{day}</div>
                      <div className="text-lg font-bold text-gray-900">{15 + idx}</div>
                      <div className="text-xs text-gray-500 mt-1">{performanceData[idx]?.hoursStudied || 0}h</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Schedule - Adjusted based on personal data */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-gray-900">Today's Schedule</h3>
                  <span className="text-sm text-gray-500">Goal: {personalData.availableHoursPerDay} hours</span>
                </div>
                <div className="space-y-2">
                  {[
                    { time: '9:00 - 10:00', subject: personalData.focusSubjects[0], topic: 'Derivatives & Integration', status: 'completed', priority: 'high' },
                    { time: '10:30 - 11:30', subject: personalData.focusSubjects[1] || 'Physics', topic: 'Newton\'s Laws', status: 'in-progress', priority: 'high' },
                    { time: '14:00 - 15:00', subject: personalData.weakAreas[0] || 'Chemistry', topic: 'Chemical Bonds (Weak Area)', status: 'pending', priority: 'medium' },
                    { time: '16:00 - 17:00', subject: 'Review Quiz', topic: personalData.focusSubjects[0], status: 'pending', priority: 'high' },
                  ].map((task, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-3 border-l-4 rounded-lg ${
                      task.status === 'completed' ? 'bg-green-50 border-green-500' :
                      task.status === 'in-progress' ? 'bg-blue-50 border-blue-500' :
                      'bg-gray-50 border-gray-300'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{task.subject}</span>
                          {task.priority === 'high' && (
                            <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded">HIGH</span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">{task.topic}</div>
                      </div>
                      <div className="text-sm text-gray-600">{task.time}</div>
                      {task.status === 'pending' && (
                        <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Start
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Spaced Repetition Reminders */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Timer className="w-5 h-5 text-yellow-600" />
                  Spaced Repetition Review
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-gray-700">Linear Algebra - Chapter 3</span>
                    <span className="text-yellow-700 font-semibold">Review in 2 days</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-gray-700">Thermodynamics - Laws</span>
                    <span className="text-yellow-700 font-semibold">Review today</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="text-gray-700">Organic Chemistry - Reactions</span>
                    <span className="text-red-700 font-semibold">Overdue (1 day)</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Pomodoro Timer */}
              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Timer className="w-5 h-5 text-blue-600" />
                  Smart Pomodoro Timer
                </h3>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-4">
                    {Math.floor(pomodoroTime / 60).toString().padStart(2, '0')}:
                    {(pomodoroTime % 60).toString().padStart(2, '0')}
                  </div>
                  <div className="flex gap-3 justify-center mb-4">
                    <button 
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isTimerRunning ? 'Pause' : 'Start'}
                    </button>
                    <button 
                      onClick={() => setPomodoroTime(25 * 60)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Reset
                    </button>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button 
                      onClick={() => setPomodoroTime(25 * 60)}
                      className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      25 min
                    </button>
                    <button 
                      onClick={() => setPomodoroTime(personalData.breakDuration * 60)}
                      className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      {personalData.breakDuration} min break
                    </button>
                    <button 
                      onClick={() => setPomodoroTime(15 * 60)}
                      className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      15 min
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    Session {Math.floor((25 * 60 - pomodoroTime) / (25 * 60) * personalData.sessionsPerDay) + 1} of {personalData.sessionsPerDay} today
                  </p>
                </div>
              </div>

              {/* Study Tips Based on Learning Style */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-green-600" />
                  Tips for {personalData.learningStyle.charAt(0).toUpperCase() + personalData.learningStyle.slice(1)} Learners
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {personalData.learningStyle === 'visual' && (
                    <>
                      <li>• Use mind maps and flowcharts to visualize concepts</li>
                      <li>• Watch educational videos and animations</li>
                      <li>• Color-code your notes and use highlighters</li>
                    </>
                  )}
                  {personalData.learningStyle === 'auditory' && (
                    <>
                      <li>• Record yourself reading notes and listen back</li>
                      <li>• Join study groups for discussions</li>
                      <li>• Use text-to-speech for reading materials</li>
                    </>
                  )}
                  {personalData.learningStyle === 'reading' && (
                    <>
                      <li>• Write detailed summaries after each session</li>
                      <li>• Create comprehensive study guides</li>
                      <li>• Use the Cornell note-taking method</li>
                    </>
                  )}
                  {personalData.learningStyle === 'kinesthetic' && (
                    <>
                      <li>• Practice with hands-on experiments and labs</li>
                      <li>• Use physical objects to model concepts</li>
                      <li>• Take frequent breaks to move around</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
