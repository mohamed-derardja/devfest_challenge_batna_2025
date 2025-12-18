'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  BookOpen, 
  Upload, 
  Brain, 
  Calendar, 
  Target, 
  Clock, 
  TrendingUp,
  FileText,
  PlayCircle,
  CheckCircle,
  Trophy
} from 'lucide-react';

export default function ExamPrepPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'pdf' | 'resources' | 'planner'>('dashboard');

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
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-600" />
                AI Quiz Generator
              </h2>
              
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
                      { title: 'MIT OpenCourseWare - Linear Algebra', duration: '34 videos', platform: 'YouTube' },
                      { title: '3Blue1Brown - Essence of Calculus', duration: '12 videos', platform: 'YouTube' },
                    ].map((video, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                        <h4 className="font-semibold text-gray-900">{video.title}</h4>
                        <div className="flex items-center justify-between mt-3">
                          <span className="text-sm text-gray-600">{video.duration}</span>
                          <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-700">
                            {video.platform}
                          </span>
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                Smart Study Planner
              </h2>
              
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">AI Recommendations for Today:</h4>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Focus on Mathematics (Exam in 7 days)
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Best study time: 9:00 AM - 11:00 AM (Peak focus hours)
                  </li>
                  <li className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Recommended: 2x 25-minute Pomodoro sessions
                  </li>
                </ul>
              </div>

              {/* Weekly Calendar */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                  <div key={day} className={`text-center p-2 rounded-lg ${idx === 2 ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-50'}`}>
                    <div className="text-xs font-semibold text-gray-600">{day}</div>
                    <div className="text-lg font-bold text-gray-900">{15 + idx}</div>
                  </div>
                ))}
              </div>

              {/* Today's Schedule */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Today's Schedule</h3>
                <div className="space-y-2">
                  {[
                    { time: '9:00 - 10:00', subject: 'Mathematics', topic: 'Derivatives', status: 'completed' },
                    { time: '10:30 - 11:30', subject: 'Physics', topic: 'Newton\'s Laws', status: 'in-progress' },
                    { time: '14:00 - 15:00', subject: 'Chemistry', topic: 'Chemical Bonds', status: 'pending' },
                    { time: '16:00 - 17:00', subject: 'Review Quiz', topic: 'Mathematics', status: 'pending' },
                  ].map((task, idx) => (
                    <div key={idx} className={`flex items-center gap-4 p-3 border rounded-lg ${
                      task.status === 'completed' ? 'bg-green-50 border-green-200' :
                      task.status === 'in-progress' ? 'bg-blue-50 border-blue-200' :
                      'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`w-3 h-3 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{task.subject}</div>
                        <div className="text-sm text-gray-600">{task.topic}</div>
                      </div>
                      <div className="text-sm text-gray-600">{task.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pomodoro Timer */}
              <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg text-center">
                <h3 className="font-bold text-gray-900 mb-4">Pomodoro Timer</h3>
                <div className="text-6xl font-bold text-blue-600 mb-4">25:00</div>
                <div className="flex gap-3 justify-center">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Start
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
