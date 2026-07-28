/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CommandCenterKpi {
  id: string;
  label: string;
  value: string | number;
  unit?: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  color: string;
  description: string;
}

export interface TimelineStep {
  id: string;
  title: string;
  timestamp: string;
  status: 'completed' | 'in_progress' | 'pending';
  actor: string;
  details: string;
  location?: string;
  iconName: string;
}

export interface IncidentAnalysis {
  incidentId: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  goldenHourChance: number; // percentage e.g. 94
  requiredAmbulances: number;
  requiredVolunteers: number;
  nearestTraumaCenter: {
    name: string;
    distance: string;
    etaMinutes: number;
    bedsFree: number;
  };
  nearestBloodBank: {
    name: string;
    distance: string;
    stockStatus: string;
  };
  nearestPoliceStation: {
    name: string;
    distance: string;
    unitDispatched: string;
  };
  survivalImprovementPercent: number;
  aiDiagnosticSummary: string;
}

export interface ResourceAvailabilityItem {
  id: string;
  category: string;
  name: string;
  total: number;
  available: number;
  status: 'Optimal' | 'Warning' | 'Critical';
  unit: string;
  details?: string;
}

export interface BloodStockItem {
  type: 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+';
  unitsAvailable: number;
  status: 'Sufficient' | 'Low' | 'Critical';
}

export interface EmergencyContact {
  id: string;
  title: string;
  category: 'National' | 'Hospital' | 'Police' | 'Fire' | 'Personal';
  number: string;
  description: string;
  avgWaitTime: string;
  icon: string;
  badgeColor: string;
}

export interface BroadcastChannel {
  id: string;
  recipientGroup: 'Nearby Volunteers' | 'Hospitals' | 'Police Patrols' | 'Traffic Control' | 'Civil Defense NGOs' | 'Blood Banks';
  recipientCount: number;
  status: 'Idle' | 'Broadcasting' | 'Delivered' | 'Acknowledged';
  deliveryPercent: number;
  iconName: string;
}

export interface AiRecommendation {
  id: string;
  title: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  category: 'First Aid' | 'Safety' | 'Medical Dispatch' | 'Spine Protocol';
  description: string;
  steps: string[];
  icon: string;
  warningAlert?: string;
}

