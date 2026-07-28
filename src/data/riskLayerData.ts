/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface BlackSpotDetail {
  id: string;
  name: string;
  lat: number;
  lng: number;
  riskScore: number; // 0-100
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  accidentCount: number;
  fatalities: number;
  mainCause: string;
  lastIncident: string;
  suggestedSpeed: string;
  aiRecommendation: string;
  roadType: string;
  highwayName?: string;
  village?: string;
  cityZone: string;
}

export interface RiskHeatmapPoint {
  id: string;
  lat: number;
  lng: number;
  intensity: number; // 0.1 to 1.0
  radius: number;
  label: string;
  riskLevel: 'Severe' | 'High' | 'Moderate';
}

export interface RoadConditionZone {
  id: string;
  name: string;
  type: 'construction' | 'slippery' | 'potholes' | 'unlit';
  lat: number;
  lng: number;
  description: string;
  hazardLevel: 'High' | 'Medium' | 'Low';
}

export interface WeatherTelemetry {
  location: string;
  temperature: string;
  rain: string;
  rainMm: number;
  visibility: string;
  fog: string;
  fogDensity: string;
  roadCondition: string;
  trafficDensity: string;
  trafficPercentage: number;
  windSpeed: string;
  uvIndex: string;
  updatedAt: string;
}

export const MOCK_WEATHER_TELEMETRY: WeatherTelemetry = {
  location: 'Delhi-NCR Highway Corridor (NH-48)',
  temperature: '28°C',
  rain: 'Moderate Rain (4.2 mm/h)',
  rainMm: 4.2,
  visibility: '2.1 km (Reduced)',
  fog: 'Dense Fog Warning',
  fogDensity: '42% Night Mist',
  roadCondition: 'Slippery Wet Asphalt & Hydroplaning Risk',
  trafficDensity: 'High Congestion (78%)',
  trafficPercentage: 78,
  windSpeed: '18 km/h NW',
  uvIndex: 'Low (2.0)',
  updatedAt: 'Just Now (Real-Time Sensor Telemetry)',
};

export const MOCK_DETAILED_BLACK_SPOTS: BlackSpotDetail[] = [
  {
    id: 'bs-101',
    name: 'NH-48 Mahipalpur Flyover Exit Curve',
    lat: 28.6139,
    lng: 77.2090,
    riskScore: 94,
    severity: 'Critical',
    accidentCount: 48,
    fatalities: 11,
    mainCause: 'Sharp Blind Apex & Lack of High-Speed Crash Barriers',
    lastIncident: '12 hours ago (Heavy Truck Rear-end Collision)',
    suggestedSpeed: '30 km/h (Strict Warning)',
    aiRecommendation:
      'Deploy automated AI speed radar interceptors, install high-friction rubberized pavement, and fit dynamic LED chevron warning arrows.',
    roadType: 'National Highway Express Exit',
    highwayName: 'NH-48 Corridor',
    cityZone: 'South West Delhi',
  },
  {
    id: 'bs-102',
    name: 'Ring Road Sector-62 Crossing',
    lat: 28.6250,
    lng: 77.3734,
    riskScore: 82,
    severity: 'High',
    accidentCount: 36,
    fatalities: 6,
    mainCause: 'Malfunctioning Traffic Signal & Illegal Pedestrian Weaving',
    lastIncident: 'Yesterday at 11:15 PM (Motorcycle Slip)',
    suggestedSpeed: '40 km/h',
    aiRecommendation:
      'Implement smart AI adaptive signal timing, construct a foot overbridge, and add bright LED zebra crossing floodlights.',
    roadType: 'Urban 8-Lane Arterial Junction',
    highwayName: 'Outer Ring Road',
    cityZone: 'Noida-Delhi Border',
  },
  {
    id: 'bs-103',
    name: 'MG Road Metro Pillar 142 Junction',
    lat: 28.4744,
    lng: 77.0863,
    riskScore: 71,
    severity: 'High',
    accidentCount: 24,
    fatalities: 3,
    mainCause: 'Deep Waterlogging Potholes & Dim Night Illumination',
    lastIncident: '2 days ago (2-Wheeler Crash in Drizzle)',
    suggestedSpeed: '35 km/h',
    aiRecommendation:
      'Repair sub-grade road drainage to stop waterlogging, replace burnt streetlight fixtures with 150W solar LEDs, and clear sightline obstructions.',
    roadType: 'Commercial Highway Corridor',
    highwayName: 'Gurugram MG Road',
    cityZone: 'Gurugram Sector 28',
  },
  {
    id: 'bs-104',
    name: 'GT Karnal Road Industrial Merge',
    lat: 28.6400,
    lng: 77.2300,
    riskScore: 65,
    severity: 'Medium',
    accidentCount: 19,
    fatalities: 2,
    mainCause: 'Uncontrolled U-Turns by Heavy Freight Wagons',
    lastIncident: '3 days ago (Side-impact T-Bone)',
    suggestedSpeed: '45 km/h',
    aiRecommendation:
      'Block illegal median gaps with concrete crash barriers and redirect heavy cargo to designated turnarounds 800m ahead.',
    roadType: 'Industrial Freight Highway',
    highwayName: 'GT Road (NH-1)',
    cityZone: 'North Delhi',
  },
  {
    id: 'bs-105',
    name: 'Bijwasan Rural Bypass Junction',
    lat: 28.5800,
    lng: 77.1600,
    riskScore: 58,
    severity: 'Medium',
    accidentCount: 15,
    fatalities: 1,
    mainCause: 'Unlit Rural Intersection & High Speed Tractor Movements',
    lastIncident: '4 days ago (Nighttime Side Scrape)',
    suggestedSpeed: '40 km/h',
    aiRecommendation:
      'Install solar flashing red beacons, clear roadside vegetation, and set up a Samaritan volunteer quick-alert post.',
    roadType: 'Rural Connector Highway',
    village: 'Bijwasan Village',
    cityZone: 'Rural Border',
  },
];

