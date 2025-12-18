'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
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
  TrendingUp
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
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<'all' | NotificationType>('all');
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'deadline',
      title: 'Exam Deadline Approaching',
      message: 'Mathematics exam in 3 days - Dec 25, 2025',
      time: '1 hour ago',
      read: false,
      priority: 'high',
      icon: Calendar,
      color: 'red'
    },
    {
      id: 2,
      type: 'match',
      title: 'Lost Item Match Found',
      message: 'Your black laptop might have been found! 95% match confidence.',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: Package,
      color: 'green'
    },
    {
      id: 3,
      type: 'task',
      title: 'Task Reward Available',
      message: 'Complete your Physics quiz today to earn +1 TD point!',
      time: '3 hours ago',
      read: false,
      priority: 'medium',
      icon: CheckCircle,
      color: 'blue'
    },
    {
      id: 4,
      type: 'opportunity',
      title: 'New Internship Posted',
      message: 'Software Development Intern at Tech Solutions DZ - 95% match',
      time: '5 hours ago',
      read: true,
      priority: 'medium',
      icon: Briefcase,
      color: 'purple'
    },
    {
      id: 5,
      type: 'deadline',
      title: 'Scholarship Deadline',
      message: 'Women in Technology Scholarship - 1 day remaining',
      time: '8 hours ago',
      read: true,
      priority: 'high',
      icon: Calendar,
      color: 'orange'
    },
    {
      id: 6,
      type: 'update',
      title: 'Program Schedule Change',
      message: 'Computer Science 301 moved to Tuesday 10:00 AM',
      time: '1 day ago',
      read: true,
      priority: 'low',
      icon: Info,
      color: 'gray'
    },
    {
      id: 7,
      type: 'task',
      title: 'Assignment Due Tomorrow',
      message: 'Data Structures homework - submission deadline Dec 19, 2025',
      time: '1 day ago',
      read: true,
      priority: 'high',
      icon: AlertTriangle,
      color: 'yellow'
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="w-8 h-8 text-purple-600" />
                Notifications
                {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full">
                    {unreadCount} new
                  </span>
                )}
              </h1>
              <p className="text-gray-600 mt-2">Stay updated with deadlines, tasks, and opportunities</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-20">
              <h3 className="font-bold text-gray-900 mb-4">Filter</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'all' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">All Notifications</span>
                    <span className="text-sm">{notifications.length}</span>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('deadline')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'deadline' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Deadlines</span>
                    </div>
                    <span className="text-sm">{notifications.filter(n => n.type === 'deadline').length}</span>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('task')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'task' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-medium">Tasks</span>
                    </div>
                    <span className="text-sm">{notifications.filter(n => n.type === 'task').length}</span>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('match')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'match' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      <span className="font-medium">Lost & Found</span>
                    </div>
                    <span className="text-sm">{notifications.filter(n => n.type === 'match').length}</span>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('opportunity')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'opportunity' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span className="font-medium">Opportunities</span>
                    </div>
                    <span className="text-sm">{notifications.filter(n => n.type === 'opportunity').length}</span>
                  </div>
                </button>
                <button
                  onClick={() => setFilter('update')}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    filter === 'update' ? 'bg-purple-100 text-purple-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4" />
                      <span className="font-medium">Updates</span>
                    </div>
                    <span className="text-sm">{notifications.filter(n => n.type === 'update').length}</span>
                  </div>
                </button>
              </div>

              {unreadCount > 0 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={markAllAsRead}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Mark All as Read
                  </button>
                </div>
              )}

              {/* Quick Settings */}
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm">Quick Settings</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">Push Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-600 rounded" />
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-700">SMS Alerts</span>
                    <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-bold text-gray-900">
                  {filter === 'all' ? 'All Notifications' : 
                   filter.charAt(0).toUpperCase() + filter.slice(1) + ' Notifications'}
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                    <p>No notifications to display</p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 transition-colors ${
                          !notification.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                            notification.color === 'red' ? 'bg-red-100' :
                            notification.color === 'green' ? 'bg-green-100' :
                            notification.color === 'blue' ? 'bg-blue-100' :
                            notification.color === 'purple' ? 'bg-purple-100' :
                            notification.color === 'orange' ? 'bg-orange-100' :
                            notification.color === 'yellow' ? 'bg-yellow-100' :
                            'bg-gray-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              notification.color === 'red' ? 'text-red-600' :
                              notification.color === 'green' ? 'text-green-600' :
                              notification.color === 'blue' ? 'text-blue-600' :
                              notification.color === 'purple' ? 'text-purple-600' :
                              notification.color === 'orange' ? 'text-orange-600' :
                              notification.color === 'yellow' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <div className="flex items-center gap-2">
                                <h3 className={`font-semibold ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                )}
                              </div>
                              {notification.priority === 'high' && (
                                <span className="text-xs px-2 py-0.5 bg-red-100 text-red-700 rounded flex-shrink-0">
                                  High Priority
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                {notification.time}
                              </div>
                              <div className="flex items-center gap-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="text-gray-400 hover:text-red-600"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Notification Settings Info */}
            <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">Notification Preferences</h3>
              <p className="text-sm text-purple-800 mb-3">
                Customize when and how you receive notifications for different events
              </p>
              <div className="space-y-2 text-sm text-purple-800">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>3 days before:</strong> Exam deadlines, scholarship applications</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>1 day before:</strong> Task deadlines, assignment submissions</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Instant:</strong> Lost & found matches, new opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
