/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: 'volunteer' | 'citizen' | 'admin' | 'paramedic';
  phone: string;
  bloodGroup: string;
  medicalInfo: string;
  points: number;
  certifications: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface DemoEmergency {
  id: string;
  callerName: string;
  location: string;
  coordinates: { lat: number; lng: number };
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Dispatched' | 'On Scene' | 'Transporting' | 'Resolved';
  timestamp: string;
  assignedAmbulance: string;
  etaMinutes: number;
  aiTriageSummary: string;
  assignedVolunteersCount: number;
}

export interface DemoVolunteer {
  id: string;
  name: string;
  distanceKm: number;
  etaMinutes: number;
  trainingLevel: string;
  phone: string;
  status: 'Available' | 'En Route' | 'On Scene';
  skills: string[];
}

export interface DemoHospital {
  id: string;
  name: string;
  distanceKm: number;
  icuBedsAvailable: number;
  traumaBedsAvailable: number;
  ventilatorsAvailable: number;
  bloodUnitsAvailable: string[];
  contactPhone: string;
  status: 'Ready' | 'Busy' | 'Diverting';
}

export interface DemoReport {
  id: string;
  title: string;
  location: string;
  date: string;
  severity: 'Critical' | 'Moderate' | 'Minor';
  aiAnalysis: string;
  riskScore: number;
  status: 'Verified' | 'Under Investigation' | 'Resolved';
}

export interface DemoAnalytics {
  goldenHourAvgTime: string;
  livesSavedCount: number;
  activeVolunteers: number;
  incidentsResolvedToday: number;
  averageResponseTime: string;
  hospitalReadinessScore: string;
}

interface DemoContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  demoUser: DemoUser;
  emergencies: DemoEmergency[];
  volunteers: DemoVolunteer[];
  hospitals: DemoHospital[];
  reports: DemoReport[];
  analytics: DemoAnalytics[];
  triggerSimulatedSOS: () => void;
  resetDemoData: () => void;
}

const defaultDemoUser: DemoUser = {
  id: 'usr_demo_77',
  name: 'Alex Rivera (Demo Good Samaritan)',
  email: 'alex.rivera.demo@roadguard.org',
  role: 'volunteer',
  phone: '+1 (555) 839-2049',
  bloodGroup: 'O+',
  medicalInfo: 'No known allergies. BLS & CPR Certified Responder.',
  points: 1480,
  certifications: ['Advanced First Aid', 'CPR/AED Certified', 'Trauma Scene Triage', 'Good Samaritan Legal Shield'],
  emergencyContact: {
    name: 'Elena Rivera',
    phone: '+1 (555) 902-1144',
    relation: 'Spouse'
  }
};

const initialEmergencies: DemoEmergency[] = [
  {
    id: 'SOS-2026-8812',
    callerName: 'Sarah Jenkins',
    location: 'NH-48 Corridor, Near Junction 14',
    coordinates: { lat: 28.6139, lng: 77.2090 },
    severity: 'Critical',
    status: 'Dispatched',
    timestamp: '2 mins ago',
    assignedAmbulance: 'ALS Ambulance Unit 04',
    etaMinutes: 4,
    aiTriageSummary: 'Head impact suspected, severe bleeding leg. Airway clear. AI dispatched nearest trauma team.',
    assignedVolunteersCount: 3
  },
  {
    id: 'SOS-2026-8811',
    callerName: 'Rajesh Kumar',
    location: 'Outer Ring Road Flyover KM 12',
    coordinates: { lat: 28.6250, lng: 77.2150 },
    severity: 'High',
    status: 'On Scene',
    timestamp: '11 mins ago',
    assignedAmbulance: 'Rapid Response Bike 02',
    etaMinutes: 0,
    aiTriageSummary: 'Two-wheeler crash. Minor concussion, shoulder dislocation. First responder applying sling.',
    assignedVolunteersCount: 2
  },
  {
    id: 'SOS-2026-8809',
    callerName: 'Auto Incident Alert',
    location: 'Sector 6 Expressway Curve',
    coordinates: { lat: 28.6050, lng: 77.1950 },
    severity: 'Medium',
    status: 'Transporting',
    timestamp: '24 mins ago',
    assignedAmbulance: 'City Trauma Transport 01',
    etaMinutes: 6,
    aiTriageSummary: 'Vehicle rollover. Driver stabilized. Patient in transit to Apex Hospital.',
    assignedVolunteersCount: 1
  }
];

const initialVolunteers: DemoVolunteer[] = [
  {
    id: 'vol-101',
    name: 'Dr. Anita Desai',
    distanceKm: 0.8,
    etaMinutes: 2,
    trainingLevel: 'Emergency Physician (Volunteer Mesh)',
    phone: '+1 (555) 304-1298',
    status: 'En Route',
    skills: ['Trauma Care', 'Airway Management', 'Defibrillator']
  },
  {
    id: 'vol-102',
    name: 'Marcus Vance',
    distanceKm: 1.4,
    etaMinutes: 4,
    trainingLevel: 'Certified First Responder',
    phone: '+1 (555) 441-9923',
    status: 'On Scene',
    skills: ['Bleeding Control', 'CPR', 'Traffic Management']
  },
  {
    id: 'vol-103',
    name: 'Priya Sharma',
    distanceKm: 2.1,
    etaMinutes: 6,
    trainingLevel: 'Red Cross Aid Worker',
    phone: '+1 (555) 883-2001',
    status: 'Available',
    skills: ['Psychological First Aid', 'Splinting', 'CPR']
  }
];

