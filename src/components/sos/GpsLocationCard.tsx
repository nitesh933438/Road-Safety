/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, Navigation, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';

export const GpsLocationCard: React.FC = () => {
  const {
    locationData,
    isLoading,
    isGeocodingLoading,
    error,
    refreshLocation,
    openLocationModal
  } = useLocationContext();

  const lat = locationData?.lat ?? 25.6022;
  const lng = locationData?.lng ?? 85.1194;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-rose-500 animate-pulse" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">
            📍 Current Location (OSM Nominatim)
          </h3>
        </div>
        <button
          onClick={refreshLocation}
          disabled={isLoading || isGeocodingLoading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading || isGeocodingLoading ? 'animate-spin text-indigo-500' : ''}`} />
          <span>{isLoading || isGeocodingLoading ? 'Locating...' : 'Refresh GPS'}</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-slate-500">Latitude: <strong className="text-slate-900 dark:text-white">{lat.toFixed(6)}° N</strong></span>
          <span className="text-slate-500">Longitude: <strong className="text-slate-900 dark:text-white">{lng.toFixed(6)}° E</strong></span>
        </div>

        <div className="flex items-start space-x-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
          <Navigation className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <strong className="block text-slate-900 dark:text-white mb-0.5">Reverse Geocoded Address:</strong>
            {isLoading || isGeocodingLoading ? (
              <span className="text-indigo-600 dark:text-indigo-400 font-medium animate-pulse">
                Fetching reverse geocoding address via OpenStreetMap...
              </span>
            ) : locationData?.geocodingFailed ? (
              <div className="text-rose-600 dark:text-rose-400 font-medium">
                Unable to fetch address.
              </div>
            ) : (
              <p className="whitespace-pre-line text-slate-800 dark:text-slate-200 font-medium">
                {locationData?.fullFormattedAddress}
              </p>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Accuracy: ±{Math.round(locationData?.accuracy ?? 15)}m
          </span>
          <button
            onClick={openLocationModal}
            className="flex items-center space-x-1 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <span>View Full Details & Maps</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
