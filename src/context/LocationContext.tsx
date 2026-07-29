/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { LocationDetails, LocationContextType } from '../types/location';
import { reverseGeocodeOpenStreetMap } from '../services/geocodingService';

const LocationContext = createContext<LocationContextType | undefined>(undefined);

// Initial fallback coordinates (Patna, Bihar, India - representative default)
const FALLBACK_LAT = 25.6022;
const FALLBACK_LNG = 85.1194;

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationData, setLocationData] = useState<LocationDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isGeocodingLoading, setIsGeocodingLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const watchIdRef = useRef<number | null>(null);
  const lastProcessedCoordsRef = useRef<{ lat: number; lng: number; time: number } | null>(null);

  /**
   * Process position update and trigger reverse geocoding
   */
  const processCoordinates = useCallback(async (lat: number, lng: number, accuracy: number = 15) => {
    // Prevent spamming Nominatim API if moved less than 15 meters and < 15 seconds
    const last = lastProcessedCoordsRef.current;
    if (last) {
      const latDiff = Math.abs(last.lat - lat);
      const lngDiff = Math.abs(last.lng - lng);
      const timeDiff = Date.now() - last.time;
      if (latDiff < 0.0001 && lngDiff < 0.0001 && timeDiff < 15000) {
        return; // Skip duplicate fetch
      }
    }

    lastProcessedCoordsRef.current = { lat, lng, time: Date.now() };
    setIsGeocodingLoading(true);

    try {
      const details = await reverseGeocodeOpenStreetMap(lat, lng, accuracy, Date.now());
      setLocationData(details);
      setError(null);
    } catch (err: any) {
      console.error('Location process error:', err);
      setError('Unable to fetch address.');
    } finally {
      setIsGeocodingLoading(false);
      setIsLoading(false);
    }
  }, []);

  /**
   * Manual refresh function
   */
  const refreshLocation = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser.');
      // Use fallback
      await processCoordinates(FALLBACK_LAT, FALLBACK_LNG, 50);
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await processCoordinates(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 10);
      },
      async (err) => {
        console.warn('Geolocation position error:', err.message);
        setError('Location access restricted or unavailable.');
        // Fallback to default coordinates
        await processCoordinates(FALLBACK_LAT, FALLBACK_LNG, 50);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000
      }
    );
  }, [processCoordinates]);

  // Initial load and continuous geolocation watch
  useEffect(() => {
    refreshLocation();

    if ('geolocation' in navigator) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => {
          processCoordinates(pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy || 10);
        },
        (err) => {
          console.warn('Watch location error:', err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 10000
        }
      );
    }

    return () => {
      if (watchIdRef.current !== null && 'geolocation' in navigator) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, [refreshLocation, processCoordinates]);

  const openLocationModal = () => setIsModalOpen(true);
  const closeLocationModal = () => setIsModalOpen(false);

  return (
    <LocationContext.Provider
      value={{
        locationData,
        isLoading,
        isGeocodingLoading,
        error,
        refreshLocation,
        isModalOpen,
        openLocationModal,
        closeLocationModal
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
