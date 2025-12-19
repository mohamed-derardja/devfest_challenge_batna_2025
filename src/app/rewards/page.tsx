'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Trophy,
  Star,
  TrendingUp,
  CheckCircle,
  Clock,
  Target,
  Gift,
  Zap,
  Medal,
  Crown,
  Flame,
  Sparkles,
  ChevronRight,
  ArrowRight,
  User,
  Activity,
  Cpu,
  Bookmark,
  Layers,
  LayoutDashboard
} from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  reward: string;
  penalty: string;
  status: 'pending' | 'completed' | 'overdue';
  points: number;
  category: string;
}

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'leaderboard' | 'rewards'>('overview');
  
  const userStats = {
    totalPoints: 850,
    level: 12,
    rank: 5,
    completedTasks: 45,
    streak: 7,
  };

  const tasks: Task[] = [
    {
      id: 1,
      title: 'Complete Mathematics Quiz',
      description: 'Score at least 80% on the Calculus quiz',
      deadline: 'Dec 20, 2025 - 11:59 PM',
      reward: '+1 TD Point',
      penalty: 'No penalty',
      status: 'pending',
      points: 50,
      category: 'Academic'
    },
    {
      id: 2,
      title: 'Submit Assignment Early',
      description: 'Submit Data Structures homework 2 days before deadline',
      deadline: 'Dec 19, 2025 - 11:59 PM',
      reward: '+1 TD Point',
      penalty: 'No penalty if submitted on time',
      status: 'pending',
      points: 75,
      category: 'Academic'
    },
    {
      id: 3,
      title: 'Attend Study Group',
      description: 'Participate in organized study group session',
      deadline: 'Dec 21, 2025',
      reward: '+25 Points',
      penalty: 'None',
      status: 'pending',
      points: 25,
      category: 'Community'
    },
    {
      id: 4,
      title: 'Return Lost Item',
      description: 'Successfully return a lost item to its owner',
      deadline: 'No deadline',
      reward: '+50 Points',
      penalty: 'None',
      status: 'completed',
      points: 50,
      category: 'Community'
    },
    {
      id: 5,
      title: 'Physics Lab Report',
      description: 'Complete and submit lab report',
      deadline: 'Dec 18, 2025 - 11:59 PM',
      reward: '+1 TD Point',
      penalty: '-1 TD Point if late',
      status: 'overdue',
      points: 100,
      category: 'Academic'
    },
  ];

  const rewards = [
    { name: 'Library Late Fee Waiver', cost: 200, available: true, icon: Bookmark },
    { name: 'Cafeteria 10% Discount', cost: 150, available: true, icon: Gift },
    { name: 'Priority Course Registration', cost: 500, available: false, icon: Layers },
    { name: 'Parking Permit (1 month)', cost: 300, available: true, icon: Trophy },
    { name: 'Extra Study Room Hours', cost: 100, available: true, icon: Clock },
    { name: 'Custom Student ID Design', cost: 250, available: true, icon: Medal },
  ];

  const leaderboard = [
    { rank: 1, name: 'Ahmed K.', points: 1250, level: 15, badge: '🥇' },
    { rank: 2, name: 'Sarah M.', points: 1100, level: 14, badge: '🥈' },
    { rank: 3, name: 'Karim B.', points: 980, level: 13, badge: '🥉' },
    { rank: 4, name: 'Amina L.', points: 920, level: 13, badge: '⭐' },
    { rank: 5, name: 'You', points: 850, level: 12, badge: '⭐' },
    { rank: 6, name: 'Youcef K.', points: 780, level: 11, badge: '⭐' },
    { rank: 7, name: 'Fatima Z.', points: 720, level: 11, badge: '⭐' },
  ];

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
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-widest">Merit Rewards System</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Live Leaderboard
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-serif font-semibold tracking-tight text-slate-900"
            >
              Academic <span className="text-rose-600">Honors</span>
            </motion.h1>
            <p className="text-slate-500 font-medium text-lg">Convert your academic achievements into redeemable campus credits.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Global Points Earned</p>
              <p className="text-2xl font-serif font-bold text-slate-900">1.2M</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <Trophy className="w-6 h-6 text-rose-600" />
            </div>
          </div>
        </header>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl mb-12 w-fit max-w-full overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'tasks', label: 'Merit Tasks', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: Medal },
            { id: 'rewards', label: 'Store', icon: Gift },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-rose-600 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : ''}`} />
                <span className="text-sm tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Stats Bento */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { label: 'Total Merit', value: userStats.totalPoints, icon: Star, color: 'text-rose-600', bg: 'bg-rose-50' },
                  { label: 'Current Level', value: userStats.level, icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Global Rank', value: `#${userStats.rank}`, icon: Medal, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Tasks Done', value: userStats.completedTasks, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Study Streak', value: `${userStats.streak}d`, icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => (
                  <motion.div key={i} variants={itemVariants} className="academic-card p-6 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                    </div>
                    <p className="text-3xl font-serif font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                  <div className="academic-card p-10 !bg-white">
                    <div className="flex items-center justify-between mb-10">
                      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-rose-500" />
                        Neural Progression Path
                      </h2>
                      <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Level 13 Unlocks at 1000pts</span>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-sm font-bold text-slate-900">Current Progress</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">150 points to next tier</p>
                          </div>
                          <span className="text-3xl font-serif font-bold text-rose-600">85%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '85%' }}
                            className="h-full bg-rose-600 rounded-full"
                          />
                        </div>
                      </div>

                      <div className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100 border-l-4 border-l-rose-500">
                        <p className="text-sm font-bold text-slate-900 mb-2">System Insight:</p>
                        <p className="text-slate-600 leading-relaxed font-medium italic">"Analysis of your recent study patterns suggests completing the 'Mathematics Quiz' task would yield a 15% efficiency bonus this week."</p>
                      </div>
                    </div>
                  </div>

                  <div className="academic-card p-10 !bg-white">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">Critical Priority Tasks</h2>
                    <div className="space-y-4">
                      {tasks.filter(t => t.status === 'pending').slice(0, 3).map((task, i) => (
                        <div key={i} className="group p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-rose-200 transition-all flex items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                              <Target className="w-6 h-6 text-rose-500" />
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900">{task.title}</h3>
                              <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">{task.deadline}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6 shrink-0">
                            <div className="text-right">
                              <p className="text-xl font-serif font-bold text-rose-600">+{task.points}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Merit Pts</p>
                            </div>
                            <button className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-rose-700 transition-all shadow-lg shadow-rose-100">Initialize</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="academic-card p-8 !bg-rose-600 text-white group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-2">Dean's List Status</h3>
                      <p className="text-rose-100 text-sm leading-relaxed mb-6">You are eligible for elite tier rewards this semester. Check the store for exclusive vouchers.</p>
                      <button className="w-full py-3 bg-white text-rose-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-rose-50 transition-colors shadow-xl">View Privileges</button>
                    </div>
                  </div>

                  <div className="academic-card p-8 !bg-white">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Recent Milestones</h2>
                    <div className="space-y-6">
                      {[
                        { icon: '🎯', name: 'Task Master', date: '2d ago' },
                        { icon: '🔥', name: '7-Day Streak', date: 'Today' },
                        { icon: '📚', name: 'Quiz Pro', date: '3d ago' },
                      ].map((m, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="text-2xl w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">{m.icon}</div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{m.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{m.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'tasks' && (
            <motion.div
              key="tasks"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <Target className="w-8 h-8 text-rose-600" />
                      Active Merit Tasks
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">Earn points by completing academic and community challenges.</p>
                  </div>
                  
                  <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200 w-fit">
                    <button className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all bg-white text-rose-600 shadow-sm">All</button>
                    <button className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-slate-400">Academic</button>
                    <button className="px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-slate-400">Community</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {tasks.map((task, i) => (
                    <div key={i} className={`group p-8 rounded-[2.5rem] bg-slate-50 border-2 transition-all ${
                      task.status === 'completed' ? 'border-emerald-200 opacity-75' : 
                      task.status === 'overdue' ? 'border-rose-200' : 'border-slate-100 hover:border-rose-300'
                    }`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform ${
                          task.status === 'completed' ? 'text-emerald-500' : 'text-rose-500'
                        }`}>
                          {task.status === 'completed' ? <CheckCircle className="w-7 h-7" /> : <Zap className="w-7 h-7" />}
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-serif font-bold text-slate-900">+{task.points}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 mb-8">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">{task.title}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                            task.status === 'pending' ? 'bg-indigo-50 text-indigo-600' :
                            task.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                          }`}>{task.status}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">{task.description}</p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{task.deadline}</span>
                        </div>
                        <button className={`text-xs font-bold hover:underline flex items-center gap-1.5 ${
                          task.status === 'completed' ? 'text-emerald-600' : 'text-rose-600'
                        }`}>
                          {task.status === 'completed' ? 'View Proof' : 'Execute Task'} <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-4xl mx-auto space-y-10"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="text-center space-y-4 mb-16">
                  <div className="w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center mx-auto border border-amber-100 shadow-lg shadow-amber-100">
                    <Trophy className="w-10 h-10 text-amber-600" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-slate-900">Elite Scholarship <span className="text-amber-600">Ladder</span></h2>
                  <p className="text-slate-500 font-medium text-lg">Top scholars eligible for the 2025 Presidential Excellence Grant.</p>
                </div>

                <div className="space-y-4">
                  {leaderboard.map((entry, i) => (
                    <div key={i} className={`group p-6 rounded-[2rem] border-2 transition-all flex items-center gap-6 ${
                      entry.name === 'You' ? 'bg-indigo-50/50 border-indigo-200' : 'bg-slate-50 border-slate-100 hover:border-amber-200'
                    }`}>
                      <div className={`w-12 text-3xl font-serif font-bold text-center ${
                        entry.rank === 1 ? 'text-amber-500' : entry.rank === 2 ? 'text-slate-400' : entry.rank === 3 ? 'text-orange-400' : 'text-slate-300'
                      }`}>
                        {entry.rank}
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {entry.badge}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                          {entry.name}
                          {entry.name === 'You' && <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[8px] font-bold uppercase tracking-widest">Profile Verified</span>}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tier: Scholar Level {entry.level}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-serif font-bold text-slate-900">{entry.points}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Lifetime Merit</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <Gift className="w-8 h-8 text-rose-600" />
                      Merit Store
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">Redeem your hard-earned points for campus privileges.</p>
                  </div>
                  <div className="px-8 py-4 bg-slate-900 text-white rounded-3xl flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                      <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Available Balance</p>
                      <p className="text-2xl font-serif font-bold">{userStats.totalPoints} Merit</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rewards.map((reward, i) => (
                    <div key={i} className={`group p-8 rounded-[2.5rem] bg-slate-50 border-2 transition-all flex flex-col justify-between ${
                      !reward.available || reward.cost > userStats.totalPoints ? 'opacity-60 grayscale border-slate-100' : 'border-slate-100 hover:border-rose-300 shadow-sm'
                    }`}>
                      <div>
                        <div className="flex justify-between items-start mb-8">
                          <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <reward.icon className="w-7 h-7 text-rose-500" />
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-serif font-bold text-slate-900">{reward.cost}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</p>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">{reward.name}</h3>
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-8">Campus Exclusive</p>
                      </div>

                      <button 
                        disabled={!reward.available || reward.cost > userStats.totalPoints}
                        className={`w-full py-4 rounded-[1.5rem] font-bold text-xs uppercase tracking-widest transition-all ${
                          !reward.available ? 'bg-slate-200 text-slate-400 cursor-not-allowed' :
                          reward.cost > userStats.totalPoints ? 'bg-slate-100 text-slate-400 border border-slate-200' :
                          'bg-rose-600 text-white shadow-lg shadow-rose-100 hover:bg-rose-700 hover:-translate-y-1'
                        }`}
                      >
                        {!reward.available ? 'Out of Stock' : reward.cost > userStats.totalPoints ? 'Insufficient Balance' : 'Initialize Redemption'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Decorations */}
      <div className="absolute top-[10%] -left-[5%] w-[30%] h-[40%] bg-rose-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
