'use client';

import Navbar from '../components/Navbar';
import { 
  User, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Settings,
  Edit,
  Camera
} from 'lucide-react';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center mb-6">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                    JD
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                    <Camera className="w-5 h-5" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">John Doe</h2>
                <p className="text-gray-600">Computer Science, Year 3</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                    Student ID: CS2023-001
                  </span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span>john.doe@university.dz</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span>+213 555 123 456</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>Batna, Algeria</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>Joined: September 2023</span>
                </div>
              </div>

              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">GPA</span>
                  <span className="text-lg font-bold text-blue-600">3.8</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Points</span>
                  <span className="text-lg font-bold text-yellow-600">850</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rank</span>
                  <span className="text-lg font-bold text-purple-600">#5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tasks Done</span>
                  <span className="text-lg font-bold text-green-600">45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600">Major</label>
                  <p className="font-semibold text-gray-900">Computer Science</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Year</label>
                  <p className="font-semibold text-gray-900">3rd Year</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Current GPA</label>
                  <p className="font-semibold text-gray-900">3.8 / 4.0</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Credits Completed</label>
                  <p className="font-semibold text-gray-900">90 / 120</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Expected Graduation</label>
                  <p className="font-semibold text-gray-900">June 2026</p>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Advisor</label>
                  <p className="font-semibold text-gray-900">Dr. Ahmed Benali</p>
                </div>
              </div>
            </div>

            {/* Current Courses */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Current Courses</h3>
              <div className="space-y-3">
                {[
                  { code: 'CS301', name: 'Data Structures & Algorithms', grade: 'A-' },
                  { code: 'CS302', name: 'Database Systems', grade: 'A' },
                  { code: 'MATH301', name: 'Linear Algebra', grade: 'B+' },
                  { code: 'CS303', name: 'Operating Systems', grade: 'A-' },
                ].map((course, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <div className="font-semibold text-gray-900">{course.name}</div>
                      <div className="text-sm text-gray-600">{course.code}</div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">{course.grade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Achievements
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '🎯', name: 'Task Master', desc: '10 tasks completed' },
                  { icon: '🔥', name: '7-Day Streak', desc: 'Active for 7 days' },
                  { icon: '📚', name: 'Quiz Pro', desc: '90%+ on 5 quizzes' },
                  { icon: '🏆', name: 'Top 5', desc: 'Ranked #5 globally' },
                  { icon: '💡', name: 'Helper', desc: 'Returned 2 items' },
                  { icon: '⭐', name: 'Honor Roll', desc: 'GPA above 3.5' },
                  { icon: '📖', name: 'Bookworm', desc: '20 books read' },
                  { icon: '🎓', name: 'Scholar', desc: '2 scholarships won' },
                ].map((achievement, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-3 text-center hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-1">{achievement.icon}</div>
                    <div className="text-xs font-semibold text-gray-900">{achievement.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{achievement.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Activity Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Quizzes Completed</div>
                  <div className="text-2xl font-bold text-blue-600">24</div>
                  <div className="text-xs text-green-600 mt-1">+6 this week</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Study Hours</div>
                  <div className="text-2xl font-bold text-green-600">42h</div>
                  <div className="text-xs text-green-600 mt-1">+8h this week</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">Average Score</div>
                  <div className="text-2xl font-bold text-yellow-600">85%</div>
                  <div className="text-xs text-green-600 mt-1">+5% improvement</div>
                </div>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-gray-600" />
                Preferences
              </h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Email Notifications</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Push Notifications</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">SMS Alerts</span>
                  <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Weekly Reports</span>
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
