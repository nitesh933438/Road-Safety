/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Volume2, Play, Pause, Square, Mic } from 'lucide-react';

export const VoiceGuidanceCard: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speechText = "Emergency voice guidance active. Ensure scene safety. Check victim responsiveness. Dial 108 immediately. Apply firm direct pressure to bleeding sites. Begin chest compressions at 100 to 120 beats per minute if unresponsive.";

  const startVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 1.0;
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    } else {
      alert('Speech synthesis not supported in this browser.');
    }
  };

  const pauseVoice = () => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
        setIsPaused(true);
      } else if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      }
    }
  };

  const stopVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-blue-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Voice Guidance Assistant</h3>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
          Audio Triage
        </span>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        Listen to hands-free step-by-step emergency instructions while attending to the victim at the accident scene.
      </p>

      <div className="flex flex-wrap items-center gap-3 pt-2">
        {!isSpeaking ? (
          <button
            onClick={startVoice}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
          >
            <Play className="w-4 h-4" />
            <span>Start Voice Guidance</span>
          </button>
        ) : (
          <>
            <button
              onClick={pauseVoice}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              <Pause className="w-4 h-4" />
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={stopVoice}
              className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              <Square className="w-4 h-4" />
              <span>Stop</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};
