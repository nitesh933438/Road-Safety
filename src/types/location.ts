/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LocationDetails {
  lat: number;
  lng: number;
  accuracy: number; // in meters
  timestamp: number; // epoch ms
  placeName?: string; // e.g. Rajendra Nagar, NH-27, Sector 62
  villageTownCity?: string; // e.g. Patna, Muzaffarpur
  district?: string; // e.g. Patna, Muzaffarpur
  state?: string; // e.g. Bihar
  country?: string; // e.g. India
  pincode?: string; // e.g. 800016
  fullFormattedAddress: string;
  formattedLines: string[]; // [Place Name, City, State, Country - PIN]
  geocodingFailed: boolean;
  geocodingError?: string | null;
  rawAddressObj?: Record<string, any>;
}

export interface LocationContextType {
  locationData: LocationDetails | null;
  isLoading: boolean;
  isGeocodingLoading: boolean;
  error: string | null;
  refreshLocation: () => Promise<void>;
  isModalOpen: boolean;
  openLocationModal: () => void;
  closeLocationModal: () => void;
}
