/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';

interface LocationMarkerProps {
  position: [number, number] | null;
  accuracy: number | null;
  heading?: number | null;
  speed?: number | null;
  isFollowing?: boolean;
}

export const LocationMarker: React.FC<LocationMarkerProps> = ({
  position,
  accuracy,
  heading,
  speed,
  isFollowing = false
}) => {
  const map = useMap();

  // Custom User Icon with pulsing ring
  const userIcon = L.divIcon({
    className: 'custom-gps-user-marker',
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <div class="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping"></div>
        <div class="relative w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 border-2 border-white shadow-lg flex items-center justify-center">
          <div class="w-2 h-2 rounded-full bg-white"></div>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  useEffect(() => {
    if (position && isFollowing) {
      map.flyTo(position, map.getZoom() < 14 ? 15 : map.getZoom(), {
        animate: true,
        duration: 1.2
      });
    }
  }, [position, isFollowing, map]);

  if (!position) return null;

  return (
    <>
      {/* Location accuracy aura circle */}
      {accuracy && accuracy > 0 && (
        <Circle
          center={position}
          radius={Math.min(accuracy, 1000)}
          pathOptions={{
            color: '#3b82f6',
            fillColor: '#60a5fa',
            fillOpacity: 0.15,
            weight: 1.5,
            dashArray: '4, 6'
          }}
        />
      )}

      {/* User GPS Marker */}
      <Marker position={position} icon={userIcon}>
        <Popup className="custom-leaflet-popup">
          <div className="p-1 space-y-2 text-slate-800 dark:text-slate-100 min-w-[200px]">
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 pb-1 border-b border-slate-200 dark:border-slate-700">
              <Navigation className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              <span>Live GPS Location</span>
            </div>

            <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Latitude:</span>
                <span className="font-mono">{position[0].toFixed(5)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-slate-500">Longitude:</span>
                <span className="font-mono">{position[1].toFixed(5)}</span>
              </div>
              {accuracy && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-500">Accuracy:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">±{Math.round(accuracy)}m</span>
                </div>
              )}
              {speed !== undefined && speed !== null && (
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-500">Speed:</span>
                  <span className="font-bold">{(speed * 3.6).toFixed(1)} km/h</span>
                </div>
              )}
            </div>

            <div className="pt-1 text-[10px] text-slate-400 dark:text-slate-500 flex items-center space-x-1">
              <ShieldCheck className="w-3 h-3 text-emerald-500" />
              <span>Real-time Encrypted GPS Stream</span>
            </div>
          </div>
        </Popup>
      </Marker>
    </>
  );
};
