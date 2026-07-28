/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Flame,
  CloudRain,
  AlertTriangle,
  Thermometer,
  Eye,
  CloudFog,
  Activity,
  Gauge,
  Sparkles,
  MapPin,
  Car,
  Search,
  CheckCircle2,
  Info,
  Layers,
  Wind,
  Sun,
  Zap,
  ChevronRight,
  Shield,
  Sliders,
  Compass,
  Construction,
  Umbrella,
  ZapOff
} from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '../../context/ThemeContext';
import {
  MOCK_DETAILED_BLACK_SPOTS,
  MOCK_HEATMAP_POINTS,
  MOCK_ROAD_CONDITIONS,
  MOCK_WEATHER_TELEMETRY,
  BlackSpotDetail,
  RoadConditionZone
} from '../../data/riskLayerData';

export const SmartRiskLayer: React.FC = () => {
  const { theme } = useTheme();

  // Layer Toggles
  const [showBlackSpots, setShowBlackSpots] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showWeatherLayer, setShowWeatherLayer] = useState(true);
  const [showRoadConditions, setShowRoadConditions] = useState(true);

  // Active Selected Item
  const [selectedSpotId, setSelectedSpotId] = useState<string>('bs-101');
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'All' | 'Critical' | 'High' | 'Medium'>('All');

  const selectedSpot =
    MOCK_DETAILED_BLACK_SPOTS.find((spot) => spot.id === selectedSpotId) ||
    MOCK_DETAILED_BLACK_SPOTS[0];

  const filteredSpots = MOCK_DETAILED_BLACK_SPOTS.filter((spot) => {
    const matchesSearch =
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.mainCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.cityZone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (spot.highwayName && spot.highwayName.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSeverity =
      severityFilter === 'All' || spot.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });

  // Custom Marker Icons for Leaflet
  const createBlackSpotIcon = (severity: string, riskScore: number) => {
    const bgColor =
      severity === 'Critical'
        ? '#ef4444'
        : severity === 'High'
        ? '#f97316'
        : severity === 'Medium'
        ? '#eab308'
        : '#10b981';

    return L.divIcon({
      className: 'custom-blackspot-icon',
      html: `
        <div style="
          background-color: ${bgColor};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 900;
          font-size: 11px;
        ">
          ${riskScore}
        </div>
      `,
      iconSize: [32, 32],
    });
  };

  const createHazardIcon = (type: string) => {
    const symbol =
      type === 'slippery'
        ? '🌧️'
        : type === 'construction'
        ? '🚧'
        : type === 'potholes'
        ? '⚠️'
        : '💡';

    return L.divIcon({
      className: 'custom-hazard-icon',
      html: `
        <div style="
          background-color: #334155;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: 2px solid #38bdf8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        ">
          ${symbol}
        </div>
      `,
      iconSize: [28, 28],
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 dark:from-rose-950 dark:via-slate-900 dark:to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-rose-400/20">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-rose-400/10 pointer-events-none blur-3xl" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 backdrop-blur-md border border-rose-300/30 text-rose-200 text-xs font-black uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-rose-300 animate-pulse" />
            <span>AI Smart Intelligence Overlay</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Smart Risk Layer & Live Hazard Radar
          </h2>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Multi-vector GIS radar overlaying high-frequency accident black spots, density heatmaps, real-time weather telemetry, and road hazard conditions.
          </p>
        </div>
      </div>

      {/* Layer Controls Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <Sliders className="w-5 h-5 text-indigo-500" />
            <span className="font-extrabold text-sm uppercase tracking-wider text-slate-800 dark:text-slate-200">
              Active Radar Layers:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full sm:w-auto">
            {/* Black Spots Toggle */}
            <button
              onClick={() => setShowBlackSpots(!showBlackSpots)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                showBlackSpots
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Black Spots</span>
            </button>

            {/* Heatmap Toggle */}
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                showHeatmap
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Risk Heatmap</span>
            </button>

            {/* Weather Layer Toggle */}
            <button
              onClick={() => setShowWeatherLayer(!showWeatherLayer)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                showWeatherLayer
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <CloudRain className="w-4 h-4" />
              <span>Weather Layer</span>
            </button>

            {/* Road Condition Toggle */}
            <button
              onClick={() => setShowRoadConditions(!showRoadConditions)}
              className={`px-3.5 py-2.5 rounded-2xl text-xs font-black flex items-center justify-center space-x-2 transition-all ${
                showRoadConditions
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              <Construction className="w-4 h-4" />
              <span>Road Hazards</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Map & Live Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Map Column */}
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-rose-500 animate-spin" />
                <span className="font-extrabold text-xs uppercase tracking-wider">
                  Live GIS Map • Delhi-NCR Corridor
                </span>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-black uppercase text-slate-300">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping inline-block" />
                <span>Real-Time Radar</span>
              </div>
            </div>

            <div className="h-[460px] sm:h-[520px] w-full relative z-0">
              <MapContainer
                center={[28.6139, 77.2090]}
                zoom={11}
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

                {/* 1. HEATMAP LAYER */}
                {showHeatmap &&
                  MOCK_HEATMAP_POINTS.map((pt) => {
                    const color =
                      pt.riskLevel === 'Severe'
                        ? '#ef4444'
                        : pt.riskLevel === 'High'
                        ? '#f97316'
                        : '#eab308';

                    return (
                      <CircleMarker
                        key={pt.id}
                        center={[pt.lat, pt.lng]}
                        radius={pt.radius}
                        pathOptions={{
                          fillColor: color,
                          fillOpacity: 0.35,
                          color: color,
                          weight: 1.5,
                        }}
                      >
                        <Popup>
                          <div className="p-1 font-bold text-xs space-y-1">
                            <div className="text-rose-600 font-extrabold">{pt.label}</div>
                            <div>Risk Level: {pt.riskLevel}</div>
                            <div>Intensity Factor: {(pt.intensity * 100).toFixed(0)}%</div>
                          </div>
                        </Popup>
                      </CircleMarker>
                    );
                  })}

                {/* 2. ACCIDENT BLACK SPOTS LAYER */}
                {showBlackSpots &&
                  MOCK_DETAILED_BLACK_SPOTS.map((spot) => (
                    <Marker
                      key={spot.id}
                      position={[spot.lat, spot.lng]}
                      icon={createBlackSpotIcon(spot.severity, spot.riskScore)}
                      eventHandlers={{
                        click: () => setSelectedSpotId(spot.id),
                      }}
                    >
                      <Popup>
                        <div className="p-1.5 space-y-1 max-w-[200px]">
                          <div className="font-black text-xs text-slate-900">{spot.name}</div>
                          <div className="text-[11px] font-bold text-rose-600">
                            Risk Score: {spot.riskScore}/100 ({spot.severity})
                          </div>
                          <div className="text-[10px] text-slate-600">{spot.mainCause}</div>
                          <button
                            onClick={() => setSelectedSpotId(spot.id)}
                            className="mt-2 w-full py-1 bg-rose-600 text-white rounded text-[10px] font-bold"
                          >
                            Inspect Details
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}

                {/* 3. ROAD CONDITION HAZARDS LAYER */}
                {showRoadConditions &&
                  MOCK_ROAD_CONDITIONS.map((hazard) => (
                    <Marker
                      key={hazard.id}
                      position={[hazard.lat, hazard.lng]}
                      icon={createHazardIcon(hazard.type)}
                    >
                      <Popup>
                        <div className="p-1 text-xs">
                          <b className="text-amber-600">{hazard.name}</b>
                          <p className="text-[11px] text-slate-600 mt-1">{hazard.description}</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>
          </div>

          {/* WEATHER TELEMETRY PANEL */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-extrabold">
                  <CloudRain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    Live Weather & Road Telemetry
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {MOCK_WEATHER_TELEMETRY.location}
                  </span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border border-blue-300/40">
                {MOCK_WEATHER_TELEMETRY.updatedAt}
              </span>
            </div>

            {/* 6 Grid Metrics Required by Prompt */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {/* Temperature */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-500" />
                  <span>Temperature</span>
                </span>
                <div className="text-lg font-black text-slate-900 dark:text-white">
                  {MOCK_WEATHER_TELEMETRY.temperature}
                </div>
              </div>

              {/* Rain */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <Umbrella className="w-3.5 h-3.5 text-blue-500" />
                  <span>Rain Level</span>
                </span>
                <div className="text-sm font-black text-blue-600 dark:text-blue-400">
                  {MOCK_WEATHER_TELEMETRY.rain}
                </div>
              </div>

              {/* Visibility */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <Eye className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Visibility</span>
                </span>
                <div className="text-sm font-black text-slate-900 dark:text-white">
                  {MOCK_WEATHER_TELEMETRY.visibility}
                </div>
              </div>

              {/* Fog */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <CloudFog className="w-3.5 h-3.5 text-slate-500" />
                  <span>Fog Density</span>
                </span>
                <div className="text-sm font-black text-amber-600 dark:text-amber-400">
                  {MOCK_WEATHER_TELEMETRY.fogDensity}
                </div>
              </div>

              {/* Road Condition */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Road Condition</span>
                </span>
                <div className="text-xs font-black text-rose-600 dark:text-rose-400 truncate">
                  {MOCK_WEATHER_TELEMETRY.roadCondition}
                </div>
              </div>

              {/* Traffic Density */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center space-x-1">
                  <Car className="w-3.5 h-3.5 text-rose-500" />
                  <span>Traffic Density</span>
                </span>
                <div className="text-xs font-black text-slate-900 dark:text-white">
                  {MOCK_WEATHER_TELEMETRY.trafficDensity}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspection & Black Spot Details Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Detailed Card for Selected Black Spot */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300/40 mb-2">
                  <ShieldAlert className="w-3 h-3 text-rose-600 mr-1" />
                  <span>{selectedSpot.severity} Risk Black Spot</span>
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {selectedSpot.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {selectedSpot.cityZone} • {selectedSpot.highwayName || 'Arterial Road'}
                </p>
              </div>

              {/* Risk Score Gauge */}
              <div className="text-center p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-900/40 shrink-0">
                <span className="text-[10px] uppercase font-black text-slate-400 block">Risk Score</span>
                <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                  {selectedSpot.riskScore}
                </span>
                <span className="text-[10px] text-slate-400 block">/100</span>
              </div>
            </div>

            {/* Required Breakdown Attributes */}
            <div className="space-y-3 pt-2">
              {/* Accident Count & Fatalities */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Accident Count</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white">
                    {selectedSpot.accidentCount} Crashes
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-black uppercase text-slate-400 block">Fatalities Recorded</span>
                  <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                    {selectedSpot.fatalities} Lives Lost
                  </span>
                </div>
              </div>

              {/* Main Cause */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
                <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-400 tracking-wider flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Main Cause of Accidents</span>
                </span>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {selectedSpot.mainCause}
                </p>
              </div>

              {/* Last Incident */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                  Last Reported Incident
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {selectedSpot.lastIncident}
                </p>
              </div>

              {/* Suggested Speed */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-wider block">
                    Suggested Safe Speed Limit
                  </span>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Calculated for current rain/fog conditions
                  </span>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-sm shadow-md">
                  {selectedSpot.suggestedSpeed}
                </span>
              </div>

              {/* AI Recommendation */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border border-indigo-200/60 dark:border-indigo-900/40 space-y-2">
                <div className="flex items-center space-x-1.5 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs">
                  <Sparkles className="w-4 h-4 text-indigo-500 animate-spin" />
                  <span>AI Mitigation & Engineering Recommendation</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  "{selectedSpot.aiRecommendation}"
                </p>
              </div>
            </div>
          </div>

          {/* Black Spots Search & Selector List */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center space-x-2">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>Select Black Spot to Inspect</span>
              </h4>
              <span className="text-xs font-bold text-slate-400">
                {filteredSpots.length} Locations
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search location, cause or highway..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* List */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto no-scrollbar pr-1">
              {filteredSpots.map((spot) => {
                const isSelected = spot.id === selectedSpot.id;
                return (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedSpotId(spot.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-400 ring-2 ring-rose-500/20'
                        : 'bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center space-x-2">
                        <span>{spot.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                        {spot.accidentCount} Accidents • {spot.mainCause}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
                        {spot.riskScore}/100
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
