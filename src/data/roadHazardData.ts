/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type HazardType =
  | 'Pothole'
  | 'Waterlogging'
  | 'Broken Traffic Signal'
  | 'Road Crack'
  | 'Fallen Tree'
  | 'Oil Spill'
  | 'Damaged Divider'
  | 'Missing Speed Breaker'
  | 'Missing Zebra Crossing'
  | 'Open Manhole'
  | 'Construction Area'
  | 'Wrong Side Parking'
  | 'Fog Zone'
  | 'Landslide'
  | 'Flooded Road';

export type HazardSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export type HazardStatus = 'Pending' | 'Verified' | 'In Progress' | 'Resolved';

export interface HazardComment {
  id: string;
  userName: string;
  userAvatar?: string;
  userRole?: string;
  text: string;
  timestamp: string;
}

export interface AiHazardAnalysis {
  hazardCategory: string;
  riskLevel: HazardSeverity;
  confidencePercent: number;
  roadSafetyImpactScore: number; // e.g. -28 pts
  suggestedAction: string;
  estimatedRepairPriority: 'P1 - Emergency (24h)' | 'P2 - High Priority (48h)' | 'P3 - Routine (7 Days)';
}

export interface RoadHazard {
  id: string;
  type: HazardType;
  severity: HazardSeverity;
  status: HazardStatus;
  title: string;
  description: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  photoUrl: string;
  videoUrl?: string;
  reporterName: string;
  reporterRole?: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: HazardComment[];
  aiAnalysis: AiHazardAnalysis;
  assignedDepartment?: string;
  resolvedAt?: string;
}

export interface HazardGovernmentStats {
  pendingCount: number;
  verifiedCount: number;
  resolvedCount: number;
  criticalCount: number;
  avgResolutionTimeHours: number;
}

export const HAZARD_TYPES_LIST: HazardType[] = [
  'Pothole',
  'Waterlogging',
  'Broken Traffic Signal',
  'Road Crack',
  'Fallen Tree',
  'Oil Spill',
  'Damaged Divider',
  'Missing Speed Breaker',
  'Missing Zebra Crossing',
  'Open Manhole',
  'Construction Area',
  'Wrong Side Parking',
  'Fog Zone',
  'Landslide',
  'Flooded Road',
];

