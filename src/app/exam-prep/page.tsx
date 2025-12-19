'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { examPrepAPI } from '@/lib/api';
import { 
  BookOpen, 
  Upload, 
  Brain, 
  Calendar, 
  Target,
  FileText, 
  Clock, 
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Trophy,
  Settings,
  BarChart3,
  Zap,
  Award,
  AlertCircle,
  Plus,
  Minus,
  Pause,
  Play,
  Users,
  Lightbulb,
  Timer,
  X,
  ChevronRight,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Star,
  ExternalLink,
  Youtube,
  Library
} from 'lucide-react';

export default function ExamPrepPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quiz' | 'pdf' | 'resources' | 'planner'>('dashboard');
  const [quizInputMethod, setQuizInputMethod] = useState<'text' | 'upload'>('text');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  
  // Quiz Generation States
  const [quizSubject, setQuizSubject] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  const [quizError, setQuizError] = useState('');

  // PDF Summarizer States
  const [summaryInputMethod, setSummaryInputMethod] = useState<'text' | 'upload'>('text');
  const [summaryUploadedFile, setSummaryUploadedFile] = useState<File | null>(null);
  const [summaryText, setSummaryText] = useState('');
  const [summaryResult, setSummaryResult] = useState<{
    title: string;
    overview: string;
    keyPoints: string[];
    actionItems: string[];
  } | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  // Resources States
  const [resourceSearchQuery, setResourceSearchQuery] = useState('');
  const [resourceCategory, setResourceCategory] = useState<'all' | 'books' | 'courses' | 'videos'>('all');
  
  // Study Planner States
  const [showPersonalDataForm, setShowPersonalDataForm] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [studyStreak, setStudyStreak] = useState(7);
  const [totalStudyHours, setTotalStudyHours] = useState(34.5);
  
  // Personal Study Preferences
  const [personalData, setPersonalData] = useState({
    studyGoal: 'Increase grades',
    availableHoursPerDay: 4,
    preferredStudyTime: 'morning',
    learningStyle: 'visual',
    difficultyLevel: 'intermediate',
    breakDuration: 5,
    sessionsPerDay: 4,
    focusSubjects: ['Mathematics', 'Physics'],
    weakAreas: ['Chemistry'],
    examDates: [
      { subject: 'Mathematics', date: '2025-12-25' },
      { subject: 'Physics', date: '2025-12-28' }
    ]
  });

  const [personalDataDraft, setPersonalDataDraft] = useState(personalData);
  const [scheduleSeed, setScheduleSeed] = useState(0);
  
  // Performance Tracking
  const [performanceData, setPerformanceData] = useState([
    { date: '2025-12-11', hoursStudied: 3.5, focusScore: 85, topicsCompleted: 4 },
    { date: '2025-12-12', hoursStudied: 4.0, focusScore: 90, topicsCompleted: 5 },
    { date: '2025-12-13', hoursStudied: 3.0, focusScore: 75, topicsCompleted: 3 },
    { date: '2025-12-14', hoursStudied: 5.0, focusScore: 92, topicsCompleted: 6 },
    { date: '2025-12-15', hoursStudied: 4.5, focusScore: 88, topicsCompleted: 5 },
    { date: '2025-12-16', hoursStudied: 4.0, focusScore: 85, topicsCompleted: 4 },
    { date: '2025-12-17', hoursStudied: 3.5, focusScore: 80, topicsCompleted: 4 },
  ]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSummaryFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSummaryUploadedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (!isTimerRunning) return;
    const interval = setInterval(() => {
      setPomodoroTime((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const parseSentences = (text: string) => {
    return text
      .replace(/\s+/g, ' ')
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const generateQuickSummary = (rawText: string) => {
    const cleaned = rawText.trim();
    if (cleaned.length < 40) return null;

    const sentences = parseSentences(cleaned);
    const keyPoints = sentences.slice(0, 5).map((s) => (s.length > 160 ? `${s.slice(0, 157)}…` : s));
    const overview = sentences.slice(0, 2).join(' ');

    return {
      title: 'Neural Summary (Demo)',
      overview: overview || 'Summary generated from your input.',
      keyPoints: keyPoints.length ? keyPoints : [cleaned.slice(0, 180) + (cleaned.length > 180 ? '…' : '')],
      actionItems: [
        'Turn the key points into 10 flashcards',
        'Write 5 practice questions per section',
        'Schedule a 25-minute review tomorrow'
      ]
    };
  };

  // API Functions
  const handleGenerateQuiz = async () => {
    if (!quizSubject && !textContent) {
      setQuizError('Please enter a subject or topic');
      return;
    }

    setIsGeneratingQuiz(true);
    setQuizError('');
    
    try {
      const response = await examPrepAPI.generateQuiz({
        subject: quizSubject || 'General',
        topic: textContent,
        difficulty: quizDifficulty,
        count: 5
      });
      
      setQuizQuestions(response.questions || []);
    } catch (err: any) {
      setQuizError(err.message || 'Failed to generate quiz. Please try again.');
      console.error('Quiz generation error:', err);
    } finally {
      setIsGeneratingQuiz(false);
    }
  };

  const handleSummarizeText = async () => {
    if (!summaryText) {
      setSummaryError('Please enter some text to summarize');
      return;
    }

    setIsSummarizing(true);
    setSummaryError('');
    
    try {
      const response = await examPrepAPI.summarizeText({ text: summaryText });
      
      if (response.summary) {
        setSummaryResult({
          title: response.summary.title || 'AI Summary',
          overview: response.summary.overview || '',
          keyPoints: response.summary.keyPoints || [],
          actionItems: response.summary.actionItems || [
            'Review key points and create flashcards',
            'Practice with sample questions',
            'Schedule follow-up study session'
          ]
        });
      }
    } catch (err: any) {
      setSummaryError(err.message || 'Failed to generate summary. Please try again.');
      console.error('Summarization error:', err);
      
      // Fallback to local summary
      const localSummary = generateQuickSummary(summaryText);
      if (localSummary) {
        setSummaryResult(localSummary);
      }
    } finally {
      setIsSummarizing(false);
    }
  };

  type StudyTask = {
    time: string;
    subject: string;
    topic: string;
    status: 'completed' | 'in-progress' | 'pending';
    accent: string;
  };

  const formatTime = (minutesFromMidnight: number) => {
    const total = ((minutesFromMidnight % (24 * 60)) + 24 * 60) % (24 * 60);
    const h = Math.floor(total / 60);
    const m = total % 60;
    const hh = h.toString().padStart(2, '0');
    const mm = m.toString().padStart(2, '0');
    return `${hh}:${mm}`;
  };

  const buildTodaysPlan = (data: typeof personalData): StudyTask[] => {
    const startByPreference: Record<string, number> = {
      morning: 9 * 60,
      afternoon: 13 * 60,
      evening: 18 * 60,
    };
    const start = startByPreference[data.preferredStudyTime] ?? 9 * 60;

    const sessions = Math.max(1, Math.min(8, Math.floor(data.sessionsPerDay || 1)));
    const availableMinutes = Math.max(30, Math.floor((data.availableHoursPerDay || 1) * 60));
    const breakMinutes = Math.max(0, Math.min(30, Math.floor(data.breakDuration || 0)));
    const totalBreaks = Math.max(0, sessions - 1);
    const workMinutesTotal = Math.max(20, availableMinutes - totalBreaks * breakMinutes);
    const workMinutesPerSession = Math.max(20, Math.floor(workMinutesTotal / sessions));

    const subjects = (
      (data.weakAreas?.length ? data.weakAreas : []).concat(data.focusSubjects || [])
    ).filter(Boolean);
    const fallbackSubjects = ['Mathematics', 'Physics', 'Computer Science'];
    const rotation = (subjects.length ? subjects : fallbackSubjects).slice(0);

    const tasks: StudyTask[] = [];
    let cursor = start;
    for (let i = 0; i < sessions; i++) {
      const subject = rotation[i % rotation.length];
      const end = cursor + workMinutesPerSession;
      tasks.push({
        time: `${formatTime(cursor)} - ${formatTime(end)}`,
        subject,
        topic: `Focused session • ${data.difficultyLevel} • ${data.learningStyle}`,
        status: i === 0 ? 'in-progress' : 'pending',
        accent: i === 0 ? 'border-indigo-500 bg-indigo-50/30' : 'border-slate-300 bg-slate-50',
      });
      cursor = end;
      if (i < sessions - 1 && breakMinutes > 0) {
        const breakEnd = cursor + breakMinutes;
        tasks.push({
          time: `${formatTime(cursor)} - ${formatTime(breakEnd)}`,
          subject: 'Break & Recharge',
          topic: `${breakMinutes}m reset (walk, hydrate, stretch)`,
          status: 'pending',
          accent: 'border-slate-300 bg-slate-50',
        });
        cursor = breakEnd;
      }
    }
    return tasks;
  };

  const studyPlan = useMemo(() => {
    void scheduleSeed;
    return buildTodaysPlan(personalData);
  }, [personalData, scheduleSeed]);

  const booksData = useMemo(
    () => [
      {
        id: 1,
        title: 'Deep Work',
        author: 'Cal Newport',
        category: 'Productivity',
        rating: 4.8,
        description: 'Rules for focused success in a distracted world. Master deep concentration and eliminate shallow work.',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41gIU1hCiyL._SX329_BO1,204,203,200_.jpg',
        amazonUrl: 'https://www.amazon.com/Deep-Work-Focused-Success-Distracted/dp/1455586692',
      },
      {
        id: 2,
        title: 'Make It Stick',
        author: 'Peter C. Brown',
        category: 'Learning',
        rating: 4.7,
        description: 'The science of successful learning. Evidence-based strategies for better retention and understanding.',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/41xZ3VqFxzL._SX331_BO1,204,203,200_.jpg',
        amazonUrl: 'https://www.amazon.com/Make-Stick-Science-Successful-Learning/dp/0674729013',
      },
      {
        id: 3,
        title: 'A Mind for Numbers',
        author: 'Barbara Oakley',
        category: 'Mathematics',
        rating: 4.6,
        description: 'How to excel at math and science. Proven techniques from neuroscience and cognitive psychology.',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51vvJWLkykL._SX398_BO1,204,203,200_.jpg',
        amazonUrl: 'https://www.amazon.com/Mind-Numbers-Science-Flunked-Algebra/dp/039916524X',
      },
      {
        id: 4,
        title: 'Atomic Habits',
        author: 'James Clear',
        category: 'Habits',
        rating: 4.9,
        description: 'Tiny changes, remarkable results. Build good habits, break bad ones, and get 1% better every day.',
        coverUrl: 'https://images-na.ssl-images-amazon.com/images/I/51Tlm0GZTXL._SX329_BO1,204,203,200_.jpg',
        amazonUrl: 'https://www.amazon.com/Atomic-Habits-Proven-Build-Break/dp/0735211299',
      },
    ],
    []
  );

  const coursesData = useMemo(
    () => [
      {
        id: 1,
        title: 'Learning How to Learn',
        platform: 'Coursera',
        instructor: 'Dr. Barbara Oakley',
        rating: 4.8,
        students: '3.2M',
        description: 'Powerful mental tools to help you master tough subjects and unlock your full learning potential.',
        url: 'https://www.coursera.org/learn/learning-how-to-learn',
        category: 'Study Skills',
        duration: '4 weeks',
      },
      {
        id: 2,
        title: 'Study Skills for Academic Success',
        platform: 'edX',
        instructor: 'Newcastle University',
        rating: 4.6,
        students: '125K',
        description: 'Develop essential academic skills including note-taking, time management, and exam preparation.',
        url: 'https://www.edx.org/learn/study-skills',
        category: 'Academic',
        duration: '6 weeks',
      },
      {
        id: 3,
        title: 'Mindshift: Break Through Obstacles',
        platform: 'Coursera',
        instructor: 'Dr. Barbara Oakley',
        rating: 4.7,
        students: '890K',
        description: 'Transform your career and learning approach by breaking through mental obstacles and learning barriers.',
        url: 'https://www.coursera.org/learn/mindshift',
        category: 'Personal Growth',
        duration: '4 weeks',
      },
      {
        id: 4,
        title: 'The Science of Well-Being',
        platform: 'Coursera',
        instructor: 'Yale University',
        rating: 4.9,
        students: '4.5M',
        description: 'Increase your happiness and build more productive habits based on the science of psychology.',
        url: 'https://www.coursera.org/learn/the-science-of-well-being',
        category: 'Wellness',
        duration: '10 weeks',
      },
    ],
    []
  );

  const videosData = useMemo(
    () => [
      {
        id: 1,
        title: 'How to Study Effectively: 8 Advanced Tips',
        channel: 'Thomas Frank',
        views: '3.2M',
        duration: '12:34',
        videoId: 'VJbKXmujI00',
        description: 'Evidence-based study techniques that actually work. Learn active recall, spaced repetition, and more.',
        category: 'Study Tips',
      },
      {
        id: 2,
        title: 'Marty Lobdell - Study Less Study Smart',
        channel: 'Pierce College',
        views: '18M',
        duration: '59:56',
        videoId: 'IlU-zDU6aQ0',
        description: 'The legendary lecture on effective studying. Transform your study habits with proven strategies.',
        category: 'Lecture',
      },
      {
        id: 3,
        title: 'Active Recall: The Most Powerful Study Technique',
        channel: 'Ali Abdaal',
        views: '2.1M',
        duration: '8:23',
        videoId: 'ukLnPbIffxE',
        description: 'Why active recall is scientifically proven to be the best way to study and retain information.',
        category: 'Technique',
      },
      {
        id: 4,
        title: 'How I Study For Exams in Medical School',
        channel: 'Med School Insiders',
        views: '1.8M',
        duration: '14:52',
        videoId: 'Xt5qpbiqw2g',
        description: 'Detailed breakdown of high-performance study methods used in medical school and beyond.',
        category: 'Case Study',
      },
      {
        id: 5,
        title: 'The Feynman Technique - Learn Anything Faster',
        channel: 'Productivity Game',
        views: '950K',
        duration: '6:12',
        videoId: '_f-qkGJBPts',
        description: 'Master complex topics by teaching them in simple terms. Named after Nobel Prize winner Richard Feynman.',
        category: 'Technique',
      },
      {
        id: 6,
        title: 'How to Take Notes: The Cornell Method',
        channel: 'Thomas Frank',
        views: '1.5M',
        duration: '5:49',
        videoId: 'lsR-10piMp4',
        description: 'The classic Cornell note-taking system explained. Improve comprehension and retention.',
        category: 'Note-Taking',
      },
    ],
    []
  );

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
      
      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 relative z-10">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest">Neural Study Hub</span>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                AI Enhanced
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-serif font-semibold tracking-tight text-slate-900"
            >
              Exam Preparation <span className="text-indigo-600">Assistant</span>
            </motion.h1>
            <p className="text-slate-500 font-medium text-lg">AI-powered precision tools for academic excellence.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">1.2k Scholars studying now</span>
          </div>
        </header>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl mb-12 w-fit max-w-full overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
            { id: 'quiz', label: 'AI Quiz', icon: Brain },
            { id: 'pdf', label: 'Summarizer', icon: FileText },
            { id: 'resources', label: 'Resources', icon: Library },
            { id: 'planner', label: 'Smart Planner', icon: CalendarDays },
          ].map((tab) => {
            const Icon = tab.icon as any;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : ''}`} />
                <span className="text-sm tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* Stats Bento */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: 'Weekly Quizzes', value: '12', icon: Trophy, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                  { label: 'Avg Accuracy', value: '85%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Study Hours', value: '24h', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
                  { label: 'Performance', value: '+15%', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
                ].map((stat, i) => (
                  <motion.div key={i} variants={itemVariants} className="academic-card p-8 group">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">This Week</span>
                    </div>
                    <p className="text-4xl font-serif font-bold text-slate-900 mb-1">{stat.value}</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Upcoming Exams Section */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="academic-card p-8 !bg-white">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Critical Exam Roadmap
                      </h2>
                      <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
                    </div>

                    <div className="space-y-6">
                      {[
                        { subject: 'Advanced Mathematics', date: 'Dec 25, 2025', days: 7, progress: 65, color: 'bg-indigo-600' },
                        { subject: 'Theoretical Physics', date: 'Dec 28, 2025', days: 10, progress: 45, color: 'bg-amber-600' },
                        { subject: 'Organic Chemistry', date: 'Jan 02, 2026', days: 15, progress: 30, color: 'bg-emerald-600' },
                      ].map((exam, i) => (
                        <div key={i} className="group p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-lg">{exam.subject}</h3>
                              <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5 mt-1">
                                <Clock className="w-3 h-3" />
                                {exam.date} • {exam.days} Days Remaining
                              </p>
                            </div>
                            <span className="text-2xl font-serif font-bold text-slate-900">{exam.progress}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-white rounded-full overflow-hidden p-[2px] border border-slate-200">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${exam.progress}%` }}
                              className={`h-full ${exam.color} rounded-full`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions & Recent Activity */}
                <div className="lg:col-span-5 space-y-8">
                  <div className="academic-card p-8 !bg-white">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Quick AI Generators</h2>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { label: 'Generate Neural Quiz', icon: Brain, color: 'text-indigo-600', bg: 'bg-indigo-50', id: 'quiz' },
                        { label: 'Smart PDF Summary', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-50', id: 'pdf' },
                        { label: 'AI Study Schedule', icon: Target, color: 'text-amber-600', bg: 'bg-amber-50', id: 'planner' },
                      ].map((action, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveTab(action.id as any)}
                          className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all group text-left"
                        >
                          <div className={`w-10 h-10 rounded-xl ${action.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <action.icon className={`w-5 h-5 ${action.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-900">{action.label}</p>
                            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest mt-0.5">Initialize AI Module</p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="academic-card p-8 !bg-indigo-600 text-white">
                    <div className="flex items-center gap-3 mb-6">
                      <Zap className="w-5 h-5 text-indigo-200" />
                      <h2 className="text-xs font-bold text-indigo-200 uppercase tracking-[0.2em]">Study Streak</h2>
                    </div>
                    <p className="text-5xl font-serif font-bold mb-4">7 Days</p>
                    <p className="text-indigo-100/70 text-sm leading-relaxed mb-6">You're in the top 5% of consistent learners this month. Keep the momentum!</p>
                    <div className="flex gap-2">
                      {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                        <div key={i} className="flex-1 h-1.5 rounded-full bg-indigo-400/30 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: i * 0.1 }}
                            className="h-full bg-white" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <Brain className="w-8 h-8 text-indigo-600" />
                      AI Quiz Generator
                    </h2>
                    <p className="text-slate-500 font-medium">Generate academic assessments from your notes or files.</p>
                  </div>
                  
                  <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
                    <button
                      onClick={() => setQuizInputMethod('text')}
                      className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        quizInputMethod === 'text' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Text
                    </button>
                    <button
                      onClick={() => setQuizInputMethod('upload')}
                      className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        quizInputMethod === 'upload' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      File
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {quizInputMethod === 'text' ? (
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neural Input Area</label>
                      <textarea
                        value={textContent}
                        onChange={(e) => setTextContent(e.target.value)}
                        placeholder="Paste lecture notes, textbook segments, or topic details..."
                        className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white transition-all outline-none font-medium text-slate-700 leading-relaxed"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Document Analysis Hub</label>
                      <div className="group border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer relative">
                        <input type="file" onChange={handleFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Upload className="w-10 h-10 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{uploadedFile ? uploadedFile.name : 'Upload Academic Material'}</h3>
                        <p className="text-slate-500 font-medium">Drop PDF, TXT, or DOCX files for AI extraction.</p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Subject Domain</label>
                      <input
                        type="text"
                        value={quizSubject}
                        onChange={(e) => setQuizSubject(e.target.value)}
                        placeholder="e.g., Mathematics, Physics"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Intensity Level</label>
                      <select 
                        value={quizDifficulty}
                        onChange={(e) => setQuizDifficulty(e.target.value as 'easy' | 'medium' | 'hard')}
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                      >
                        <option value="easy">Beginner (Conceptual)</option>
                        <option value="medium">Intermediate (Applied)</option>
                        <option value="hard">Advanced (Rigorous)</option>
                      </select>
                    </div>
                  </div>

                  {quizError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                      <p className="text-sm font-medium text-rose-600">{quizError}</p>
                    </div>
                  )}

                  <button 
                    onClick={handleGenerateQuiz}
                    disabled={isGeneratingQuiz}
                    className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-6 h-6" />
                    {isGeneratingQuiz ? 'Generating Quiz...' : 'Initialize AI Assessment'}
                  </button>

                  {quizQuestions.length > 0 && (
                    <div className="academic-card p-8 !bg-slate-50 border border-slate-100 space-y-6">
                      <h3 className="text-xl font-serif font-bold text-slate-900 mb-4">Generated Quiz</h3>
                      {quizQuestions.map((q, i) => (
                        <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                          <p className="font-bold text-slate-900 mb-4">{i + 1}. {q.question}</p>
                          <div className="space-y-2">
                            {q.options?.map((opt: string, j: number) => (
                              <div key={j} className="p-3 rounded-xl bg-slate-50 text-sm">
                                {String.fromCharCode(65 + j)}. {opt}
                              </div>
                            ))}
                          </div>
                          {q.correctAnswer && (
                            <p className="mt-3 text-sm text-emerald-600 font-medium">Correct: {q.correctAnswer}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'pdf' && (
            <motion.div
              key="pdf"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <FileText className="w-8 h-8 text-emerald-600" />
                      Smart Summarizer
                    </h2>
                    <p className="text-slate-500 font-medium">Summarize your notes (demo) and extract key points.</p>
                  </div>

                  <div className="flex p-1 bg-slate-100 rounded-xl border border-slate-200 w-fit">
                    <button
                      onClick={() => setSummaryInputMethod('text')}
                      className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        summaryInputMethod === 'text' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      Text
                    </button>
                    <button
                      onClick={() => setSummaryInputMethod('upload')}
                      className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        summaryInputMethod === 'upload' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'
                      }`}
                    >
                      File
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {summaryInputMethod === 'text' ? (
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Input Text</label>
                      <textarea
                        value={summaryText}
                        onChange={(e) => setSummaryText(e.target.value)}
                        placeholder="Paste notes or a section of content to summarize…"
                        className="w-full h-64 p-6 bg-slate-50 border-2 border-slate-100 rounded-3xl focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all outline-none font-medium text-slate-700 leading-relaxed"
                      />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Upload File</label>
                      <div className="group border-2 border-dashed border-slate-200 rounded-[2rem] p-16 text-center hover:border-emerald-400 hover:bg-emerald-50/30 transition-all cursor-pointer relative">
                        <input type="file" onChange={handleSummaryFileUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <div className="w-20 h-20 rounded-3xl bg-emerald-50 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                          <Upload className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">
                          {summaryUploadedFile ? summaryUploadedFile.name : 'Upload academic text (TXT/PDF)'}
                        </h3>
                        <p className="text-slate-500 font-medium">Demo mode summarizes pasted text; file upload is UI-ready.</p>
                      </div>
                    </div>
                  )}

                  {summaryError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                      <p className="text-sm font-medium text-rose-600">{summaryError}</p>
                    </div>
                  )}

                  <button
                    onClick={handleSummarizeText}
                    disabled={isSummarizing}
                    className="w-full py-6 bg-emerald-600 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="w-6 h-6" />
                    {isSummarizing ? 'Generating Summary...' : 'Generate Summary'}
                  </button>

                  {summaryResult && (
                    <div className="academic-card p-8 !bg-slate-50 border border-slate-100">
                      <div className="flex items-start justify-between gap-6 mb-6">
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Output</p>
                          <h3 className="text-2xl font-serif font-bold text-slate-900">{summaryResult.title}</h3>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">Summarizer</span>
                      </div>

                      <p className="text-slate-600 font-medium leading-relaxed mb-6">{summaryResult.overview}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-3xl bg-white border border-slate-200">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Key Points</p>
                          <div className="space-y-3">
                            {summaryResult.keyPoints.map((p, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                                </div>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">{p}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white border border-slate-200">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Next Actions</p>
                          <div className="space-y-3">
                            {summaryResult.actionItems.map((p, i) => (
                              <div key={i} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                  <ArrowRight className="w-4 h-4 text-indigo-600" />
                                </div>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed">{p}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Header with Search */}
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <Library className="w-8 h-8 text-indigo-600" />
                      Study Resources
                    </h2>
                    <p className="text-slate-500 font-medium">Books, courses, and videos to accelerate your learning.</p>
                  </div>
                </div>

                {/* Search and Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      value={resourceSearchQuery}
                      onChange={(e) => setResourceSearchQuery(e.target.value)}
                      placeholder="Search books, courses, videos..."
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 focus:bg-white transition-all font-medium text-slate-700"
                    />
                  </div>
                  <div className="flex gap-2 p-1 bg-slate-50 rounded-2xl border border-slate-200 w-fit">
                    {[
                      { id: 'all', label: 'All', icon: Filter },
                      { id: 'books', label: 'Books', icon: BookOpen },
                      { id: 'courses', label: 'Courses', icon: Target },
                      { id: 'videos', label: 'Videos', icon: Youtube },
                    ].map((cat) => {
                      const Icon = cat.icon;
                      const isActive = resourceCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setResourceCategory(cat.id as any)}
                          className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 ${
                            isActive
                              ? 'bg-white text-indigo-600 shadow-sm border border-slate-200 font-bold'
                              : 'text-slate-500 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : ''}`} />
                          <span className="text-sm tracking-tight hidden sm:block">{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Books Section */}
              {(resourceCategory === 'all' || resourceCategory === 'books') && (
                <div className="academic-card p-10 !bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900">Recommended Books</h3>
                        <p className="text-xs text-slate-500 font-medium">Essential reading for academic success</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-widest">
                      {booksData.filter((b) => !resourceSearchQuery || b.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) || b.author.toLowerCase().includes(resourceSearchQuery.toLowerCase())).length} Books
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {booksData
                      .filter((b) => !resourceSearchQuery || b.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) || b.author.toLowerCase().includes(resourceSearchQuery.toLowerCase()))
                      .map((book) => (
                        <a
                          key={book.id}
                          href={book.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group academic-card p-6 !rounded-[1.5rem] bg-white border border-slate-100 hover:border-amber-200 hover:shadow-xl transition-all"
                        >
                          <div className="aspect-[2/3] mb-4 rounded-xl overflow-hidden bg-slate-100 relative">
                            <img
                              src={book.coverUrl}
                              alt={book.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <ExternalLink className="w-4 h-4 text-slate-600" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${i < Math.floor(book.rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-200'}`}
                                />
                              ))}
                              <span className="text-xs font-bold text-slate-600 ml-1">{book.rating}</span>
                            </div>
                            <h4 className="font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2">{book.title}</h4>
                            <p className="text-xs font-medium text-slate-500">{book.author}</p>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{book.description}</p>
                            <div className="pt-2">
                              <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-600 text-[9px] font-bold uppercase tracking-widest">
                                {book.category}
                              </span>
                            </div>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Online Courses Section */}
              {(resourceCategory === 'all' || resourceCategory === 'courses') && (
                <div className="academic-card p-10 !bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <Target className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900">Top Online Courses</h3>
                        <p className="text-xs text-slate-500 font-medium">Best-rated courses from leading platforms</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                      {coursesData.filter((c) => !resourceSearchQuery || c.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) || c.platform.toLowerCase().includes(resourceSearchQuery.toLowerCase())).length} Courses
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {coursesData
                      .filter((c) => !resourceSearchQuery || c.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) || c.platform.toLowerCase().includes(resourceSearchQuery.toLowerCase()))
                      .map((course) => (
                        <a
                          key={course.id}
                          href={course.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group academic-card p-8 !rounded-[2rem] bg-white border border-slate-100 hover:border-indigo-200 transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-widest">
                                  {course.platform}
                                </span>
                                <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-500 text-[9px] font-bold uppercase tracking-widest">
                                  {course.duration}
                                </span>
                              </div>
                              <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{course.title}</h4>
                              <p className="text-xs font-medium text-slate-500 mb-1">{course.instructor}</p>
                            </div>
                            <ExternalLink className="w-5 h-5 text-slate-300 group-hover:text-indigo-600 transition-colors shrink-0" />
                          </div>

                          <p className="text-sm text-slate-600 leading-relaxed mb-4">{course.description}</p>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${i < Math.floor(course.rating) ? 'text-indigo-500 fill-indigo-500' : 'text-slate-200'}`}
                                  />
                                ))}
                                <span className="text-xs font-bold text-slate-700 ml-1">{course.rating}</span>
                              </div>
                              <div className="text-xs font-medium text-slate-400">
                                {course.students} students
                              </div>
                            </div>
                            <span className="px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-[9px] font-bold uppercase tracking-widest">
                              {course.category}
                            </span>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* YouTube Videos Section */}
              {(resourceCategory === 'all' || resourceCategory === 'videos') && (
                <div className="academic-card p-10 !bg-white">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                        <Youtube className="w-5 h-5 text-rose-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-serif font-bold text-slate-900">Top Study Videos</h3>
                        <p className="text-xs text-slate-500 font-medium">Most helpful YouTube content for students</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-600 text-[10px] font-bold uppercase tracking-widest">
                      {videosData.filter((v) => !resourceSearchQuery || v.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) || v.channel.toLowerCase().includes(resourceSearchQuery.toLowerCase())).length} Videos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videosData
                      .filter((v) => !resourceSearchQuery || v.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) || v.channel.toLowerCase().includes(resourceSearchQuery.toLowerCase()))
                      .map((video) => (
                        <a
                          key={video.id}
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group academic-card !rounded-[1.5rem] overflow-hidden bg-white border border-slate-100 hover:border-rose-200 hover:shadow-xl transition-all"
                        >
                          <div className="relative aspect-video bg-slate-100 overflow-hidden">
                            <img
                              src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                              alt={video.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-rose-600/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110">
                              <PlayCircle className="w-8 h-8 text-white fill-white" />
                            </div>
                            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-6 space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 text-[9px] font-bold uppercase tracking-widest">
                                {video.category}
                              </span>
                              <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-rose-600 transition-colors" />
                            </div>
                            <h4 className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors line-clamp-2 leading-snug">
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                              <Youtube className="w-3.5 h-3.5" />
                              {video.channel}
                            </div>
                            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{video.description}</p>
                            <div className="pt-2 flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              <PlayCircle className="w-3 h-3" />
                              {video.views} views
                            </div>
                          </div>
                        </a>
                      ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'planner' && (
            <motion.div
              key="planner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Column: Schedule & Planner */}
              <div className="lg:col-span-8 space-y-10">
                <div className="academic-card p-10 !bg-white">
                  <div className="flex items-center justify-between mb-12">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                        <CalendarDays className="w-8 h-8 text-indigo-600" />
                        Neural Study Schedule
                      </h2>
                      <p className="text-slate-500 font-medium text-lg">AI-optimized time allocation for maximum retention.</p>
                    </div>
                    <button 
                      onClick={() => setShowPersonalDataForm(!showPersonalDataForm)}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all text-slate-600 hover:text-indigo-600"
                    >
                      <Settings className="w-6 h-6" />
                    </button>
                  </div>

                  <AnimatePresence>
                    {showPersonalDataForm && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-10 p-8 rounded-[2rem] bg-slate-50 border border-slate-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Customization</p>
                            <h3 className="text-2xl font-serif font-bold text-slate-900">Smart Scheduling Inputs</h3>
                            <p className="text-slate-500 font-medium">Update preferences and regenerate today’s plan.</p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => {
                                setPersonalDataDraft(personalData);
                                setShowPersonalDataForm(false);
                              }}
                              className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-all"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                setPersonalData(personalDataDraft);
                                setScheduleSeed((s) => s + 1);
                                setShowPersonalDataForm(false);
                              }}
                              className="px-6 py-3 rounded-2xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all"
                            >
                              Save
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Available Hours / Day</label>
                            <input
                              type="number"
                              min={1}
                              max={12}
                              value={personalDataDraft.availableHoursPerDay}
                              onChange={(e) =>
                                setPersonalDataDraft((p) => ({ ...p, availableHoursPerDay: Number(e.target.value || 1) }))
                              }
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sessions / Day</label>
                            <input
                              type="number"
                              min={1}
                              max={8}
                              value={personalDataDraft.sessionsPerDay}
                              onChange={(e) =>
                                setPersonalDataDraft((p) => ({ ...p, sessionsPerDay: Number(e.target.value || 1) }))
                              }
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                            />
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Preferred Study Time</label>
                            <select
                              value={personalDataDraft.preferredStudyTime}
                              onChange={(e) => setPersonalDataDraft((p) => ({ ...p, preferredStudyTime: e.target.value }))}
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                            >
                              <option value="morning">Morning</option>
                              <option value="afternoon">Afternoon</option>
                              <option value="evening">Evening</option>
                            </select>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Learning Style</label>
                            <select
                              value={personalDataDraft.learningStyle}
                              onChange={(e) => setPersonalDataDraft((p) => ({ ...p, learningStyle: e.target.value }))}
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                            >
                              <option value="visual">Visual</option>
                              <option value="auditory">Auditory</option>
                              <option value="reading">Reading/Writing</option>
                              <option value="kinesthetic">Kinesthetic</option>
                            </select>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Difficulty Level</label>
                            <select
                              value={personalDataDraft.difficultyLevel}
                              onChange={(e) => setPersonalDataDraft((p) => ({ ...p, difficultyLevel: e.target.value }))}
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>

                          <div className="space-y-3">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Break Duration (minutes)</label>
                            <input
                              type="number"
                              min={0}
                              max={30}
                              value={personalDataDraft.breakDuration}
                              onChange={(e) =>
                                setPersonalDataDraft((p) => ({ ...p, breakDuration: Number(e.target.value || 0) }))
                              }
                              className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500/30 font-bold text-slate-700"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-7 gap-4 mb-12">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                      <div key={day} className={`text-center p-6 rounded-3xl border-2 transition-all cursor-pointer ${
                        idx === 2 ? 'bg-indigo-50 border-indigo-600' : 'bg-slate-50 border-transparent hover:border-slate-200'
                      }`}>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${idx === 2 ? 'text-indigo-600' : 'text-slate-400'}`}>{day}</p>
                        <p className={`text-2xl font-serif font-bold ${idx === 2 ? 'text-indigo-900' : 'text-slate-900'}`}>{15 + idx}</p>
                        <div className={`mt-3 mx-auto w-1.5 h-1.5 rounded-full ${idx === 2 ? 'bg-indigo-600' : 'bg-slate-300'}`} />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Today's Optimized Path</h3>
                    {studyPlan.map((task, i) => (
                      <div key={i} className={`flex items-center gap-6 p-6 rounded-3xl border-l-8 transition-all hover:-translate-x-1 ${task.accent}`}>
                        <div className="w-24 text-sm font-bold text-slate-400">{task.time}</div>
                        <div className="flex-1">
                          <h4 className="font-bold text-slate-900 text-lg">{task.subject}</h4>
                          <p className="text-sm font-medium text-slate-500">{task.topic}</p>
                        </div>
                        {task.status === 'completed' && <CheckCircle className="w-6 h-6 text-emerald-500" />}
                        {task.status === 'in-progress' && <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center animate-pulse"><Play className="w-4 h-4 text-indigo-600 fill-indigo-600" /></div>}
                        {task.status === 'pending' && <button className="px-6 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold uppercase tracking-widest text-slate-600 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all">Launch</button>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Pomodoro & Insights */}
              <div className="lg:col-span-4 space-y-10">
                <div className="academic-card p-10 !bg-slate-900 text-white relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="flex items-center gap-3 mb-8">
                      <Timer className="w-5 h-5 text-indigo-400" />
                      <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-[0.2em]">Neural Focus Engine</h2>
                    </div>
                    
                    <div className="text-7xl font-serif font-bold tracking-tighter mb-8 tabular-nums">
                      {Math.floor(pomodoroTime / 60).toString().padStart(2, '0')}:
                      {(pomodoroTime % 60).toString().padStart(2, '0')}
                    </div>

                    <div className="flex gap-4 w-full mb-8">
                      <button 
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className={`flex-1 py-4 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${
                          isTimerRunning ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-xl shadow-indigo-500/20'
                        }`}
                      >
                        {isTimerRunning ? 'System Pause' : 'Initialize Focus'}
                      </button>
                      <button
                        onClick={() => {
                          setIsTimerRunning(false);
                          setPomodoroTime(25 * 60);
                        }}
                        className="p-4 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-center gap-3 w-full">
                      {[25, 15, 5].map((t) => (
                        <button 
                          key={t}
                          onClick={() => setPomodoroTime(t * 60)}
                          className="flex-1 py-3 rounded-xl bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all border border-white/10"
                        >
                          {t}m
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="academic-card p-8 !bg-white">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Personalized Insights</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                        <Lightbulb className="w-5 h-5 text-amber-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">Peak Focus Detected</p>
                        <p className="text-xs text-slate-500 leading-relaxed">Your preference is set to <span className="font-bold text-slate-700">{personalData.preferredStudyTime}</span>. The plan starts accordingly.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">Visual Learning Style</p>
                        <p className="text-xs text-slate-500 leading-relaxed">Your learning style is <span className="font-bold text-slate-700">{personalData.learningStyle}</span>. Sessions include matching prompts.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Decorations */}
      <div className="absolute top-[10%] -left-[5%] w-[30%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-amber-200/20 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}

const LayoutDashboard = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
);

const CalendarDays = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
);

const Library = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/><path d="M2 20h20"/></svg>
);
