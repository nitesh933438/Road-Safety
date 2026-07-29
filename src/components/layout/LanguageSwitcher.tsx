/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English (US)', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी (India)', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
];

export const LanguageSwitcher: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const saved = localStorage.getItem('goldenguard_lang');
    if (saved) {
      const match = LANGUAGES.find(l => l.code === saved);
      if (match) return match;
    }
    return LANGUAGES[0];
  });

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('goldenguard_lang', lang.code);
    setIsOpen(false);
    toast.success(`Language set to ${lang.nativeName}`, { icon: lang.flag });
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Switch Language"
        className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-all border border-slate-200/60 dark:border-slate-800 focus:outline-none"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="hidden xl:inline uppercase tracking-wider">{currentLang.code}</span>
        <Globe className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-2xl glass border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 overflow-hidden"
          >
            <div className="px-3 py-1.5 border-b border-slate-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Select Language
            </div>
            <div className="py-1">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === currentLang.code;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => handleSelectLanguage(lang)}
                    className={`w-full px-3 py-2 text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                      isSelected 
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.nativeName}</span>
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
