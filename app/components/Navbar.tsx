'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, FileSearch, Package, Bell, Award, Newspaper } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Exam Prep', href: '/exam-prep', icon: BookOpen },
    { name: 'Documents', href: '/documents', icon: FileSearch },
    { name: 'Lost & Found', href: '/lost-found', icon: Package },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Rewards', href: '/rewards', icon: Award },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-xl shadow-lg shadow-purple-500/50 group-hover:rotate-12 transition-transform duration-300"></div>
            <span className="font-black text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">SSP</span>
          </Link>

          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-700'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:scale-110 transition-transform'}`} />
                  <span className="text-sm font-bold">{item.name}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-full"></div>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group cursor-pointer">
              <div className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all">
                <Bell className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                <span className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  3
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200/50 bg-white/90 backdrop-blur-lg">
        <div className="grid grid-cols-4 gap-2 p-3">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30' 
                    : 'text-gray-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-semibold">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
