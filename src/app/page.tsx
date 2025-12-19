'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import TopBar from './components/TopBar';
import { 
  BookOpen, FileSearch, Package, Bell, Award, Newspaper, 
  LogOut, User, TrendingUp, Calendar, Clock, ArrowRight, 
  Sparkles, Target, Zap, CheckCircle2, AlertCircle, 
  ChevronRight, Search, LayoutDashboard, Settings,
  BarChart3, ShieldCheck, ZapIcon, Globe, Layers,
  Cpu, Activity, GraduationCap, Library, BookText,
  Timer, CalendarDays, Bookmark
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const email = localStorage.getItem('userEmail');
    
    if (!role) {
      router.push('/login');
    } else {
      setUserRole(role);
      setUserEmail(email);
      setTimeout(() => setIsLoaded(true), 500);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  const mainFeatures = [
    {
      title: 'Neural Study Hub',
      description: 'AI-personalized learning paths designed for your curriculum.',
      icon: GraduationCap,
      href: '/exam-prep',
      size: 'col-span-1 md:col-span-2 row-span-2',
      badge: 'Study AI',
      accent: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
    },
    {
      title: 'Global Scholar',
      description: 'Unlock worldwide scholarships and academic grants.',
      icon: Library,
      href: '/documents',
      size: 'col-span-1 row-span-1',
      accent: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      title: 'Found & Verified',
      description: 'Secured lost & found network with digital ownership.',
      icon: Package,
      href: '/lost-found',
      size: 'col-span-1 row-span-1',
      accent: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
    {
      title: 'Academic Honors',
      description: 'Your achievements converted into redeemable campus credits.',
      icon: Award,
      href: '/rewards',
      size: 'col-span-1 row-span-2',
      accent: 'bg-rose-50',
      iconColor: 'text-rose-600',
    },
    {
      title: 'Campus Pulse',
      description: 'Real-time updates on critical campus events and news.',
      icon: Bell,
      href: '/notifications',
      size: 'col-span-1 row-span-1',
      accent: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
  ];

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden relative">
      <div className="ivy-mesh" />
      <div className="grain" />

      <Navbar />
      <TopBar />

      <main className="relative z-10 min-h-screen p-6 md:p-10 lg:p-14 lg:pl-[300px] max-w-[1800px]">
        {/* Modern Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">Academic Year 2024/25</span>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                System Active
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-serif font-semibold tracking-tight text-slate-900"
            >
              Welcome back, <span className="text-indigo-600">{userEmail?.split('@')[0]}</span>
            </motion.h1>
            <p className="text-slate-500 font-medium">Your academic journey is synchronized and ready.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group hidden lg:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search courses, files..." 
                className="bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all w-72"
              />
            </div>
            
            <motion.div 
              whileHover={{ y: -2 }}
              className="flex items-center gap-3 p-1.5 pr-5 bg-white border border-slate-200 rounded-2xl shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-200">
                {userEmail?.[0].toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-slate-900 leading-none mb-1">{userEmail}</p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{userRole}</span>
              </div>
            </motion.div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content: Bento Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {mainFeatures.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`${feature.size} academic-card group`}
                >
                  <Link href={feature.href} className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-xl ${feature.accent} flex items-center justify-center transition-transform group-hover:scale-110 duration-500`}>
                        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
                      </div>
                      {feature.badge && (
                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">{feature.badge}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </Link>
                  {/* Subtle hover background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar Modules */}
          <div className="lg:col-span-4 space-y-8">
            {/* Academic Progress */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="academic-card p-8 !bg-white"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Academic Progress</h2>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              
              <div className="space-y-8">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Current GPA</p>
                    <p className="text-5xl font-serif font-semibold text-slate-900">3.82</p>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 rounded-full border border-indigo-100 text-indigo-600 bg-indigo-50 font-bold tracking-widest text-[10px]">DEAN'S LIST</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    <span>Semester Completion</span>
                    <span className="text-indigo-600">85%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: '85%' }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Credits</p>
                    <p className="text-lg font-bold text-slate-900">112/128</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Rank</p>
                    <p className="text-lg font-bold text-slate-900">Top 5%</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Upcoming Deadlines */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="academic-card p-8 !bg-white"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Priority Deadlines</h2>
                <Timer className="w-4 h-4 text-amber-500" />
              </div>
              
              <div className="space-y-4">
                {[
                  { title: 'Advanced Thesis Draft', due: 'Tomorrow, 23:59', status: 'Urgent', color: 'bg-rose-50 text-rose-600' },
                  { title: 'Global Macroeconomics Lab', due: 'Oct 24, 14:00', status: 'In Progress', color: 'bg-indigo-50 text-indigo-600' },
                  { title: 'Computer Science Final', due: 'Oct 28, 09:00', status: 'Scheduled', color: 'bg-slate-50 text-slate-600' },
                ].map((item, i) => (
                  <div key={i} className="group p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{item.title}</p>
                      <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${item.color}`}>{item.status}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                      <Clock className="w-3 h-3" />
                      {item.due}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Insights Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { label: 'Campus WiFi', value: 'Excellent', status: 'connected', color: 'text-emerald-500' },
            { label: 'Library Capacity', value: '42%', status: 'Available', color: 'text-blue-500' },
            { label: 'Study Hours', value: '342h', status: 'This Month', color: 'text-indigo-500' },
            { label: 'Active Grants', value: '2 New', status: 'Apply Now', color: 'text-amber-500' },
          ].map((stat, i) => (
            <div key={i} className="academic-card p-6 !rounded-[1.5rem] bg-white border border-slate-100 group">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.status}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
