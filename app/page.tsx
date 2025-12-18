'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BookOpen, FileSearch, Package, Bell, Award, Newspaper, LogOut, User } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Student Success Platform
                </h1>
                <p className="text-xs text-gray-600">
                  {userRole === 'student' ? '🎓 Student Portal' : 
                   userRole === 'teacher' ? '👨‍🏫 Teacher Portal' : 
                   '🏢 Staff Portal'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right mr-3">
                <p className="text-sm font-medium text-gray-900">{userEmail}</p>
                <p className="text-xs text-gray-500 capitalize">{userRole}</p>
              </div>
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                <User className="w-4 h-4" />
                <span className="hidden md:inline">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 mb-16 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white opacity-10"></div>
          <div className="relative z-10 text-center text-white">
            <h2 className="text-5xl font-bold mb-4 animate-fade-in">
              Welcome Back, {userRole === 'student' ? 'Student' : userRole === 'teacher' ? 'Professor' : 'Staff Member'}! 👋
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Everything you need to excel in your {userRole === 'student' ? 'studies' : 'work'}, all in one place
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <p className="text-sm font-semibold">🔥 7-Day Streak</p>
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <p className="text-sm font-semibold">⭐ 850 Points</p>
              </div>
              <div className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                <p className="text-sm font-semibold">🏆 Rank #5</p>
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
