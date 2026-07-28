/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Navigation,
  MapPin,
  Car,
  ShieldCheck,
  PhoneCall,
  Play,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { TripConfig, VehicleType } from '../../data/drivingGuardianData';

interface StartTripCardProps {
  onStartTrip: (config: TripConfig) => void;
}

export const StartTripCard: React.FC<StartTripCardProps> = ({ onStartTrip }) => {
  const [destination, setDestination] = useState('Cyber City, DLF Phase 2, Gurugram');
  const [currentLocation, setCurrentLocation] = useState('IIT Flyover Outer Ring Road, Delhi');
  const [vehicleType, setVehicleType] = useState<VehicleType>('Car / Sedan / SUV');
  const [helmetOrSeatbelt, setHelmetOrSeatbelt] = useState(true);
  const [emergencyContact, setEmergencyContact] = useState('+91 98765 43210 (Karan Malhotra - Brother)');
  const [speedLimit, setSpeedLimit] = useState<number>(60);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !currentLocation.trim()) {
      setErrorMsg('Please enter valid current location and destination.');
      return;
    }

    if (!helmetOrSeatbelt) {
      setErrorMsg('Please confirm Helmet / Seatbelt safety pledge before starting trip.');
      return;
    }
    
    if (speedLimit < 10 || speedLimit > 150) {
      setErrorMsg('Please enter a valid speed limit between 10 and 150 km/h.');
      return;
    }

    setErrorMsg('');
    onStartTrip({
      destination,
      currentLocation,
      vehicleType,
      helmetOrSeatbeltConfirmed: helmetOrSeatbelt,
      emergencyContact,
      speedLimit
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-700/60 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Pre-Drive Safety Check</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Configure Your AI Guardian Trip
          </h2>
        </div>
        <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-extrabold text-xs">
          🟢 AI Voice Radar Active
        </span>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-300 text-rose-800 dark:text-rose-200 text-xs font-bold flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* LOCATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Starting Location</span>
            </label>
            <input
              type="text"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <Navigation className="w-3.5 h-3.5 text-indigo-500" />
              <span>Destination</span>
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* VEHICLE TYPE SELECTION */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 block">
            Select Vehicle Type
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              'Two-Wheeler (Motorcycle)',
              'Car / Sedan / SUV',
              'Auto Rickshaw',
              'Commercial Heavy Truck',
            ].map((vt) => (
              <button
                type="button"
                key={vt}
                onClick={() => setVehicleType(vt as VehicleType)}
                className={`p-3 rounded-2xl text-xs font-black text-left border transition-all cursor-pointer ${
                  vehicleType === vt
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-600/30'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {vt}
              </button>
            ))}
          </div>
        </div>

        {/* HELMET / SEATBELT CONFIRMATION CHECK */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <div>
              <span className="text-xs font-black text-slate-900 dark:text-white block">
                Safety Pledge: Helmet / Seatbelt Fastened
              </span>
              <span className="text-[10px] text-slate-500">
                Reduces severe injury risk by up to 60% in crash events
              </span>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={helmetOrSeatbelt}
              onChange={(e) => setHelmetOrSeatbelt(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* SPEED LIMIT & EMERGENCY CONTACT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Speed Limit (KM/H)</span>
            </label>
            <input
              type="number"
              value={speedLimit}
              onChange={(e) => setSpeedLimit(Number(e.target.value))}
              required
              min="10"
              max="150"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
              <span>Emergency Contact SOS Line</span>
            </label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* START TRIP BUTTON */}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/30 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>Start AI Guardian Trip</span>
        </button>
      </form>
    </div>
  );
};
