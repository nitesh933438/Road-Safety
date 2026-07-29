/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { LocationDetails } from '../types/location';

/**
 * Reverse geocode latitude and longitude using OpenStreetMap (Nominatim API)
 */
export async function reverseGeocodeOpenStreetMap(
  lat: number,
  lng: number,
  accuracy: number = 10,
  timestamp: number = Date.now()
): Promise<LocationDetails> {
  const roundedLat = parseFloat(lat.toFixed(6));
  const roundedLng = parseFloat(lng.toFixed(6));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${roundedLat}&lon=${roundedLng}&zoom=18&addressdetails=1`;
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept-Language': 'en',
        'User-Agent': 'GoldenGuard-Safety-App/1.0'
      }
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Nominatim HTTP ${response.status}`);
    }

    const data = await response.json();
    const addr = data.address || {};

    // Extract address components
    const placeName =
      addr.road ||
      addr.suburb ||
      addr.neighbourhood ||
      addr.residential ||
      addr.amenity ||
      addr.building ||
      addr.hamlet ||
      addr.commercial ||
      addr.industrial ||
      '';

    const villageTownCity =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.municipality ||
      addr.suburb ||
      '';

    const district =
      addr.district ||
      addr.state_district ||
      addr.county ||
      '';

    const state = addr.state || '';
    const country = addr.country || 'India';
    const pincode = addr.postcode || '';

    // Build structured address lines according to required format
    const lines: string[] = [];

    if (placeName) lines.push(placeName);
    if (villageTownCity && villageTownCity !== placeName) lines.push(villageTownCity);
    if (district && district !== villageTownCity && district !== state) {
      // Don't duplicate if same as city or state
      lines.push(`${district} District`);
    }
    if (state) lines.push(state);

    if (country) {
      if (pincode) {
        lines.push(`${country} - ${pincode}`);
      } else {
        lines.push(country);
      }
    }

    const fullFormattedAddress = lines.length > 0
      ? lines.join(',\n')
      : (data.display_name || `${roundedLat}° N, ${roundedLng}° E`);

    return {
      lat: roundedLat,
      lng: roundedLng,
      accuracy,
      timestamp,
      placeName: placeName || villageTownCity || 'Current Location',
      villageTownCity,
      district,
      state,
      country,
      pincode,
      fullFormattedAddress,
      formattedLines: lines.length > 0 ? lines : [fullFormattedAddress],
      geocodingFailed: false,
      geocodingError: null,
      rawAddressObj: addr
    };
  } catch (error: any) {
    console.warn('Reverse geocoding failed:', error?.message || error);

    return {
      lat: roundedLat,
      lng: roundedLng,
      accuracy,
      timestamp,
      fullFormattedAddress: 'Unable to fetch address.',
      formattedLines: ['Unable to fetch address.'],
      geocodingFailed: true,
      geocodingError: 'Unable to fetch address.'
    };
  }
}