export interface EmergencyTypeStat {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export interface ResponseTimeStat {
  zone: string;
  avgTimeMinutes: number;
  benchmarkMinutes: number;
}

export interface MonthlyRescueStat {
  month: string;
  rescuesCount: number;
  livesSaved: number;
}

// MOCK DATA IMPLEMENTATIONS

export const MOCK_COMMAND_KPIS: CommandCenterKpi[] = [
  {
    id: 'kpi-1',
    label: 'Active Emergencies',
    value: 7,
    unit: 'Live Cases',
    change: '-2 from last hour',
    trend: 'down',
    icon: 'ShieldAlert',
    color: 'rose',
    description: 'Real-time active emergency pings in NCR corridor',
  },
  {
    id: 'kpi-2',
    label: 'Nearby CPR Volunteers',
    value: 142,
    unit: 'Active On-Duty',
    change: '+18 today',
    trend: 'up',
    icon: 'Users',
    color: 'blue',
    description: 'Verified Samaritans within 3km radial radius',
  },
  {
    id: 'kpi-3',
    label: 'Available Ambulances',
    value: 28,
    unit: 'ALS Units Free',
    change: '88% Fleet Ready',
    trend: 'stable',
    icon: 'Ambulance',
    color: 'emerald',
    description: 'Advanced Life Support ambulances ready for dispatch',
  },
  {
    id: 'kpi-4',
    label: 'Nearby Hospitals',
    value: 16,
    unit: 'Trauma Centers',
    change: '100% Online',
    trend: 'stable',
    icon: 'Hospital',
    color: 'indigo',
    description: 'Level-1 & Level-2 ER units integrated on telemetry',
  },
  {
    id: 'kpi-5',
    label: 'Police Outposts',
    value: 12,
    unit: 'Expressway Posts',
    change: '2 min Avg Patrol Speed',
    trend: 'up',
    icon: 'ShieldCheck',
    color: 'amber',
    description: 'Highway PCR vans on active intercept duty',
  },
  {
    id: 'kpi-6',
    label: 'Fire Response Posts',
    value: 8,
    unit: 'Hazmat Stations',
    change: 'Operational',
    trend: 'stable',
    icon: 'Flame',
    color: 'orange',
    description: 'Heavy hydraulic extrication units ready',
  },
  {
    id: 'kpi-7',
    label: 'Average Response Time',
    value: '6.4',
    unit: 'Minutes',
    change: '1.2 min faster than avg',
    trend: 'down',
    icon: 'Zap',
    color: 'cyan',
    description: 'Time from initial SOS broadcast to first responder arrival',
  },
  {
    id: 'kpi-8',
    label: 'Lives Saved Today',
    value: 34,
    unit: 'Victims Stabilized',
    change: '+9 vs yesterday',
    trend: 'up',
    icon: 'HeartPulse',
    color: 'emerald',
    description: 'Successful Golden Hour interventions recorded',
  },
];

export const MOCK_LIVE_TIMELINE: TimelineStep[] = [
  {
    id: 'ts-1',
    title: 'SOS Emergency Signal Broadcast',
    timestamp: '08:41:02 AM (0 min)',
    status: 'completed',
    actor: 'Victim Smartphone (GPS Sentinel Auto-Detect)',
    details: 'Satellite coordinates locked at NH-48 Expressway KM 22. Emergency packet generated.',
    location: 'NH-48 Mahipalpur Flyover Apex',
    iconName: 'Radio',
  },
  {
    id: 'ts-2',
    title: 'Nearby CPR Volunteers Notified',
    timestamp: '08:41:15 AM (+13s)',
    status: 'completed',
    actor: 'GoldenGuard AI Dispatch Network',
    details: 'Push notifications dispatched to 4 CPR-certified Samaritans within 1.2km radius.',
    iconName: 'Users',
  },
  {
    id: 'ts-3',
    title: 'Volunteer Dr. Rajesh Accepted',
    timestamp: '08:41:48 AM (+46s)',
    status: 'completed',
    actor: 'Dr. Rajesh Sharma (Trauma Volunteer)',
    details: 'En route on motorcycle with AED portable defibrillator & first-aid kit. ETA 2.5 mins.',
    iconName: 'CheckCircle2',
  },
  {
    id: 'ts-4',
    title: 'AIIMS Level-1 Trauma Alerted',
    timestamp: '08:42:10 AM (+1m 08s)',
    status: 'completed',
    actor: 'Automated Hospital Telemetry Bridge',
    details: 'Trauma ER bay reserved. ICU bed #4 held with blood plasma pre-crossmatched (O-).',
    location: 'AIIMS Emergency Complex',
    iconName: 'Hospital',
  },
  {
    id: 'ts-5',
    title: 'Expressway PCR Police Unit Dispatched',
    timestamp: '08:42:30 AM (+1m 28s)',
    status: 'completed',
    actor: 'Delhi Traffic Police Dispatcher',
    details: 'PCR Patrol Unit #12 clearing green corridor traffic lights along Outer Ring Road.',
    iconName: 'Shield',
  },
  {
    id: 'ts-6',
    title: 'Advanced Life Support Ambulance Dispatched',
    timestamp: '08:43:00 AM (+1m 58s)',
    status: 'in_progress',
    actor: '108 CATS Emergency Ambulance Service',
    details: 'Ambulance DL-1C-9920 equipped with ventilator and telemetry monitor en route. ETA 4 mins.',
    iconName: 'Ambulance',
  },
  {
    id: 'ts-7',
    title: 'Patient Transfer to Trauma ER Center',
    timestamp: 'Estimated 08:48:00 AM',
    status: 'pending',
    actor: 'Trauma Reception Team',
    details: 'Direct admission to ICU Bay without registration paperwork delay (Golden Hour Rule).',
    iconName: 'HeartPulse',
  },
];

export const MOCK_INCIDENT_ANALYSIS: IncidentAnalysis = {
  incidentId: 'INC-784920',
  severity: 'Critical',
  goldenHourChance: 94,
  requiredAmbulances: 2,
  requiredVolunteers: 3,
  nearestTraumaCenter: {
    name: 'AIIMS Level-1 Apex Trauma Center',
    distance: '2.1 km',
    etaMinutes: 6,
    bedsFree: 14,
  },
  nearestBloodBank: {
    name: 'Red Cross Central Blood Bank',
    distance: '1.4 km',
    stockStatus: 'O- Negative Available (18 Units)',
  },
  nearestPoliceStation: {
    name: 'Vasant Kunj Traffic Control Cell',
    distance: '0.9 km',
    unitDispatched: 'PCR Van #12 (En Route)',
  },
  survivalImprovementPercent: 78,
  aiDiagnosticSummary:
    'High-speed rollover crash detected via accelerometer telemetry. Kinetic impact vector indicates severe thoracic trauma risk. Immediate airway clearing and cervical spine stabilization required.',
};

export const MOCK_RESOURCE_AVAILABILITY: ResourceAvailabilityItem[] = [
  {
    id: 'res-1',
    category: 'Hospitals',
    name: 'General Ward Beds',
    total: 320,
    available: 84,
    status: 'Optimal',
    unit: 'Beds Available',
    details: '5 regional emergency partner hospitals',
  },
  {
    id: 'res-2',
    category: 'Hospitals',
    name: 'Critical ICU Beds',
    total: 60,
    available: 14,
    status: 'Warning',
    unit: 'ICU Beds Free',
    details: 'AIIMS, Safdarjung, Fortis Vasant Kunj',
  },
  {
    id: 'res-3',
    category: 'Ambulance',
    name: 'ALS Ambulances (Ventilator Ready)',
    total: 35,
    available: 28,
    status: 'Optimal',
    unit: 'Vehicles Ready',
    details: 'Average dispatch speed < 2 mins',
  },
  {
    id: 'res-4',
    category: 'Volunteers',
    name: 'CPR Certified First Responders',
    total: 200,
    available: 142,
    status: 'Optimal',
    unit: 'Active Volunteers',
    details: 'Equipped with digital SOS beacons',
  },
  {
    id: 'res-5',
    category: 'Police',
    name: 'Expressway Patrol Vans',
    total: 15,
    available: 12,
    status: 'Optimal',
    unit: 'PCR Units On Duty',
    details: 'Equipped with hydraulic rescue jaws',
  },
];

export const MOCK_BLOOD_STOCK: BloodStockItem[] = [
  { type: 'O-', unitsAvailable: 18, status: 'Sufficient' },
  { type: 'O+', unitsAvailable: 42, status: 'Sufficient' },
  { type: 'A+', unitsAvailable: 29, status: 'Sufficient' },
  { type: 'A-', unitsAvailable: 6, status: 'Low' },
  { type: 'B+', unitsAvailable: 38, status: 'Sufficient' },
  { type: 'B-', unitsAvailable: 4, status: 'Critical' },
  { type: 'AB+', unitsAvailable: 22, status: 'Sufficient' },
  { type: 'AB-', unitsAvailable: 3, status: 'Critical' },
];

export const MOCK_EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'cnt-108',
    title: '108 CATS Ambulance Service',
    category: 'National',
    number: '108',
    description: 'National Centralized Medical Response Dispatcher',
    avgWaitTime: 'Immediate (<3s)',
    icon: 'Ambulance',
    badgeColor: 'bg-rose-600 text-white',
  },
  {
    id: 'cnt-112',
    title: '112 Unified Emergency Helpline',
    category: 'National',
    number: '112',
    description: 'Single Police, Fire & Medical Unified Line',
    avgWaitTime: 'Immediate (<2s)',
    icon: 'ShieldAlert',
    badgeColor: 'bg-amber-600 text-white',
  },
  {
    id: 'cnt-100',
    title: 'Police Control Room (PCR)',
    category: 'Police',
    number: '100',
    description: 'Traffic Control & Law Enforcement Response',
    avgWaitTime: 'Fast (<5s)',
    icon: 'Shield',
    badgeColor: 'bg-blue-600 text-white',
  },
  {
    id: 'cnt-101',
    title: 'Fire Brigade & Rescue Dispatch',
    category: 'Fire',
    number: '101',
    description: 'Fire Suppression & Vehicle Extrication Team',
    avgWaitTime: 'Immediate (<4s)',
    icon: 'Flame',
    badgeColor: 'bg-orange-600 text-white',
  },
  {
    id: 'cnt-hosp',
    title: 'AIIMS Trauma ER Hotline',
    category: 'Hospital',
    number: '+911126588500',
    description: 'Direct Line to Level-1 Trauma Triage Desk',
    avgWaitTime: 'Direct Line',
    icon: 'Hospital',
    badgeColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'cnt-family',
    title: 'Primary Kin Family Emergency Contact',
    category: 'Personal',
    number: '+919876543210',
    description: 'Designated SOS ICE (In Case of Emergency) Contact',
    avgWaitTime: 'Personal Phone',
    icon: 'PhoneCall',
    badgeColor: 'bg-purple-600 text-white',
  },
];

