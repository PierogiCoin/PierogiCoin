'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  // Zapobiegaj hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Zwróć placeholder podczas SSR
    return (
      <button
        className="p-2 rounded-full text-gray-400 hover:text-white transition-colors duration-300"
        aria-label="Przełącz motyw"
        disabled
      >
        <Moon size={20} />
      </button>
    );
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="group relative p-2 rounded-full text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-300 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/20 transition-all duration-300"
      aria-label={`Przełącz na ${currentTheme === 'dark' ? 'jasny' : 'ciemny'} motyw`}
    >
      <div className="relative w-5 h-5">
        {/* Animowane ikony */}
        <Sun 
          size={20} 
          className={`absolute inset-0 transition-all duration-500 text-amber-500 ${
            currentTheme === 'dark' 
              ? 'rotate-90 scale-0 opacity-0' 
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon 
          size={20} 
          className={`absolute inset-0 transition-all duration-500 text-slate-300 ${
            currentTheme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;