export const MOCK_ROAD_HAZARDS: RoadHazard[] = [
  {
    id: 'haz-101',
    type: 'Open Manhole',
    severity: 'Critical',
    status: 'Pending',
    title: 'Deep Uncovered Storm Manhole on Express Highway',
    description:
      'A missing steel cover on a 4ft deep storm drain near the bus stop lane posing extreme risk to 2-wheelers and pedestrians at night.',
    address: 'Outer Ring Road, Near Gate 3 IIT Flyover',
    city: 'Delhi NCR',
    lat: 28.545,
    lng: 77.192,
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4',
    reporterName: 'Rahul Verma (Commuter)',
    reporterRole: 'Verified Citizen',
    createdAt: '2026-07-28 07:15 AM',
    upvotes: 48,
    downvotes: 2,
    comments: [
      {
        id: 'c-1',
        userName: 'Anish Kumar',
        text: 'Nearly fell into this on my scooter this morning! Very dangerous spot.',
        timestamp: '07:30 AM',
      },
      {
        id: 'c-2',
        userName: 'Suresh PWD Rep',
        text: 'Barricades deployed by traffic police patrol. Permanent cover replacement queued.',
        timestamp: '08:10 AM',
      },
    ],
    aiAnalysis: {
      hazardCategory: 'Infrastructure Structural Defect',
      riskLevel: 'Critical',
      confidencePercent: 97,
      roadSafetyImpactScore: -35,
      suggestedAction: 'Erect reflective high-visibility warning cones immediately & dispatch Municipal PWD drain crew.',
      estimatedRepairPriority: 'P1 - Emergency (24h)',
    },
    assignedDepartment: 'Municipal Public Works Dept (PWD)',
  },
  {
    id: 'haz-102',
    type: 'Waterlogging',
    severity: 'High',
    status: 'Verified',
    title: 'Severe Underpass Flooding & Submerged Asphalt',
    description:
      'Monsoon runoff accumulated to 2.5ft depth inside underpass causing hydroplaning and stalled commercial vehicles.',
    address: 'DLF Cyber City Underpass 2',
    city: 'Gurugram',
    lat: 28.495,
    lng: 77.088,
    photoUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Pooja Sharma',
    reporterRole: 'Samaritan Captain',
    createdAt: '2026-07-28 06:40 AM',
    upvotes: 34,
    downvotes: 1,
    comments: [
      {
        id: 'c-3',
        userName: 'Vikram Singh',
        text: 'Traffic being diverted via MG Road upper flyover.',
        timestamp: '07:05 AM',
      },
    ],
    aiAnalysis: {
      hazardCategory: 'Hydrological & Monsoon Hazard',
      riskLevel: 'High',
      confidencePercent: 95,
      roadSafetyImpactScore: -28,
      suggestedAction: 'Activate high-capacity diesel water pumps & broadcast regional safe navigation alert.',
      estimatedRepairPriority: 'P1 - Emergency (24h)',
    },
    assignedDepartment: 'Gurugram Metropolitan Development Authority',
  },
  {
    id: 'haz-103',
    type: 'Pothole',
    severity: 'High',
    status: 'In Progress',
    title: 'Multiple Deep Crater Potholes across Center Lane',
    description:
      '3-foot wide deep asphalt crater causing sudden swerving and tyre blowouts on high-speed lane.',
    address: 'Sector 62 Express Corridor KM 14',
    city: 'Noida',
    lat: 28.628,
    lng: 77.365,
    photoUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Amit Patel',
    reporterRole: 'Bus Driver',
    createdAt: '2026-07-27 09:20 PM',
    upvotes: 62,
    downvotes: 3,
    comments: [
      {
        id: 'c-4',
        userName: 'Noida PWD Maintenance',
        text: 'Cold-mix asphalt patch truck dispatched and working on-site.',
        timestamp: '2026-07-28 08:00 AM',
      },
    ],
    aiAnalysis: {
      hazardCategory: 'Pavement Degradation',
      riskLevel: 'High',
      confidencePercent: 98,
      roadSafetyImpactScore: -24,
      suggestedAction: 'Cold-mix asphalt patch fill and leveling required.',
      estimatedRepairPriority: 'P2 - High Priority (48h)',
    },
    assignedDepartment: 'Noida Highway Authority',
  },
  {
    id: 'haz-104',
    type: 'Broken Traffic Signal',
    severity: 'Medium',
    status: 'Pending',
    title: 'Traffic Light Power Outage & Blinking Red Failover',
    description:
      'Main junction traffic signal controller short-circuited following heavy morning storm, causing chaotic 4-way intersection gridlock.',
    address: 'Connaught Place Outer Circle & Janpath Crossing',
    city: 'Delhi NCR',
    lat: 28.629,
    lng: 77.218,
    photoUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Neha Gupta',
    reporterRole: 'Verified Citizen',
    createdAt: '2026-07-28 08:05 AM',
    upvotes: 22,
    downvotes: 1,
    comments: [],
    aiAnalysis: {
      hazardCategory: 'Traffic Signal & Power Control',
      riskLevel: 'Medium',
      confidencePercent: 92,
      roadSafetyImpactScore: -18,
      suggestedAction: 'Deploy manual traffic police constable & send signal electronics repair engineer.',
      estimatedRepairPriority: 'P2 - High Priority (48h)',
    },
    assignedDepartment: 'Delhi Traffic Police Signal Cell',
  },
  {
    id: 'haz-105',
    type: 'Fallen Tree',
    severity: 'High',
    status: 'Resolved',
    title: 'Uprooted Banyan Tree Blocking Dual Lanes',
    description:
      'Heavy branch collapse blocking both northbound lanes. Tree removed by forestry emergency team.',
    address: 'Shanti Path Diplomatic Enclave',
    city: 'Delhi NCR',
    lat: 28.591,
    lng: 77.198,
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Capt. S. K. Roy',
    reporterRole: 'Resident Association Lead',
    createdAt: '2026-07-27 05:30 PM',
    resolvedAt: '2026-07-27 08:45 PM',
    upvotes: 89,
    downvotes: 0,
    comments: [
      {
        id: 'c-5',
        userName: 'NDMC Forest Unit',
        text: 'Tree cleared with hydraulic chainsaws. Road completely restored.',
        timestamp: '08:50 PM',
      },
    ],
    aiAnalysis: {
      hazardCategory: 'Environmental Obstruction',
      riskLevel: 'High',
      confidencePercent: 99,
      roadSafetyImpactScore: -30,
      suggestedAction: 'Chainsaw clearance & debris haulage.',
      estimatedRepairPriority: 'P1 - Emergency (24h)',
    },
    assignedDepartment: 'NDMC Forest & Horticulture Dept',
  },
  {
    id: 'haz-106',
    type: 'Oil Spill',
    severity: 'Critical',
    status: 'Verified',
    title: 'Diesel Fuel Slick on Curved Expressway Ramp',
    description:
      'Leakage from overturned tanker truck created a slippery 200m oil slick on sharp exit loop.',
    address: 'Noida-Greater Noida Expressway Loop 4',
    city: 'Noida',
    lat: 28.528,
    lng: 77.382,
    photoUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Karan Mehra',
    reporterRole: 'Highway Patrol Officer',
    createdAt: '2026-07-28 07:50 AM',
    upvotes: 41,
    downvotes: 0,
    comments: [],
    aiAnalysis: {
      hazardCategory: 'Hazardous Chemical / Slick Risk',
      riskLevel: 'Critical',
      confidencePercent: 96,
      roadSafetyImpactScore: -38,
      suggestedAction: 'Spread absorbent sand/sawdust and deploy foam fire suppression squad immediately.',
      estimatedRepairPriority: 'P1 - Emergency (24h)',
    },
    assignedDepartment: 'Fire Brigade Hazmat Team & PWD',
  },
  {
    id: 'haz-107',
    type: 'Missing Zebra Crossing',
    severity: 'Low',
    status: 'Pending',
    title: 'Faded School Zone Pedestrian Crosswalk Paint',
    description:
      'Thermoplastic road marking faded completely near primary school entrance.',
    address: 'Vasant Vihar Block B Main Road',
    city: 'Delhi NCR',
    lat: 28.562,
    lng: 77.161,
    photoUrl: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80',
    reporterName: 'Sunita Rao',
    reporterRole: 'School Parent Committee',
    createdAt: '2026-07-26 10:00 AM',
    upvotes: 18,
    downvotes: 1,
    comments: [],
    aiAnalysis: {
      hazardCategory: 'Pedestrian Marking Deficiency',
      riskLevel: 'Low',
      confidencePercent: 89,
      roadSafetyImpactScore: -10,
      suggestedAction: 'Repaint reflective thermoplastic zebra stripes and place solar cat-eyes.',
      estimatedRepairPriority: 'P3 - Routine (7 Days)',
    },
    assignedDepartment: 'Municipal Road Paint & Safety Cell',
  },
];

