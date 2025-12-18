'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
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
  Flame
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
    { name: 'Library Late Fee Waiver', cost: 200, available: true },
    { name: 'Cafeteria 10% Discount', cost: 150, available: true },
    { name: 'Priority Course Registration', cost: 500, available: false },
    { name: 'Parking Permit (1 month)', cost: 300, available: true },
    { name: 'Extra Study Room Hours', cost: 100, available: true },
    { name: 'Custom Student ID Design', cost: 250, available: true },
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Award className="w-8 h-8 text-yellow-600" />
            Task Rewards & Achievements
          </h1>
          <p className="text-gray-600 mt-2">Complete tasks, earn points, and unlock rewards</p>
        </div>

        {/* User Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Trophy className="w-6 h-6" />
              <Crown className="w-5 h-5 opacity-50" />
            </div>
            <div className="text-2xl font-bold">{userStats.totalPoints}</div>
            <div className="text-sm opacity-90">Total Points</div>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-6 h-6" />
              <span className="text-xs opacity-75">LEVEL</span>
            </div>
            <div className="text-2xl font-bold">{userStats.level}</div>
            <div className="text-sm opacity-90">Current Level</div>
          </div>

          <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Medal className="w-6 h-6" />
              <span className="text-xs opacity-75">RANK</span>
            </div>
            <div className="text-2xl font-bold">#{userStats.rank}</div>
            <div className="text-sm opacity-90">Global Rank</div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6" />
              <Zap className="w-5 h-5 opacity-50" />
            </div>
            <div className="text-2xl font-bold">{userStats.completedTasks}</div>
            <div className="text-sm opacity-90">Tasks Done</div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Flame className="w-6 h-6" />
              <span className="text-xs opacity-75">STREAK</span>
            </div>
            <div className="text-2xl font-bold">{userStats.streak}</div>
            <div className="text-sm opacity-90">Day Streak</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? 'bg-yellow-50 text-yellow-700 border-b-2 border-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'tasks'
                  ? 'bg-yellow-50 text-yellow-700 border-b-2 border-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              My Tasks
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'leaderboard'
                  ? 'bg-yellow-50 text-yellow-700 border-b-2 border-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'rewards'
                  ? 'bg-yellow-50 text-yellow-700 border-b-2 border-yellow-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Rewards Store
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Progress to Next Level */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Progress to Level {userStats.level + 1}
              </h2>
              <div className="mb-2">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                  <span>Level {userStats.level}</span>
                  <span>150 points to go</span>
                  <span>Level {userStats.level + 1}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all"
                    style={{ width: '70%' }}
                  ></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Complete more tasks to level up and unlock exclusive rewards!
              </p>
            </div>

            {/* Today's Tasks */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Today's Priority Tasks
              </h2>
              <div className="space-y-3">
                {tasks.filter(t => t.status === 'pending').slice(0, 3).map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{task.title}</h3>
                      <span className="text-sm px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-semibold">
                        +{task.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        {task.deadline}
                      </div>
                      <button className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                        Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-600" />
                Recent Achievements
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: '🎯', name: 'Task Master', desc: 'Complete 10 tasks', date: '2 days ago' },
                  { icon: '🔥', name: '7-Day Streak', desc: 'Active for 7 days', date: 'Today' },
                  { icon: '📚', name: 'Quiz Pro', desc: 'Score 90%+ on 5 quizzes', date: '3 days ago' },
                ].map((achievement, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <h4 className="font-bold text-gray-900 mb-1">{achievement.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{achievement.desc}</p>
                    <span className="text-xs text-gray-500">{achievement.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Tasks</h2>
              
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`border rounded-lg p-5 ${
                      task.status === 'completed' ? 'bg-green-50 border-green-200' :
                      task.status === 'overdue' ? 'bg-red-50 border-red-200' :
                      'border-gray-200 hover:shadow-md transition-shadow'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">{task.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded ${
                            task.status === 'completed' ? 'bg-green-100 text-green-700' :
                            task.status === 'overdue' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </span>
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                            {task.category}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-2xl font-bold text-yellow-600">+{task.points}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Deadline</div>
                        <div className="flex items-center gap-1 text-gray-900">
                          <Clock className="w-4 h-4" />
                          {task.deadline}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Reward</div>
                        <div className="text-green-600 font-semibold">{task.reward}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Penalty</div>
                        <div className="text-red-600 font-semibold">{task.penalty}</div>
                      </div>
                    </div>

                    {task.status === 'pending' && (
                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                          Mark as Complete
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          View Details
                        </button>
                      </div>
                    )}

                    {task.status === 'completed' && (
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-semibold">Task completed! Points awarded.</span>
                      </div>
                    )}

                    {task.status === 'overdue' && (
                      <div className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">
                        ⚠️ This task is overdue. Penalty may apply.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                Top Students This Semester
              </h2>

              <div className="space-y-2">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-4 p-4 rounded-lg ${
                      entry.name === 'You'
                        ? 'bg-blue-50 border-2 border-blue-300'
                        : entry.rank <= 3
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`text-2xl font-bold ${
                      entry.rank === 1 ? 'text-yellow-600' :
                      entry.rank === 2 ? 'text-gray-500' :
                      entry.rank === 3 ? 'text-orange-600' :
                      'text-gray-400'
                    }`}>
                      #{entry.rank}
                    </div>

                    <div className="text-3xl">{entry.badge}</div>

                    <div className="flex-1">
                      <h3 className={`font-bold ${
                        entry.name === 'You' ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {entry.name}
                        {entry.name === 'You' && (
                          <span className="ml-2 text-sm px-2 py-0.5 bg-blue-200 text-blue-800 rounded">
                            You
                          </span>
                        )}
                      </h3>
                      <div className="text-sm text-gray-600">Level {entry.level}</div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-600">{entry.points}</div>
                      <div className="text-xs text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Climb the Ranks!
              </h3>
              <p className="text-sm text-purple-800 mb-3">
                You're just 70 points away from rank #4! Complete more tasks to move up.
              </p>
              <ul className="space-y-1 text-sm text-purple-800">
                <li>• Complete 2 more assignments to gain 150 points</li>
                <li>• Return lost items to earn community points</li>
                <li>• Maintain your 7-day streak for bonus points</li>
              </ul>
            </div>
          </div>
        )}

        {/* Rewards Store Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-purple-600" />
                  Rewards Store
                </h2>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Your Balance</div>
                  <div className="text-2xl font-bold text-yellow-600">{userStats.totalPoints} pts</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className={`border rounded-lg p-5 ${
                      !reward.available || reward.cost > userStats.totalPoints
                        ? 'opacity-60 border-gray-200'
                        : 'border-purple-200 hover:shadow-md transition-shadow'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">{reward.name}</h3>
                        {!reward.available && (
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xl font-bold text-purple-600">{reward.cost}</div>
                        <div className="text-xs text-gray-500">points</div>
                      </div>
                    </div>

                    <button
                      disabled={!reward.available || reward.cost > userStats.totalPoints}
                      className={`w-full py-2 rounded-lg font-medium transition-colors ${
                        reward.available && reward.cost <= userStats.totalPoints
                          ? 'bg-purple-600 text-white hover:bg-purple-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {!reward.available ? 'Coming Soon' :
                       reward.cost > userStats.totalPoints ? 'Not Enough Points' :
                       'Redeem'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                <Star className="w-5 h-5" />
                How to Earn More Points
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Academic Tasks:</strong> Complete assignments early (+75-100 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Quizzes:</strong> Score 80%+ on practice quizzes (+50 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Community:</strong> Return lost items, join study groups (+25-50 pts)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Daily Streak:</strong> Log in and complete tasks daily (+10 pts/day)</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
