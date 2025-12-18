'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Package, 
  Search, 
  Plus,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Phone,
  Mail,
  Camera,
  Shield,
  TrendingUp,
  Eye,
  MessageSquare,
  Send,
  X,
  Lock,
  CheckCircle2,
  ArrowRight,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lost' | 'found' | 'post' | 'heatmap'>('dashboard');
  const [postType, setPostType] = useState<'lost' | 'found'>('lost');
  
  // Messaging System
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  
  // Verification System
  const [showVerification, setShowVerification] = useState(false);
  const [verificationAnswers, setVerificationAnswers] = useState<any>({});
  
  // Status Tracking
  const [showStatusTimeline, setShowStatusTimeline] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-8 h-8 text-orange-600" />
            Lost & Found
          </h1>
          <p className="text-gray-600 mt-2">AI-powered matching system for lost and found items</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'dashboard'
                  ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'lost'
                  ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Lost Items
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'found'
                  ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Found Items
            </button>
            <button
              onClick={() => setActiveTab('post')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'post'
                  ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Post Item
            </button>
            <button
              onClick={() => setActiveTab('heatmap')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'heatmap'
                  ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Heatmap
            </button>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Dashboard Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 rounded-3xl p-8 shadow-2xl">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl -top-10 -left-10 animate-blob"></div>
                <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl -bottom-10 -right-10 animate-blob animation-delay-2000"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2">Lost & Found Dashboard</h2>
                <p className="text-white/90 text-lg">AI-powered item matching system for University Batna 2</p>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-black text-white">34</div>
                    <div className="text-xs text-white/80 font-medium">Active Lost Reports</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-black text-white">28</div>
                    <div className="text-xs text-white/80 font-medium">Items Waiting Owner</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-black text-white">12</div>
                    <div className="text-xs text-white/80 font-medium">AI Matches Found</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-3xl font-black text-white">156</div>
                    <div className="text-xs text-white/80 font-medium">Returned This Year</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats - Enhanced */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-pink-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                      <AlertCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">Active</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Lost Items</h3>
                  <p className="text-4xl font-black text-gray-900 mb-2">34</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 h-1.5 rounded-full" style={{width: '68%'}}></div>
                    </div>
                    <span className="font-semibold">68%</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-semibold">↓ 12% from last week</p>
                </div>
              </div>
              
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500 to-emerald-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">Waiting</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Found Items</h3>
                  <p className="text-4xl font-black text-gray-900 mb-2">28</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{width: '56%'}}></div>
                    </div>
                    <span className="font-semibold">56%</span>
                  </div>
                  <p className="text-xs text-green-600 mt-2 font-semibold">↑ 8% from last week</p>
                </div>
              </div>
              
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">AI</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">AI Matches</h3>
                  <p className="text-4xl font-black text-gray-900 mb-2">12</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full" style={{width: '85%'}}></div>
                    </div>
                    <span className="font-semibold">85%</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-2 font-semibold">Very High Accuracy</p>
                </div>
              </div>
              
              <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-orange-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-yellow-500 opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>
                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">Success</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-1">Returned</h3>
                  <p className="text-4xl font-black text-gray-900 mb-2">156</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-1.5 rounded-full" style={{width: '92%'}}></div>
                    </div>
                    <span className="font-semibold">92%</span>
                  </div>
                  <p className="text-xs text-orange-600 mt-2 font-semibold">This semester</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => { setPostType('lost'); setActiveTab('post'); }}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-left overflow-hidden border-2 border-red-200 hover:border-red-400"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-500 to-pink-500 opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-red-500/30">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">I Lost Something</h3>
                  <p className="text-gray-600 mb-4">Report a lost item and let AI find matches instantly with our smart matching system</p>
                  <div className="flex items-center text-red-600 font-semibold group-hover:gap-2 transition-all">
                    Get Started
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => { setPostType('found'); setActiveTab('post'); }}
                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 text-left overflow-hidden border-2 border-green-200 hover:border-green-400"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500 to-emerald-500 opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-green-500/30">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">I Found Something</h3>
                  <p className="text-gray-600 mb-4">Post a found item to help someone recover it and make their day better</p>
                  <div className="flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                    Help Someone
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>

            {/* AI Matches */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Suggested Matches</h2>
                      <p className="text-sm text-white/80">Smart matching with 95% accuracy</p>
                    </div>
                  </div>
                  <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold text-white border border-white/30">
                    12 Matches
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-4">
                {[
                  {
                    lost: { item: 'Black Laptop', reporter: 'Ahmed K.', location: 'Library 3rd Floor', date: 'Dec 15, 2025' },
                    found: { item: 'Black HP Laptop', reporter: 'Sarah M.', location: 'Library Study Room', date: 'Dec 15, 2025' },
                    match: 95,
                    confidence: 'Very High'
                  },
                  {
                    lost: { item: 'Red Water Bottle', reporter: 'Karim B.', location: 'Cafeteria', date: 'Dec 14, 2025' },
                    found: { item: 'Red Thermos', reporter: 'Amina L.', location: 'Near Cafeteria', date: 'Dec 14, 2025' },
                    match: 85,
                    confidence: 'High'
                  },
                ].map((match, idx) => (
                  <div key={idx} className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-300 p-5 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl ${match.match >= 90 ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white'}`}>
                            {match.match}%
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-gray-200">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${match.match >= 90 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                            {match.confidence} Confidence
                          </span>
                          <p className="text-xs text-gray-500 mt-1">AI Powered Match</p>
                        </div>
                      </div>
                      <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 font-semibold text-sm group-hover:scale-105">
                        Connect Users
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-4 border-2 border-red-200">
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">Lost</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                            <AlertCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-red-900">Reported Lost</span>
                        </div>
                        <p className="font-bold text-lg text-gray-900 mb-1">{match.lost.item}</p>
                        <p className="text-sm text-gray-600 mb-2">By {match.lost.reporter}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{match.lost.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{match.lost.date}</span>
                        </div>
                      </div>
                      <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-full">Found</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                          <span className="text-sm font-bold text-green-900">Reported Found</span>
                        </div>
                        <p className="font-bold text-lg text-gray-900 mb-1">{match.found.item}</p>
                        <p className="text-sm text-gray-600 mb-2">By {match.found.reporter}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <MapPin className="w-3 h-3" />
                          <span>{match.found.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3" />
                          <span>{match.found.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <Clock className="w-6 h-6 text-purple-600" />
                      Recent Activity
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">Latest updates and actions</p>
                  </div>
                  <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold text-gray-700">
                    View All
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-3">
                {[
                  { action: 'Item Returned', item: 'Blue Water Bottle', time: '2 hours ago', type: 'success', icon: CheckCircle },
                  { action: 'New Found Item', item: 'Student ID Card', time: '4 hours ago', type: 'info', icon: Package },
                  { action: 'New Lost Report', item: 'Black Backpack', time: '6 hours ago', type: 'warning', icon: AlertCircle },
                ].map((activity, idx) => {
                  const Icon = activity.icon;
                  return (
                    <div key={idx} className="group flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        activity.type === 'success' ? 'bg-gradient-to-br from-green-500 to-emerald-500' :
                        activity.type === 'info' ? 'bg-gradient-to-br from-blue-500 to-purple-500' :
                        'bg-gradient-to-br from-yellow-500 to-orange-500'
                      } shadow-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{activity.action}</h4>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Lost Items Tab */}
        {activeTab === 'lost' && (
          <div className="space-y-6">
            {/* Search Bar with Filters */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search lost items by keyword..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Documents</option>
                  <option>Accessories</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option>All Locations</option>
                  <option>Library</option>
                  <option>Cafeteria</option>
                  <option>Classroom</option>
                  <option>Parking</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    Lost Items Registry
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">12 items reported • 3 matched with found items</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Filter
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Sort
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    item: 'Black HP Laptop',
                    category: 'Electronics',
                    description: 'HP EliteBook with university sticker',
                    location: 'Library 3rd Floor',
                    date: 'Dec 15, 2025',
                    reporter: 'Ahmed K.',
                    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop',
                    color: 'Black',
                    status: 'Active',
                    matches: 1
                  },
                  {
                    item: 'Student ID Card',
                    category: 'Documents',
                    description: 'Card ID #CS2023-456',
                    location: 'Cafeteria',
                    date: 'Dec 14, 2025',
                    reporter: 'Anonymous',
                    image: 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=800&h=600&fit=crop',
                    color: 'White/Blue',
                    status: 'Active',
                    matches: 0
                  },
                  {
                    item: 'Black Backpack',
                    category: 'Accessories',
                    description: 'Nike backpack with books inside',
                    location: 'Sports Complex',
                    date: 'Dec 13, 2025',
                    reporter: 'Karim B.',
                    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=600&fit=crop',
                    color: 'Black',
                    status: 'Active',
                    matches: 2
                  },
                  {
                    item: 'Red Water Bottle',
                    category: 'Accessories',
                    description: 'Thermos brand, metal',
                    location: 'Cafeteria',
                    date: 'Dec 14, 2025',
                    reporter: 'Sarah M.',
                    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop',
                    color: 'Red',
                    status: 'Matched',
                    matches: 1
                  },
                  {
                    item: 'Blue Headphones',
                    category: 'Electronics',
                    description: 'Sony WH-1000XM4 wireless headphones',
                    location: 'Computer Lab A',
                    date: 'Dec 12, 2025',
                    reporter: 'Yasmine H.',
                    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
                    color: 'Blue',
                    status: 'Active',
                    matches: 1
                  },
                  {
                    item: 'Chemistry Textbook',
                    category: 'Books',
                    description: 'Organic Chemistry 3rd Edition with notes',
                    location: 'Classroom 204',
                    date: 'Dec 11, 2025',
                    reporter: 'Mohamed R.',
                    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&h=600&fit=crop',
                    color: 'Green',
                    status: 'Active',
                    matches: 0
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group relative bg-white rounded-2xl border border-gray-200 hover:border-red-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.item}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${
                          item.status === 'Matched' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {item.status === 'Matched' ? 'Matched' : 'Lost'}
                        </span>
                      </div>
                    </div>

                    {/* Item Content */}
                    <div className="p-5">
                      {/* Item Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          item.category === 'Electronics' ? 'bg-blue-100' :
                          item.category === 'Documents' ? 'bg-purple-100' :
                          item.category === 'Books' ? 'bg-green-100' :
                          'bg-orange-100'
                        }`}>
                          {item.category === 'Electronics' ? '💻' :
                           item.category === 'Documents' ? '🆔' :
                           item.category === 'Books' ? '📚' :
                           '🎒'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600 transition-colors">{item.item}</h3>
                          <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="space-y-2 mb-4 text-sm border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{item.location}</span>
                        </div>
                      </div>

                    {/* Matches Indicator */}
                    {item.matches > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2.5 mb-3">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-blue-600" />
                          <span className="text-xs font-semibold text-blue-900">
                            {item.matches} Potential Match{item.matches > 1 ? 'es' : ''}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-2">
                      <button 
                        onClick={() => {
                          setSelectedItem(item);
                          setShowStatusTimeline(true);
                        }}
                        className="w-full px-4 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
                      >
                        View Status
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => {
                            setSelectedItem(item);
                            setShowMessaging(true);
                          }}
                          className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Message
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedItem(item);
                            setShowVerification(true);
                          }}
                          className="px-4 py-2 bg-green-50 text-green-700 text-sm font-semibold rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                        >
                          <Shield className="w-4 h-4" />
                          Verify
                        </button>
                      </div>
                    </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Found Items Tab */}
        {activeTab === 'found' && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by type, color, or location..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  AI Match
                </button>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Clothing</option>
                  <option>Documents</option>
                  <option>Accessories</option>
                </select>
                <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500">
                  <option>All Locations</option>
                  <option>Library</option>
                  <option>Cafeteria</option>
                  <option>Classroom</option>
                  <option>Parking</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Recently Found Items
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">8 items</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Filter
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                    Sort
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[
                  {
                    item: 'Laptop',
                    category: 'Electronics',
                    description: 'MacBook Pro 14-inch...',
                    location: 'Library',
                    date: 'Dec 15, 2025',
                    finder: 'Sarah M.',
                    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
                    color: 'Black',
                    status: 'Available',
                    matches: 1
                  },
                  {
                    item: 'Student Card',
                    category: 'Documents',
                    description: 'University ID card with...',
                    location: 'Library',
                    date: 'Dec 14, 2025',
                    finder: 'Security Office',
                    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
                    color: 'Blue',
                    status: 'Available',
                    matches: 0
                  },
                  {
                    item: 'Keys',
                    category: 'Accessories',
                    description: 'Car keys with university...',
                    location: 'Cafeteria',
                    date: 'Dec 15, 2025',
                    finder: 'Amina L.',
                    image: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800&h=600&fit=crop',
                    color: 'Silver',
                    status: 'Available',
                    matches: 0
                  },
                  {
                    item: 'Red Thermos',
                    category: 'Accessories',
                    description: 'Metal thermos bottle',
                    location: 'Near Cafeteria',
                    date: 'Dec 14, 2025',
                    finder: 'Youcef K.',
                    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&h=600&fit=crop',
                    color: 'Red',
                    status: 'Matched',
                    matches: 1
                  },
                  {
                    item: 'Smartphone',
                    category: 'Electronics',
                    description: 'iPhone 13 Pro with blue case',
                    location: 'Computer Lab B',
                    date: 'Dec 13, 2025',
                    finder: 'IT Staff',
                    image: '📱',
                    color: 'Blue/Black',
                    status: 'Available',
                    matches: 0
                  },
                  {
                    item: 'Wallet',
                    category: 'Accessories',
                    description: 'Brown leather wallet with ID inside',
                    location: 'Parking Lot C',
                    date: 'Dec 12, 2025',
                    finder: 'Ahmed K.',
                    image: '👛',
                    color: 'Brown',
                    status: 'Available',
                    matches: 1
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group relative bg-white rounded-2xl border border-gray-200 hover:border-green-300 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Item Image */}
                    <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                      <img 
                        src={item.image} 
                        alt={item.item}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1.5 rounded-full text-xs font-bold shadow-lg bg-emerald-500 text-white">
                          Found
                        </span>
                      </div>
                    </div>

                    {/* Item Content */}
                    <div className="p-5">
                      {/* Item Header */}
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          item.category === 'Electronics' ? 'bg-blue-100' :
                          item.category === 'Documents' ? 'bg-purple-100' :
                          'bg-orange-100'
                        }`}>
                          {item.category === 'Electronics' ? '💻' :
                           item.category === 'Documents' ? '🆔' :
                           '🔑'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-600 transition-colors">{item.item}</h3>
                          <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                        </div>
                      </div>

                      {/* Item Details */}
                      <div className="space-y-2 mb-4 text-sm border-t border-gray-100 pt-3">
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{item.location}</span>
                        </div>
                      </div>

                      {/* Matches Indicator */}
                      {item.matches > 0 && (
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-2.5 mb-3">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                            <span className="text-xs font-semibold text-orange-900">
                              {item.matches} Potential Match{item.matches > 1 ? 'es' : ''}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-2">
                        <button 
                          onClick={() => {
                            setSelectedItem(item);
                            setShowVerification(true);
                          }}
                          className="w-full px-4 py-2.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                        >
                          Claim Item
                        </button>
                        <div className="grid grid-cols-2 gap-2">
                          <button 
                            onClick={() => {
                              setSelectedItem(item);
                              setShowMessaging(true);
                            }}
                            className="px-4 py-2 bg-blue-50 text-blue-700 text-sm font-semibold rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Chat
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedItem(item);
                              setShowStatusTimeline(true);
                            }}
                            className="px-4 py-2 bg-purple-50 text-purple-700 text-sm font-semibold rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-center gap-2"
                          >
                            <Clock className="w-4 h-4" />
                            Track
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Post Item Tab */}
        {activeTab === 'post' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Post an Item</h2>
              
              {/* Type Selection */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  onClick={() => setPostType('lost')}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    postType === 'lost'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <AlertCircle className={`w-8 h-8 mx-auto mb-2 ${postType === 'lost' ? 'text-red-600' : 'text-gray-400'}`} />
                  <h3 className="font-bold text-gray-900">I Lost Something</h3>
                </button>
                
                <button
                  onClick={() => setPostType('found')}
                  className={`p-6 border-2 rounded-lg transition-all ${
                    postType === 'found'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${postType === 'found' ? 'text-green-600' : 'text-gray-400'}`} />
                  <h3 className="font-bold text-gray-900">I Found Something</h3>
                </button>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Item Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Black Laptop, Student ID Card, Blue Water Bottle"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Electronics</option>
                      <option>Documents</option>
                      <option>Accessories</option>
                      <option>Clothing</option>
                      <option>Keys</option>
                      <option>Books</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Black, Red, Blue"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    placeholder="Provide more details about the item..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                      <option>Library</option>
                      <option>Cafeteria</option>
                      <option>Sports Complex</option>
                      <option>Main Building</option>
                      <option>Computer Lab</option>
                      <option>Parking Lot</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date *
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Photo (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors cursor-pointer">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                  </div>
                </div>

                {postType === 'lost' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                      <Shield className="w-4 h-4 text-orange-600" />
                      Security Question *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., What's the sticker on the laptop? What's inside the wallet?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This helps verify the rightful owner
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Information
                  </label>
                  <div className="space-y-2">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <input
                      type="tel"
                      placeholder="Phone (optional)"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
                  postType === 'lost'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}>
                  {postType === 'lost' ? 'Report Lost Item' : 'Post Found Item'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Heatmap Tab */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-red-600" />
                University Batna 2 - Lost Items Heatmap
              </h2>
              <p className="text-gray-600 mb-6">
                Interactive satellite map showing where items are most commonly lost at University Batna 2. Click on markers for details.
              </p>

              {/* Placeholder for Campus Heatmap */}
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center mb-6">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Interactive Campus Map</h3>
                <p className="text-gray-500">Heatmap visualization coming soon</p>
              </div>

              {/* Detailed Statistics by Building */}
              {/* Detailed Statistics by Building */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Statistiques par Bâtiment</h3>
                <div className="space-y-3">
                  {[
                    { 
                      location: 'Bibliothèque Centrale - Étage 2', 
                      items: 58, 
                      percentage: 36,
                      category: 'Laptops & Electronics',
                      color: 'bg-red-500',
                      icon: '💻'
                    },
                    { 
                      location: 'Faculté des Sciences - Laboratoires', 
                      items: 32, 
                      percentage: 20,
                      category: 'Lab Equipment',
                      color: 'bg-orange-500',
                      icon: '🔬'
                    },
                    { 
                      location: 'Restaurant Universitaire', 
                      items: 25, 
                      percentage: 16,
                      category: 'Personal Items',
                      color: 'bg-yellow-500',
                      icon: '🍽️'
                    },
                    { 
                      location: 'Résidence Universitaire', 
                      items: 18, 
                      percentage: 11,
                      category: 'Keys & IDs',
                      color: 'bg-green-500',
                      icon: '🏘️'
                    },
                    { 
                      location: 'Stade Universitaire', 
                      items: 14, 
                      percentage: 9,
                      category: 'Sports Gear',
                      color: 'bg-blue-500',
                      icon: '⚽'
                    },
                    { 
                      location: 'Amphithéâtre Central', 
                      items: 12, 
                      percentage: 8,
                      category: 'Notebooks',
                      color: 'bg-purple-500',
                      icon: '🎓'
                    },
                  ].map((loc, idx) => (
                    <div key={idx} className="border-2 border-gray-200 rounded-xl p-4 hover:shadow-lg transition-shadow bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{loc.icon}</div>
                          <div>
                            <h4 className="font-bold text-gray-900">{loc.location}</h4>
                            <p className="text-xs text-gray-600">{loc.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{loc.items}</div>
                          <div className="text-xs text-gray-600">objets perdus</div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full ${loc.color} transition-all duration-500`}
                          style={{ width: `${loc.percentage}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-2">
                        <p className="text-xs text-gray-500">{loc.percentage}% du total</p>
                        {idx === 0 && (
                          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-bold">
                            ⚠️ Zone à Haut Risque
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-300 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                💡 Conseils de Prévention - Université Batna 2
              </h3>
              <ul className="space-y-2 text-sm text-blue-900">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
                  <span><strong>Bibliothèque Centrale - Étage 2:</strong> Zone à très haut risque ! 28 laptops perdus ce semestre. Ne laissez jamais votre ordinateur sans surveillance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-orange-600" />
                  <span><strong>Faculté des Sciences:</strong> Étiquetez votre matériel de laboratoire avec votre nom et numéro</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-600" />
                  <span><strong>Restaurant Universitaire:</strong> Vérifiez toujours votre plateau avant de partir</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-600" />
                  <span><strong>Résidence Universitaire:</strong> Utilisez les casiers fournis pour vos objets de valeur</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-600" />
                  <span><strong>Stade Universitaire:</strong> Ne laissez pas vos affaires sur les gradins pendant l'entraînement</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg">
                <p className="text-sm text-red-800 font-bold">
                  ⚠️ Alerte: La Bibliothèque Centrale (Étage 2) a enregistré une augmentation de 45% des pertes d'ordinateurs portables ce mois-ci !
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Messaging Modal */}
      {showMessaging && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Message About Item</h3>
                    <p className="text-sm text-gray-600">{selectedItem.item}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowMessaging(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No messages yet</p>
                  <p className="text-sm text-gray-400 mt-1">Start a conversation to claim this item</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                      msg.sent 
                        ? 'bg-blue-600 text-white rounded-br-sm' 
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <span className={`text-xs mt-1 block ${msg.sent ? 'text-blue-100' : 'text-gray-500'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                ))
              )}
              
              {/* System Message for Privacy */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                <Shield className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-yellow-900">Privacy Protected</p>
                  <p className="text-xs text-yellow-800 mt-1">
                    Your contact information will only be shared after verification is complete.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && messageText.trim()) {
                      setMessages([...messages, { 
                        text: messageText, 
                        sent: true, 
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }]);
                      setMessageText('');
                    }
                  }}
                />
                <button 
                  onClick={() => {
                    if (messageText.trim()) {
                      setMessages([...messages, { 
                        text: messageText, 
                        sent: true, 
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }]);
                      setMessageText('');
                    }
                  }}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {showVerification && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Verify Ownership</h3>
                    <p className="text-sm text-gray-600">Prove this item belongs to you</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowVerification(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Verification Form */}
            <div className="p-6 space-y-6">
              {/* Item Info */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-bold text-gray-900 mb-2">{selectedItem.item}</h4>
                <p className="text-sm text-gray-600">{selectedItem.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedItem.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedItem.date}
                  </span>
                </div>
              </div>

              {/* Security Questions */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  Security Questions
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    1. What is the brand or model of this item? *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., HP EliteBook, Sony WH-1000XM4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onChange={(e) => setVerificationAnswers({...verificationAnswers, brand: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    2. Are there any unique marks or distinguishing features? *
                  </label>
                  <textarea
                    placeholder="e.g., Scratch on the back, sticker, custom color"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onChange={(e) => setVerificationAnswers({...verificationAnswers, features: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    3. What was inside or attached to the item?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Books, charger, keychain"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    onChange={(e) => setVerificationAnswers({...verificationAnswers, contents: e.target.value})}
                  />
                </div>
              </div>

              {/* Upload Additional Proof */}
              <div>
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-purple-600" />
                  Additional Proof (Optional)
                </h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 mb-2">Upload a photo or receipt</p>
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
                    Choose File
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowVerification(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowVerification(false);
                    setShowStatusTimeline(true);
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Submit Verification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Timeline Modal */}
      {showStatusTimeline && selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Item Status Timeline</h3>
                    <p className="text-sm text-gray-600">{selectedItem.item}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowStatusTimeline(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Current Status Card */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-900 text-lg">Verification Submitted</h4>
                      <p className="text-sm text-green-700">Current Status</p>
                    </div>
                  </div>
                  <p className="text-sm text-green-800 ml-13">
                    Your verification request is being reviewed by the finder and admin team.
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="relative pl-8 space-y-8">
                  {/* Timeline Line */}
                  <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-blue-500 to-gray-300"></div>

                  {/* Step 1: Reported */}
                  <div className="relative">
                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-green-500 border-4 border-white shadow-lg flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-900">Item Reported</h5>
                        <span className="text-xs text-gray-500">Dec 15, 2025 - 10:30 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">Item was reported as {selectedItem.status === 'Matched' ? 'found' : 'lost'} by {selectedItem.finder || selectedItem.reporter}</p>
                    </div>
                  </div>

                  {/* Step 2: AI Matched */}
                  <div className="relative">
                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-blue-500 border-4 border-white shadow-lg flex items-center justify-center">
                      <TrendingUp className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-900">AI Match Found</h5>
                        <span className="text-xs text-gray-500">Dec 15, 2025 - 11:45 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">System found a 95% match with a corresponding report</p>
                    </div>
                  </div>

                  {/* Step 3: Verification Submitted */}
                  <div className="relative">
                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow-lg flex items-center justify-center animate-pulse">
                      <Shield className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white rounded-lg border-2 border-purple-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-900">Verification Submitted</h5>
                        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-semibold">In Progress</span>
                      </div>
                      <p className="text-sm text-gray-600">Awaiting verification review by finder and admin</p>
                    </div>
                  </div>

                  {/* Step 4: Claimed (Pending) */}
                  <div className="relative opacity-50">
                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-600">Verification Approved</h5>
                        <span className="text-xs text-gray-400">Pending</span>
                      </div>
                      <p className="text-sm text-gray-500">Waiting for admin approval</p>
                    </div>
                  </div>

                  {/* Step 5: Ready for Pickup (Pending) */}
                  <div className="relative opacity-50">
                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-600">Ready for Pickup</h5>
                        <span className="text-xs text-gray-400">Pending</span>
                      </div>
                      <p className="text-sm text-gray-500">Item location and pickup details will be shared</p>
                    </div>
                  </div>

                  {/* Step 6: Returned (Pending) */}
                  <div className="relative opacity-50">
                    <div className="absolute -left-8 w-6 h-6 rounded-full bg-gray-300 border-4 border-white shadow-lg"></div>
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-bold text-gray-600">Item Returned</h5>
                        <span className="text-xs text-gray-400">Pending</span>
                      </div>
                      <p className="text-sm text-gray-500">Successful return will be confirmed</p>
                    </div>
                  </div>
                </div>

                {/* Notifications Settings */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-blue-900 mb-1">Email Notifications Enabled</h5>
                      <p className="text-sm text-blue-800">
                        You'll receive updates at your university email for each status change
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
