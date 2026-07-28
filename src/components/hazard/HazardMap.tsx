/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Filter,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Share2,
  MessageSquare,
  Sparkles,
  Search,
  ShieldAlert,
  X,
  Play,
  ExternalLink,
  Layers,
  Send
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../../context/ThemeContext';
import {
  RoadHazard,
  HazardSeverity,
  HazardType,
  HAZARD_TYPES_LIST
} from '../../data/roadHazardData';

interface HazardMapProps {
  hazards: RoadHazard[];
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  onMarkFixed: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
}

const getSeverityMarkerIcon = (severity: HazardSeverity) => {
  let bgColor = '#10b981'; // Low 🟢
  let emoji = '🟢';

  if (severity === 'Medium') {
    bgColor = '#eab308'; // 🟡
    emoji = '🟡';
  } else if (severity === 'High') {
    bgColor = '#f97316'; // 🟠
    emoji = '🟠';
  } else if (severity === 'Critical') {
    bgColor = '#ef4444'; // 🔴
    emoji = '🔴';
  }

  return L.divIcon({
    className: 'custom-hazard-marker',
    html: `
      <div style="
        background-color: ${bgColor};
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        cursor: pointer;
      ">
        ⚠️
      </div>
    `,
    iconSize: [32, 32],
  });
};

