/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, CheckCircle, Scale } from 'lucide-react';

export const GoodSamaritanBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
        <Scale className="w-64 h-64" />
      </div>

      <div className="relative z-10 space-y-4 max-w-3xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Legal Protection Guarantee</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black tracking-tight">
          "You are protected under India's Good Samaritan Law."
        </h3>

        <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
          The Supreme Court of India guidelines protect bystanders who help road crash victims. You can assist without fear of police harassment, legal liability, or mandatory hospital detention.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="flex items-center space-x-2 bg-white/10 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span>No Legal Harassment</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span>No Mandatory Hospital Stay</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-300 flex-shrink-0" />
            <span>Zero Civil / Criminal Liability</span>
          </div>
        </div>
      </div>
    </div>
  );
};