export const MOCK_BROADCAST_CHANNELS: BroadcastChannel[] = [
  {
    id: 'bc-1',
    recipientGroup: 'Nearby Volunteers',
    recipientCount: 142,
    status: 'Delivered',
    deliveryPercent: 100,
    iconName: 'Users',
  },
  {
    id: 'bc-2',
    recipientGroup: 'Hospitals',
    recipientCount: 16,
    status: 'Acknowledged',
    deliveryPercent: 100,
    iconName: 'Hospital',
  },
  {
    id: 'bc-3',
    recipientGroup: 'Police Patrols',
    recipientCount: 12,
    status: 'Delivered',
    deliveryPercent: 92,
    iconName: 'Shield',
  },
  {
    id: 'bc-4',
    recipientGroup: 'Traffic Control',
    recipientCount: 8,
    status: 'Acknowledged',
    deliveryPercent: 100,
    iconName: 'Compass',
  },
  {
    id: 'bc-5',
    recipientGroup: 'Civil Defense NGOs',
    recipientCount: 34,
    status: 'Delivered',
    deliveryPercent: 88,
    iconName: 'Heart',
  },
  {
    id: 'bc-6',
    recipientGroup: 'Blood Banks',
    recipientCount: 9,
    status: 'Delivered',
    deliveryPercent: 95,
    iconName: 'HeartPulse',
  },
];

