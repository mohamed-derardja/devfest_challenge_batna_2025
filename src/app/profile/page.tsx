'use client';

import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import { motion } from 'framer-motion';
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
  Camera,
  ShieldCheck,
  Zap,
  Activity,
  Bookmark,
  ChevronRight,
  Sparkles,
  LayoutDashboard,
  CheckCircle2,
  Trophy
} from 'lucide-react';

export default function ProfilePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <div className="ivy-mesh" />
      <div className="grain" />
      <Navbar />
      <TopBar />
      
      <main className="max-w-[1700px] px-6 lg:px-10 lg:pl-[300px] py-12 relative z-10">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">Scholar Profile</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3" />
              Identity Verified
            </span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl font-serif font-semibold tracking-tight text-slate-900"
          >
            Academic <span className="text-indigo-600">Identity</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Personal Data */}
          <div className="lg:col-span-4 space-y-10">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="academic-card p-10 !bg-white text-center"
            >
              <div className="relative inline-block mb-8">
                <div className="w-40 h-40 bg-slate-100 rounded-[2.5rem] border-4 border-white shadow-xl flex items-center justify-center text-5xl font-serif font-bold text-indigo-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
                  JD
                </div>
                <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all hover:scale-110">
                  <Camera className="w-6 h-6" />
                </button>
              </div>

              <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">John Doe</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-8">Computer Science • 3rd Year Scholar</p>

              <div className="space-y-4 text-left border-t border-slate-100 pt-8">
                {[
                  { icon: Mail, label: 'Email', value: 'john.doe@university.dz' },
                  { icon: Phone, label: 'Terminal', value: '+213 555 123 456' },
                  { icon: MapPin, label: 'Sector', value: 'Batna, Algeria' },
                  { icon: Calendar, label: 'Registry', value: 'Sept 2023' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-200 transition-all">
                      <item.icon className="w-4 h-4 text-slate-400 group-hover:text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold text-slate-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-2">
                <Edit className="w-4 h-4" />
                Modify Credentials
              </button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="academic-card p-8 !bg-white"
            >
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Merit Snapshot</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'GPA', value: '3.82', color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Merit', value: '850', color: 'text-rose-600', bg: 'bg-rose-50' },
                  { label: 'Rank', value: '#5', color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Tasks', value: '45', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                ].map((stat, i) => (
                  <div key={i} className={`p-5 rounded-2xl ${stat.bg} border border-slate-100`}>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                    <p className={`text-2xl font-serif font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Academic & Achievements */}
          <div className="lg:col-span-8 space-y-10">
            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="academic-card p-10 !bg-white"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Academic Curriculum
                </h3>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Active Semester</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 mb-12">
                {[
                  { label: 'Major Intelligence', value: 'Computer Science' },
                  { label: 'Current Tier', value: '3rd Year / Senior' },
                  { label: 'Retention Score', value: '3.8 / 4.0' },
                  { label: 'Credit Synthesis', value: '90 / 120' },
                  { label: 'Projection', value: 'June 2026' },
                  { label: 'Neural Advisor', value: 'Dr. Ahmed Benali' },
                ].map((info, i) => (
                  <div key={i} className="group">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-600 transition-colors">{info.label}</p>
                    <p className="text-lg font-bold text-slate-900">{info.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Current Module Performance</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { code: 'CS301', name: 'Neural Algorithms', grade: 'A-', progress: 85 },
                    { code: 'CS302', name: 'Distributed Systems', grade: 'A', progress: 92 },
                    { code: 'MATH301', name: 'Calculus Theory', grade: 'B+', progress: 78 },
                    { code: 'CS303', name: 'System Security', grade: 'A-', progress: 88 },
                  ].map((course, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all group">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{course.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{course.code}</p>
                        </div>
                        <span className="text-lg font-serif font-bold text-indigo-600">{course.grade}</span>
                      </div>
                      <div className="h-1 w-full bg-white rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600" style={{ width: `${course.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="academic-card p-10 !bg-white"
            >
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Neural Achievements
                </h3>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">8 Unlockable Tiers</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: '🎯', name: 'Task Master', desc: '10 Tasks Done' },
                  { icon: '🔥', name: '7-Day Streak', desc: 'Neural Active' },
                  { icon: '📚', name: 'Quiz Pro', desc: '90%+ Accuracy' },
                  { icon: '🏆', name: 'Top 5%', desc: 'Global Rank' },
                  { icon: '💡', name: 'Verified', desc: 'Lost & Found' },
                  { icon: '⭐', name: 'Honor Roll', desc: 'Elite GPA' },
                  { icon: '📖', name: 'Scholar', desc: '20 Sources' },
                  { icon: '🎓', name: 'Grantee', desc: 'Scholarship' },
                ].map((ach, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 text-center hover:bg-white hover:border-amber-400 hover:shadow-lg transition-all group">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-500">{ach.icon}</div>
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter mb-1">{ach.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ach.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="academic-card p-10 !bg-slate-900 text-white"
            >
              <div className="flex items-center gap-3 mb-8">
                <Settings className="w-5 h-5 text-indigo-400" />
                <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">Neural Preferences</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { label: 'Neural Alerts (Email)', status: true },
                  { label: 'Real-time Pulse (Push)', status: true },
                  { label: 'Critical SMS Synchronization', status: false },
                  { label: 'Weekly Merit Report', status: true },
                ].map((pref, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-sm font-bold text-slate-300">{pref.label}</span>
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${pref.status ? 'bg-indigo-600' : 'bg-slate-700'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${pref.status ? 'right-1' : 'left-1'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Background Decorations */}
      <div className="absolute top-[10%] -left-[5%] w-[30%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-emerald-200/20 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
