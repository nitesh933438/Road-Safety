/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EmergencyCommandCenter } from '../components/command/EmergencyCommandCenter';

export const EmergencyCommandCenterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <EmergencyCommandCenter />
      </div>
    </div>
  );
};