export const MOCK_AI_RECOMMENDATIONS: AiRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Execute CPR (Cardiopulmonary Resuscitation)',
    priority: 'CRITICAL',
    category: 'First Aid',
    description:
      'If victim is unconscious and not breathing normally, begin chest compressions immediately.',
    steps: [
      'Place heel of hand on center of victim chest.',
      'Lock elbows and press down firmly 2 to 2.5 inches deep.',
      'Maintain rhythm of 100–120 compressions per minute (e.g., to the beat of "Staying Alive").',
      'Use AED defibrillator as soon as nearby volunteer arrives.',
    ],
    icon: 'HeartPulse',
    warningAlert: 'CRITICAL: Do not interrupt compressions for more than 10 seconds.',
  },
  {
    id: 'rec-2',
    title: 'Control Arterial Bleeding',
    priority: 'CRITICAL',
    category: 'First Aid',
    description:
      'Apply firm, continuous direct pressure to heavy bleeding wounds using clean cloth or trauma bandage.',
    steps: [
      'Locate wound source and apply direct hand pressure.',
      'Elevate injured limb above heart level if no bone fracture suspected.',
      'Apply pressure bandage firmly; do not remove soaked bandages, add new layers on top.',
    ],
    icon: 'ShieldAlert',
    warningAlert: 'If limb hemorrhage is uncontrollable, apply tourniquet 2 inches above wound.',
  },
  {
    id: 'rec-3',
    title: 'Avoid Moving Spine Injury Victims',
    priority: 'HIGH',
    category: 'Spine Protocol',
    description:
      'Do not move victim unless immediate life-threatening hazard exists (e.g. active vehicle fire or explosion risk).',
    steps: [
      'Keep head, neck, and torso aligned in neutral straight line.',
      'Hold victim head gently with both hands to prevent rotation.',
      'Wait for paramedics with cervical collar & spine board.',
    ],
    icon: 'AlertTriangle',
  },
  {
    id: 'rec-4',
    title: 'Move Unconscious Breathing Victim to Safe Zone / Recovery Position',
    priority: 'HIGH',
    category: 'Safety',
    description:
      'If victim is breathing normally but unconscious, place in lateral recovery position to keep airway clear of fluids.',
    steps: [
      'Roll victim gently onto left side.',
      'Bend top knee at a 90-degree angle to support body.',
      'Tilt chin upward slightly to maintain open airway.',
    ],
    icon: 'Activity',
  },
  {
    id: 'rec-5',
    title: 'Call Trauma Center & Clear Traffic Path',
    priority: 'MEDIUM',
    category: 'Medical Dispatch',
    description:
      'Assign a bystander to stand 100 meters down the highway with reflective flashlight to direct oncoming traffic.',
    steps: [
      'Maintain continuous communication with 108 medical dispatcher.',
      'Clear perimeter space for ambulance stretcher access.',
    ],
    icon: 'PhoneCall',
  },
];