export const MOCK_GOVT_STATS: HazardGovernmentStats = {
  pendingCount: 14,
  verifiedCount: 28,
  resolvedCount: 86,
  criticalCount: 5,
  avgResolutionTimeHours: 4.2,
};

export const MOCK_ANALYTICS_BY_TYPE = [
  { type: 'Potholes', count: 42, color: '#f97316' },
  { type: 'Waterlogging', count: 28, color: '#3b82f6' },
  { type: 'Open Manholes', count: 18, color: '#ef4444' },
  { type: 'Signal Faults', count: 15, color: '#eab308' },
  { type: 'Fallen Trees', count: 12, color: '#10b981' },
  { type: 'Oil Spills', count: 8, color: '#8b5cf6' },
  { type: 'Other Hazards', count: 14, color: '#64748b' },
];

export const MOCK_ANALYTICS_BY_CITY = [
  { city: 'Delhi NCR', hazards: 54, resolvedPercent: 82 },
  { city: 'Gurugram', hazards: 38, resolvedPercent: 78 },
  { city: 'Noida', hazards: 29, resolvedPercent: 85 },
  { city: 'Faridabad', hazards: 16, resolvedPercent: 70 },
  { city: 'Ghaziabad', hazards: 22, resolvedPercent: 72 },
];

export const MOCK_ANALYTICS_MONTHLY = [
  { month: 'Jan', reported: 65, resolved: 58 },
  { month: 'Feb', reported: 80, resolved: 74 },
  { month: 'Mar', reported: 95, resolved: 88 },
  { month: 'Apr', reported: 110, resolved: 102 },
  { month: 'May', reported: 135, resolved: 125 },
  { month: 'Jun', reported: 160, resolved: 150 },
  { month: 'Jul', reported: 185, resolved: 172 },
];
