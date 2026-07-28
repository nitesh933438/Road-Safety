/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Zap,
  Navigation,
  MapPin,
  Clock,
  AlertTriangle,
  Hospital,
  Shield,
  Fuel,
  Phone,
  Users,
  Sparkles,
  ArrowRight,
  Share2,
  CheckCircle2,
  Compass,
  Car,
  Bike,
  Sun,
  Moon,
  CloudRain,
  Award,
  Info,
  Check,
  RefreshCw
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../../context/ThemeContext';
import toast from 'react-hot-toast';

export interface RouteOption {
  id: 'safest' | 'fastest' | 'shortest';
  title: string;
  badge: string;
  color: 'green' | 'blue' | 'orange';
  polylineColor: string;
  distance: string;
  travelTime: string;
  riskScore: number; // 0-100 (lower is safer)
  accidentProbability: string;
  hospitalsOnRoute: number;
  hospitalNames: string[];
  policeStations: number;
  policeNames: string[];
  petrolPumps: number;
  petrolNames: string[];
  emergencyContacts: string[];
  volunteerCoverage: string;
  aiRecommendation: string;
  safetyHighlights: string[];
  path: [number, number][];
}

const DESTINATION_PRESETS = [
  { name: "Indira Gandhi Int'l Airport (DEL)", lat: 28.5562, lng: 77.1000 },
  { name: "Cyber City, Gurugram (NH-48)", lat: 28.4950, lng: 77.0890 },
  { name: "AIIMS Apex Trauma Center, Delhi", lat: 28.5672, lng: 77.2100 },
  { name: "Connaught Place, Central Delhi", lat: 28.6315, lng: 77.2167 },
  { name: "Jaipur Highway Toll Plaza (NH-48)", lat: 28.3200, lng: 76.9000 },
  { name: "Noida Sector 62 IT Hub", lat: 28.6280, lng: 77.3649 },
];