export const HazardMap: React.FC<HazardMapProps> = ({
  hazards,
  onUpvote,
  onDownvote,
  onMarkFixed,
  onAddComment,
}) => {
  const { theme } = useTheme();

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Selected Hazard Drawer State
  const [activeHazard, setActiveHazard] = useState<RoadHazard | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [shareToast, setShareToast] = useState(false);

  // Filter Logic
  const filteredHazards = hazards.filter((h) => {
    const matchesSearch =
      h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.type.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSeverity = selectedSeverity === 'All' || h.severity === selectedSeverity;
    const matchesType = selectedType === 'All' || h.type === selectedType;
    const matchesCity = selectedCity === 'All' || h.city === selectedCity;
    const matchesStatus = selectedStatus === 'All' || h.status === selectedStatus;

    return matchesSearch && matchesSeverity && matchesType && matchesCity && matchesStatus;
  });

  const handleShare = (h: RoadHazard) => {
    if (navigator.share) {
      navigator.share({
        title: `GoldenGuard Hazard Alert: ${h.type}`,
        text: `${h.type} reported at ${h.address}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.href}#${h.id}`);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 3000);
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeHazard) return;
    onAddComment(activeHazard.id, newCommentText.trim());
    setNewCommentText('');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-20 right-4 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-bold"
          >
            Hazard alert link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by street, pothole, manhole..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          {/* Quick Filter Counts */}
          <div className="flex items-center space-x-2 text-xs font-black">
            <span className="text-slate-500">Showing:</span>
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
              {filteredHazards.length} Active Pins
            </span>
          </div>
        </div>

        {/* Filter Dropdowns Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
              Severity
            </label>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="All">All Severities</option>
              <option value="Critical">🔴 Critical</option>
              <option value="High">🟠 High</option>
              <option value="Medium">🟡 Medium</option>
              <option value="Low">🟢 Low</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
              Hazard Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="All">All 15 Types</option>
              {HAZARD_TYPES_LIST.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
              City / Metropolitan Zone
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="All">All Cities</option>
              <option value="Delhi NCR">Delhi NCR</option>
              <option value="Gurugram">Gurugram</option>
              <option value="Noida">Noida</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase text-slate-400 block mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* MAP & DRAWER SPLIT CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        {/* LEAFLET MAP CONTAINER */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80 min-h-[500px] flex flex-col">
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Layers className="w-5 h-5 text-rose-500" />
              <span className="font-black text-xs uppercase tracking-wider">
                Live Interactive Hazard Map
              </span>
            </div>
            <div className="flex items-center space-x-3 text-[10px] font-bold">
              <span className="text-emerald-400">🟢 Low</span>
              <span className="text-yellow-400">🟡 Med</span>
              <span className="text-orange-400">🟠 High</span>
              <span className="text-rose-400">🔴 Critical</span>
            </div>
          </div>

          <div className="h-[520px] w-full relative z-0">
            <MapContainer center={[28.58, 77.22]} zoom={12} className="w-full h-full">
              <TileLayer
                url={
                  theme === 'dark'
                    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                }
                attribution="&copy; OpenStreetMap & CARTO"
              />

              {filteredHazards.map((hazard) => (
                <Marker
                  key={hazard.id}
                  position={[hazard.lat, hazard.lng]}
                  icon={getSeverityMarkerIcon(hazard.severity)}
                  eventHandlers={{
                    click: () => setActiveHazard(hazard),
                  }}
                >
                  <Popup>
                    <div className="p-1 max-w-xs space-y-2">
                      <div className="font-black text-xs text-rose-600">{hazard.type}</div>
                      <p className="text-[10px] text-slate-700 font-medium leading-tight">
                        {hazard.address}
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveHazard(hazard)}
                        className="w-full py-1 bg-slate-900 text-white rounded text-[10px] font-bold"
                      >
                        Inspect Hazard Details
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>

        {/* SIDE DRAWER / INSPECTOR PANEL */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-6 max-h-[580px] overflow-y-auto no-scrollbar">
          {activeHazard ? (
            <div className="space-y-5">
              <div className="flex items-start justify-between border-b border-slate-200/60 dark:border-slate-700/60 pb-3">
                <div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-white ${
                      activeHazard.severity === 'Critical'
                        ? 'bg-rose-600'
                        : activeHazard.severity === 'High'
                        ? 'bg-orange-600'
                        : activeHazard.severity === 'Medium'
                        ? 'bg-yellow-600'
                        : 'bg-emerald-600'
                    }`}
                  >
                    {activeHazard.severity} Hazard
                  </span>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base mt-1">
                    {activeHazard.type}
                  </h3>
                  <span className="text-[10px] text-slate-400 block">{activeHazard.address}</span>
                </div>

                <button
                  onClick={() => setActiveHazard(null)}
                  className="p-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-500 hover:text-slate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Photo & Video Media */}
              <div className="rounded-2xl overflow-hidden h-44 bg-slate-900 relative">
                <img
                  src={activeHazard.photoUrl}
                  alt={activeHazard.title}
                  className="w-full h-full object-cover"
                />
                {activeHazard.videoUrl && (
                  <a
                    href={activeHazard.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-extrabold text-[10px] flex items-center space-x-1"
                  >
                    <Play className="w-3 h-3" />
                    <span>Watch Video</span>
                  </a>
                )}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                {activeHazard.description}
              </p>

              {/* Verification % Meter & Actions */}
              {(() => {
                const total = activeHazard.upvotes + activeHazard.downvotes;
                const verifyPct = total > 0 ? Math.round((activeHazard.upvotes / total) * 100) : 100;
                return (
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 space-y-3">
                    <div className="flex items-center justify-between text-xs font-black">
                      <span className="text-slate-700 dark:text-slate-300">Community Verification</span>
                      <span className="text-emerald-600">{verifyPct}% Verified</span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all" style={{ width: `${verifyPct}%` }} />
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <button
                        onClick={() => onUpvote(activeHazard.id)}
                        className="py-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold hover:bg-emerald-200 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>{activeHazard.upvotes}</span>
                      </button>

                      <button
                        onClick={() => onDownvote(activeHazard.id)}
                        className="py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-300 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <ThumbsDown className="w-3.5 h-3.5" />
                        <span>{activeHazard.downvotes}</span>
                      </button>

                      <button
                        onClick={() => onMarkFixed(activeHazard.id)}
                        className="py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Fixed</span>
                      </button>
                    </div>
                  </div>
                );
              })()}

              {/* AI Diagnostic Summary Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <span className="text-[10px] font-black uppercase text-indigo-400 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>AI Repair Analysis</span>
                </span>
                <p className="text-[11px] text-slate-300 leading-snug">
                  {activeHazard.aiAnalysis.suggestedAction}
                </p>
              </div>

              {/* Comments Section */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center space-x-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>Community Notes ({activeHazard.comments.length})</span>
                  </span>

                  <button
                    onClick={() => handleShare(activeHazard)}
                    className="text-[10px] font-black uppercase text-rose-600 hover:underline flex items-center space-x-1 cursor-pointer"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>Share Hazard</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-32 overflow-y-auto no-scrollbar">
                  {activeHazard.comments.map((c) => (
                    <div key={c.id} className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-xs space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                        <span>{c.userName}</span>
                        <span>{c.timestamp}</span>
                      </div>
                      <p className="text-slate-800 dark:text-slate-200">{c.text}</p>
                    </div>
                  ))}
                </div>

                {/* Add Comment Input */}
                <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="Add verification update..."
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs"
                  />
                  <button
                    type="submit"
                    className="p-2 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-400 my-auto">
              <ShieldAlert className="w-12 h-12 text-slate-300 dark:text-slate-600" />
              <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                Select Any Pin on Map
              </h4>
              <p className="text-xs text-slate-400">
                Click any color-coded hazard marker to inspect Cloudinary media, community verifications, AI repair priorities, and upvote status.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
