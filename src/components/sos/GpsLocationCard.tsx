/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Navigation, RefreshCw, AlertCircle } from 'lucide-react';

export const GpsLocationCard: React.FC = () => {
  const [lat, setLat] = useState('28.6139');
  const [lng, setLng] = useState('77.2090');
  const [address, setAddress] = useState('NH-48 Highway, Sector 4 Junction, Mile Marker 142');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGps = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLat(position.coords.latitude.toFixed(4));
          setLng(position.coords.longitude.toFixed(4));
          setAddress(`GPS Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)} (Live Telemetry)`);
          setLoading(false);
        },
        (err) => {
          setError('Location permission denied or unavailable. Using default Sector 4 coordinates.');
          setLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setError('Geolocation not supported by your browser.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-rose-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">GPS Location & Telemetry Beacon</h3>
        </div>
        <button
          onClick={fetchGps}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 text-xs font-semibold transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Locating...' : 'Refresh GPS'}</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">Latitude: <strong className="text-slate-900 dark:text-white">{lat}° N</strong></span>
          <span className="text-slate-500">Longitude: <strong className="text-slate-900 dark:text-white">{lng}° E</strong></span>
        </div>
        <div className="flex items-start space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
          <Navigation className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="block text-slate-900 dark:text-white mb-0.5">Resolved Location Address:</strong>
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
