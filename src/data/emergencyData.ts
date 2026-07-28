/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Volunteer {
  id: string;
  name: string;
  photo: string;
  distance: string;
  rating: number;
  rescuesCount: number;
  cprCertified: boolean;
  phone: string;
  lat: number;
  lng: number;
  role: string;
}

export interface NearestHospital {
  id: string;
  name: string;
  distance: string;
  travelTime: string;
  lat: number;
  lng: number;
  icuBedsAvailable: number;
  traumaCenterLevel: string;
  phone: string;
  address: string;
}

export interface EmergencyReportData {
  id: string;
  timestamp: string;
  lat: number;
  lng: number;
  address: string;
  photoUrls: string[];
  videoUrls: string[];
  description: string;
  vehicleType: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  injuredCount: number;
  aiSeverityPrediction?: {
    level: 'Low' | 'Medium' | 'High' | 'Critical';
    confidence: number;
    reasoning: string;
  };
  status: 'Submitted' | 'Dispatched' | 'Resolved';
}

export const MOCK_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-1',
    name: 'Dr. Rajesh Sharma',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    distance: '0.4 km away',
    rating: 4.9,
    rescuesCount: 38,
    cprCertified: true,
    phone: '+91 98765 43210',
    lat: 28.6150,
    lng: 77.2110,
    role: 'Trauma Specialist & Red Cross First Responder',
  },
  {
    id: 'vol-2',
    name: 'Priya Verma',
    photo: 'https://images.unsplash.com/photo-1594824813566-88855ce78347?w=150&auto=format&fit=crop&q=80',
    distance: '0.8 km away',
    rating: 4.8,
    rescuesCount: 24,
    cprCertified: true,
    phone: '+91 98123 45678',
    lat: 28.6120,
    lng: 77.2050,
    role: 'Paramedic Volunteer & Highway Marshal',
  },
  {
    id: 'vol-3',
    name: 'Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    distance: '1.2 km away',
    rating: 4.7,
    rescuesCount: 19,
    cprCertified: true,
    phone: '+91 97111 22334',
    lat: 28.6180,
    lng: 77.2150,
    role: 'Certified First Aider & Civil Defense Patrol',
  },
  {
    id: 'vol-4',
    name: 'Ananya Deshmukh',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    distance: '1.7 km away',
    rating: 4.9,
    rescuesCount: 52,
    cprCertified: true,
    phone: '+91 99887 76655',
    lat: 28.6090,
    lng: 77.2200,
    role: 'ER Nurse & Highway Good Samaritan Leader',
  }
];

export const MOCK_NEAREST_HOSPITAL: NearestHospital = {
  id: 'hosp-101',
  name: 'AIIMS Trauma & Emergency Care Center',
  distance: '2.1 km away',
  travelTime: '6 mins (Emergency Priority Route)',
  lat: 28.5672,
  lng: 77.2100,
  icuBedsAvailable: 14,
  traumaCenterLevel: 'Level-1 Emergency Facility',
  phone: '+91 11 2658 8500',
  address: 'Sri Aurobindo Marg, Ansari Nagar, New Delhi',
};
