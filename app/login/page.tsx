'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, BookOpen, Building2, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'staff' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    {
      id: 'student' as const,
      title: 'Student',
      description: 'Access study tools, resources, and campus services',
      icon: GraduationCap,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['AI Study Assistant', 'Lost & Found', 'Task Rewards']
    },
    {
      id: 'teacher' as const,
      title: 'Teacher',
      description: 'Manage courses, assignments, and student progress',
      icon: BookOpen,
      gradient: 'from-purple-500 to-pink-500',
      features: ['Course Management', 'Grade System', 'Analytics']
    },
    {
      id: 'staff' as const,
      title: 'University Staff',
      description: 'Administrative tools and campus management',
      icon: Building2,
      gradient: 'from-orange-500 to-red-500',
      features: ['User Management', 'Reports', 'Campus Updates']
    }
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in production, this would validate credentials
    if (email && password) {
      localStorage.setItem('userRole', selectedRole || 'student');
      localStorage.setItem('userEmail', email);
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative w-full max-w-6xl">
        {/* Logo and Header with Glass Effect */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-xl rounded-3xl mb-6 shadow-2xl border border-white/30 transform hover:rotate-12 transition-transform duration-300">
            <GraduationCap className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl">
            Student Success Platform
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Choose your role to get started ✨
          </p>
        </div>

        {!selectedRole ? (
          /* Role Selection with Enhanced Cards */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className="group bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 border-2 border-white/50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-20 h-20 bg-gradient-to-br ${role.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-2xl`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-medium">
                    {role.description}
                  </p>
                  <div className="space-y-3">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm text-gray-700 font-semibold">
                        <div className={`w-2 h-2 bg-gradient-to-r ${role.gradient} rounded-full shadow-md`}></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex items-center justify-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 font-black text-lg group-hover:gap-4 transition-all">
                    Select
                    <ArrowRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Login Form */
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              {/* Selected Role Header */}
              <button
                onClick={() => setSelectedRole(null)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              >
                <ArrowRight className="w-5 h-5 rotate-180" />
                Change role
              </button>

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${
                  roles.find(r => r.id === selectedRole)?.gradient
                } rounded-xl mb-4 shadow-lg`}>
                  {(() => {
                    const Icon = roles.find(r => r.id === selectedRole)?.icon;
                    return Icon ? <Icon className="w-8 h-8 text-white" /> : null;
                  })()}
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {roles.find(r => r.id === selectedRole)?.title} Login
                </h2>
                <p className="text-gray-600">
                  Enter your credentials to continue
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'student' ? 'student@university.dz' : selectedRole === 'teacher' ? 'teacher@university.dz' : 'staff@university.dz'}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 bg-gradient-to-r ${
                    roles.find(r => r.id === selectedRole)?.gradient
                  } text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  Sign In
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                      Register here
                    </a>
                  </p>
                </div>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
                <p className="text-xs text-blue-800">
                  Email: demo@university.dz<br />
                  Password: demo123
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            © 2025 Student Success Platform. Made with ❤️ for GDG Batna
          </p>
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}
