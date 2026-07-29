/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MapPin, RefreshCw, AlertCircle, ChevronDown } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';

export const LocationWidget: React.FC = () => {
  const {
    locationData,
    isLoading,
    isGeocodingLoading,
    error,
    openLocationModal
  } = useLocationContext();

  // Determine display label
  let displayLabel = 'Locating...';
  if (isLoading || isGeocodingLoading) {
    displayLabel = 'Locating GPS...';
  } else if (locationData) {
    if (locationData.geocodingFailed) {
      displayLabel = 'Unable to fetch address.';
    } else {
      const place = locationData.placeName;
      const city = locationData.villageTownCity;
      if (place && city && place !== city) {
        displayLabel = `${place}, ${city}`;
      } else if (city) {
        displayLabel = `${city}, ${locationData.state || 'India'}`;
      } else if (place) {
        displayLabel = place;
      } else {
        displayLabel = locationData.fullFormattedAddress.split(',')[0] || 'Current Location';
      }
    }
  } else if (error) {
    displayLabel = 'Unable to fetch address.';
  }

  return (
    <button
      type="button"
      onClick={openLocationModal}
      title="Click to view full GPS address details and coordinates"
      className="group relative flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-slate-700 dark:text-slate-200 border border-indigo-200/60 dark:border-indigo-800/60 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
    >
      {/* Icon */}
      {isLoading || isGeocodingLoading ? (
        <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
      ) : locationData?.geocodingFailed || error ? (
        <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
      ) : (
        <MapPin className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0 group-hover:scale-110 transition-transform" />
      )}

      {/* Text preview */}
      <div className="flex items-center space-x-1 min-w-0 max-w-[110px] min-[400px]:max-w-[150px] sm:max-w-[180px] md:max-w-[220px]">
        <span className="truncate text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-100">
          {displayLabel}
        </span>
        <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors shrink-0" />
      </div>
    </button>
  );
};
