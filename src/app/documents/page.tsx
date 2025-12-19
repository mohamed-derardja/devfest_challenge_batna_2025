'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import DocumentChatbot from '../components/DocumentChatbot';
import { motion, AnimatePresence } from 'framer-motion';
import { documentsAPI } from '@/lib/api';
import { 
  FileSearch, 
  Search, 
  BookOpen, 
  Briefcase, 
  GraduationCap,
  MapPin,
  Calendar,
  DollarSign,
  User,
  Download,
  ExternalLink,
  Filter,
  TrendingUp,
  Award,
  Building,
  Brain,
  Clock,
  Sparkles,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Globe
} from 'lucide-react';

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'documents' | 'internships' | 'scholarships'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState('');

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

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchError('');
    
    try {
      const result = await documentsAPI.searchWithAI(searchQuery);
      setSearchResults(result);
    } catch (error: any) {
      setSearchError(error.message || 'Search failed. Please try again.');
      console.error('AI Search Error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      <div className="ivy-mesh" />
      <div className="grain" />
      <Navbar />
      <TopBar />
      <DocumentChatbot />
      
      <main className="max-w-[1700px] px-6 lg:px-10 lg:pl-[300px] py-12 relative z-10">
        {/* Header */}
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-widest">Global Opportunity Hub</span>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                AI Matched
              </span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl font-serif font-semibold tracking-tight text-slate-900"
            >
              Document & <span className="text-emerald-600">Opportunity</span>
            </motion.h1>
            <p className="text-slate-500 font-medium text-lg">AI-powered portal for academic resources and global careers.</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Active Opportunities</p>
              <p className="text-2xl font-serif font-bold text-slate-900">2,482</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </header>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-1 p-1 bg-white/50 backdrop-blur-md border border-slate-200 rounded-2xl mb-12 w-fit max-w-full overflow-x-auto">
          {[
            { id: 'search', label: 'AI Search', icon: Brain },
            { id: 'documents', label: 'Library', icon: BookOpen },
            { id: 'internships', label: 'Internships', icon: Briefcase },
            { id: 'scholarships', label: 'Scholarships', icon: GraduationCap },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-white text-emerald-600 shadow-sm border border-slate-200 font-bold'
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : ''}`} />
                <span className="text-sm tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </nav>

        <AnimatePresence mode="wait">
          {activeTab === 'search' && (
            <motion.div
              key="search"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              <div className="academic-card p-12 !bg-white group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-4xl font-serif font-bold text-slate-900">Neural Search <span className="text-emerald-600">Assistant</span></h2>
                    <p className="text-slate-500 font-medium text-lg">Query the entire academic database with natural language.</p>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                    <textarea
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAISearch())}
                      placeholder="Ask anything... e.g., 'Find internships in AI for summer 2026'"
                      className="w-full pl-16 pr-6 py-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:border-emerald-500/30 focus:ring-4 focus:ring-emerald-500/5 focus:bg-white transition-all outline-none font-medium text-slate-700 text-lg shadow-sm resize-none"
                      rows={2}
                    />
                    <button 
                      onClick={handleAISearch}
                      disabled={isSearching || !searchQuery.trim()}
                      className="absolute right-4 bottom-4 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-200 hover:bg-emerald-700 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearching ? 'Searching...' : 'Search AI'}
                    </button>
                  </div>

                  {searchError && (
                    <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm font-medium">
                      {searchError}
                    </div>
                  )}

                  {searchResults && (
                    <div className="p-6 bg-white border border-emerald-200 rounded-3xl">
                      <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-600" />
                        AI Search Results
                      </h3>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line">{searchResults.summary || searchResults.answer || JSON.stringify(searchResults, null, 2)}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                    {[
                      { label: 'Academic Books', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                      { label: 'Global Internships', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                      { label: 'Scholarship Grants', icon: GraduationCap, color: 'text-amber-600', bg: 'bg-amber-50' },
                    ].map((item, i) => (
                      <button key={i} className="flex items-center gap-3 p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-emerald-200 hover:shadow-md transition-all text-left">
                        <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                          <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8">
                  <div className="academic-card p-10 !bg-white h-full">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">System Response Engine</h2>
                    <div className="space-y-8">
                      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 border-l-4 border-l-emerald-500">
                        <p className="text-sm font-bold text-slate-900 mb-2">Example Insight:</p>
                        <p className="text-slate-600 leading-relaxed font-medium italic">"Analysis of 482 global tech firms reveals a 30% increase in remote-first AI internships for the 2026 cycle. Your profile matches 12 high-tier opportunities."</p>
                      </div>

                      <div className="space-y-6">
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 text-emerald-500" />
                          Recommended For You
                        </h3>
                        <div className="space-y-4">
                          {[
                            { title: 'Advanced Neural Systems Lab', provider: 'Global Tech DZ', type: 'Internship', match: 98 },
                            { title: 'STEM Excellence Grant', provider: 'Ministry of Higher Ed', type: 'Scholarship', match: 95 },
                          ].map((rec, i) => (
                            <div key={i} className="flex items-center justify-between p-6 rounded-3xl border border-slate-100 hover:border-emerald-200 transition-all group">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <Sparkles className="w-6 h-6 text-emerald-600" />
                                </div>
                                <div>
                                  <h4 className="font-bold text-slate-900">{rec.title}</h4>
                                  <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">{rec.provider} • {rec.type}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-serif font-bold text-emerald-600">{rec.match}%</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Match</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="academic-card p-8 !bg-emerald-600 text-white group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold mb-2">Resume AI Optimizer</h3>
                      <p className="text-emerald-100 text-sm leading-relaxed mb-6">Let our neural engine align your academic profile with industry standards.</p>
                      <button className="w-full py-3 bg-white text-emerald-700 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-50 transition-colors">Initialize Analysis</button>
                    </div>
                  </div>

                  <div className="academic-card p-8 !bg-white">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8">Resource Stats</h2>
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-600">Search Velocity</span>
                        <span className="text-emerald-600 font-bold">12 ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-600">Neural Confidence</span>
                        <span className="text-emerald-600 font-bold">99.4%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'documents' && (
            <motion.div
              key="documents"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <BookOpen className="w-8 h-8 text-indigo-600" />
                      Academic Archive
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">Centralized library of books, research papers, and lecture notes.</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Filter archives..." 
                        className="bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 transition-all w-64"
                      />
                    </div>
                    <button className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all text-slate-600">
                      <Filter className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'Neural Networks & Deep Learning', author: 'Ian Goodfellow', type: 'Textbook', status: 'Available', color: 'bg-indigo-600' },
                    { title: 'Advanced Calculus Theory', author: 'James Stewart', type: 'Textbook', status: 'Borrowed', color: 'bg-amber-600' },
                    { title: 'Quantum Mechanics Lab', author: 'Physics Dept.', type: 'Manual', status: 'Available', color: 'bg-emerald-600' },
                    { title: 'Distributed Systems 2025', author: 'Andrew Tanenbaum', type: 'Research', status: 'Available', color: 'bg-rose-600' },
                  ].map((doc, i) => (
                    <div key={i} className="group p-6 rounded-[2rem] bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                      <div className="w-12 h-16 rounded-lg bg-white border border-slate-200 shadow-sm mb-6 flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${doc.color}`} />
                        <FileSearch className="w-6 h-6 text-slate-300" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">{doc.title}</h3>
                      <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mb-6">{doc.author}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200/60">
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                          doc.status === 'Available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                        }`}>
                          {doc.status}
                        </span>
                        <button className="text-indigo-600 text-xs font-bold hover:underline flex items-center gap-1.5">
                          Reserve <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'internships' && (
            <motion.div
              key="internships"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <Briefcase className="w-8 h-8 text-emerald-600" />
                      Global Internships
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">Industry partnerships and career-launching opportunities.</p>
                  </div>
                  <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Trending Roles
                  </button>
                </div>

                <div className="space-y-6">
                  {[
                    { company: 'Tech Solutions DZ', role: 'Machine Learning Engineer Intern', loc: 'Algiers, Algeria', stipend: '45,000 DA', tags: ['Python', 'PyTorch'], match: 98 },
                    { company: 'CloudScale Global', role: 'Full Stack Development Intern', loc: 'Remote', stipend: '30,000 DA', tags: ['React', 'Node.js'], match: 92 },
                    { company: 'Innovation Hub', role: 'Cybersecurity Analyst Intern', loc: 'Oran, Algeria', stipend: '35,000 DA', tags: ['Security', 'Linux'], match: 85 },
                  ].map((job, i) => (
                    <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-300 transition-all">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="flex items-start gap-6">
                          <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200 flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
                            <Building className="w-8 h-8 text-slate-300 group-hover:text-emerald-600 transition-colors" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-widest">High Match</span>
                            </div>
                            <p className="font-bold text-slate-500 mb-4">{job.company} • {job.loc}</p>
                            <div className="flex flex-wrap gap-2">
                              {job.tags.map(tag => (
                                <span key={tag} className="px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-[10px] font-bold text-slate-600 uppercase tracking-widest">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 shrink-0">
                          <div className="text-center lg:text-right">
                            <p className="text-2xl font-serif font-bold text-slate-900">{job.stipend}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Stipend</p>
                          </div>
                          <button className="px-10 py-4 bg-emerald-600 text-white rounded-[1.5rem] font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 hover:-translate-y-1 transition-all">Apply Profile</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'scholarships' && (
            <motion.div
              key="scholarships"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10"
            >
              <div className="academic-card p-10 !bg-white">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                  <div className="space-y-2">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 flex items-center gap-3">
                      <GraduationCap className="w-8 h-8 text-amber-600" />
                      Elite Scholarships
                    </h2>
                    <p className="text-slate-500 font-medium text-lg">Financial support for academic high-achievers.</p>
                  </div>
                  <div className="px-6 py-3 rounded-2xl bg-amber-50 border border-amber-100 flex items-center gap-3">
                    <Award className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">DEAN'S LIST ELIGIBLE</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { name: 'National STEM Excellence Grant', provider: 'Ministry of Education', amount: '120,000 DA', deadline: 'Jan 20, 2026', match: 98 },
                    { name: 'Global Tech Innovation Fund', provider: 'Private Endowment', amount: '250,000 DA', deadline: 'Feb 15, 2026', match: 92 },
                    { name: 'Women in Science Scholarship', provider: 'Tech Women DZ', amount: '80,000 DA', deadline: 'Dec 30, 2025', match: 85 },
                    { name: 'Postgrad Research Fellowship', provider: 'University Council', amount: '150,000 DA', deadline: 'Mar 10, 2026', match: 80 },
                  ].map((grant, i) => (
                    <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-amber-300 transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 blur-3xl pointer-events-none" />
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <DollarSign className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-serif font-bold text-slate-900">{grant.amount}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Grant Value</p>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{grant.name}</h3>
                      <p className="text-sm font-bold text-slate-500 mb-8">{grant.provider}</p>
                      
                      <div className="flex items-center justify-between pt-6 border-t border-slate-200/60">
                        <div className="flex items-center gap-2 text-rose-600">
                          <Calendar className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">Ends in 24 days</span>
                        </div>
                        <button className="flex items-center gap-2 text-amber-600 text-xs font-bold hover:underline">
                          View Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Decorations */}
      <div className="absolute top-[10%] -left-[5%] w-[30%] h-[40%] bg-emerald-200/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] -right-[5%] w-[30%] h-[40%] bg-indigo-200/20 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
