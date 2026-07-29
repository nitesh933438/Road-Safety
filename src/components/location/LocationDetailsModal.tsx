/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  X,
  Copy,
  ExternalLink,
  RefreshCw,
  Check,
  Compass,
  AlertTriangle,
  Map as MapIcon,
  Navigation,
  Globe,
  Clock
} from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';
import toast from 'react-hot-toast';

export const LocationDetailsModal: React.FC = () => {
  const {
    locationData,
    isLoading,
    isGeocodingLoading,
    error,
    refreshLocation,
    isModalOpen,
    closeLocationModal
  } = useLocationContext();

  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  if (!isModalOpen) return null;

  const lat = locationData?.lat ?? 25.6022;
  const lng = locationData?.lng ?? 85.1194;
  const accuracy = Math.round(locationData?.accuracy ?? 15);
  const timestamp = locationData?.timestamp
    ? new Date(locationData.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : 'Just now';

  const copyAddressHandler = () => {
    if (!locationData) return;
    const textToCopy = locationData.fullFormattedAddress;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAddress(true);
    toast.success('Full address copied to clipboard!');
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const copyCoordsHandler = () => {
    const textToCopy = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedCoords(true);
    toast.success(`Coordinates copied: ${textToCopy}`);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank', 'noopener,noreferrer');
  };

  const openOpenStreetMap = () => {
    window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=16`, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-800/40">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                <MapPin className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  📍 Current Location Details
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  OpenStreetMap Reverse Geocoded
                </p>
              </div>
            </div>

            <button
              onClick={closeLocationModal}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            {/* Loading Banner */}
            {(isLoading || isGeocodingLoading) && (
              <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-medium animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Fetching precise GPS location and reverse geocoding via Nominatim...</span>
              </div>
            )}

            {/* Error / Warning Notice */}
            {error && !isLoading && (
              <div className="flex items-center space-x-2.5 p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs font-medium">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 1. Formatted Address Display Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center space-x-1.5">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Formatted Address</span>
                </span>
                {locationData?.geocodingFailed ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                    Geocode Failed
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    Live Geocoded
                  </span>
                )}
              </div>

              {/* Exact Formatted Output */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/60 rounded-xl p-4 text-slate-800 dark:text-slate-100 font-medium text-sm leading-relaxed whitespace-pre-line shadow-xs">
                {locationData?.geocodingFailed ? (
                  <div className="space-y-1 text-slate-500 dark:text-slate-400 italic">
                    <p className="font-semibold text-rose-600 dark:text-rose-400 not-italic">Unable to fetch address.</p>
                    <p className="text-xs not-italic">GPS Lat: {lat.toFixed(6)}, Lng: {lng.toFixed(6)}</p>
                  </div>
                ) : (
                  locationData?.fullFormattedAddress || 'Unable to fetch address.'
                )}
              </div>

              {/* Structured Address Fields Breakdown */}
              {locationData && !locationData.geocodingFailed && (
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-200/60 dark:border-slate-700/60">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">Place / Road</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {locationData.placeName || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">City / Town</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {locationData.villageTownCity || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">District</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {locationData.district || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">State & Country</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate block">
                      {locationData.state ? `${locationData.state}, ${locationData.country}` : locationData.country}
                    </span>
                  </div>
                  {locationData.pincode && (
                    <div className="col-span-2">
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold">PIN Code</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                        {locationData.pincode}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. Technical Telemetry Metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center space-x-1">
                  <Compass className="w-3.5 h-3.5 text-indigo-500" />
                  <span>GPS Coordinates</span>
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white block">
                  {lat.toFixed(6)}°, {lng.toFixed(6)}°
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1">
                <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center space-x-1">
                  <Navigation className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Accuracy</span>
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white block">
                  ± {accuracy} meters
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Last Updated</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {timestamp}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1 col-span-2 sm:col-span-1">
                <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-blue-500" />
                  <span>Provider</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white block">
                  OpenStreetMap (Nominatim)
                </span>
              </div>
            </div>

            {/* 3. Actions Grid */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={copyAddressHandler}
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
                </button>

                <button
                  onClick={copyCoordsHandler}
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  {copiedCoords ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedCoords ? 'Coords Copied!' : 'Copy Coordinates'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={openGoogleMaps}
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold text-xs transition-colors"
                >
                  <MapIcon className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </button>

                <button
                  onClick={openOpenStreetMap}
                  className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/80 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-semibold text-xs transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Open in OpenStreetMap</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Refresh */}
          <div className="px-6 py-3.5 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Real-time GPS Tracking Active
            </span>
            <button
              onClick={refreshLocation}
              disabled={isLoading || isGeocodingLoading}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 font-semibold text-xs transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 ${isLoading || isGeocodingLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading || isGeocodingLoading ? 'Locating...' : 'Refresh GPS'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
