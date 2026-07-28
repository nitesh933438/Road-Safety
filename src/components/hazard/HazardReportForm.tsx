/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Camera,
  Video,
  MapPin,
  Sparkles,
  CheckCircle2,
  Upload,
  WifiOff,
  Send,
  Loader2,
  ShieldAlert,
  Info,
  Clock,
  Zap,
  Tag
} from 'lucide-react';
import { uploadToCloudinary, formatBytes } from '../../services/cloudinaryService';
import {
  HazardType,
  HazardSeverity,
  HAZARD_TYPES_LIST,
  RoadHazard,
  AiHazardAnalysis
} from '../../data/roadHazardData';

interface HazardReportFormProps {
  onReportSubmitted: (newHazard: RoadHazard) => void;
}

export const HazardReportForm: React.FC<HazardReportFormProps> = ({ onReportSubmitted }) => {
  const [hazardType, setHazardType] = useState<HazardType>('Pothole');
  const [severity, setSeverity] = useState<HazardSeverity>('High');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('Outer Ring Road, Near Gate 3 IIT Flyover, Delhi');
  const [city, setCity] = useState('Delhi NCR');
  const [lat, setLat] = useState<number>(28.545);
  const [lng, setLng] = useState<number>(77.192);
  const [reporterName, setReporterName] = useState('Anish Malhotra (Verified Samaritan)');

  // File Upload State
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>('');
  const [photoUploadProgress, setPhotoUploadProgress] = useState<number>(0);
  const [uploadedCloudinaryPhotoUrl, setUploadedCloudinaryPhotoUrl] = useState<string>('');

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string>('');
  const [videoUploadProgress, setVideoUploadProgress] = useState<number>(0);
  const [uploadedCloudinaryVideoUrl, setUploadedCloudinaryVideoUrl] = useState<string>('');

  const [isUploading, setIsUploading] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isSuccessToast, setIsSuccessToast] = useState(false);

  // Simulated Instant AI Diagnostic Analysis
  const [aiAnalysis, setAiAnalysis] = useState<AiHazardAnalysis>({
    hazardCategory: 'Pavement & Road Surface Degradation',
    riskLevel: 'High',
    confidencePercent: 96,
    roadSafetyImpactScore: -24,
    suggestedAction: 'Erect reflective warning cone & dispatch municipal cold-patch road maintenance squad.',
    estimatedRepairPriority: 'P2 - High Priority (48h)',
  });

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Update AI Analysis on Type Change
  useEffect(() => {
    generateSimulatedAiAnalysis(hazardType, severity);
  }, [hazardType, severity]);

  const generateSimulatedAiAnalysis = (type: HazardType, sev: HazardSeverity) => {
    let category = 'Infrastructure Structural Hazard';
    let action = 'Deploy traffic safety warning barricades & inform PWD.';
    let priority: 'P1 - Emergency (24h)' | 'P2 - High Priority (48h)' | 'P3 - Routine (7 Days)' = 'P2 - High Priority (48h)';
    let impact = -20;

    switch (type) {
      case 'Open Manhole':
        category = 'Severe Infrastructure Void Risk';
        action = 'Place heavy reflective hazard cone & dispatch emergency drain cover crew.';
        priority = 'P1 - Emergency (24h)';
        impact = -38;
        break;
      case 'Waterlogging':
      case 'Flooded Road':
        category = 'Hydrological & Submerged Road Risk';
        action = 'Activate water extraction pumps & publish digital navigation reroute.';
        priority = 'P1 - Emergency (24h)';
        impact = -32;
        break;
      case 'Oil Spill':
        category = 'Slick Surface Friction Loss';
        action = 'Spread sand/sawdust immediately & send hazardous chemical wash squad.';
        priority = 'P1 - Emergency (24h)';
        impact = -35;
        break;
      case 'Broken Traffic Signal':
        category = 'Traffic Junction Control Fault';
        action = 'Deploy manual traffic constable & dispatch electronics repair unit.';
        priority = 'P2 - High Priority (48h)';
        impact = -22;
        break;
      case 'Landslide':
      case 'Fallen Tree':
        category = 'Physical Roadway Blockade';
        action = 'Deploy heavy hydraulic crane / saws to clear right of way.';
        priority = 'P1 - Emergency (24h)';
        impact = -36;
        break;
      default:
        category = 'Standard Road Degradation';
        action = 'Schedule maintenance inspection and cold-patch restoration.';
        priority = sev === 'Critical' ? 'P1 - Emergency (24h)' : 'P2 - High Priority (48h)';
        impact = -18;
    }

    setAiAnalysis({
      hazardCategory: category,
      riskLevel: sev,
      confidencePercent: Math.floor(Math.random() * 6) + 94,
      roadSafetyImpactScore: impact,
      suggestedAction: action,
      estimatedRepairPriority: priority,
    });
  };

  const handleDetectGps = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLat(parseFloat(pos.coords.latitude.toFixed(5)));
          setLng(parseFloat(pos.coords.longitude.toFixed(5)));
          setAddress(`GPS Lat: ${pos.coords.latitude.toFixed(4)}, Lng: ${pos.coords.longitude.toFixed(4)}`);
          setIsLocating(false);
        },
        () => {
          // Fallback location
          setLat(28.545);
          setLng(77.192);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
    }
  };

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setVideoFile(file);
      setVideoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    let photoUrl = 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80';
    let videoUrl = undefined;

    try {
      // Photo Cloudinary Upload
      if (photoFile) {
        const photoRes = await uploadToCloudinary(photoFile, {
          folder: 'road_hazards',
          onProgress: (pct) => setPhotoUploadProgress(pct),
        });
        photoUrl = photoRes.secureUrl;
        setUploadedCloudinaryPhotoUrl(photoUrl);
      }

      // Video Cloudinary Upload
      if (videoFile) {
        const videoRes = await uploadToCloudinary(videoFile, {
          folder: 'road_hazards_video',
          resourceType: 'video',
          onProgress: (pct) => setVideoUploadProgress(pct),
        });
        videoUrl = videoRes.secureUrl;
        setUploadedCloudinaryVideoUrl(videoUrl);
      }

      const newHazard: RoadHazard = {
        id: `haz-${Date.now()}`,
        type: hazardType,
        severity,
        status: 'Pending',
        title: title || `${hazardType} reported at ${address.split(',')[0]}`,
        description: description || `Reported ${hazardType} posing hazard to motorists.`,
        address,
        city,
        lat,
        lng,
        photoUrl,
        videoUrl,
        reporterName,
        reporterRole: 'Samaritan Citizen',
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
        upvotes: 1,
        downvotes: 0,
        comments: [],
        aiAnalysis,
        assignedDepartment: 'Municipal PWD & Traffic Safety Control',
      };

      if (isOffline) {
        // Save to offline localStorage Queue
        const existingOffline = JSON.parse(localStorage.getItem('goldenguard_pending_hazards') || '[]');
        existingOffline.push(newHazard);
        localStorage.setItem('goldenguard_pending_hazards', JSON.stringify(existingOffline));
      }

      onReportSubmitted(newHazard);
      setIsSuccessToast(true);
      setTimeout(() => setIsSuccessToast(false), 4000);

      // Reset Form
      setTitle('');
      setDescription('');
      setPhotoFile(null);
      setPhotoPreviewUrl('');
      setVideoFile(null);
      setVideoPreviewUrl('');
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-700/80 space-y-8">
      {/* Offline Alert Banner */}
      {isOffline && (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 flex items-center space-x-3 text-amber-800 dark:text-amber-200 font-bold text-xs">
          <WifiOff className="w-5 h-5 text-amber-600 animate-pulse shrink-0" />
          <span>
            Offline Mode Active — You can file hazard reports now! They will save locally and auto-sync to Cloudinary & Firestore when your internet restores.
          </span>
        </div>
      )}

      {/* Success Notification */}
      <AnimatePresence>
        {isSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center space-x-3 text-emerald-800 dark:text-emerald-200 font-extrabold text-xs"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Hazard Report Logged & AI Analysis Dispatched to Municipal PWD!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200/60 dark:border-slate-700/60 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-widest mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Prevent Accidents Before They Happen</span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            Report New Road Hazard
          </h2>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-extrabold text-xs">
          Cloudinary Media Storage Enabled
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* STEP 1: HAZARD TYPE SELECTOR */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            1. Select Hazard Type (15 Categories Supported)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1 border border-slate-200 dark:border-slate-700 rounded-2xl">
            {HAZARD_TYPES_LIST.map((type) => {
              const isSelected = hazardType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => setHazardType(type)}
                  className={`p-3 rounded-xl text-xs font-black text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                      : 'bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* STEP 2: SEVERITY SELECTION */}
        <div className="space-y-3">
          <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
            2. Hazard Severity Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { level: 'Low' as HazardSeverity, bg: 'bg-emerald-600', label: '🟢 Low Risk' },
              { level: 'Medium' as HazardSeverity, bg: 'bg-yellow-600', label: '🟡 Medium Risk' },
              { level: 'High' as HazardSeverity, bg: 'bg-orange-600', label: '🟠 High Risk' },
              { level: 'Critical' as HazardSeverity, bg: 'bg-rose-600', label: '🔴 Critical Danger' },
            ].map((s) => (
              <button
                type="button"
                key={s.level}
                onClick={() => setSeverity(s.level)}
                className={`py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  severity === s.level
                    ? `${s.bg} text-white shadow-lg`
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* STEP 3: LOCATION & GPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Location & Address
              </label>
              <button
                type="button"
                onClick={handleDetectGps}
                disabled={isLocating}
                className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1 cursor-pointer"
              >
                <MapPin className="w-3 h-3" />
                <span>{isLocating ? 'Acquiring GPS...' : 'Auto-Detect GPS'}</span>
              </button>
            </div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              placeholder="e.g. Outer Ring Road Flyover KM 14"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
              City / Metropolitan Zone
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
              placeholder="e.g. Delhi NCR, Gurugram, Noida"
            />
          </div>
        </div>

        {/* STEP 4: TITLE & DESCRIPTION */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Report Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Uncovered Storm Water Drain on Express Highway"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Detailed Hazard Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details about depth, size, traffic impact or recent near-misses..."
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* STEP 5: CLOUDINARY MEDIA UPLOADS (PHOTO & OPTIONAL VIDEO) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Photo Upload */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 space-y-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-rose-600 font-extrabold text-xs uppercase">
              <Camera className="w-4 h-4" />
              <span>Hazard Photo Upload (Cloudinary)</span>
            </div>

            {photoPreviewUrl ? (
              <div className="relative rounded-xl overflow-hidden h-36 bg-black">
                <img src={photoPreviewUrl} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setPhotoFile(null);
                    setPhotoPreviewUrl('');
                  }}
                  className="absolute top-2 right-2 px-2 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-black"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-500 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select Photo
                </span>
                <span className="text-[10px] text-slate-400 block">PNG, JPG, WEBP up to 10MB</span>
                <input type="file" accept="image/*" onChange={handlePhotoSelect} className="hidden" />
              </label>
            )}

            {photoUploadProgress > 0 && photoUploadProgress < 100 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-500">
                  Uploading to Cloudinary... {photoUploadProgress}%
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-rose-600 transition-all" style={{ width: `${photoUploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>

          {/* Video Upload */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 space-y-3 text-center">
            <div className="flex items-center justify-center space-x-2 text-indigo-600 font-extrabold text-xs uppercase">
              <Video className="w-4 h-4" />
              <span>Optional Video Clip Upload</span>
            </div>

            {videoPreviewUrl ? (
              <div className="relative rounded-xl overflow-hidden h-36 bg-black">
                <video src={videoPreviewUrl} controls className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setVideoFile(null);
                    setVideoPreviewUrl('');
                  }}
                  className="absolute top-2 right-2 px-2 py-1 bg-rose-600 text-white rounded-lg text-[10px] font-black"
                >
                  Remove
                </button>
              </div>
            ) : (
              <label className="cursor-pointer block p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-colors">
                <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Select Short Video
                </span>
                <span className="text-[10px] text-slate-400 block">MP4, MOV up to 50MB</span>
                <input type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />
              </label>
            )}

            {videoUploadProgress > 0 && videoUploadProgress < 100 && (
              <div className="space-y-1">
                <div className="text-[10px] font-mono font-bold text-slate-500">
                  Uploading Video to Cloudinary... {videoUploadProgress}%
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-indigo-600 transition-all" style={{ width: `${videoUploadProgress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* STEP 6: SIMULATED AI DIAGNOSTIC PREVIEW CARD */}
        <div className="p-5 rounded-3xl bg-slate-900 text-white space-y-3 border border-indigo-500/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" />
              <span>Instant AI Safety Risk Analysis</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold">
              {aiAnalysis.confidencePercent}% AI Confidence
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-black block">Hazard Category</span>
              <span className="text-xs font-black text-indigo-300">{aiAnalysis.hazardCategory}</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-black block">Safety Score Impact</span>
              <span className="text-xs font-black text-rose-400">{aiAnalysis.roadSafetyImpactScore} Points</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] text-slate-400 uppercase font-black block">Repair Priority</span>
              <span className="text-xs font-black text-emerald-400">{aiAnalysis.estimatedRepairPriority}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 font-medium pt-1">
            <strong className="text-white">AI Protocol Recommendation:</strong> {aiAnalysis.suggestedAction}
          </p>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isUploading}
          className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-600/30 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Uploading to Cloudinary & Dispatching AI Report...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Submit Road Hazard Report</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
