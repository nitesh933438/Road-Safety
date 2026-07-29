/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Building2,
  Shield,
  Heart,
  User,
  AlertTriangle,
  BookOpen,
  Phone,
  MapPin,
  Compass,
  ArrowRight,
  Clock,
  Sparkles,
  ShieldAlert,
  Bot,
  Layers,
  History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Hospital' | 'Police' | 'Volunteer' | 'User' | 'Report' | 'Road Hazard' | 'AI Article' | 'Training' | 'Emergency Contact' | 'City' | 'Highway' | 'Page';
  url: string;
  icon: React.ElementType;
  tags: string[];
}

const SEARCH_DATABASE: SearchItem[] = [
  // Hospitals
  { id: 'h1', title: 'Apex Level-1 Trauma Centre', subtitle: 'NH-48 Highway Junction • 14 Trauma ICU Beds & Helipad', category: 'Hospital', url: '/map?filter=hospital', icon: Building2, tags: ['hospital', 'trauma', 'emergency', 'icu', 'er'] },
  { id: 'h2', title: 'Apollo Emergency & Heart Institute', subtitle: 'Outer Ring Road Sector 4 • 24/7 Cardiac ER Unit', category: 'Hospital', url: '/map?filter=hospital', icon: Building2, tags: ['hospital', 'cardiac', 'apollo', 'er'] },
  { id: 'h3', title: 'AIIMS Central Trauma Center', subtitle: 'Ansari Nagar, New Delhi • Level 1 Trauma Care', category: 'Hospital', url: '/map?filter=hospital', icon: Building2, tags: ['hospital', 'aiims', 'trauma', 'government'] },
  { id: 'h4', title: 'Fortis Emergency & Critical Care', subtitle: 'Golf Course Road, Gurgaon • Blood Bank & ICU', category: 'Hospital', url: '/map?filter=hospital', icon: Building2, tags: ['hospital', 'fortis', 'emergency', 'blood'] },

  // Police Stations
  { id: 'p1', title: 'Central Traffic Control Command', subtitle: 'Connaught Place HQ • Expressway Traffic Patrol Dispatch', category: 'Police', url: '/map?filter=police', icon: Shield, tags: ['police', 'traffic', 'command', 'helpline'] },
  { id: 'p2', title: 'NH-48 Highway Police Post', subtitle: 'Mile Marker 34 • Rapid Highway Intercept Unit', category: 'Police', url: '/map?filter=police', icon: Shield, tags: ['police', 'highway', 'patrol', 'nh48'] },
  { id: 'p3', title: 'Outer Ring Road Police Desk', subtitle: 'Flyover Junction Sector 12 • Traffic Incident Unit', category: 'Police', url: '/map?filter=police', icon: Shield, tags: ['police', 'ring road', 'station'] },

  // Volunteers
  { id: 'v1', title: 'Dr. Priya Singh (CPR Certified)', subtitle: 'Samaritan Lead • Medical Doctor • 0.8 km away', category: 'Volunteer', url: '/samaritan', icon: Heart, tags: ['volunteer', 'cpr', 'doctor', 'samaritan'] },
  { id: 'v2', title: 'Capt. Rajesh Kumar (Rescue Squad)', subtitle: 'Ex-Army First Responder • First Aid Certified • 1.2 km away', category: 'Volunteer', url: '/samaritan', icon: Heart, tags: ['volunteer', 'rescue', 'army', 'first aid'] },
  { id: 'v3', title: 'Samaritan Volunteer Rescue Squad', subtitle: 'Active 24/7 Community First Aid & Hemorrhage Unit', category: 'Volunteer', url: '/samaritan', icon: Heart, tags: ['volunteer', 'squad', 'community'] },

  // Emergency Contacts
  { id: 'c1', title: '108 National Ambulance Emergency', subtitle: 'Free Medical Ambulance Service Dispatch', category: 'Emergency Contact', url: '/sos', icon: Phone, tags: ['108', 'ambulance', 'call', 'medical', 'emergency'] },
  { id: 'c2', title: '112 Unified Emergency Helpline', subtitle: 'National Police, Fire & Medical Control', category: 'Emergency Contact', url: '/sos', icon: Phone, tags: ['112', 'police', 'fire', 'national helpline'] },
  { id: 'c3', title: '1033 National Highway Toll-Free Helpline', subtitle: 'Expressway Breakdown & Accident Towing Service', category: 'Emergency Contact', url: '/sos', icon: Phone, tags: ['1033', 'highway', 'towing', 'breakdown'] },

  // Training Courses
  { id: 't1', title: 'Basic Life Support & CPR Certification', subtitle: 'Interactive 15-min Course • Earn Golden Samaritan Badge', category: 'Training', url: '/training', icon: BookOpen, tags: ['cpr', 'training', 'bls', 'certificate', 'course'] },
  { id: 't2', title: 'Emergency Hemorrhage & Bleeding Control', subtitle: 'Learn Tourniquet application & Wound Packing', category: 'Training', url: '/training', icon: BookOpen, tags: ['cpr', 'bleeding', 'tourniquet', 'trauma', 'training'] },
  { id: 't3', title: 'Good Samaritan Legal Immunity Protection', subtitle: 'Understand Section 134A Motor Vehicles Act rights', category: 'Training', url: '/training', icon: BookOpen, tags: ['samaritan', 'law', 'legal', 'training'] },

  // Road Hazards
  { id: 'rz1', title: 'Deep Pothole & Damaged Barrier', subtitle: 'NH-48 Km 28 Outer Lane • Caution Advised', category: 'Road Hazard', url: '/hazards', icon: AlertTriangle, tags: ['hazard', 'pothole', 'road', 'nh48', 'accident'] },
  { id: 'rz2', title: 'Dense Fog Zone Alert', subtitle: 'Yamuna Expressway Km 45 • Visibility < 50 meters', category: 'Road Hazard', url: '/hazards', icon: AlertTriangle, tags: ['hazard', 'fog', 'yamuna expressway', 'visibility'] },

  // AI Articles & Guidelines
  { id: 'ai1', title: 'AI Golden Hour Survival Guide', subtitle: 'Step-by-step Triage for bystanders before ambulance arrival', category: 'AI Article', url: '/ai-assistant', icon: Bot, tags: ['ai', 'golden hour', 'first aid', 'guide', 'cpr'] },
  { id: 'ai2', title: 'Automated AI Accident Risk Prediction', subtitle: 'Real-time weather, blackspot, & speed hazard analysis', category: 'AI Article', url: '/ai-prediction', icon: Sparkles, tags: ['ai', 'prediction', 'risk', 'guardian'] },

  // Cities
  { id: 'ct1', title: 'Delhi NCR Metropolitan Zone', subtitle: '18 Level-1 Trauma Centers • 42 Traffic Police Stations', category: 'City', url: '/map', icon: MapPin, tags: ['delhi', 'ncr', 'city', 'location'] },
  { id: 'ct2', title: 'Gurgaon Cyber City & NH-48 Corridor', subtitle: '12 Emergency Hospitals • Expressway Rescue Post', category: 'City', url: '/map', icon: MapPin, tags: ['gurgaon', 'city', 'nh48'] },

  // Highways
  { id: 'hw1', title: 'NH-48 National Highway Expressway', subtitle: 'High-speed corridor • 4 Blackspot alerts active', category: 'Highway', url: '/risk-layer', icon: Compass, tags: ['nh48', 'highway', 'expressway'] },
  { id: 'hw2', title: 'Yamuna Expressway (Greater Noida - Agra)', subtitle: '165 km concrete highway • Fog alert active', category: 'Highway', url: '/risk-layer', icon: Compass, tags: ['yamuna expressway', 'highway', 'agra'] },

  // Direct Pages
  { id: 'pg1', title: 'SOS Emergency Triage Center', subtitle: 'One-Tap Panic Button, Live GPS & AI First Aid', category: 'Page', url: '/sos', icon: ShieldAlert, tags: ['sos', 'emergency', 'panic', 'help'] },
  { id: 'pg2', title: 'AI Driving Guardian Mode', subtitle: 'Live Driver Drowsiness & Crash Detection System', category: 'Page', url: '/guardian', icon: ShieldAlert, tags: ['guardian', 'driving', 'drowsiness', 'crash'] },
  { id: 'pg3', title: 'AI Safe Route Navigation', subtitle: 'Safest highway path minimizing accident risk spots', category: 'Page', url: '/safe-route', icon: Compass, tags: ['safe route', 'navigation', 'route', 'map'] }
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('goldenguard_recent_searches');
      return saved ? JSON.parse(saved) : ['Hospital', 'CPR', 'SOS', 'Police', 'Volunteer', 'Hazard'];
    } catch {
      return ['Hospital', 'CPR', 'SOS', 'Police', 'Volunteer', 'Hazard'];
    }
  });

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const saveRecentSearch = (term: string) => {
    const updated = [term, ...recentSearches.filter(s => s.toLowerCase() !== term.toLowerCase())].slice(0, 8);
    setRecentSearches(updated);
    try {
      localStorage.setItem('goldenguard_recent_searches', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleClearRecents = () => {
    setRecentSearches([]);
    localStorage.removeItem('goldenguard_recent_searches');
  };

  const handleSelectResult = (item: SearchItem) => {
    saveRecentSearch(item.title);
    onClose();
    navigate(item.url);
  };

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    return SEARCH_DATABASE.filter(item => {
      const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchQuery =
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q));
      return matchCategory && matchQuery;
    });
  }, [query, selectedCategory]);

  const categories = ['All', 'Hospital', 'Police', 'Volunteer', 'Emergency Contact', 'Training', 'Road Hazard', 'AI Article', 'City', 'Highway'];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-slate-900/60 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-3xl rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden bg-white/95 dark:bg-slate-900/95 flex flex-col max-h-[85vh]"
        >
          {/* Top Search Bar */}
          <div className="relative p-4 sm:p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center space-x-3">
            <Search className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hospitals, police, volunteers, CPR training, SOS, hazards..."
              className="w-full bg-transparent text-base sm:text-lg font-bold text-slate-900 dark:text-white outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              ESC
            </button>
          </div>

          {/* Quick Keywords Chips when Query is empty */}
          {!query && (
            <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
              {/* Popular Smart Quick Searches */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-400">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Popular Quick Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: '🏥 Nearby Hospitals', keyword: 'hospital' },
                    { label: '📚 CPR Training', keyword: 'CPR' },
                    { label: '🚨 SOS Emergency', keyword: 'SOS' },
                    { label: '🚓 Nearest Police', keyword: 'Police' },
                    { label: '🙋 Nearby Volunteers', keyword: 'Volunteer' },
                    { label: '⚠️ Road Hazards', keyword: 'Hazard' },
                  ].map((chip) => (
                    <button
                      key={chip.keyword}
                      type="button"
                      onClick={() => setQuery(chip.keyword)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800 hover:scale-105 transition-all"
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-slate-400">
                      <History className="w-3.5 h-3.5 text-slate-400" />
                      <span>Recent Searches</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleClearRecents}
                      className="text-[11px] font-bold text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center space-x-1.5"
                      >
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Items */}
              {filteredResults.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No matching search results</h4>
                  <p className="text-xs text-slate-500">Try searching for "Hospital", "CPR", "SOS", "Police", "Volunteer", or "Hazard".</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredResults.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSelectResult(item)}
                        className="w-full text-left p-3.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-indigo-50/80 dark:hover:bg-indigo-950/60 border border-slate-200/60 dark:border-slate-800 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-start space-x-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center space-x-2">
                              <h5 className="text-sm font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                                {item.title}
                              </h5>
                              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 shrink-0">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                              {item.subtitle}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 shrink-0 ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Footer Shortcuts hint */}
          <div className="p-3 bg-slate-100/60 dark:bg-slate-800/60 border-t border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between px-6">
            <div className="flex items-center space-x-3">
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-700 font-bold border border-slate-300 dark:border-slate-600">Ctrl + K</kbd> anytime to open global search</span>
            </div>
            <span className="font-bold text-indigo-600 dark:text-indigo-400">GoldenGuard Smart Index</span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
