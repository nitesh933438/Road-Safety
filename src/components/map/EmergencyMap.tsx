/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Navigation, RefreshCw, ShieldAlert, WifiOff, MapPin } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { LocationMarker } from './LocationMarker';
import { MapControls } from './MapControls';
import { MapLegend } from './MapLegend';
import { EmergencyService, AccidentReport, BlackSpot, MOCK_SERVICES, MOCK_BLACK_SPOTS } from '../../data/mapData';

interface EmergencyMapProps {
  services?: EmergencyService[];
  reports?: AccidentReport[];
  blackSpots?: BlackSpot[];
  filters?: {
    hospitals: boolean;
    trauma: boolean;
    police: boolean;
    ambulance: boolean;
    blood: boolean;
    fire?: boolean;
    petrol?: boolean;
    reports: boolean;
    blackSpots: boolean;
  };
  searchQuery?: string;
  onSelectService?: (service: EmergencyService) => void;
  onSelectReport?: (report: AccidentReport) => void;
  onOpenReportModal?: () => void;
  className?: string;
}

// Map helper component to trigger map operations safely
const MapHelper: React.FC<{
  userPos: [number, number] | null;
  recenterTrigger: number;
  zoomInTrigger: number;
  zoomOutTrigger: number;
}> = ({ userPos, recenterTrigger, zoomInTrigger, zoomOutTrigger }) => {
  const map = useMap();

  useEffect(() => {
    if (recenterTrigger > 0 && userPos) {
      map.flyTo(userPos, 15, { animate: true, duration: 1.2 });
    }
  }, [recenterTrigger, userPos, map]);

  useEffect(() => {
    if (zoomInTrigger > 0) {
      map.zoomIn();
    }
  }, [zoomInTrigger, map]);

  useEffect(() => {
    if (zoomOutTrigger > 0) {
      map.zoomOut();
    }
  }, [zoomOutTrigger, map]);

  return null;
};

