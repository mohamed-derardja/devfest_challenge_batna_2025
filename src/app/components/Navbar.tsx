'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  FileSearch, 
  Package, 
  Bell, 
  Award, 
  Newspaper,
  LayoutDashboard,
  Search,
  User,
  GraduationCap,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings
} from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Exam Prep', href: '/exam-prep', icon: BookOpen },
    { name: 'Documents', href: '/documents', icon: FileSearch },
    { name: 'Lost & Found', href: '/lost-found', icon: Package },
    { name: 'Rewards', href: '/rewards', icon: Award },
    { name: 'News', href: '/news', icon: Newspaper },
  ];

  const bottomItems = [
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-[110] lg:hidden p-2 bg-white rounded-xl shadow-lg border border-slate-200"
      >
        <Menu className="w-6 h-6 text-slate-700" />
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 z-[115] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.nav
        initial={false}
        animate={{ 
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -300 : 0)
        }}
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-[120] flex flex-col shadow-xl lg:shadow-none transition-all duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ width: isCollapsed ? 80 : 280 }}
      >
        {/* Close button for mobile */}
        <button
          onClick={() => setIsMobileOpen(false)}
          className="absolute top-4 right-4 p-1 lg:hidden"
        >
          <X className="w-5 h-5 text-slate-400" />
        </button>

        {/* Logo */}
        <div className={`p-6 border-b border-slate-100 ${isCollapsed ? 'px-4' : ''}`}>
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setIsMobileOpen(false)}>
            <motion.div 
              whileHover={{ rotate: 5, scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 transition-transform shrink-0"
            >
              <GraduationCap className="w-6 h-6 text-white" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-serif text-xl font-bold text-slate-900 tracking-tight leading-none">Scholar</span>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-1">Platform</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Search */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="w-full bg-slate-100/80 border border-slate-200/50 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500/30 focus:bg-white transition-all"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Menu</p>
            )}
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                >
                  <div className={`relative ${isActive ? '' : 'group-hover:scale-110 transition-transform duration-300'}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : ''}`} />
                    {item.name === 'Notifications' && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border border-white"></span>
                    )}
                  </div>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="text-sm font-semibold tracking-tight"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavTab"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"
                    />
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                      {item.name}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Bottom Items */}
        <div className="border-t border-slate-100 px-3 py-4">
          {!isCollapsed && (
            <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Account</p>
          )}
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'group-hover:scale-110 transition-transform duration-300'}`} />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm font-semibold tracking-tight"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Collapse Toggle */}
        <div className="hidden lg:block border-t border-slate-100 p-3">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="text-xs font-semibold">Collapse</span>
              </>
            )}
          </button>
        </div>
      </motion.nav>
    </>
  );
}
