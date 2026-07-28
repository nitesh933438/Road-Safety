/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SmartRiskLayer } from '../components/ai/SmartRiskLayer';

export const SmartRiskLayerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SmartRiskLayer />
      </div>
    </div>
  );
};
