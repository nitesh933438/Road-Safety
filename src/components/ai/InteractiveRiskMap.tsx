import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { AlertOctagon, Info, Navigation, Shield, HeartPulse } from 'lucide-react';
import { motion } from 'framer-motion';
import { SmartBlackSpots } from './SmartBlackSpots';

// Fix Leaflet icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const BLACK_SPOTS = [
  { id: 1, name: 'NH-44 Curve', lat: 28.6139, lng: 77.2090, risk: 'Critical', color: '#f43f5e', accidents: 45, fatal: 12, cause: 'Sharp curve, no signage' },
  { id: 2, name: 'Sector 62 Crossing', lat: 28.6250, lng: 77.3734, risk: 'High', color: '#f59e0b', accidents: 32, fatal: 4, cause: 'Broken signal, high traffic' },
  { id: 3, name: 'MG Road Junction', lat: 28.4744, lng: 77.0863, risk: 'Medium', color: '#eab308', accidents: 18, fatal: 1, cause: 'Potholes, poor lighting' },
];

export const InteractiveRiskMap: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      <div className="lg:col-span-2 flex flex-col h-[600px] bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden relative z-0">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800 z-10">
          <div className="flex items-center">
            <Navigation className="w-5 h-5 text-indigo-500 mr-2" />
            <h3 className="font-bold text-slate-900 dark:text-white">Live Intelligence Map</h3>
          </div>
          <div className="flex space-x-3 text-xs font-medium">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-1"></span> Critical</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span> High</span>
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span> Medium</span>
          </div>
        </div>
        
        <div className="flex-1 w-full h-full relative z-0">
          <MapContainer center={[28.6139, 77.2090]} zoom={11} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {BLACK_SPOTS.map((spot) => (
              <CircleMarker
                key={spot.id}
                center={[spot.lat, spot.lng]}
                radius={activeSpot === spot.id ? 15 : 10}
                fillColor={spot.color}
                fillOpacity={0.7}
                color={spot.color}
                weight={2}
                eventHandlers={{
                  click: () => setActiveSpot(spot.id),
                }}
              >
                <Popup className="custom-popup">
                  <div className="p-1">
                    <h4 className="font-bold text-slate-900 mb-1 flex items-center">
                      <AlertOctagon className="w-4 h-4 text-rose-500 mr-1" />
                      {spot.name}
                    </h4>
                    <div className="space-y-1 text-sm text-slate-600 mt-2">
                      <p><span className="font-semibold text-slate-900">Total Accidents:</span> {spot.accidents}</p>
                      <p><span className="font-semibold text-slate-900">Fatalities:</span> <span className="text-rose-500 font-bold">{spot.fatal}</span></p>
                      <p><span className="font-semibold text-slate-900">Primary Cause:</span> {spot.cause}</p>
                    </div>
                    <div className="mt-3 flex space-x-2 border-t pt-2">
                      <button className="flex-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 py-1 rounded text-xs font-medium flex items-center justify-center transition-colors">
                        <HeartPulse className="w-3 h-3 mr-1" /> Nearby Hospital
                      </button>
                      <button className="flex-1 bg-blue-50 text-blue-700 hover:bg-blue-100 py-1 rounded text-xs font-medium flex items-center justify-center transition-colors">
                        <Shield className="w-3 h-3 mr-1" /> Police
                      </button>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="lg:col-span-1 h-[600px] overflow-y-auto no-scrollbar">
        <SmartBlackSpots spots={BLACK_SPOTS} activeSpot={activeSpot} onSelectSpot={setActiveSpot} />
      </div>
    </div>
  );
};
