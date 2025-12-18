'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
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
  Clock
} from 'lucide-react';

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'search' | 'documents' | 'internships' | 'scholarships'>('search');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <FileSearch className="w-8 h-8 text-green-600" />
            AI Document & Opportunity Helper
          </h1>
          <p className="text-gray-600 mt-2">Find resources, internships, and scholarships with AI assistance</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'search'
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              AI Search
            </button>
            <button
              onClick={() => setActiveTab('documents')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'documents'
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Document Finder
            </button>
            <button
              onClick={() => setActiveTab('internships')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'internships'
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setActiveTab('scholarships')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'scholarships'
                  ? 'bg-green-50 text-green-700 border-b-2 border-green-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Scholarships
            </button>
          </div>
        </div>

        {/* AI Search Tab */}
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Brain className="w-7 h-7 text-green-600" />
                AI-Powered Search Assistant
              </h2>
              <p className="text-gray-600 mb-6">Ask questions naturally, get smart answers</p>
              
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                  <textarea
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Ask anything... e.g., 'Who can I borrow Signal Processing book from?', 'Show me internships in AI for summer 2026'"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none shadow-sm"
                    rows={3}
                  />
                </div>
                <button className="mt-4 w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Search with AI
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-lg cursor-pointer transition-all">
                  <BookOpen className="w-8 h-8 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Find Books</h4>
                  <p className="text-xs text-gray-600">Search library catalog</p>
                </div>
                <div className="group p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-green-400 hover:shadow-lg cursor-pointer transition-all">
                  <Briefcase className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Find Internships</h4>
                  <p className="text-xs text-gray-600">Match with opportunities</p>
                </div>
                <div className="group p-5 bg-white border-2 border-gray-200 rounded-xl hover:border-purple-400 hover:shadow-lg cursor-pointer transition-all">
                  <GraduationCap className="w-8 h-8 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Find Scholarships</h4>
                  <p className="text-xs text-gray-600">Discover funding options</p>
                </div>
              </div>
            </div>

            {/* Sample AI Response */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">AI Response</h3>
              <div className="prose max-w-none">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                  <p className="text-sm text-gray-700">
                    <strong>Example Query:</strong> "Who can I borrow the Signal Processing book from?"
                  </p>
                </div>
                <div className="space-y-3 text-sm text-gray-700">
                  <p><strong>AI Answer:</strong></p>
                  <p>Based on the library records and student lending network, here's what I found:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">📚 Available Options:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <div>
                          <strong>University Library - 3rd Floor, Section E</strong>
                          <div className="text-gray-600">2 copies available • Open until 8 PM</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600">👤</span>
                        <div>
                          <strong>Ahmed K. (Computer Science, Year 3)</strong>
                          <div className="text-gray-600">Has the book • Willing to lend • Last active: 2 hours ago</div>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-orange-600">🏪</span>
                        <div>
                          <strong>Campus Bookstore</strong>
                          <div className="text-gray-600">New copies in stock • 2,500 DA</div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document Finder Tab */}
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Document Library
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search documents, books, papers..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categories */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {['Textbooks', 'Research Papers', 'Lecture Notes', 'Past Exams'].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 text-sm font-medium text-gray-700"
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Document List */}
              <div className="space-y-3">
                {[
                  {
                    title: 'Introduction to Algorithms (4th Edition)',
                    type: 'Textbook',
                    location: 'Library - 2nd Floor, Section C',
                    available: true,
                    borrowedBy: null,
                    subject: 'Computer Science'
                  },
                  {
                    title: 'Linear Algebra and Its Applications',
                    type: 'Textbook',
                    location: 'Borrowed by Sarah M.',
                    available: false,
                    borrowedBy: 'Sarah M. (Math Dept.)',
                    returnDate: 'Dec 22, 2025',
                    subject: 'Mathematics'
                  },
                  {
                    title: 'Physics Lab Manual 2025',
                    type: 'Lab Manual',
                    location: 'Physics Department Office',
                    available: true,
                    borrowedBy: null,
                    subject: 'Physics'
                  },
                  {
                    title: 'Machine Learning Research Papers Collection',
                    type: 'Research Papers',
                    location: 'Digital Library',
                    available: true,
                    borrowedBy: null,
                    subject: 'Computer Science'
                  },
                ].map((doc, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{doc.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            doc.available 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {doc.available ? 'Available' : 'Borrowed'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {doc.location}
                          </span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                            {doc.subject}
                          </span>
                        </div>
                        {!doc.available && doc.returnDate && (
                          <p className="text-sm text-gray-600 mt-1">
                            Expected return: {doc.returnDate}
                          </p>
                        )}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium ml-4">
                        {doc.available ? 'Reserve' : 'Notify Me'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Lending Network */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-green-600" />
                Student Lending Network
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Connect with fellow students who have books and materials you need
              </p>
              <div className="space-y-3">
                {[
                  { name: 'Ahmed K.', book: 'Signal Processing', department: 'Computer Science', year: 3 },
                  { name: 'Sarah M.', book: 'Linear Algebra', department: 'Mathematics', year: 2 },
                ].map((student, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <p className="text-sm text-gray-600">Has: {student.book}</p>
                      <p className="text-xs text-gray-500">{student.department} • Year {student.year}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                      Contact
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Internships Tab */}
        {activeTab === 'internships' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Internship Opportunities
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* AI Recommendations */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  AI Matched for You
                </h4>
                <p className="text-sm text-blue-800">
                  Based on your profile (Computer Science, Year 3, GPA: 3.8), here are the best matches:
                </p>
              </div>

              {/* Internship Listings */}
              <div className="space-y-4">
                {[
                  {
                    company: 'Tech Solutions DZ',
                    position: 'Software Development Intern',
                    location: 'Algiers',
                    duration: '3 months',
                    stipend: '25,000 DA/month',
                    deadline: 'Dec 31, 2025',
                    match: 95,
                    requirements: ['Python', 'React', 'Git'],
                    type: 'Paid'
                  },
                  {
                    company: 'Innovation Labs',
                    position: 'AI/ML Research Intern',
                    location: 'Remote',
                    duration: '6 months',
                    stipend: '30,000 DA/month',
                    deadline: 'Jan 15, 2026',
                    match: 88,
                    requirements: ['Machine Learning', 'Python', 'TensorFlow'],
                    type: 'Paid'
                  },
                  {
                    company: 'StartUp Hub',
                    position: 'Full Stack Developer Intern',
                    location: 'Oran',
                    duration: '4 months',
                    stipend: 'Unpaid',
                    deadline: 'Jan 05, 2026',
                    match: 82,
                    requirements: ['JavaScript', 'Node.js', 'MongoDB'],
                    type: 'Unpaid'
                  },
                ].map((internship, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{internship.position}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            internship.match >= 90 ? 'bg-green-100 text-green-700' :
                            internship.match >= 80 ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {internship.match}% Match
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium flex items-center gap-1">
                          <Building className="w-4 h-4" />
                          {internship.company}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded ${
                        internship.type === 'Paid' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {internship.type}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {internship.location}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        {internship.stipend}
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <Calendar className="w-4 h-4" />
                        Due: {internship.deadline}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-2">Required Skills:</div>
                      <div className="flex flex-wrap gap-2">
                        {internship.requirements.map((req, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center justify-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Tracker */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">My Applications</h3>
              <div className="space-y-3">
                {[
                  { company: 'Tech Solutions DZ', position: 'Software Development Intern', status: 'Under Review', date: 'Dec 10, 2025' },
                  { company: 'Data Corp', position: 'Data Analyst Intern', status: 'Interview Scheduled', date: 'Dec 05, 2025' },
                ].map((app, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900">{app.position}</h4>
                      <p className="text-sm text-gray-600">{app.company}</p>
                      <p className="text-xs text-gray-500">Applied: {app.date}</p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded ${
                      app.status === 'Interview Scheduled' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scholarships Tab */}
        {activeTab === 'scholarships' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  Scholarship Opportunities
                </h2>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
              </div>

              {/* AI Recommendations */}
              <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Recommended for You
                </h4>
                <p className="text-sm text-purple-800">
                  Based on your academic performance and profile, you're eligible for 12 scholarships
                </p>
              </div>

              {/* Scholarship Listings */}
              <div className="space-y-4">
                {[
                  {
                    name: 'Excellence in Computer Science Scholarship',
                    provider: 'Algerian Ministry of Education',
                    amount: '50,000 DA',
                    deadline: 'Jan 10, 2026',
                    requirements: ['GPA ≥ 3.5', 'Computer Science Major', 'Year 3 or 4'],
                    eligibility: 98
                  },
                  {
                    name: 'STEM Research Grant',
                    provider: 'National Research Foundation',
                    amount: '75,000 DA',
                    deadline: 'Jan 20, 2026',
                    requirements: ['Research Proposal', 'Faculty Recommendation', 'GPA ≥ 3.0'],
                    eligibility: 85
                  },
                  {
                    name: 'Women in Technology Scholarship',
                    provider: 'Tech Women Algeria',
                    amount: '40,000 DA',
                    deadline: 'Dec 28, 2025',
                    requirements: ['Female Student', 'STEM Field', 'Essay Required'],
                    eligibility: 92
                  },
                ].map((scholarship, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{scholarship.name}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            scholarship.eligibility >= 90 ? 'bg-green-100 text-green-700' :
                            scholarship.eligibility >= 80 ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {scholarship.eligibility}% Eligible
                          </span>
                        </div>
                        <p className="text-gray-700 font-medium">{scholarship.provider}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 mb-3 text-sm">
                      <div className="flex items-center gap-1 text-green-600 font-semibold">
                        <DollarSign className="w-4 h-4" />
                        {scholarship.amount}
                      </div>
                      <div className="flex items-center gap-1 text-red-600">
                        <Calendar className="w-4 h-4" />
                        Deadline: {scholarship.deadline}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-sm text-gray-600 mb-2">Requirements:</div>
                      <div className="flex flex-wrap gap-2">
                        {scholarship.requirements.map((req, i) => (
                          <span key={i} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium flex items-center justify-center gap-1">
                        <ExternalLink className="w-4 h-4" />
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Deadline Calendar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-600" />
                Upcoming Deadlines
              </h3>
              <div className="space-y-2">
                {[
                  { scholarship: 'Women in Technology Scholarship', deadline: 'Dec 28, 2025', days: 10 },
                  { scholarship: 'Excellence in CS Scholarship', deadline: 'Jan 10, 2026', days: 23 },
                  { scholarship: 'STEM Research Grant', deadline: 'Jan 20, 2026', days: 33 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{item.scholarship}</h4>
                      <p className="text-xs text-gray-600">{item.deadline}</p>
                    </div>
                    <span className={`text-sm font-semibold ${
                      item.days <= 14 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {item.days} days left
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
