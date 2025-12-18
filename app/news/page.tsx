'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import { 
  Newspaper, 
  Calendar,
  Clock,
  TrendingUp,
  AlertCircle,
  Info,
  BookOpen,
  Users,
  MapPin,
  ArrowRight,
  Search,
  Filter,
  Download,
  Share2
} from 'lucide-react';

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: string;
  date: string;
  impact: 'high' | 'medium' | 'low';
  affectedStudents: string;
  changes: string[];
  fullText?: string;
}

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'schedule' | 'academic' | 'campus'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'Computer Science 301 Schedule Change',
      summary: 'AI Summary: CS301 class has been moved from Monday 2:00 PM to Tuesday 10:00 AM, effective immediately. Affects all Computer Science Year 3 students.',
      category: 'Schedule Change',
      date: 'Dec 18, 2025',
      impact: 'high',
      affectedStudents: 'Computer Science Year 3',
      changes: [
        'Old Time: Monday 2:00 PM - 4:00 PM',
        'New Time: Tuesday 10:00 AM - 12:00 PM',
        'Same Room: Building A, Room 305',
        'Starts: Dec 19, 2025'
      ],
      fullText: 'Due to scheduling conflicts, the Computer Science 301 class will be moved to a new time slot. All students enrolled in this course should update their schedules accordingly.'
    },
    {
      id: 2,
      title: 'New Final Exam Dates Published',
      summary: 'AI Summary: Final exam period extended by 2 days. Mathematics exams moved earlier, Physics exams moved later. Detailed schedule available on student portal.',
      category: 'Academic',
      date: 'Dec 17, 2025',
      impact: 'high',
      affectedStudents: 'All Students',
      changes: [
        'Mathematics exams: Dec 25-27 (was Dec 27-29)',
        'Physics exams: Dec 30-31 (was Dec 28-29)',
        'Final exam period: Dec 25 - Jan 5',
        'Extra study days added before each exam'
      ]
    },
    {
      id: 3,
      title: 'Library Extended Hours During Exam Period',
      summary: 'AI Summary: Library will be open 24/7 during final exams (Dec 20 - Jan 5). Additional study rooms available. Free coffee service after 10 PM.',
      category: 'Campus Update',
      date: 'Dec 16, 2025',
      impact: 'medium',
      affectedStudents: 'All Students',
      changes: [
        '24/7 operations: Dec 20 - Jan 5',
        '10 additional study rooms opened',
        'Free coffee/tea service: 10 PM - 6 AM',
        'Quiet zones enforced strictly'
      ]
    },
    {
      id: 4,
      title: 'New Graduation Requirements for 2026',
      summary: 'AI Summary: Starting next semester, all students must complete 20 hours of community service. New AI Ethics course added as requirement for CS majors.',
      category: 'Academic',
      date: 'Dec 15, 2025',
      impact: 'high',
      affectedStudents: 'Students graduating in 2026 or later',
      changes: [
        'Community service: 20 hours required',
        'AI Ethics course: Mandatory for CS majors',
        'Internship requirement: Increased to 3 months',
        'Implementation: Fall 2026 semester'
      ]
    },
    {
      id: 5,
      title: 'Campus Cafeteria Menu Expansion',
      summary: 'AI Summary: New vegetarian and vegan options added. Extended breakfast hours. 10% student discount on all meals with ID card.',
      category: 'Campus Update',
      date: 'Dec 14, 2025',
      impact: 'low',
      affectedStudents: 'All Students',
      changes: [
        'Vegetarian options: 5 new dishes daily',
        'Breakfast: Now served 7 AM - 11 AM (was 8 AM - 10 AM)',
        '10% discount with valid student ID',
        'Mobile ordering app launching next week'
      ]
    },
    {
      id: 6,
      title: 'Spring 2026 Course Registration Opens Early',
      summary: 'AI Summary: Registration for Spring 2026 moved up by 1 week. Priority registration for seniors and honor students starts Dec 20.',
      category: 'Academic',
      date: 'Dec 13, 2025',
      impact: 'medium',
      affectedStudents: 'All Students',
      changes: [
        'Seniors & Honors: Dec 20-21',
        'Year 3 students: Dec 22-23',
        'Year 2 students: Dec 24-25',
        'Year 1 students: Dec 26-27'
      ]
    },
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'schedule' && item.category === 'Schedule Change') ||
      (activeTab === 'academic' && item.category === 'Academic') ||
      (activeTab === 'campus' && item.category === 'Campus Update');
    
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-pink-600" />
            Program Updates & News
          </h1>
          <p className="text-gray-600 mt-2">AI-summarized updates about schedule changes and campus news</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search news and updates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'schedule'
                  ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Schedule Changes
            </button>
            <button
              onClick={() => setActiveTab('academic')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'academic'
                  ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Academic
            </button>
            <button
              onClick={() => setActiveTab('campus')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'campus'
                  ? 'bg-pink-50 text-pink-700 border-b-2 border-pink-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Campus Updates
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main News Feed */}
          <div className="lg:col-span-2 space-y-6">
            {filteredNews.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <Newspaper className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p className="text-gray-500">No updates found</p>
              </div>
            ) : (
              filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${
                          item.category === 'Schedule Change' ? 'bg-orange-100 text-orange-700' :
                          item.category === 'Academic' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {item.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded font-semibold ${
                          item.impact === 'high' ? 'bg-red-100 text-red-700' :
                          item.impact === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.impact === 'high' ? 'High Impact' : 
                           item.impact === 'medium' ? 'Medium Impact' : 
                           'Low Impact'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h2>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Published: {item.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Affects: {item.affectedStudents}</span>
                    </div>
                  </div>

                  {/* Key Changes */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Key Changes:
                    </h4>
                    <ul className="space-y-1">
                      {item.changes.map((change, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" />
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm font-medium">
                      Read Full Article
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Important Dates */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                Important Dates
              </h3>
              <div className="space-y-3">
                {[
                  { date: 'Dec 19', event: 'CS301 New Schedule Starts', color: 'orange' },
                  { date: 'Dec 20', event: 'Library 24/7 Hours Begin', color: 'blue' },
                  { date: 'Dec 20', event: 'Spring Registration Opens', color: 'purple' },
                  { date: 'Dec 25', event: 'Final Exams Begin', color: 'red' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex flex-col items-center justify-center ${
                      item.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      item.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      item.color === 'purple' ? 'bg-purple-100 text-purple-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      <div className="text-xs font-semibold">{item.date.split(' ')[0]}</div>
                      <div className="text-xs">{item.date.split(' ')[1]}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                This Week's Impact
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">High Impact Updates</span>
                  <span className="text-lg font-bold text-red-600">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medium Impact</span>
                  <span className="text-lg font-bold text-yellow-600">2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Low Impact</span>
                  <span className="text-lg font-bold text-gray-600">1</span>
                </div>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                <Info className="w-5 h-5" />
                Stay Updated
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Check for updates daily during exam period</span>
                </li>
                <li className="flex items-start gap-2">
                  <Newspaper className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Subscribe to email notifications for high-impact changes</span>
                </li>
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>Save important updates to your calendar</span>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {[
                  { name: 'Schedule Changes', count: 1, color: 'orange' },
                  { name: 'Academic Updates', count: 3, color: 'blue' },
                  { name: 'Campus News', count: 2, color: 'green' },
                ].map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded cursor-pointer">
                    <span className="text-sm text-gray-700">{cat.name}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      cat.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                      cat.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {cat.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