const initialHospitals: DemoHospital[] = [
  {
    id: 'hosp-1',
    name: 'City Apex Level-1 Trauma Center',
    distanceKm: 2.4,
    icuBedsAvailable: 8,
    traumaBedsAvailable: 4,
    ventilatorsAvailable: 5,
    bloodUnitsAvailable: ['O-Negative (12)', 'A-Positive (20)', 'O-Positive (30)'],
    contactPhone: '+1 (555) 911-0010',
    status: 'Ready'
  },
  {
    id: 'hosp-2',
    name: 'St. Jude Emergency & General Hospital',
    distanceKm: 4.1,
    icuBedsAvailable: 3,
    traumaBedsAvailable: 1,
    ventilatorsAvailable: 2,
    bloodUnitsAvailable: ['B-Positive (15)', 'AB-Negative (4)'],
    contactPhone: '+1 (555) 911-0022',
    status: 'Ready'
  },
  {
    id: 'hosp-3',
    name: 'Metropolitan Critical Care Hub',
    distanceKm: 6.8,
    icuBedsAvailable: 0,
    traumaBedsAvailable: 0,
    ventilatorsAvailable: 1,
    bloodUnitsAvailable: ['O-Positive (10)'],
    contactPhone: '+1 (555) 911-0033',
    status: 'Busy'
  }
];

const initialReports: DemoReport[] = [
  {
    id: 'REP-901',
    title: 'High-risk oil spill on Sector 4 Curve',
    location: 'NH-48 Sector 4',
    date: 'Today, 10:30 AM',
    severity: 'Critical',
    aiAnalysis: 'High probability of skidding for two-wheelers. Recommended speed limit reduction to 30km/h.',
    riskScore: 89,
    status: 'Under Investigation'
  },
  {
    id: 'REP-902',
    title: 'Broken street lamps causing blind spot',
    location: 'Ring Road Flyover Underpass',
    date: 'Yesterday, 8:15 PM',
    severity: 'Moderate',
    aiAnalysis: 'Night-time collision likelihood elevated by 45%. Alert dispatched to Municipal Road Safety Authority.',
    riskScore: 68,
    status: 'Verified'
  }
];

const initialAnalytics: DemoAnalytics[] = [
  {
    goldenHourAvgTime: '7.4 mins',
    livesSavedCount: 428,
    activeVolunteers: 1840,
    incidentsResolvedToday: 14,
    averageResponseTime: '4.8 mins',
    hospitalReadinessScore: '98.5%'
  }
];

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('roadguard_demo_mode');
    return saved !== null ? JSON.parse(saved) : true; // Default true for Hackathon showcase!
  });

  const [emergencies, setEmergencies] = useState<DemoEmergency[]>(initialEmergencies);
  const [volunteers] = useState<DemoVolunteer[]>(initialVolunteers);
  const [hospitals] = useState<DemoHospital[]>(initialHospitals);
  const [reports] = useState<DemoReport[]>(initialReports);
  const [analytics] = useState<DemoAnalytics[]>(initialAnalytics);

  useEffect(() => {
    localStorage.setItem('roadguard_demo_mode', JSON.stringify(isDemoMode));
  }, [isDemoMode]);

  const toggleDemoMode = () => {
    const next = !isDemoMode;
    setIsDemoMode(next);
    toast.success(`Demo Mode ${next ? 'ENABLED (Simulated Dataset Active)' : 'DISABLED (Live Backend Mode)'}`);
  };

  const triggerSimulatedSOS = () => {
    const newIncident: DemoEmergency = {
      id: `SOS-SIM-${Math.floor(1000 + Math.random() * 9000)}`,
      callerName: 'Simulated Citizen Alert',
      location: 'Central Plaza Intersection (Simulated Incident)',
      coordinates: { lat: 28.6180 + (Math.random() - 0.5) * 0.02, lng: 77.2000 + (Math.random() - 0.5) * 0.02 },
      severity: 'Critical',
      status: 'Dispatched',
      timestamp: 'Just now',
      assignedAmbulance: 'ALS Ambulance Unit 01',
      etaMinutes: 3,
      aiTriageSummary: 'Automatic Crash Sensor Alert. AI Triage generated: Immediate ALS dispatch and volunteer alert sent.',
      assignedVolunteersCount: 4
    };

    setEmergencies(prev => [newIncident, ...prev]);
    toast.error(`🚨 SIMULATED SOS TRIGGERED! Dispatching ALS Unit 01 (ETA: 3 mins)`, {
      duration: 5000,
      style: {
        background: '#1e293b',
        color: '#f87171',
        border: '1px solid #ef4444'
      }
    });
  };

  const resetDemoData = () => {
    setEmergencies(initialEmergencies);
    toast.success('Demo data restored to default state.');
  };

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        toggleDemoMode,
        demoUser: defaultDemoUser,
        emergencies,
        volunteers,
        hospitals,
        reports,
        analytics,
        triggerSimulatedSOS,
        resetDemoData
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
