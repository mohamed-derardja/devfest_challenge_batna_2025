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
  MessageSquare
} from 'lucide-react';

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'lost' | 'found' | 'post' | 'heatmap'>('dashboard');
  const [postType, setPostType] = useState<'lost' | 'found'>('lost');

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
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Lost Items</h3>
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">34</p>
                <p className="text-sm text-gray-600 mt-1">Active reports</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Found Items</h3>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">28</p>
                <p className="text-sm text-gray-600 mt-1">Waiting for owner</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">AI Matches</h3>
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600 mt-1">Potential matches</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-700">Returned</h3>
                  <Package className="w-5 h-5 text-orange-600" />
                </div>
                <p className="text-3xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600 mt-1">This semester</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => { setPostType('lost'); setActiveTab('post'); }}
                className="bg-white border-2 border-red-200 rounded-lg p-8 hover:border-red-400 hover:bg-red-50 transition-all text-left"
              >
                <AlertCircle className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">I Lost Something</h3>
                <p className="text-gray-600">Report a lost item and let AI find matches</p>
              </button>
              
              <button
                onClick={() => { setPostType('found'); setActiveTab('post'); }}
                className="bg-white border-2 border-green-200 rounded-lg p-8 hover:border-green-400 hover:bg-green-50 transition-all text-left"
              >
                <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">I Found Something</h3>
                <p className="text-gray-600">Post a found item to help someone recover it</p>
              </button>
            </div>

            {/* AI Matches */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                AI Suggested Matches
              </h2>
              <div className="space-y-4">
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
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-3 py-1 rounded font-semibold ${
                        match.match >= 90 ? 'bg-green-100 text-green-700' :
                        match.match >= 80 ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {match.match}% Match - {match.confidence} Confidence
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Connect Users
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                          <span className="text-sm font-semibold text-red-900">Lost</span>
                        </div>
                        <p className="font-semibold text-gray-900">{match.lost.item}</p>
                        <p className="text-sm text-gray-600">By {match.lost.reporter}</p>
                        <p className="text-xs text-gray-500">{match.lost.location} • {match.lost.date}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-semibold text-green-900">Found</span>
                        </div>
                        <p className="font-semibold text-gray-900">{match.found.item}</p>
                        <p className="text-sm text-gray-600">By {match.found.reporter}</p>
                        <p className="text-xs text-gray-500">{match.found.location} • {match.found.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Item Returned', item: 'Blue Water Bottle', time: '2 hours ago', type: 'success' },
                  { action: 'New Found Item', item: 'Student ID Card', time: '4 hours ago', type: 'info' },
                  { action: 'New Lost Report', item: 'Black Backpack', time: '6 hours ago', type: 'warning' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'info' ? 'bg-blue-500' :
                      'bg-yellow-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.time}</span>
                  </div>
                ))}
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
                    image: '💻',
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
                    image: '🆔',
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
                    image: '🎒',
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
                    image: '🍾',
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
                    image: '🎧',
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
                    image: '📚',
                    color: 'Green',
                    status: 'Active',
                    matches: 0
                  },
                ].map((item, idx) => (
                  <div key={idx} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl border-2 border-gray-200 hover:border-red-300 p-6 hover:shadow-xl transition-all duration-300">
                    {/* Status Badge */}
                    <div className="absolute -top-3 -right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                        item.status === 'Matched' 
                          ? 'bg-green-500 text-white animate-pulse' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Item Icon */}
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{item.image}</div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-700 transition-colors">{item.item}</h3>
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mt-2">
                        {item.category}
                      </span>
                    </div>

                    {/* Item Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 font-medium">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Reported by {item.reporter}</span>
                      </div>
                    </div>

                    {/* Matches Indicator */}
                    {item.matches > 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-semibold text-blue-900">
                              {item.matches} Potential Match{item.matches > 1 ? 'es' : ''}
                            </span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                            View →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors">
                        View Details
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
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
                    placeholder="Search found items by keyword..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
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
                    Found Items Collection
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">18 items available • 5 claimed today</p>
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
                    description: 'Found in library study room',
                    location: 'Library Study Room 3B',
                    date: 'Dec 15, 2025',
                    finder: 'Sarah M.',
                    image: '💻',
                    color: 'Black',
                    status: 'Matched',
                    matches: 1
                  },
                  {
                    item: 'Blue Water Bottle',
                    category: 'Accessories',
                    description: 'Plastic water bottle',
                    location: 'Gym Locker Room',
                    date: 'Dec 14, 2025',
                    finder: 'Security Office',
                    image: '🧴',
                    color: 'Blue',
                    status: 'Available',
                    matches: 0
                  },
                  {
                    item: 'Keys with GDG Keychain',
                    category: 'Accessories',
                    description: '3 keys on a GDG keychain',
                    location: 'Main Building Entrance',
                    date: 'Dec 15, 2025',
                    finder: 'Amina L.',
                    image: '🔑',
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
                    image: '🍾',
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
                  <div key={idx} className="group relative bg-gradient-to-br from-white to-green-50 rounded-xl border-2 border-gray-200 hover:border-green-300 p-6 hover:shadow-xl transition-all duration-300">
                    {/* Status Badge */}
                    <div className="absolute -top-3 -right-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                        item.status === 'Matched' 
                          ? 'bg-green-500 text-white animate-pulse' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    {/* Item Icon */}
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-2">{item.image}</div>
                      <h3 className="font-bold text-lg text-gray-900 group-hover:text-green-700 transition-colors">{item.item}</h3>
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full mt-2">
                        {item.category}
                      </span>
                    </div>

                    {/* Item Details */}
                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700 font-medium">{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Found by {item.finder}</span>
                      </div>
                    </div>

                    {/* Matches Indicator */}
                    {item.matches > 0 && (
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-semibold text-orange-900">
                              {item.matches} Potential Match{item.matches > 1 ? 'es' : ''}
                            </span>
                          </div>
                          <button className="text-orange-600 hover:text-orange-700 text-xs font-medium">
                            View →
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                        Claim Item
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
                    <div className="space-y-1 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        Found by {item.finder}
                      </div>
                    </div>
                    {item.matches > 0 && (
                      <div className="mb-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                        <TrendingUp className="w-4 h-4 inline mr-1" />
                        {item.matches} potential {item.matches === 1 ? 'match' : 'matches'} found
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                        View Details
                      </button>
                      {item.matches > 0 && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          See Matches
                        </button>
                      )}
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
                Lost Items Heatmap
              </h2>
              <p className="text-gray-600 mb-6">
                See where items are most commonly lost on campus
              </p>

              {/* Campus Map Placeholder */}
              <div className="bg-gray-100 rounded-lg p-8 mb-6 relative" style={{ height: '400px' }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Interactive Campus Map</p>
                    <p className="text-sm text-gray-500">Shows hotspots where items are frequently lost</p>
                  </div>
                </div>
                
                {/* Hotspot Markers */}
                <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-500 bg-opacity-40 rounded-full animate-pulse"></div>
                  <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Library</span>
                </div>
                <div className="absolute top-1/2 right-1/3 flex flex-col items-center">
                  <div className="w-12 h-12 bg-orange-500 bg-opacity-40 rounded-full animate-pulse"></div>
                  <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Cafeteria</span>
                </div>
                <div className="absolute bottom-1/3 left-1/2 flex flex-col items-center">
                  <div className="w-8 h-8 bg-yellow-500 bg-opacity-40 rounded-full animate-pulse"></div>
                  <span className="text-xs bg-white px-2 py-1 rounded shadow mt-1">Gym</span>
                </div>
              </div>

              {/* Top Locations */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Top Lost Item Locations</h3>
                <div className="space-y-3">
                  {[
                    { location: 'Library - 3rd Floor', items: 45, percentage: 28 },
                    { location: 'Cafeteria', items: 38, percentage: 24 },
                    { location: 'Sports Complex', items: 25, percentage: 16 },
                    { location: 'Main Building', items: 20, percentage: 12 },
                    { location: 'Parking Lot', items: 18, percentage: 11 },
                  ].map((loc, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{loc.location}</h4>
                        <span className="text-sm text-gray-600">{loc.items} items</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            idx === 0 ? 'bg-red-500' :
                            idx === 1 ? 'bg-orange-500' :
                            idx === 2 ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`}
                          style={{ width: `${loc.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{loc.percentage}% of all lost items</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Prevention Tips
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Be extra careful in the Library 3rd Floor - highest lost item rate</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Always check your seat before leaving the cafeteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Use lockers at the Sports Complex to secure your belongings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Label your items with your name and contact information</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