export const EmergencyMap: React.FC<EmergencyMapProps> = ({
  services = MOCK_SERVICES,
  reports = [],
  blackSpots = MOCK_BLACK_SPOTS,
  filters = {
    hospitals: true,
    trauma: true,
    police: true,
    ambulance: true,
    blood: true,
    fire: true,
    petrol: true,
    reports: true,
    blackSpots: true,
  },
  searchQuery = '',
  onSelectService,
  onSelectReport,
  onOpenReportModal,
  className = 'w-full h-full'
}) => {
  const { theme } = useTheme();
  const [mapStyle, setMapStyle] = useState<'light' | 'dark'>(() => theme === 'dark' ? 'dark' : 'light');

  // Keep map style in sync if theme changes
  useEffect(() => {
    setMapStyle(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  // GPS state
  const [userPos, setUserPos] = useState<[number, number] | null>([28.6139, 77.2090]); // Default: New Delhi NH-48
  const [accuracy, setAccuracy] = useState<number | null>(25);
  const [gpsStatus, setGpsStatus] = useState<'loading' | 'active' | 'denied' | 'error'>('loading');
  const [gpsErrorMessage, setGpsErrorMessage] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  // Animation triggers
  const [recenterCount, setRecenterCount] = useState(0);
  const [zoomInCount, setZoomInCount] = useState(0);
  const [zoomOutCount, setZoomOutCount] = useState(0);

  // Detect GPS position
  const requestGpsPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsStatus('error');
      setGpsErrorMessage('Geolocation is not supported by your browser.');
      return;
    }

    setGpsStatus('loading');
    setGpsErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude, accuracy: acc } = pos.coords;
        setUserPos([latitude, longitude]);
        setAccuracy(acc);
        setGpsStatus('active');
        setGpsErrorMessage(null);
      },
      (err) => {
        console.warn('GPS location request warning:', err.message);
        setGpsStatus('denied');
        if (err.code === err.PERMISSION_DENIED) {
          setGpsErrorMessage('GPS permission was denied. Defaulting to Central Emergency Corridor.');
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsErrorMessage('Location information is currently unavailable.');
        } else {
          setGpsErrorMessage('Location request timed out. Using cached default position.');
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );
  }, []);

  // Initial GPS detection
  useEffect(() => {
    requestGpsPosition();
  }, [requestGpsPosition]);

  const handleRecenter = () => {
    if (gpsStatus === 'denied' || !userPos) {
      requestGpsPosition();
    } else {
      setRecenterCount((prev) => prev + 1);
    }
  };

  // Tile URL based on style
  const tileUrl =
    mapStyle === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

  const tileAttribution =
    mapStyle === 'dark'
      ? '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* GPS Status Banner if Permission Denied or Loading */}
      <AnimatePresence>
        {gpsStatus === 'denied' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 z-[1000] bg-amber-500/90 dark:bg-amber-600/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-amber-300/40 flex items-center space-x-2.5 max-w-md w-11/12"
          >
            <AlertCircle className="w-4 h-4 shrink-0 animate-bounce" />
            <span className="flex-1 truncate">{gpsErrorMessage || 'GPS location restricted. Using standard map mode.'}</span>
            <button
              onClick={requestGpsPosition}
              className="bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider transition-all border border-white/30 shrink-0"
            >
              Retry
            </button>
          </motion.div>
        )}

        {gpsStatus === 'loading' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 transform -translate-x-1/2 z-[1000] bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-4 py-2 rounded-xl shadow-lg border border-blue-400/40 flex items-center space-x-2.5"
          >
            <RefreshCw className="w-4 h-4 shrink-0 animate-spin" />
            <span>Acquiring Live Satellite GPS Signal...</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Leaflet Map Container */}
      <MapContainer
        center={userPos || [28.6139, 77.2090]}
        zoom={14}
        zoomControl={false}
        className="w-full h-full z-0"
        style={{ background: mapStyle === 'dark' ? '#0f172a' : '#f8fafc' }}
      >
        <TileLayer url={tileUrl} attribution={tileAttribution} maxZoom={19} />

        <MapHelper
          userPos={userPos}
          recenterTrigger={recenterCount}
          zoomInTrigger={zoomInCount}
          zoomOutTrigger={zoomOutCount}
        />

        {/* User GPS Location Marker */}
        {userPos && (
          <LocationMarker
            position={userPos}
            accuracy={accuracy}
            isFollowing={isFollowing}
          />
        )}

        {/* Emergency Services Markers */}
        {services.map((service) => {
          const isShow =
            (service.type === 'hospital' && filters.hospitals) ||
            (service.type === 'trauma' && filters.trauma) ||
            (service.type === 'police' && filters.police) ||
            (service.type === 'ambulance' && filters.ambulance) ||
            (service.type === 'blood' && filters.blood) ||
            (service.type === 'fire' && (filters.fire ?? true)) ||
            (service.type === 'petrol' && (filters.petrol ?? true));

          if (!isShow) return null;

          if (searchQuery) {
            const q = searchQuery.toLowerCase();
            const matchName = service.name.toLowerCase().includes(q);
            const matchAddr = service.address.toLowerCase().includes(q);
            const matchType = service.type.toLowerCase().includes(q);
            const matchCity = service.city?.toLowerCase().includes(q);
            const matchHighway = service.highway?.toLowerCase().includes(q);
            const matchVillage = service.village?.toLowerCase().includes(q);
            const matchInfo = service.info.toLowerCase().includes(q);

            if (!matchName && !matchAddr && !matchType && !matchCity && !matchHighway && !matchVillage && !matchInfo) {
              return null;
            }
          }

          const badgeColor =
            service.type === 'trauma'
              ? '#e11d48'
              : service.type === 'hospital'
              ? '#2563eb'
              : service.type === 'police'
              ? '#4f46e5'
              : service.type === 'ambulance'
              ? '#059669'
              : service.type === 'blood'
              ? '#9333ea'
              : service.type === 'fire'
              ? '#ea580c'
              : '#d97706'; // petrol pump

          const iconEmoji =
            service.type === 'trauma'
              ? '🏥'
              : service.type === 'hospital'
              ? '🏥'
              : service.type === 'police'
              ? '🚓'
              : service.type === 'ambulance'
              ? '🚑'
              : service.type === 'blood'
              ? '🩸'
              : service.type === 'fire'
              ? '🚒'
              : '⛽';

          const customIcon = L.divIcon({
            className: 'custom-service-marker-icon',
            html: `
              <div style="background-color: ${badgeColor}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); border: 2px solid white;">
                ${iconEmoji}
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
            popupAnchor: [0, -16]
          });

          return (
            <Marker
              key={service.id}
              position={[service.lat, service.lng]}
              icon={customIcon}
              eventHandlers={{
                click: () => onSelectService && onSelectService(service)
              }}
            >
              <Popup className="custom-service-popup">
                <div className="p-1 space-y-1">
                  <div className="font-bold text-slate-900 text-xs">{service.name}</div>
                  <div className="text-[11px] text-slate-600">{service.address}</div>
                  <div className="text-[10px] font-semibold text-emerald-600">{service.info}</div>
                  <button
                    onClick={() => onSelectService && onSelectService(service)}
                    className="mt-1.5 w-full py-1 bg-blue-600 text-white rounded text-[10px] font-bold uppercase tracking-wider"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Black Spot Risk Circles */}
        {filters.blackSpots &&
          blackSpots.map((bs) => {
            const circleColor =
              bs.severity === 'Red' ? '#dc2626' : bs.severity === 'Orange' ? '#f97316' : '#eab308';

            return (
              <CircleMarker
                key={bs.id}
                center={[bs.lat, bs.lng]}
                radius={14}
                pathOptions={{
                  color: circleColor,
                  fillColor: circleColor,
                  fillOpacity: 0.5,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1">
                    <div className="font-bold text-rose-600 text-xs">⚠️ Black Spot: {bs.name}</div>
                    <div className="text-[11px] text-slate-700">Accident Count: <b>{bs.accidentCount}</b></div>
                    <div className="text-[10px] text-slate-500">Cause: {bs.cause}</div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

        {/* Accident Reports Markers */}
        {filters.reports &&
          reports.map((rep) => {
            const reportIcon = L.divIcon({
              className: 'custom-accident-report-icon',
              html: `
                <div style="background-color: #dc2626; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; box-shadow: 0 0 12px rgba(220,38,38,0.7); border: 2px solid white; animation: pulse 1.5s infinite;">
                  🚨
                </div>
              `,
              iconSize: [34, 34],
              iconAnchor: [17, 17],
              popupAnchor: [0, -17]
            });

            return (
              <Marker
                key={rep.id}
                position={[rep.lat, rep.lng]}
                icon={reportIcon}
                eventHandlers={{
                  click: () => onSelectReport && onSelectReport(rep)
                }}
              >
                <Popup>
                  <div className="p-1 space-y-1">
                    <div className="font-black text-red-600 text-xs">🚨 Crash: {rep.accidentType}</div>
                    <div className="text-[11px] text-slate-700">{rep.address}</div>
                    <div className="text-[10px] text-amber-600 font-bold">Severity: {rep.severity} ({rep.injuredCount} Injured)</div>
                    <button
                      onClick={() => onSelectReport && onSelectReport(rep)}
                      className="mt-1.5 w-full py-1 bg-red-600 text-white rounded text-[10px] font-bold uppercase"
                    >
                      Inspect Report
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Reusable Floating Controls */}
      <MapControls
        onZoomIn={() => setZoomInCount((prev) => prev + 1)}
        onZoomOut={() => setZoomOutCount((prev) => prev + 1)}
        onRecenter={handleRecenter}
        onRefreshGps={requestGpsPosition}
        isLocating={gpsStatus === 'loading'}
        gpsStatus={gpsStatus}
        isFollowing={isFollowing}
        onToggleFollow={() => setIsFollowing(!isFollowing)}
        mapStyle={mapStyle}
        onToggleStyle={() => setMapStyle((prev) => (prev === 'dark' ? 'light' : 'dark'))}
        onOpenReportModal={onOpenReportModal}
      />

      {/* Floating Map Legend (Bottom Left) */}
      <MapLegend className="absolute bottom-6 left-6 z-[1000] hidden sm:block max-w-xs" />
    </div>
  );
};
