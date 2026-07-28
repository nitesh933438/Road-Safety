/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface EmergencyService {
  id: string;
  name: string;
  type: 'hospital' | 'trauma' | 'police' | 'ambulance' | 'blood' | 'fire' | 'petrol';
  lat: number;
  lng: number;
  distance: string;
  rating: number;
  address: string;
  phone: string;
  info: string;
  status: string; // e.g., 'Open 24/7' or 'Open • Closes 11 PM'
  city?: string;
  highway?: string;
  village?: string;
}

export interface BlackSpot {
  id: string;
  name: string;
  lat: number;
  lng: number;
  severity: 'Green' | 'Yellow' | 'Orange' | 'Red';
  accidentCount: number;
  cause: string;
  lastReported: string;
}

export interface AccidentReport {
  id: string;
  lat: number;
  lng: number;
  address: string;
  dateTime: string;
  accidentType: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  injuredCount: number;
  vehicleType: string;
  description: string;
  imageUrl?: string;
  aiRecommendation?: string;
}

export const MOCK_SERVICES: EmergencyService[] = [
  {
    id: 's1',
    name: 'Apex Level-1 Trauma Centre',
    type: 'trauma',
    lat: 28.6139,
    lng: 77.2090,
    distance: '1.2 km',
    rating: 4.9,
    address: 'NH-48 Highway Junction, Delhi NCR',
    phone: '+91 98765 43210',
    info: '14 Trauma ICU Beds & Helipad',
    status: 'Open 24/7',
    city: 'Delhi',
    highway: 'NH-48',
  },
  {
    id: 's2',
    name: 'LifeLine Super Speciality Hospital',
    type: 'hospital',
    lat: 28.6250,
    lng: 77.2150,
    distance: '2.8 km',
    rating: 4.8,
    address: 'Ring Road Crossing, Near Metro Station, Central Delhi',
    phone: '+91 98765 43211',
    info: '24/7 Emergency Ward & Cardiac Care',
    status: 'Open 24/7',
    city: 'Delhi',
    highway: 'Ring Road',
  },
  {
    id: 's3',
    name: 'Highway Patrol & Police Control Post',
    type: 'police',
    lat: 28.6050,
    lng: 77.1950,
    distance: '0.8 km',
    rating: 4.7,
    address: 'NH-48 Corridor KM 142, Mahipalpur',
    phone: '112',
    info: 'Fast Highway Patrol & Interceptor Vehicles',
    status: 'Open 24/7',
    city: 'Delhi',
    highway: 'NH-48',
  },
  {
    id: 's4',
    name: 'National 108 ALS Ambulance Station',
    type: 'ambulance',
    lat: 28.6200,
    lng: 77.1900,
    distance: '2.1 km',
    rating: 4.9,
    address: 'Central Emergency Rapid Response Hub, Gurugram Border',
    phone: '108',
    info: '8 ALS Ambulances Equipped with Ventilators',
    status: 'Open 24/7',
    city: 'Gurugram',
    highway: 'Delhi-Gurugram Expressway',
  },
  {
    id: 's5',
    name: 'Rotary Blood Bank & Universal Plasma Hub',
    type: 'blood',
    lat: 28.6100,
    lng: 77.2250,
    distance: '3.4 km',
    rating: 4.9,
    address: 'Civil Lines Emergency Road, North Delhi',
    phone: '+91 98765 43220',
    info: 'O-Negative Rare Blood & Plasma Available',
    status: 'Open 24/7',
    city: 'Delhi',
  },
  {
    id: 's6',
    name: 'Central Fire & Heavy Rescue Station',
    type: 'fire',
    lat: 28.6310,
    lng: 77.2020,
    distance: '2.5 km',
    rating: 4.8,
    address: 'Station Road, Fire Brigade HQ, Connaught Place',
    phone: '101',
    info: 'Hydraulic Cutters & Heavy Crash Tenders',
    status: 'Open 24/7',
    city: 'Delhi',
  },
  {
    id: 's7',
    name: 'IndianOil 24/7 EV & Highway Petrol Pump',
    type: 'petrol',
    lat: 28.6010,
    lng: 77.2180,
    distance: '1.5 km',
    rating: 4.6,
    address: 'NH-48 Exit 6, Near Rangpuri Village',
    phone: '+91 11 2612 3456',
    info: '24/7 Fuel, Air Pressure, EV Fast Charger & Mechanic',
    status: 'Open 24/7',
    city: 'Delhi',
    highway: 'NH-48',
    village: 'Rangpuri',
  },
  {
    id: 's8',
    name: 'Gramin Rural Health & Trauma Center',
    type: 'trauma',
    lat: 28.5800,
    lng: 77.1600,
    distance: '5.2 km',
    rating: 4.5,
    address: 'Main Chowk, Bijwasan Village',
    phone: '+91 98112 33445',
    info: 'Rural Emergency Triage & First Aid',
    status: 'Open 24/7',
    city: 'South West Delhi',
    village: 'Bijwasan',
  },
  {
    id: 's9',
    name: 'Bharat Petroleum Highway Auto Care',
    type: 'petrol',
    lat: 28.6400,
    lng: 77.2300,
    distance: '4.2 km',
    rating: 4.7,
    address: 'Grand Trunk Highway, Near Shahdara',
    phone: '+91 98711 00223',
    info: 'Diesel, EV Charging & Towing Crane Service',
    status: 'Open 24/7',
    city: 'Delhi',
    highway: 'GT Road',
  },
  {
    id: 's10',
    name: 'Gramin Police Outpost - Chhawla Village',
    type: 'police',
    lat: 28.5600,
    lng: 77.1400,
    distance: '6.5 km',
    rating: 4.6,
    address: 'Kanganheri Road, Chhawla Village',
    phone: '+91 11 2531 8800',
    info: 'Village Security Patrol & Immediate Response',
    status: 'Open 24/7',
    city: 'Delhi',
    village: 'Chhawla',
  }
];

export const MOCK_BLACK_SPOTS: BlackSpot[] = [
  {
    id: 'bs1',
    name: 'NH-48 Sector 4 Sharp Curve',
    lat: 28.6300,
    lng: 77.2000,
    severity: 'Red',
    accidentCount: 34,
    cause: 'Overspeeding & Blind Curve',
    lastReported: '2 days ago',
  },
  {
    id: 'bs2',
    name: 'Ring Road Flyover Junction',
    lat: 28.5980,
    lng: 77.2200,
    severity: 'Orange',
    accidentCount: 22,
    cause: 'Poor Lighting & Heavy Truck Traffic',
    lastReported: '5 days ago',
  },
  {
    id: 'bs3',
    name: 'Industrial Highway Crossing',
    lat: 28.6180,
    lng: 77.1800,
    severity: 'Yellow',
    accidentCount: 12,
    cause: 'Illegal U-Turns',
    lastReported: '1 week ago',
  },
];
