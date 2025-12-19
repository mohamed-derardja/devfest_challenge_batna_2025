'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { authAPI } from '@/lib/api';
import { 
  GraduationCap, 
  ArrowRight, 
  Eye, 
  EyeOff,
  ShieldCheck,
  Zap,
  Library,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher' | 'staff' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [name, setName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isRegisterMode) {
        // Register new user
        const response = await authAPI.register({
          name: name || email.split('@')[0],
          email,
          password,
          role: selectedRole || 'student'
        });
        
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', selectedRole || 'student');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', response.data?.name || name);
          router.push('/');
        }
      } else {
        // Login existing user
        const response = await authAPI.login({ email, password });
        
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userRole', response.data?.role || selectedRole || 'student');
          localStorage.setItem('userEmail', email);
          localStorage.setItem('userName', response.data?.name || email.split('@')[0]);
          router.push('/');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative flex items-center justify-center p-6 overflow-hidden">
      <div className="ivy-mesh" />
      <div className="grain" />
      
      <div className="relative w-full max-w-6xl z-10">
        <header className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] mb-6 shadow-2xl shadow-indigo-200"
          >
            <GraduationCap className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-serif font-bold text-slate-900 tracking-tight"
          >
            Scholar <span className="text-indigo-600">Platform</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 font-medium text-lg"
          >
            Academic ecosystem for the modern university student ✨
          </motion.p>
        </header>

        <AnimatePresence mode="wait">
          {!selectedRole ? (
            <motion.div 
              key="role-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <button onClick={() => setSelectedRole('student')} className="group academic-card p-10 !bg-white text-left h-[400px] flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-8">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">Student Scholar</h3>
                  <p className="text-slate-500 font-medium">Access neural study tools, merit rewards, and campus archives.</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest">
                  Initialize Identity <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <button onClick={() => setSelectedRole('teacher')} className="group academic-card p-10 !bg-white text-left h-[400px] flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-8">
                    <Library className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">Faculty Member</h3>
                  <p className="text-slate-500 font-medium">Coordinate curriculum, evaluate performance, and manage streams.</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest">
                  Initialize Identity <ArrowRight className="w-5 h-5" />
                </div>
              </button>

              <button onClick={() => setSelectedRole('staff')} className="group academic-card p-10 !bg-white text-left h-[400px] flex flex-col justify-between">
                <div>
                  <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 flex items-center justify-center mb-8">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 group-hover:text-rose-600 transition-colors">University Admin</h3>
                  <p className="text-slate-500 font-medium">System-wide infrastructure and campus intelligence management.</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-rose-600 font-black text-sm uppercase tracking-widest">
                  Initialize Identity <ArrowRight className="w-5 h-5" />
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="login-form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-lg mx-auto"
            >
              <div className="academic-card p-12 !bg-white shadow-2xl">
                <button
                  onClick={() => setSelectedRole(null)}
                  className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-indigo-600 mb-10 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Reset selection
                </button>

                <div className="text-center mb-12">
                  <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">
                    {selectedRole === 'student' ? 'Student' : selectedRole === 'teacher' ? 'Faculty' : 'Admin'} Login
                  </h2>
                  <p className="text-slate-500 font-medium">Input credentials for synchronization</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-8">
                  {error && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                      <p className="text-sm font-medium text-rose-600">{error}</p>
                    </div>
                  )}
                  
                  {isRegisterMode && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Ahmed Mansouri"
                        required={isRegisterMode}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Identifier (Email)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g., scholar@university.dz"
                      required
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol (Password)</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500 transition-all font-medium"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl hover:bg-slate-800 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Processing...' : isRegisterMode ? 'Create Account' : 'Authenticate Identity'}
                  </button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegisterMode(!isRegisterMode);
                        setError('');
                      }}
                      className="text-sm font-medium text-indigo-600 hover:underline"
                    >
                      {isRegisterMode ? 'Already have an account? Login' : 'Need an account? Register'}
                    </button>
                  </div>
                </form>

                <div className="mt-12 p-6 bg-indigo-50 border border-indigo-100 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-widest">Demo Intelligence</p>
                  </div>
                  <p className="text-xs font-medium text-indigo-700">demo@university.dz / demo123</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="text-center mt-12">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            © 2025 Scholar Platform Ecosystem • Batna 2 University
          </p>
        </footer>
      </div>
    </div>
  );
}