export const MOCK_EMERGENCY_TYPES_ANALYTICS: EmergencyTypeStat[] = [
  { type: 'Highway Rollover Collisions', count: 142, percentage: 42, color: '#ef4444' },
  { type: 'Two-Wheeler Rear-End Slips', count: 98, percentage: 29, color: '#f97316' },
  { type: 'Pedestrian Crossing Hit', count: 54, percentage: 16, color: '#eab308' },
  { type: 'Heavy Commercial Truck Scrapes', count: 28, percentage: 8, color: '#3b82f6' },
  { type: 'Vehicle Hydroplaning in Rain', count: 18, percentage: 5, color: '#10b981' },
];

export const MOCK_RESPONSE_TIME_ANALYTICS: ResponseTimeStat[] = [
  { zone: 'NH-48 Mahipalpur Corridor', avgTimeMinutes: 5.2, benchmarkMinutes: 8.0 },
  { zone: 'Outer Ring Road Delhi', avgTimeMinutes: 6.1, benchmarkMinutes: 8.0 },
  { zone: 'Gurugram Cyber City Expressway', avgTimeMinutes: 5.8, benchmarkMinutes: 8.0 },
  { zone: 'Noida Expressway Sector 62', avgTimeMinutes: 6.9, benchmarkMinutes: 8.0 },
  { zone: 'GT Karnal Road Industrial Belt', avgTimeMinutes: 7.4, benchmarkMinutes: 8.0 },
];

export const MOCK_MONTHLY_RESCUE_ANALYTICS: MonthlyRescueStat[] = [
  { month: 'Jan', rescuesCount: 180, livesSaved: 168 },
  { month: 'Feb', rescuesCount: 210, livesSaved: 198 },
  { month: 'Mar', rescuesCount: 245, livesSaved: 232 },
  { month: 'Apr', rescuesCount: 290, livesSaved: 278 },
  { month: 'May', rescuesCount: 340, livesSaved: 326 },
  { month: 'Jun', rescuesCount: 410, livesSaved: 395 },
  { month: 'Jul', rescuesCount: 480, livesSaved: 462 },
];
