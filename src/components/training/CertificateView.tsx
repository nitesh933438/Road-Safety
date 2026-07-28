/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, Download, Printer, ShieldAlert, FileCheck } from 'lucide-react';
import { getLevel } from '../../data/trainingData';
import { CloudinaryUploader } from '../common/CloudinaryUploader';

interface CertificateViewProps {
  userName: string;
  xp: number;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ userName, xp }) => {
  const currentLevel = getLevel(xp);
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = `GH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  const [uploadedCertUrl, setUploadedCertUrl] = useState<string | null>(null);

  const isEligible = xp >= 300; // Require at least Responder level

  if (!isEligible) {
    return (
      <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-400">
          <Award className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Certificate Locked</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          You need to reach the <strong className="text-amber-500">Responder</strong> level (300 XP) to unlock your official Golden Hour Training Certificate. Keep learning!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-black text-slate-900 dark:text-white">Your Certificate</h3>
        <div className="flex space-x-2">
          <button className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" title="Print">
            <Printer className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Certificate Frame */}
      <div className="p-4 sm:p-8 bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-x-auto">
        <div className="min-w-[800px] w-full aspect-[1.414/1] bg-white text-slate-900 relative p-12 shadow-2xl border-[12px] border-double border-amber-600 flex flex-col items-center justify-center text-center mx-auto">
          
          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <ShieldAlert className="w-96 h-96" />
          </div>

          <div className="relative z-10 space-y-8 w-full">
            <div className="flex flex-col items-center space-y-2">
              <ShieldAlert className="w-16 h-16 text-amber-600" />
              <h1 className="text-4xl font-black tracking-widest text-slate-900 uppercase">Golden Hour Academy</h1>
              <p className="text-sm font-bold tracking-[0.3em] text-amber-700">Certificate of Completion</p>
            </div>

            <div className="space-y-4 py-8">
              <p className="text-lg italic text-slate-600">This certifies that</p>
              <h2 className="text-5xl font-serif font-bold text-slate-900 border-b border-slate-300 pb-4 inline-block px-12">
                {userName || 'Trainee Name'}
              </h2>
              <p className="text-lg italic text-slate-600">
                has successfully completed the emergency response training curriculum and achieved the rank of
              </p>
              <h3 className="text-3xl font-black text-amber-600 uppercase tracking-wide">
                {currentLevel.name}
              </h3>
            </div>

            <div className="flex justify-between items-end w-full px-12 pt-8">
              <div className="text-left border-t border-slate-300 pt-2 w-48">
                <p className="text-sm font-bold">{date}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Date</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center mb-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">QR Code</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono">ID: {certId}</p>
              </div>

              <div className="text-center border-t border-slate-300 pt-2 w-48">
                <p className="text-sm font-bold font-signature">Golden Hour AI</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">Lead Instructor</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cloudinary Certificate Storage Box */}
      <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4">
        <div className="flex items-center space-x-2">
          <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h4 className="font-bold text-slate-900 dark:text-white text-base">Store & Verify External Certificates on Cloudinary</h4>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Upload PDF or image copies of your Red Cross, St. John Ambulance, or official first responder training certificates to store on Cloudinary CDN and link with your profile.
        </p>

        <CloudinaryUploader
          folder="certificates"
          acceptedTypes="auto"
          maxSizeMB={20}
          value={uploadedCertUrl}
          label="Upload First Aid / Training Certificate"
          description="Upload certificate PDF or image file (max 20MB)"
          onUploadSuccess={(res) => setUploadedCertUrl(res.secureUrl)}
          onRemove={() => setUploadedCertUrl(null)}
        />
      </div>
    </div>
  );
};
