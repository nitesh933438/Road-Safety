import React, { useState, useEffect, useRef } from 'react';
import { Gauge, AlertTriangle } from 'lucide-react';

interface SpeedMonitorWidgetProps {
  speedLimitKmph?: number; // Configurable speed limit, defaults to 60
}

export const SpeedMonitorWidget: React.FC<SpeedMonitorWidgetProps> = ({ speedLimitKmph = 60 }) => {
  const [currentSpeedKmph, setCurrentSpeedKmph] = useState<number>(0);
  const [isOverSpeeding, setIsOverSpeeding] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    // Only check for geolocation support, don't start automatically unless we want it to.
    // Let's auto-start it for the widget.
    startMonitoring();

    return () => {
      stopMonitoring();
    };
  }, []);

  useEffect(() => {
    setIsOverSpeeding(currentSpeedKmph > speedLimitKmph);
  }, [currentSpeedKmph, speedLimitKmph]);

  const startMonitoring = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setError(null);
    setIsActive(true);

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        // speed is in meters/second. Convert to km/h
        const speedMps = position.coords.speed;
        
        if (speedMps !== null && !isNaN(speedMps)) {
          const speedKmph = Math.round(speedMps * 3.6);
          setCurrentSpeedKmph(speedKmph);
        } else {
          // Fallback or just 0 if no movement detected yet or speed not available
          setCurrentSpeedKmph(0);
        }
      },
      (err) => {
        console.error('Error fetching location for speed:', err);
        setError(err.message);
        setIsActive(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
  };

  const stopMonitoring = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    setIsActive(false);
  };

  return (
    <div className={`p-6 rounded-3xl border-2 transition-all duration-300 ${
      isOverSpeeding 
        ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-500 shadow-lg shadow-rose-500/20' 
        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`p-2 rounded-xl ${
            isOverSpeeding ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600' : 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600'
          }`}>
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">Real-Time Speed</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">GPS Telemetry Active</p>
          </div>
        </div>
        
        {isOverSpeeding && (
          <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 text-xs font-bold animate-pulse">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>SPEED LIMIT EXCEEDED</span>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between mt-6">
        <div className="flex items-baseline space-x-2">
          <span className={`text-6xl font-black tabular-nums tracking-tighter ${
            isOverSpeeding ? 'text-rose-600 dark:text-rose-500' : 'text-slate-900 dark:text-white'
          }`}>
            {currentSpeedKmph}
          </span>
          <span className="text-xl font-bold text-slate-500">km/h</span>
        </div>
        
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
            Zone Limit: <span className="text-slate-900 dark:text-white">{speedLimitKmph} km/h</span>
          </div>
          <div className="flex items-center justify-end space-x-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            <span>{isActive ? 'GPS Tracking' : 'Standby'}</span>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex items-start space-x-2 text-amber-700 dark:text-amber-500 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <p>{error} - To view real speed, ensure location permissions are granted.</p>
        </div>
      )}
    </div>
  );
};
