'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, FileSearch, Package, Bell, Award, Newspaper, LogOut, User, TrendingUp, Calendar, Clock, ArrowRight, Sparkles, Target, Zap, CheckCircle2, AlertCircle } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (!role) {
      router.push('/login');
    } else {
      setUserRole(role);
      setUserEmail(email);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const features = [
    {
      title: 'Exam Preparation Assistant',
      description: 'AI-powered quizzes, PDF summaries, and smart study planning',
      icon: BookOpen,
      href: '/exam-prep',
      color: 'bg-blue-500',
    },
    {
      title: 'Document & Opportunity Helper',
      description: 'Find resources, internships, and scholarships with AI assistance',
      icon: FileSearch,
      href: '/documents',
      color: 'bg-green-500',
    },
    {
      title: 'Lost & Found',
      description: 'AI-powered matching system for lost and found items',
      icon: Package,
      href: '/lost-found',
      color: 'bg-orange-500',
    },
  ];

  const additionalFeatures = [
    {
      title: 'Notifications',
      description: 'Smart reminders for deadlines and tasks',
      icon: Bell,
      href: '/notifications',
      color: 'bg-purple-500',
    },
    {
      title: 'Task Rewards',
      description: 'Earn points and bonuses for completing tasks',
      icon: Award,
      href: '/rewards',
      color: 'bg-yellow-500',
    },
    {
      title: 'Program Updates',
      description: 'AI-summarized news about program changes',
      icon: Newspaper,
      href: '/news',
      color: 'bg-pink-500',
    },
  ];

  if (!userRole) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header with Glassmorphism */}
      <header className="bg-white/80 backdrop-blur-xl shadow-2xl border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 transform hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Student Success Platform
                </h1>
                <p className="text-xs font-semibold text-gray-600">
                  {userRole === 'student' ? '🎓 Student Portal' : 
                   userRole === 'teacher' ? '👨‍🏫 Teacher Portal' : 
                   '🏢 Staff Portal'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right mr-3 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <p className="text-sm font-bold text-gray-900">{userEmail}</p>
                <p className="text-xs text-blue-600 capitalize font-semibold">{userRole}</p>
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 transform duration-200"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 transform duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 mb-16 shadow-2xl">
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -top-20 -left-20 animate-blob"></div>
            <div className="absolute w-96 h-96 bg-white/10 rounded-full blur-3xl -bottom-20 -right-20 animate-blob animation-delay-2000"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <div className="inline-block mb-4 px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 animate-fade-in">
              <p className="text-sm font-bold">✨ Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>
            <h2 className="text-5xl font-bold mb-4 animate-fade-in">
              Welcome Back, {userRole === 'student' ? 'Student' : userRole === 'teacher' ? 'Professor' : 'Staff Member'}! 👋
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Everything you need to excel in your {userRole === 'student' ? 'studies' : 'work'}, all in one place
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
                <div className="text-4xl font-black text-white mb-2">7</div>
                <p className="text-xs font-semibold text-white/80">Day Streak 🔥</p>
                <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-yellow-300 to-orange-300 w-4/5"></div>
                </div>
              </div>
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
                <div className="text-4xl font-black text-white mb-2">850</div>
                <p className="text-xs font-semibold text-white/80">Total Points ⭐</p>
                <p className="text-xs text-green-300 mt-1">+120 this week</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
                <div className="text-4xl font-black text-white mb-2">#5</div>
                <p className="text-xs font-semibold text-white/80">Your Rank 🏆</p>
                <p className="text-xs text-green-300 mt-1">↑ 2 positions</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/30 hover:bg-white/20 transition-all hover:scale-105 cursor-pointer">
                <div className="text-4xl font-black text-white mb-2">92%</div>
                <p className="text-xs font-semibold text-white/80">Completion 📈</p>
                <p className="text-xs text-green-300 mt-1">Excellent!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ✨ Main Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-transparent hover:border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="px-3 py-1 bg-gray-100 group-hover:bg-blue-100 rounded-full text-xs font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">
                        NEW
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                      Explore
                      <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Bottom Accent */}
                  <div className={`h-1 ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🛠️ Additional Tools
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.href}
                  href={feature.href}
                  className="group bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-gray-300"
                >
                  <div className="p-6">
                    <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Activity Feed & Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Recent Activity
              </h3>
              <p className="text-sm text-gray-600 mt-1">Your latest achievements and updates</p>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              {[
                { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', title: 'Quiz Completed', desc: 'Mathematics Chapter 5 - Score: 95%', time: '2 hours ago' },
                { icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-50', title: 'Achievement Unlocked', desc: 'Perfect Week Streak - 7 Days!', time: '5 hours ago' },
                { icon: Package, color: 'text-blue-600', bg: 'bg-blue-50', title: 'Item Match Found', desc: 'Your lost laptop has a potential match', time: '1 day ago' },
                { icon: FileSearch, color: 'text-purple-600', bg: 'bg-purple-50', title: 'Document Shared', desc: 'Linear Algebra Notes uploaded', time: '2 days ago' },
                { icon: Bell, color: 'text-orange-600', bg: 'bg-orange-50', title: 'Reminder', desc: 'Physics assignment due tomorrow', time: '3 days ago' },
              ].map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all group cursor-pointer border border-transparent hover:border-gray-200">
                    <div className={`${activity.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-6 h-6 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 mb-1">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mb-1">{activity.desc}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-orange-50 to-pink-50 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-orange-600" />
                Upcoming Tasks
              </h3>
              <p className="text-sm text-gray-600 mt-1">Stay on top of your schedule</p>
            </div>
            <div className="p-6 space-y-4">
              {[
                { priority: 'high', title: 'Physics Final Exam', date: 'Dec 20, 2025', time: '09:00 AM', color: 'red', icon: AlertCircle },
                { priority: 'medium', title: 'Submit Project Report', date: 'Dec 21, 2025', time: '11:59 PM', color: 'yellow', icon: Target },
                { priority: 'low', title: 'Study Group Meeting', date: 'Dec 22, 2025', time: '03:00 PM', color: 'blue', icon: Calendar },
                { priority: 'medium', title: 'Chemistry Quiz', date: 'Dec 23, 2025', time: '10:00 AM', color: 'orange', icon: Zap },
              ].map((task, idx) => {
                const Icon = task.icon;
                return (
                  <div key={idx} className="group relative">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${task.color}-500 rounded-full`}></div>
                    <div className="pl-6 pr-4 py-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer border border-transparent hover:border-gray-200">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-4 h-4 text-${task.color}-600`} />
                            <h4 className="font-bold text-gray-900">{task.title}</h4>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {task.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {task.time}
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 bg-${task.color}-100 text-${task.color}-700 rounded-full text-xs font-bold uppercase`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-pink-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                View All Tasks
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Personalized for You</h3>
                <p className="text-sm text-white/80">AI-powered recommendations based on your activity</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Complete Math Quiz', desc: 'Chapter 6 - Derivatives', points: '+50 pts', bg: 'from-blue-500 to-blue-600' },
                { title: 'Join Study Group', desc: '5 students are online now', points: 'Active', bg: 'from-green-500 to-green-600' },
                { title: 'Review Lost Items', desc: '2 new matches for your items', points: 'Check', bg: 'from-orange-500 to-orange-600' },
              ].map((rec, idx) => (
                <div key={idx} className="group bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                  <div className={`w-full h-1 bg-gradient-to-r ${rec.bg} rounded-full mb-4`}></div>
                  <h4 className="font-bold text-white mb-2">{rec.title}</h4>
                  <p className="text-sm text-white/70 mb-3">{rec.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-yellow-300">{rec.points}</span>
                    <ArrowRight className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 border border-white/20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">📊 Your Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl font-bold text-white mb-2">12</div>
              <div className="text-sm text-white/80">Quizzes Completed</div>
              <div className="mt-2 text-xs text-green-300">+6 this week</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl font-bold text-white mb-2">5</div>
              <div className="text-sm text-white/80">Documents Shared</div>
              <div className="mt-2 text-xs text-green-300">+2 this week</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl font-bold text-white mb-2">2</div>
              <div className="text-sm text-white/80">Items Returned</div>
              <div className="mt-2 text-xs text-green-300">Great job!</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all">
              <div className="text-5xl font-bold text-white mb-2">850</div>
              <div className="text-sm text-white/80">Points Earned</div>
              <div className="mt-2 text-xs text-yellow-300">🏆 Top 5%</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600">
            © 2025 Student Success Platform. Made with ❤️ for students.
          </p>
        </div>
      </footer>
    </div>
  );
}
