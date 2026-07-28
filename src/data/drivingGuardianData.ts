/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VehicleType = 'Two-Wheeler (Motorcycle)' | 'Car / Sedan / SUV' | 'Auto Rickshaw' | 'Commercial Heavy Truck';

export interface TripConfig {
  destination: string;
  currentLocation: string;
  vehicleType: VehicleType;
  helmetOrSeatbeltConfirmed: boolean;
  emergencyContact: string;
}

export interface DrivingTelemetry {
  currentSpeedKmh: number;
  averageSpeedKmh: number;
  maxSpeedKmh: number;
  distanceKm: number;
  elapsedSeconds: number;
  estimatedEtaMinutes: number;
  safetyScore: number;
  overspeedEvents: number;
  hardBrakingEvents: number;
  sharpTurnEvents: number;
}

export type HazardZoneType =
  | 'Overspeeding'
  | 'Sudden Braking'
  | 'Sharp Turn'
  | 'High Accident Blackspot'
  | 'Dense Fog Zone'
  | 'Heavy Rain'
  | 'Night Driving Hazard'
  | 'School Zone'
  | 'Hospital Silence Zone'
  | 'Railway Crossing'
  | 'Construction Area'
  | 'Road Hazard Ahead';

export interface AiGuardianWarning {
  id: string;
  type: HazardZoneType;
  title: string;
  message: string;
  voiceText: string;
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
  timestamp: string;
  iconName: string;
}

export interface TripSummary {
  id: string;
  date: string;
  destination: string;
  distanceKm: number;
  durationMinutes: number;
  avgSpeedKmh: number;
  maxSpeedKmh: number;
  safetyScore: number;
  scoreRank: 'Excellent' | 'Good' | 'Average' | 'Poor';
  warningsCount: number;
  blackSpotsCrossed: number;
  mockFuelSavedLiters: number;
  mockCarbonSavedKg: number;
  xpEarned: number;
  aiSuggestions: string[];
}

export interface DriverBadge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredXp: number;
}

export const MOCK_TRIP_HISTORY: TripSummary[] = [
  {
    id: 'trip-901',
    date: '2026-07-28 08:30 AM',
    destination: 'Cyber City, Gurugram',
    distanceKm: 24.5,
    durationMinutes: 38,
    avgSpeedKmh: 42,
    maxSpeedKmh: 68,
    safetyScore: 94,
    scoreRank: 'Excellent',
    warningsCount: 1,
    blackSpotsCrossed: 2,
    mockFuelSavedLiters: 1.4,
    mockCarbonSavedKg: 3.2,
    xpEarned: 250,
    aiSuggestions: [
      'Maintain smooth deceleration before Cyber City exit loop.',
      'Excellent speed control in morning rain zone!',
    ],
  },
  {
    id: 'trip-902',
    date: '2026-07-27 06:15 PM',
    destination: 'Noida Sector 18 Market',
    distanceKm: 18.2,
    durationMinutes: 45,
    avgSpeedKmh: 32,
    maxSpeedKmh: 74,
    safetyScore: 82,
    scoreRank: 'Good',
    warningsCount: 3,
    blackSpotsCrossed: 4,
    mockFuelSavedLiters: 0.9,
    mockCarbonSavedKg: 2.1,
    xpEarned: 180,
    aiSuggestions: [
      'Avoid sudden hard braking when approaching DND Flyway toll Plaza.',
      'Keep headlights on high-beam in fog zone.',
    ],
  },
  {
    id: 'trip-903',
    date: '2026-07-26 10:00 PM',
    destination: 'Connaught Place Outer Circle',
    distanceKm: 12.0,
    durationMinutes: 22,
    avgSpeedKmh: 48,
    maxSpeedKmh: 82,
    safetyScore: 68,
    scoreRank: 'Average',
    warningsCount: 6,
    blackSpotsCrossed: 3,
    mockFuelSavedLiters: 0.5,
    mockCarbonSavedKg: 1.1,
    xpEarned: 110,
    aiSuggestions: [
      'Overspeeding detected twice during night driving corridor.',
      'Wear seatbelt / helmet properly at all times.',
    ],
  },
];

export const MOCK_DRIVER_BADGES: DriverBadge[] = [
  {
    id: 'badge-1',
    title: 'Safe Driver',
    description: 'Complete 3 trips with Safety Score > 85%',
    icon: 'ShieldCheck',
    unlocked: true,
    requiredXp: 200,
  },
  {
    id: 'badge-2',
    title: 'Road Guardian',
    description: 'Navigate 10 High Accident Black Spots safely without overspeeding',
    icon: 'Radio',
    unlocked: true,
    requiredXp: 500,
  },
  {
    id: 'badge-3',
    title: 'Golden Driver',
    description: 'Maintain zero hard-braking events across 50 km total trips',
    icon: 'Award',
    unlocked: false,
    requiredXp: 1000,
  },
  {
    id: 'badge-4',
    title: 'Hero Driver',
    description: 'Provide assistance or log 5 verified road hazards',
    icon: 'HeartPulse',
    unlocked: false,
    requiredXp: 2000,
  },
];