export const MOCK_HEATMAP_POINTS: RiskHeatmapPoint[] = [
  { id: 'hm-1', lat: 28.6139, lng: 77.2090, intensity: 0.95, radius: 28, label: 'NH-48 Hotspot Cluster', riskLevel: 'Severe' },
  { id: 'hm-2', lat: 28.6250, lng: 77.3734, intensity: 0.85, radius: 24, label: 'Sector 62 Urban Density', riskLevel: 'Severe' },
  { id: 'hm-3', lat: 28.4744, lng: 77.0863, intensity: 0.72, radius: 20, label: 'MG Road Spillover Zone', riskLevel: 'High' },
  { id: 'hm-4', lat: 28.6400, lng: 77.2300, intensity: 0.68, radius: 18, label: 'GT Road Freight Belt', riskLevel: 'High' },
  { id: 'hm-5', lat: 28.5800, lng: 77.1600, intensity: 0.55, radius: 16, label: 'Bijwasan Rural Corridor', riskLevel: 'Moderate' },
  { id: 'hm-6', lat: 28.6010, lng: 77.2180, intensity: 0.48, radius: 15, label: 'Rangpuri Congestion Slip', riskLevel: 'Moderate' },
  { id: 'hm-7', lat: 28.6310, lng: 77.2020, intensity: 0.62, radius: 17, label: 'Connaught Place Ring Hazard', riskLevel: 'High' },
];

export const MOCK_ROAD_CONDITIONS: RoadConditionZone[] = [
  {
    id: 'rc-1',
    name: 'Flyover Underpass Waterlogging Hazard',
    type: 'slippery',
    lat: 28.6180,
    lng: 77.2150,
    description: '3 inches standing rainwater on tarmac. High hydroplaning hazard.',
    hazardLevel: 'High',
  },
  {
    id: 'rc-2',
    name: 'Metro Expansion Excavation Zone',
    type: 'construction',
    lat: 28.6080,
    lng: 77.1980,
    description: 'Single-lane road narrow narrowing due to construction barricades.',
    hazardLevel: 'Medium',
  },
  {
    id: 'rc-3',
    name: 'Industrial Belt Pothole Grid',
    type: 'potholes',
    lat: 28.6350,
    lng: 77.2250,
    description: 'Multiple deep pavement cracks & loose gravel after heavy rain.',
    hazardLevel: 'High',
  },
  {
    id: 'rc-4',
    name: 'Outer Bypass Unlit Stretch',
    type: 'unlit',
    lat: 28.5680,
    lng: 77.1450,
    description: 'Streetlights offline for 1.8 km stretch. Night driving hazard.',
    hazardLevel: 'High',
  },
];
