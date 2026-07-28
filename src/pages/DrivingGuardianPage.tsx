/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DrivingGuardianSystem } from '../components/guardian/DrivingGuardianSystem';

export const DrivingGuardianPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-4 pb-16 transition-colors">
      <DrivingGuardianSystem />
    </div>
  );
};

export default DrivingGuardianPage;
