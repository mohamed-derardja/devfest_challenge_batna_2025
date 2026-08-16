'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  Trash2,
  Settings,
  Filter,
  BookOpen,
  Package,
  Briefcase,
  TrendingUp,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  User,
  Zap,
  Activity,
  X
} from 'lucide-react';

type NotificationType = 'deadline' | 'task' | 'match' | 'opportunity' | 'update';
type NotificationPriority = 'high' | 'medium' | 'low';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: NotificationPriority;
  icon: any;
  color: string;
  bg: string;
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'deadline',
      title: 'Final Thesis Submission',
      message: 'Advanced Neural Systems thesis draft due in 24 hours.',
      time: '1 hour ago',
      read: false,
      priority: 'high',
      icon: Clock,
      color: 'text-rose-600',
      bg: 'bg-rose-50'
    },
    {
      id: 2,
      type: 'match',
      title: 'Neural Match Detected',
      message: 'A Black HP EliteBook matching your lost report was found in the Library.',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: Package,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      id: 3,
      type: 'task',
      title: 'Merit Reward Available',
      message: 'Score 80%+ on your next quiz to unlock the "Early Achiever" badge.',
      time: '3 hours ago',
      read: false,
      priority: 'medium',
      icon: Zap,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'High-Match Internship',
      message: 'Global Tech DZ posted a "Machine Learning Intern" role. 98% profile match.',
      time: '5 hours ago',
      read: true,
      priority: 'medium',
      icon: Briefcase,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    },
    {
      id: 5,
      type: 'update',
      title: 'Campus Infrastructure',
      message: 'Library 3rd floor neural hub is now fully operational with 5G connectivity.',
      time: '1 day ago',
      read: true,
      priority: 'low',
      icon: Activity,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <div className="ivy-mesh" />
      <div className="grain" />
      <Navbar />
      <TopBar />
      
      <main className="max-w-[1600px] px-6 lg:px-10 lg:pl-[300px] py-12 relative z-10">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">Neural Alert System</span>
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                {unreadCount} Critical Unread
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-serif font-semibold tracking-tight text-slate-900"
            >
              System <span className="text-indigo-600">Pulse</span>
            </motion.h1>
            <p className="text-slate-500 font-medium text-lg">Real-time synchronization of academic deadlines and campus events.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 transition-all text-slate-600 hover:text-indigo-600 shadow-sm">
              <Settings className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setNotifications(notifications.map(n => ({...n, read: true})))}
              className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg"
            >
              Synchronize All
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Filters Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <div className="academic-card p-6 !bg-white">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Neural Filters</h2>
              <div className="space-y-2">
                {[
                  { id: 'all', label: 'All Streams', icon: Activity },
                  { id: 'deadline', label: 'Deadlines', icon: Clock },
                  { id: 'match', label: 'Item Matches', icon: Package },
                  { id: 'task', label: 'Merit Tasks', icon: Zap },
                  { id: 'opportunity', label: 'Careers', icon: Briefcase },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                      activeFilter === f.id ? 'bg-indigo-50 text-indigo-600 font-bold border border-indigo-100' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <f.icon className="w-4 h-4" />
                      <span className="text-sm">{f.label}</span>
                    </div>
                    {f.id === 'all' && unreadCount > 0 && (
                      <span className="w-5 h-5 rounded-lg bg-rose-500 text-white text-[10px] flex items-center justify-center font-black">{unreadCount}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="academic-card p-6 !bg-indigo-600 text-white">
              <ShieldCheck className="w-8 h-8 text-indigo-200 mb-4" />
              <h3 className="font-serif font-bold text-lg mb-2">Priority Guard</h3>
              <p className="text-indigo-100/70 text-xs leading-relaxed mb-6">Critical deadline alerts are automatically pinned to your mobile dashboard.</p>
              <button className="w-full py-3 bg-white/10 backdrop-blur-md text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">Configure Alerts</button>
            </div>
          </div>

          {/* Notifications Feed */}
          <div className="lg:col-span-9 space-y-6">
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {notifications
                .filter(n => activeFilter === 'all' || n.type === activeFilter)
                .map((n) => (
                  <motion.div
                    key={n.id}
                    variants={itemVariants}
                    className={`group academic-card p-6 flex items-start gap-6 transition-all border-2 ${
                      !n.read ? 'bg-white border-indigo-200 shadow-lg shadow-indigo-100/20' : 'bg-slate-50/50 border-transparent opacity-80 hover:bg-white hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl ${n.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500`}>
                      <n.icon className={`w-7 h-7 ${n.color}`} />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <h3 className={`font-bold text-lg ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>{n.title}</h3>
                          {!n.read && <span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />}
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{n.time}</span>
                      </div>
                      <p className={`text-sm font-medium leading-relaxed ${!n.read ? 'text-slate-600' : 'text-slate-400'}`}>{n.message}</p>
                      
                      <div className="flex items-center gap-4 pt-4">
                        <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest hover:underline flex items-center gap-1.5">
                          Launch Module <ChevronRight className="w-3 h-3" />
                        </button>
                        {!n.read && (
                          <button 
                            onClick={() => setNotifications(notifications.map(notif => notif.id === n.id ? {...notif, read: true} : notif))}
                            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-slate-600"
                          >
                            Mark Read
                          </button>
                        )}
                      </div>
                    </div>

                    <button 
                      onClick={() => setNotifications(notifications.filter(notif => notif.id !== n.id))}
                      className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}

              {notifications.filter(n => activeFilter === 'all' || n.type === activeFilter).length === 0 && (
                <div className="text-center py-20 bg-white/50 border border-slate-200 border-dashed rounded-[3rem]">
                  <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="font-serif font-bold text-xl text-slate-900 mb-1">System Quiet</h3>
                  <p className="text-slate-500 font-medium">No active alerts in this neural stream.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Background Decorations */}
      <div className="absolute top-[10%] -left-[5%] w-[30%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-rose-200/20 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
