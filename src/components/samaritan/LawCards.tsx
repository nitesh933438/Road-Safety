/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Scale, FileText, UserX, Heart, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const LawCards: React.FC = () => {
  const laws = [
    { icon: ShieldCheck, title: 'Legal Protection', desc: 'Protected against civil and criminal liability for acting in good faith.' },
    { icon: UserX, title: 'No Detention', desc: 'Police cannot force you to stay or visit the police station.' },
    { icon: Scale, title: 'No Legal Liability', desc: 'You are not responsible for any hospital bills or legal fees.' },
    { icon: FileText, title: 'No Forced Questioning', desc: 'Questioning is voluntary and can be done via video conference.' },
    { icon: UserCheck, title: 'Identity Protected', desc: 'You can choose to remain completely anonymous.' },
    { icon: Heart, title: 'Saving Lives', desc: 'Hospitals must admit victims immediately without payment.' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Know Your Rights</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          The Good Samaritan Law by the Supreme Court of India guarantees your protection when you step up to help.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {laws.map((law, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400 flex items-center justify-center mb-4">
              <law.icon className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">{law.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{law.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