export const AiSafeRoute: React.FC = () => {
  const { theme } = useTheme();
  const [startPoint, setStartPoint] = useState("Current GPS (NH-48 Km 142, Delhi)");
  const [destination, setDestination] = useState(DESTINATION_PRESETS[0].name);
  const [customDestInput, setCustomDestInput] = useState("");
  const [travelMode, setTravelMode] = useState<'car' | 'bike' | 'ambulance'>('car');
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night' | 'rain'>('night');
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedRouteId, setSelectedRouteId] = useState<'safest' | 'fastest' | 'shortest'>('safest');
  const [isNavigating, setIsNavigating] = useState(false);

  // Start coordinate: New Delhi NH-48
  const startPos: [number, number] = [28.6139, 77.2090];
  // End coordinate: Airport
  const destPos: [number, number] = [28.5562, 77.1000];

  // Mock Route Data matching user specification
  const routes: RouteOption[] = [
    {
      id: 'safest',
      title: 'Safest Route',
      badge: '🏆 AI Recommended • 78% Less Risk',
      color: 'green',
      polylineColor: '#10b981',
      distance: '24.5 km',
      travelTime: '32 mins',
      riskScore: 12,
      accidentProbability: '1.8%',
      hospitalsOnRoute: 4,
      hospitalNames: ['Apex Trauma Center', 'Civil Hospital NH-48', 'Max Super Speciality', 'Red Cross ER'],
      policeStations: 3,
      policeNames: ['NH-48 Highway Control', 'Mahipalpur Police Post', 'Airport Security Unit'],
      petrolPumps: 5,
      petrolNames: ['IndianOil 24/7 EV Hub', 'Bharat Petroleum', 'HP Highway Auto Care'],
      emergencyContacts: ['National Emergency (112)', 'Patrol Unit 4 (+91 98765 43210)', 'Trauma Control Room'],
      volunteerCoverage: '18 Active Good Samaritan Volunteers within 500m',
      aiRecommendation:
        'Highly recommended for night travel. Fully lit 6-lane express corridor, 4 level-1 trauma wards, zero active black spots, and continuous AI Highway Patrol coverage.',
      safetyHighlights: [
        '100% Smart LED Street Lighting',
        'Zero High-Risk Black Spots on Corridor',
        'Automated AI Accident Radar Active'
      ],
      path: [
        [28.6139, 77.2090],
        [28.6000, 77.1950],
        [28.5850, 77.1700],
        [28.5700, 77.1400],
        [28.5600, 77.1200],
        [28.5562, 77.1000]
      ]
    },
    {
      id: 'fastest',
      title: 'Fastest Route',
      badge: '⚡ Fastest • 10 Mins Faster',
      color: 'blue',
      polylineColor: '#3b82f6',
      distance: '21.2 km',
      travelTime: '22 mins',
      riskScore: 42,
      accidentProbability: '7.4%',
      hospitalsOnRoute: 2,
      hospitalNames: ['LifeLine General Hospital', 'Sub-District Health Clinic'],
      policeStations: 2,
      policeNames: ['Traffic Circle Post 3'],
      petrolPumps: 3,
      petrolNames: ['HP Fuel Hub', 'Shell Expressway Station'],
      emergencyContacts: ['National Emergency (112)', 'Highway Traffic Patrol'],
      volunteerCoverage: '8 Active Good Samaritan Volunteers along route',
      aiRecommendation:
        'Fastest route via elevated expressway. Higher speed limits (100 km/h) increase crash risk. Recommended during daylight hours.',
      safetyHighlights: [
        'High-Speed Elevated Express Lane',
        '2 Active Speed Cameras Monitor Flow',
        'Moderate Medical Coverage'
      ],
      path: [
        [28.6139, 77.2090],
        [28.6100, 77.1800],
        [28.5800, 77.1500],
        [28.5650, 77.1250],
        [28.5562, 77.1000]
      ]
    },
    {
      id: 'shortest',
      title: 'Shortest Route',
      badge: '📍 Shortest • 4.8 KM Less',
      color: 'orange',
      polylineColor: '#f97316',
      distance: '19.7 km',
      travelTime: '27 mins',
      riskScore: 68,
      accidentProbability: '15.2%',
      hospitalsOnRoute: 1,
      hospitalNames: ['Primary Health Post (Closes 10 PM)'],
      policeStations: 1,
      policeNames: ['Rural Outpost'],
      petrolPumps: 2,
      petrolNames: ['Local Pump (Cash Only)'],
      emergencyContacts: ['National Emergency (112)'],
      volunteerCoverage: '2 Active Volunteers nearby',
      aiRecommendation:
        'Passes through 2 unlit village stretches and 1 known accident black spot. Caution advised during rain or night travel.',
      safetyHighlights: [
        'Contains 1 Known High-Accident Blackspot',
        'Dimly Lit Secondary Arterial Road',
        'Limited Night Emergency Medical Support'
      ],
      path: [
        [28.6139, 77.2090],
        [28.5900, 77.2000],
        [28.5750, 77.1600],
        [28.5620, 77.1300],
        [28.5562, 77.1000]
      ]
    }
  ];

  const activeRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
      toast.success('AI calculated 3 multi-vector safety routes!');
    }, 1200);
  };

  const handleStartNavigation = () => {
    setIsNavigating(true);
    toast.success(`Started AI Safe Navigation via ${activeRoute.title}!`);
  };

  const handleShareRoute = () => {
    navigator.clipboard.writeText(
      `GoldenGuard Live Safe Route: ${activeRoute.title} to ${destination} (Risk Score: ${activeRoute.riskScore}/100)`
    );
    toast.success('Live AI Safe Route link copied to clipboard!');
  };

  // Custom Map Markers
  const startIcon = L.divIcon({
    className: 'custom-start-marker',
    html: `<div style="background-color: #2563eb; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">A</div>`,
    iconSize: [28, 28],
  });

  const destIcon = L.divIcon({
    className: 'custom-dest-marker',
    html: `<div style="background-color: #dc2626; width: 28px; height: 28px; border-radius: 50%; border: 3px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">B</div>`,
    iconSize: [28, 28],
  });

  return (
    <div className="space-y-8">
      {/* Top Header Card */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 dark:from-emerald-950 dark:via-slate-900 dark:to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-emerald-400/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-400/10 pointer-events-none blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-300/30 text-emerald-200 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin" />
            <span>AI Predictive Multi-Vector Navigation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            AI Safe Route Generator
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
            Select your destination to evaluate real-time crash risks, emergency hospital proximity, police coverage, black spots, and active Good Samaritan networks along three optimized paths.
          </p>
        </div>
      </div>

      {/* Destination & Mode Selection Form */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Start Point */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>Current Origin Point</span>
            </label>
            <input
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
            />
          </div>

          {/* Destination Selector */}
          <div className="lg:col-span-5 space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center space-x-1.5">
              <Navigation className="w-4 h-4 text-rose-500" />
              <span>Select Destination</span>
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all cursor-pointer"
            >
              {DESTINATION_PRESETS.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  📍 {preset.name}
                </option>
              ))}
            </select>
          </div>

          {/* Calculate Button */}
          <div className="lg:col-span-2 flex items-end">
            <button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
            >
              {isCalculating ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Compass className="w-5 h-5" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Travel Mode & Time Presets */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Vehicle:</span>
            {[
              { id: 'car', label: 'Car / SUV', icon: Car },
              { id: 'bike', label: 'Two Wheeler', icon: Bike },
              { id: 'ambulance', label: 'Emergency Vehicle', icon: Hospital },
            ].map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  onClick={() => setTravelMode(mode.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                    travelMode === mode.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">Condition:</span>
            {[
              { id: 'day', label: 'Daylight', icon: Sun },
              { id: 'night', label: 'Night Drive', icon: Moon },
              { id: 'rain', label: 'Monsoon Rain', icon: CloudRain },
            ].map((cond) => {
              const Icon = cond.icon;
              return (
                <button
                  key={cond.id}
                  onClick={() => setTimeOfDay(cond.id as any)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
                    timeOfDay === cond.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cond.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Map Display */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80">
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Compass className="w-5 h-5 text-emerald-400 animate-spin" />
            <span className="font-extrabold text-xs uppercase tracking-wider">
              AI Multi-Route Map Visualization • Destination: {destination}
            </span>
          </div>
          <div className="flex items-center space-x-3 text-xs font-bold">
            <span className="flex items-center space-x-1 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Safest</span>
            </span>
            <span className="flex items-center space-x-1 text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
              <span>Fastest</span>
            </span>
            <span className="flex items-center space-x-1 text-orange-400">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 inline-block" />
              <span>Shortest</span>
            </span>
          </div>
        </div>

        <div className="h-[380px] sm:h-[440px] w-full relative z-0">
          <MapContainer
            center={[28.5850, 77.1500]}
            zoom={12}
            zoomControl={true}
            className="w-full h-full"
            style={{ background: theme === 'dark' ? '#0f172a' : '#f8fafc' }}
          >
            <TileLayer
              url={
                theme === 'dark'
                  ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
                  : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              }
              attribution="&copy; OpenStreetMap & CARTO"
            />

            {/* Render all three routes with selected highlighted */}
            {routes.map((rt) => {
              const isSelected = rt.id === selectedRouteId;
              return (
                <Polyline
                  key={rt.id}
                  positions={rt.path}
                  pathOptions={{
                    color: rt.polylineColor,
                    weight: isSelected ? 7 : 3.5,
                    opacity: isSelected ? 0.95 : 0.4,
                    dashArray: isSelected ? undefined : '6, 8'
                  }}
                  eventHandlers={{
                    click: () => setSelectedRouteId(rt.id)
                  }}
                >
                  <Popup>
                    <div className="p-1 font-bold text-xs">
                      <div style={{ color: rt.polylineColor }}>{rt.title}</div>
                      <div>Distance: {rt.distance} ({rt.travelTime})</div>
                      <div>Risk Score: {rt.riskScore}/100</div>
                    </div>
                  </Popup>
                </Polyline>
              );
            })}

            {/* Start Marker */}
            <Marker position={startPos} icon={startIcon}>
              <Popup><b className="text-blue-600">Origin:</b> {startPoint}</Popup>
            </Marker>

            {/* Destination Marker */}
            <Marker position={destPos} icon={destIcon}>
              <Popup><b className="text-red-600">Destination:</b> {destination}</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* THREE ROUTE CARDS: Green (Safest), Blue (Fastest), Orange (Shortest) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Evaluated Route Comparison</span>
          </h3>
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
            Click any card to inspect on map
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {routes.map((route) => {
            const isSelected = route.id === selectedRouteId;
            const isSafest = route.id === 'safest';
            const isFastest = route.id === 'fastest';

            // Theme colors per route
            const borderStyle =
              route.color === 'green'
                ? isSelected
                  ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/20 shadow-emerald-500/10'
                  : 'border border-emerald-300 dark:border-emerald-800/60'
                : route.color === 'blue'
                ? isSelected
                  ? 'border-2 border-blue-500 ring-4 ring-blue-500/20 shadow-blue-500/10'
                  : 'border border-blue-200 dark:border-blue-900/60'
                : isSelected
                ? 'border-2 border-orange-500 ring-4 ring-orange-500/20 shadow-orange-500/10'
                : 'border border-orange-200 dark:border-orange-900/60';

            const headerBg =
              route.color === 'green'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                : route.color === 'blue'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white';

            return (
              <motion.div
                key={route.id}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedRouteId(route.id)}
                className={`bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl transition-all cursor-pointer flex flex-col justify-between ${borderStyle} ${
                  isSafest ? 'relative' : ''
                }`}
              >
                {/* Safest Highlight Badge */}
                {isSafest && (
                  <div className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase tracking-widest text-center py-1 flex items-center justify-center space-x-1 shadow-md">
                    <Award className="w-3.5 h-3.5 text-slate-900" />
                    <span>AI Recommended Safe Passage</span>
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className={`p-5 ${headerBg} flex items-center justify-between`}>
                    <div>
                      <div className="flex items-center space-x-2">
                        {route.color === 'green' && <ShieldCheck className="w-5 h-5 text-white" />}
                        {route.color === 'blue' && <Zap className="w-5 h-5 text-white" />}
                        {route.color === 'orange' && <Navigation className="w-5 h-5 text-white" />}
                        <h4 className="font-extrabold text-lg">{route.title}</h4>
                      </div>
                      <span className="text-[11px] font-bold opacity-90 block mt-1">
                        {route.badge}
                      </span>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-black">{route.travelTime}</div>
                      <div className="text-xs font-semibold opacity-85">{route.distance}</div>
                    </div>
                  </div>

                  {/* Body Metrics Grid */}
                  <div className="p-5 space-y-4 text-xs text-slate-700 dark:text-slate-300">
                    {/* Key AI Safety Indicator */}
                    <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Risk Score</span>
                        <div className="flex items-baseline space-x-1">
                          <span
                            className={`text-xl font-black ${
                              route.riskScore < 25
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : route.riskScore < 50
                                ? 'text-blue-600 dark:text-blue-400'
                                : 'text-orange-600 dark:text-orange-400'
                            }`}
                          >
                            {route.riskScore}
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">/100</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Accident Prob.</span>
                        <span
                          className={`text-base font-black ${
                            route.riskScore < 25
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : route.riskScore < 50
                              ? 'text-blue-600 dark:text-blue-400'
                              : 'text-orange-600 dark:text-orange-400'
                          }`}
                        >
                          {route.accidentProbability}
                        </span>
                      </div>
                    </div>

                    {/* Proximity & Infrastructure Breakdown */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/40">
                        <span className="flex items-center space-x-1.5 font-semibold text-slate-600 dark:text-slate-300">
                          <Hospital className="w-3.5 h-3.5 text-rose-500" />
                          <span>Hospitals on Route:</span>
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{route.hospitalsOnRoute} Trauma ERs</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/40">
                        <span className="flex items-center space-x-1.5 font-semibold text-slate-600 dark:text-slate-300">
                          <Shield className="w-3.5 h-3.5 text-indigo-500" />
                          <span>Police Stations:</span>
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{route.policeStations} Patrol Posts</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/40">
                        <span className="flex items-center space-x-1.5 font-semibold text-slate-600 dark:text-slate-300">
                          <Fuel className="w-3.5 h-3.5 text-amber-500" />
                          <span>Petrol Pumps:</span>
                        </span>
                        <span className="font-bold text-slate-900 dark:text-white">{route.petrolPumps} Stations</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/50 dark:bg-slate-900/40">
                        <span className="flex items-center space-x-1.5 font-semibold text-slate-600 dark:text-slate-300">
                          <Users className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Volunteer Coverage:</span>
                        </span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] truncate max-w-[140px]">
                          {route.volunteerCoverage}
                        </span>
                      </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                      <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-blue-500" />
                        <span>Emergency Contacts</span>
                      </span>
                      <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                        {route.emergencyContacts.join(' • ')}
                      </p>
                    </div>

                    {/* AI Recommendation Box */}
                    <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-1">
                      <div className="flex items-center space-x-1 text-indigo-700 dark:text-indigo-300 font-extrabold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                        <span>AI Route Recommendation</span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        "{route.aiRecommendation}"
                      </p>
                    </div>
                  </div>
                </div>

                {/* Select / Navigate Footer */}
                <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-700/60">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRouteId(route.id);
                      handleStartNavigation();
                    }}
                    className={`w-full py-2.5 px-4 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                      isSelected
                        ? route.color === 'green'
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : route.color === 'blue'
                          ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                          : 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-600/30'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300'
                    }`}
                  >
                    <span>{isSelected ? 'Start Navigation' : 'Select This Route'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Live Navigation & Action Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-300/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
              Selected: {activeRoute.title} ({activeRoute.distance} • {activeRoute.travelTime})
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Live AI telemetry telemetry active • Emergency response units briefed on path.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <button
            onClick={handleShareRoute}
            className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center space-x-2 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Route</span>
          </button>

          <button
            onClick={handleStartNavigation}
            className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition-all transform active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>Launch Live GPS Guide</span>
          </button>
        </div>
      </div>
    </div>
  );
};
