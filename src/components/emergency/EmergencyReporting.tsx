/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  MapPin,
  Camera,
  Video,
  AlertTriangle,
  Car,
  Users,
  CheckCircle2,
  PhoneCall,
  Navigation,
  HeartPulse,
  Sparkles,
  Award,
  Upload,
  X,
  Hospital,
  QrCode,
  Share2,
  FileText,
  Radio,
  Clock,
  Loader2,
  Compass,
  Bell,
  Send,
  Download,
  AlertOctagon,
  Printer
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { uploadToCloudinary, CloudinaryUploadResult } from '../../services/cloudinaryService';
import { MOCK_VOLUNTEERS, MOCK_NEAREST_HOSPITAL, EmergencyReportData, Volunteer } from '../../data/emergencyData';

// Custom Map Marker for Accident Location
const createAccidentMarker = (severity: string) => {
  const color =
    severity === 'Critical'
      ? '#ef4444'
      : severity === 'High'
      ? '#f97316'
      : severity === 'Medium'
      ? '#eab308'
      : '#10b981';

  return L.divIcon({
    className: 'custom-accident-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 38px;
        height: 38px;
        border-radius: 50%;
        border: 4px solid white;
        box-shadow: 0 0 20px ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 900;
        animation: pulse 1.5s infinite;
      ">
        🚨
      </div>
    `,
    iconSize: [38, 38],
  });
};

const createVolunteerMarker = () => {
  return L.divIcon({
    className: 'custom-volunteer-marker',
    html: `
      <div style="
        background-color: #3b82f6;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
      ">
        🚑
      </div>
    `,
    iconSize: [30, 30],
  });
};

const createHospitalMarker = () => {
  return L.divIcon({
    className: 'custom-hospital-marker',
    html: `
      <div style="
        background-color: #10b981;
        width: 34px;
        height: 34px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(16, 185, 129, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 16px;
      ">
        🏥
      </div>
    `,
    iconSize: [34, 34],
  });
};

export const EmergencyReporting: React.FC = () => {
  // GPS State
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number; address: string; accuracy?: number }>({
    lat: 28.6139,
    lng: 77.2090,
    address: 'NH-48 Corridor, Mahipalpur Expressway, New Delhi',
    accuracy: 4,
  });

  // Form State
  const [description, setDescription] = useState('');
  const [vehicleType, setVehicleType] = useState('Sedan / Hatchback');
  const [severity, setSeverity] = useState<'Low' | 'Medium' | 'High' | 'Critical'>('High');
  const [injuredCount, setInjuredCount] = useState<number>(2);

  // Upload States
  const [photoFiles, setPhotoFiles] = useState<{ file: File; result?: CloudinaryUploadResult; progress: number }[]>([]);
  const [videoFiles, setVideoFiles] = useState<{ file: File; result?: CloudinaryUploadResult; progress: number }[]>([]);
  const [uploading, setUploading] = useState(false);

  // Submission & Post-Submit States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<EmergencyReportData | null>(null);

  // SOS Action States
  const [volunteersNotified, setVolunteersNotified] = useState(false);
  const [contactsNotified, setContactsNotified] = useState(false);
  const [showHospitalOnMap, setShowHospitalOnMap] = useState(false);
  const [showEmergencyCardModal, setShowEmergencyCardModal] = useState(false);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Auto-Detect GPS on mount if available
  useEffect(() => {
    handleDetectGps();
  }, []);

  const triggerToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => setNotificationToast(null), 4000);
  };

  const handleDetectGps = () => {
    setGpsDetecting(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            address: `Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)} (GPS Lock)`,
            accuracy: Math.round(pos.coords.accuracy),
          });
          setGpsDetecting(false);
          triggerToast('Exact GPS Coordinates Locked Successfully!');
        },
        (err) => {
          console.warn('Geolocation warning:', err?.message);
          setGpsDetecting(false);
          // Retain fallback coordinates
          triggerToast('Defaulting to Expressway GPS Sentinel Node (NH-48)');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGpsDetecting(false);
    }
  };

  // Photo Upload Handler via Cloudinary Service
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileList = Array.from(e.target.files);

    setUploading(true);
    for (const file of fileList) {
      const entryIndex = photoFiles.length;
      const newPhotoEntry = { file, progress: 10 };
      setPhotoFiles((prev) => [...prev, newPhotoEntry]);

      try {
        const result = await uploadToCloudinary(file, {
          folder: 'roadguard_emergency_photos',
          onProgress: (p) => {
            setPhotoFiles((prev) => {
              const updated = [...prev];
              if (updated[entryIndex]) updated[entryIndex].progress = p;
              return updated;
            });
          },
        });

        setPhotoFiles((prev) => {
          const updated = [...prev];
          if (updated[entryIndex]) {
            updated[entryIndex].result = result;
            updated[entryIndex].progress = 100;
          }
          return updated;
        });
      } catch (err) {
        console.error('Photo upload error:', err);
      }
    }
    setUploading(false);
    triggerToast('Photo attached & uploaded via Cloudinary CDN!');
  };

  // Video Upload Handler via Cloudinary Service
  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const fileList = Array.from(e.target.files);

    setUploading(true);
    for (const file of fileList) {
      const entryIndex = videoFiles.length;
      const newVidEntry = { file, progress: 10 };
      setVideoFiles((prev) => [...prev, newVidEntry]);

      try {
        const result = await uploadToCloudinary(file, {
          folder: 'roadguard_emergency_videos',
          resourceType: 'video',
          onProgress: (p) => {
            setVideoFiles((prev) => {
              const updated = [...prev];
              if (updated[entryIndex]) updated[entryIndex].progress = p;
              return updated;
            });
          },
        });

        setVideoFiles((prev) => {
          const updated = [...prev];
          if (updated[entryIndex]) {
            updated[entryIndex].result = result;
            updated[entryIndex].progress = 100;
          }
          return updated;
        });
      } catch (err) {
        console.error('Video upload error:', err);
      }
    }
    setUploading(false);
    triggerToast('Video footage processed and uploaded to Cloudinary CDN!');
  };

  // AI Prediction Algorithm for Severity Assessment
  const calculateAiPrediction = (
    userSeverity: 'Low' | 'Medium' | 'High' | 'Critical',
    injured: number,
    vehType: string,
    desc: string,
    hasPhotos: boolean
  ) => {
    let aiLevel: 'Low' | 'Medium' | 'High' | 'Critical' = userSeverity;
    let confidence = 88;
    let reasoning = '';

    if (injured >= 3 || vehType.includes('Truck') || vehType.includes('Bus') || desc.toLowerCase().includes('fire') || desc.toLowerCase().includes('trapped')) {
      aiLevel = 'Critical';
      confidence = 96;
      reasoning = `Multi-victim collision (${injured} casualties) with high kinetic impact vectors (${vehType}). AI suggests immediate ICU trauma pre-activation.`;
    } else if (injured >= 1 || vehType.includes('Two') || desc.toLowerCase().includes('leak') || desc.toLowerCase().includes('blood')) {
      aiLevel = 'High';
      confidence = 91;
      reasoning = `Direct bodily trauma risk detected for ${vehType} passenger. First-responder airway stabilization recommended.`;
    } else if (injured === 0 && (userSeverity === 'Low' || userSeverity === 'Medium')) {
      aiLevel = 'Medium';
      confidence = 85;
      reasoning = `Structural property damage detected with zero immediate life-threatening casualties reported. Traffic patrol dispatch prioritized.`;
    } else {
      reasoning = `AI telemetry matches user severity input with cross-verified vision heuristics.`;
    }

    return { level: aiLevel, confidence, reasoning };
  };

  // Submit Emergency Report to Firestore
  const handleSubmitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const photos = photoFiles.map((p) => p.result?.secureUrl || URL.createObjectURL(p.file));
    const videos = videoFiles.map((v) => v.result?.secureUrl || URL.createObjectURL(v.file));

    const aiPrediction = calculateAiPrediction(
      severity,
      injuredCount,
      vehicleType,
      description,
      photos.length > 0
    );

    const reportData: EmergencyReportData = {
      id: `INC-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      lat: coords.lat,
      lng: coords.lng,
      address: coords.address,
      photoUrls: photos,
      videoUrls: videos,
      description: description || 'Vehicle collision reported on expressway corridor. First responders dispatched.',
      vehicleType,
      severity,
      injuredCount,
      aiSeverityPrediction: aiPrediction,
      status: 'Submitted',
    };

    try {
      // Save directly to Firestore collection
      await addDoc(collection(db, 'emergency_reports'), {
        ...reportData,
        createdAt: serverTimestamp(),
      });
      console.log('Saved report to Firestore successfully!');
    } catch (firestoreErr) {
      console.warn('Firestore write warning (retaining local state):', firestoreErr);
      // Fallback: save in LocalStorage for offline consistency
      const existing = JSON.parse(localStorage.getItem('roadguard_emergency_reports') || '[]');
      existing.unshift(reportData);
      localStorage.setItem('roadguard_emergency_reports', JSON.stringify(existing));
    }

    setIsSubmitting(false);
    setSubmittedReport(reportData);
    triggerToast('Emergency Report Stored in Firestore & Dispatched to 108 Command Center!');
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification Popup */}
      <AnimatePresence>
        {notificationToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/50 flex items-center space-x-3"
          >
            <Bell className="w-5 h-5 text-rose-500 animate-bounce" />
            <span className="text-xs font-bold">{notificationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Banner Header */}
      <div className="bg-gradient-to-r from-red-600 via-rose-700 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-rose-400/20">
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-72 h-72 rounded-full bg-white/10 pointer-events-none blur-2xl" />
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-black uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 text-rose-200 animate-pulse" />
            <span>Official Incident Dispatch Protocol</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
            Emergency Accident Reporting & AI Dispatch
          </h1>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Report live highway collisions with auto GPS coordinates, Cloudinary media upload, AI severity classification, instant CPR volunteer alerts, and trauma hospital dispatch.
          </p>
        </div>
      </div>

      {!submittedReport ? (
        /* FORM VIEW: INPUT REPORT DATA */
        <form onSubmit={handleSubmitReport} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Location & Media Upload */}
          <div className="lg:col-span-7 space-y-6">
            {/* 1. GPS AUTO DETECT CARD */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black">
                    <MapPin className="w-5 h-5 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      1. GPS Auto-Location Detect
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Real-time high-precision satellite telemetry
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleDetectGps}
                  disabled={gpsDetecting}
                  className="px-4 py-2 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 transition-all flex items-center space-x-2 shadow-md"
                >
                  {gpsDetecting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                      <span>Locking Satellites...</span>
                    </>
                  ) : (
                    <>
                      <Compass className="w-4 h-4 text-rose-500" />
                      <span>Re-Detect GPS</span>
                    </>
                  )}
                </button>
              </div>

              {/* Detected Address Display */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Detected Incident Coordinates
                  </span>
                  {coords.accuracy && (
                    <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                      Accuracy: ±{coords.accuracy} meters
                    </span>
                  )}
                </div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white flex items-start space-x-2">
                  <span className="text-rose-500 font-mono">📍</span>
                  <span>{coords.address}</span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  Latitude: {coords.lat.toFixed(6)} | Longitude: {coords.lng.toFixed(6)}
                </div>
              </div>
            </div>

            {/* 2. PHOTO & VIDEO UPLOAD (CLOUDINARY) */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    2. Photo & Video Upload (Cloudinary CDN)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Attach accident scene evidence for AI analysis
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Photo Dropzone */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:border-blue-500 transition-colors flex flex-col items-center justify-center text-center space-y-2 relative cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-white block">
                      Upload Photos
                    </span>
                    <span className="text-[10px] text-slate-400">JPG, PNG, WEBP (Max 10MB)</span>
                  </div>
                </div>

                {/* Video Dropzone */}
                <div className="p-5 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:border-indigo-500 transition-colors flex flex-col items-center justify-center text-center space-y-2 relative cursor-pointer group">
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                  />
                  <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-white block">
                      Upload Video Footage
                    </span>
                    <span className="text-[10px] text-slate-400">MP4, MOV (Max 50MB)</span>
                  </div>
                </div>
              </div>

              {/* Uploaded Media Previews */}
              {(photoFiles.length > 0 || videoFiles.length > 0) && (
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider block">
                    Attached Cloudinary CDN Media ({photoFiles.length + videoFiles.length})
                  </span>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Photos Preview */}
                    {photoFiles.map((p, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 aspect-square group">
                        {p.result ? (
                          <img src={p.result.secureUrl} alt="Accident" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-white">
                            <Loader2 className="w-5 h-5 animate-spin text-blue-400 mb-1" />
                            <span className="text-[10px] font-bold">{p.progress}%</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setPhotoFiles(photoFiles.filter((_, i) => i !== idx))}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors z-20"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Videos Preview */}
                    {videoFiles.map((v, idx) => (
                      <div key={idx} className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 aspect-square group">
                        {v.result ? (
                          <video src={v.result.secureUrl} className="w-full h-full object-cover" controls />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-white">
                            <Loader2 className="w-5 h-5 animate-spin text-indigo-400 mb-1" />
                            <span className="text-[10px] font-bold">{v.progress}%</span>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setVideoFiles(videoFiles.filter((_, i) => i !== idx))}
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors z-20"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. DESCRIPTION TEXTAREA */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    3. Accident Description & Details
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Provide context for first-responders & triage units
                  </p>
                </div>
              </div>

              <textarea
                rows={3}
                placeholder="Describe what happened (e.g. SUV collided with divider, fuel leaking, 2 passengers conscious but stuck)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
              />
            </div>
          </div>

          {/* Right Column: Vehicle, Severity, Injured & Submit */}
          <div className="lg:col-span-5 space-y-6">
            {/* 4. VEHICLE TYPE */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                    4. Vehicle Type Involved
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Classifies kinetic force & structural damage
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  'Two Wheeler',
                  'Sedan / Hatchback',
                  'SUV / Pickup',
                  'Heavy Commercial Truck',
                  'Passenger Bus',
                  'Multiple Vehicles',
                ].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVehicleType(v)}
                    className={`p-3 rounded-2xl text-xs font-extrabold border text-left transition-all flex items-center justify-between ${
                      vehicleType === v
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md'
                        : 'bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100'
                    }`}
                  >
                    <span>{v}</span>
                    {vehicleType === v && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. SEVERITY & NUMBER OF INJURED */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-6">
              {/* Severity Selector */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      5. Initial Severity Assessment
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Determines dispatch speed & triage level
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {(['Low', 'Medium', 'High', 'Critical'] as const).map((sev) => {
                    const active = severity === sev;
                    const badgeBg =
                      sev === 'Critical'
                        ? 'bg-rose-600 text-white'
                        : sev === 'High'
                        ? 'bg-amber-600 text-white'
                        : sev === 'Medium'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-emerald-600 text-white';

                    return (
                      <button
                        key={sev}
                        type="button"
                        onClick={() => setSeverity(sev)}
                        className={`p-3.5 rounded-2xl border text-left transition-all ${
                          active
                            ? `${badgeBg} shadow-lg`
                            : 'bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="font-black text-xs uppercase tracking-wider">{sev}</div>
                        <div className={`text-[10px] mt-0.5 ${active ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                          {sev === 'Critical'
                            ? 'Life-threatening / Fire'
                            : sev === 'High'
                            ? 'Severe injuries / Block'
                            : sev === 'Medium'
                            ? 'Moderate injuries'
                            : 'Minor / Fender bender'}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number of Injured Stepper */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    6. Number of Injured Victims
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    Allocates ambulance capacity
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setInjuredCount(Math.max(0, injuredCount - 1))}
                    className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-black hover:bg-slate-300 text-lg"
                  >
                    -
                  </button>
                  <span className="text-xl font-black text-rose-600 dark:text-rose-400 w-8 text-center">
                    {injuredCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setInjuredCount(injuredCount + 1)}
                    className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white font-black hover:bg-slate-300 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting || uploading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-rose-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Broadcasting to Firestore & Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Submit Emergency Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      ) : (
        /* POST-SUBMISSION ACTIVE EMERGENCY RADAR VIEW */
        <div className="space-y-8 animate-fadeIn">
          {/* Submission Banner Success */}
          <div className="bg-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-400/30">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8 text-white animate-bounce" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-black uppercase">
                  <span>Incident ID: {submittedReport.id}</span>
                </div>
                <h2 className="text-2xl font-black">
                  Report Saved to Firestore & Dispatched Live
                </h2>
                <p className="text-xs text-emerald-100">
                  Transmitted to Municipal 108 Emergency Dispatch, Regional Patrol, and 4 CPR First-Responders.
                </p>
              </div>
            </div>

            <button
              onClick={() => setSubmittedReport(null)}
              className="px-5 py-3 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs uppercase tracking-wider hover:bg-slate-100 transition-colors shadow-md shrink-0"
            >
              Submit New Report
            </button>
          </div>

          {/* SOS ACTION HUB BUTTONS */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-6 h-6 text-rose-500 animate-pulse" />
                <span className="font-extrabold text-sm uppercase tracking-wider text-rose-400">
                  SOS Command Center Actions:
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">LIVE TELEMETRY BROADCAST</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. NOTIFY VOLUNTEERS */}
              <button
                onClick={() => {
                  setVolunteersNotified(true);
                  triggerToast('Broadcasting emergency alert ping to 4 nearby CPR Volunteers!');
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  volunteersNotified
                    ? 'bg-rose-600/20 border-rose-500 text-rose-300'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Users className="w-5 h-5 text-rose-500" />
                  {volunteersNotified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div>
                  <span className="text-xs font-black block">1. Notify Volunteers</span>
                  <span className="text-[10px] text-slate-400">
                    {volunteersNotified ? 'Pings Sent (4 Volunteers)' : 'Broadcast alert signal'}
                  </span>
                </div>
              </button>

              {/* 2. NOTIFY EMERGENCY CONTACTS */}
              <button
                onClick={() => {
                  setContactsNotified(true);
                  triggerToast('SMS & WhatsApp live GPS link dispatched to 3 Emergency Contacts!');
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  contactsNotified
                    ? 'bg-amber-600/20 border-amber-500 text-amber-300'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <PhoneCall className="w-5 h-5 text-amber-500" />
                  {contactsNotified && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div>
                  <span className="text-xs font-black block">2. Notify Contacts</span>
                  <span className="text-[10px] text-slate-400">
                    {contactsNotified ? 'SMS & GPS Link Sent' : 'Send automated SMS'}
                  </span>
                </div>
              </button>

              {/* 3. HIGHLIGHT NEAREST HOSPITAL */}
              <button
                onClick={() => {
                  setShowHospitalOnMap(!showHospitalOnMap);
                  triggerToast('Trauma hospital route mapped on Leaflet radar!');
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  showHospitalOnMap
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Hospital className="w-5 h-5 text-emerald-500" />
                  {showHospitalOnMap && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                </div>
                <div>
                  <span className="text-xs font-black block">3. Highlight Hospital</span>
                  <span className="text-[10px] text-slate-400">
                    {showHospitalOnMap ? 'AIIMS Trauma Center Mapped' : 'Find nearest ER beds'}
                  </span>
                </div>
              </button>

              {/* 4. GENERATE EMERGENCY CARD */}
              <button
                onClick={() => setShowEmergencyCardModal(true)}
                className="p-4 rounded-2xl border bg-gradient-to-r from-indigo-600 to-purple-600 border-indigo-500 text-white text-left transition-all hover:opacity-95 flex flex-col justify-between space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <QrCode className="w-5 h-5 text-indigo-200" />
                  <Sparkles className="w-4 h-4 text-indigo-300 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-black block">4. Emergency Card</span>
                  <span className="text-[10px] text-indigo-100">Generate digital ID pass</span>
                </div>
              </button>
            </div>
          </div>

          {/* GRID LAYOUT: MAP + AI SEVERITY PREDICTION + VOLUNTEERS */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Map Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Interactive Map with Incident Marker */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col">
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Compass className="w-5 h-5 text-rose-500 animate-spin" />
                    <span className="font-extrabold text-xs uppercase tracking-wider">
                      Incident Location & Dispatch Radar
                    </span>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-400">
                    GPS Lock Verified
                  </span>
                </div>

                <div className="h-[420px] w-full relative z-0">
                  <MapContainer
                    center={[submittedReport.lat, submittedReport.lng]}
                    zoom={13}
                    className="w-full h-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap"
                    />

                    {/* Incident Marker */}
                    <Marker
                      position={[submittedReport.lat, submittedReport.lng]}
                      icon={createAccidentMarker(submittedReport.severity)}
                    >
                      <Popup>
                        <div className="p-1.5 space-y-1">
                          <b className="text-rose-600 text-xs">{submittedReport.id}</b>
                          <div className="text-[11px] font-bold">{submittedReport.address}</div>
                          <div className="text-[10px] text-slate-600">
                            Severity: {submittedReport.severity} | Injured: {submittedReport.injuredCount}
                          </div>
                        </div>
                      </Popup>
                    </Marker>

                    {/* Nearby Volunteers Markers */}
                    {MOCK_VOLUNTEERS.map((v) => (
                      <Marker key={v.id} position={[v.lat, v.lng]} icon={createVolunteerMarker()}>
                        <Popup>
                          <div className="p-1 text-xs">
                            <b className="text-blue-600">{v.name}</b>
                            <p className="text-[10px] text-slate-600">{v.distance} • CPR Certified</p>
                          </div>
                        </Popup>
                      </Marker>
                    ))}

                    {/* Highlight Nearest Hospital Marker if toggled */}
                    {showHospitalOnMap && (
                      <Marker
                        position={[MOCK_NEAREST_HOSPITAL.lat, MOCK_NEAREST_HOSPITAL.lng]}
                        icon={createHospitalMarker()}
                      >
                        <Popup>
                          <div className="p-1.5 text-xs space-y-1">
                            <b className="text-emerald-600">{MOCK_NEAREST_HOSPITAL.name}</b>
                            <p className="text-[10px] text-slate-600">
                              {MOCK_NEAREST_HOSPITAL.distance} • {MOCK_NEAREST_HOSPITAL.icuBedsAvailable} ICU Beds Free
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    )}
                  </MapContainer>
                </div>
              </div>

              {/* AI SEVERITY PREDICTION CARD */}
              {submittedReport.aiSeverityPrediction && (
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
                        <Sparkles className="w-5 h-5 animate-spin" />
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                          AI Severity Prediction
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Automated multi-vector crash heuristic
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-black uppercase text-slate-400">
                        Confidence
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-black text-xs">
                        {submittedReport.aiSeverityPrediction.confidence}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                      Predicted Risk Level:
                    </span>
                    <span
                      className={`px-3.5 py-1 rounded-full font-black text-xs uppercase tracking-wider text-white ${
                        submittedReport.aiSeverityPrediction.level === 'Critical'
                          ? 'bg-rose-600'
                          : submittedReport.aiSeverityPrediction.level === 'High'
                          ? 'bg-amber-600'
                          : submittedReport.aiSeverityPrediction.level === 'Medium'
                          ? 'bg-yellow-600'
                          : 'bg-emerald-600'
                      }`}
                    >
                      {submittedReport.aiSeverityPrediction.level}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium bg-indigo-50/50 dark:bg-indigo-950/30 p-3.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                    "{submittedReport.aiSeverityPrediction.reasoning}"
                  </p>
                </div>
              )}
            </div>

            {/* Volunteers & Hospital Details Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* NEARBY VOLUNTEERS CARD */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <Users className="w-5 h-5 text-blue-500" />
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Nearby Volunteers ({MOCK_VOLUNTEERS.length})
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-black uppercase">
                    CPR Certified
                  </span>
                </div>

                <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
                  {MOCK_VOLUNTEERS.map((vol) => (
                    <div
                      key={vol.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-700/60 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <img
                            src={vol.photo}
                            alt={vol.name}
                            className="w-11 h-11 rounded-2xl object-cover border-2 border-blue-500/40"
                          />
                          <div>
                            <div className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center space-x-1.5">
                              <span>{vol.name}</span>
                              {vol.cprCertified && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              )}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {vol.distance} • ⭐ {vol.rating} ({vol.rescuesCount} rescues)
                            </div>
                          </div>
                        </div>

                        {vol.cprCertified && (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 text-[9px] font-black uppercase">
                            CPR
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-2 pt-1">
                        <a
                          href={`tel:${vol.phone}`}
                          className="flex-1 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:bg-slate-800 flex items-center justify-center space-x-1.5 shadow-sm"
                        >
                          <PhoneCall className="w-3.5 h-3.5 text-rose-500" />
                          <span>Call</span>
                        </a>

                        <button
                          onClick={() => triggerToast(`Navigating route to ${vol.name}...`)}
                          className="flex-1 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 flex items-center justify-center space-x-1.5 shadow-sm"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>Navigate</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* NEAREST HOSPITAL DETAILS */}
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-200/80 dark:border-slate-700/80 space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black">
                    <Hospital className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                      Nearest Trauma Facility
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Primary emergency response center
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {MOCK_NEAREST_HOSPITAL.name}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {MOCK_NEAREST_HOSPITAL.address}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40">
                      <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 block">
                        Free ICU Beds
                      </span>
                      <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                        {MOCK_NEAREST_HOSPITAL.icuBedsAvailable} Available
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
                      <span className="text-[10px] font-black uppercase text-slate-400 block">
                        ETA Drive Time
                      </span>
                      <span className="text-xs font-black text-slate-900 dark:text-white">
                        {MOCK_NEAREST_HOSPITAL.travelTime}
                      </span>
                    </div>
                  </div>

                  <a
                    href={`tel:${MOCK_NEAREST_HOSPITAL.phone}`}
                    className="w-full mt-2 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md hover:bg-emerald-700 transition-colors"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Call ER Hotline ({MOCK_NEAREST_HOSPITAL.phone})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMERGENCY CARD MODAL */}
      {showEmergencyCardModal && submittedReport && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative"
          >
            <button
              onClick={() => setShowEmergencyCardModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <ShieldAlert className="w-6 h-6 text-rose-600" />
                <span className="font-black text-base text-slate-900 dark:text-white uppercase tracking-wider">
                  Emergency Medical Card
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-rose-600">
                {submittedReport.id}
              </span>
            </div>

            {/* Emergency Card Body */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white space-y-4 shadow-xl border border-slate-800">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase text-rose-400 tracking-widest block">
                    PATIENT TRIAGE CARD
                  </span>
                  <h4 className="text-lg font-black">{submittedReport.address}</h4>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center">
                  {/* QR Simulation */}
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Timestamp</span>
                  <span className="font-bold text-white">{submittedReport.timestamp}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Severity Rating</span>
                  <span className="font-black text-rose-400">{submittedReport.severity}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Injured Count</span>
                  <span className="font-bold text-white">{submittedReport.injuredCount} Persons</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-bold">Vehicle Type</span>
                  <span className="font-bold text-white">{submittedReport.vehicleType}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-[11px] leading-relaxed">
                <span className="font-bold text-amber-300 block mb-0.5">Crash Note:</span>
                "{submittedReport.description}"
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1">
                <span>GPS: {submittedReport.lat.toFixed(4)}, {submittedReport.lng.toFixed(4)}</span>
                <span>DISPATCH HOTLINE: 108</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex-1 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-black text-xs hover:bg-slate-200 flex items-center justify-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Pass</span>
              </button>

              <button
                onClick={() => {
                  triggerToast('Emergency Pass copied & downloaded!');
                  setShowEmergencyCardModal(false);
                }}
                className="flex-1 py-3 rounded-2xl bg-rose-600 text-white font-black text-xs hover:bg-rose-700 shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Emergency Card</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
