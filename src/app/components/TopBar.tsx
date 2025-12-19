'use client';

import Link from 'next/link';
import { Bell, Maximize, Minimize, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TopBar() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  return (
    <div className="fixed top-0 right-0 z-[100] p-4 flex items-center gap-3">
      {/* Fullscreen Toggle */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 hover:border-indigo-300 transition-all"
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? (
          <Minimize className="w-5 h-5 text-slate-700" />
        ) : (
          <Maximize className="w-5 h-5 text-slate-700" />
        )}
      </motion.button>

      {/* Notifications */}
      <Link href="/notifications">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-3 bg-white rounded-xl shadow-lg border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
        >
          <Bell className="w-5 h-5 text-slate-700" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </motion.div>
      </Link>

      {/* User Profile */}
      <Link href="/profile">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white rounded-xl shadow-lg border border-slate-200 hover:border-indigo-300 transition-all cursor-pointer"
        >
          <User className="w-5 h-5 text-slate-700" />
        </motion.div>
      </Link>
    </div>
  );
}
