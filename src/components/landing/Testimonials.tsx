/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: "During a highway collision near Pune, the AI first aid assistant guided me to stop severe bleeding before the ambulance arrived. It truly saved a life.",
      author: "Vikram Malhotra",
      role: "Highway Commuter & Bystander",
      rating: 5,
    },
    {
      quote: "As a medical student, having the Golden Hour SOS system instantly link telemetry to our trauma center reduces preparation time significantly.",
      author: "Dr. Ananya Sharma",
      role: "Emergency Resident, City Hospital",
      rating: 5,
    },
    {
      quote: "Knowing about the Good Samaritan legal protection gave me the confidence to step in and assist without fear of police harassment.",
      author: "Rajesh Kumar",
      role: "Logistics Fleet Manager",
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  } as const;

  return (
    <section className="py-24 bg-white dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[300px] bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-black uppercase tracking-[0.2em] gradient-text mb-3"
          >
            Testimonials & Impact
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
          >
            Trusted by Citizens & Medical Experts
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-4 font-medium"
          >
            Real feedback from early testers and medical professionals in emergency trauma response.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01 }}
              className="glass-card rounded-[2rem] p-8 flex flex-col justify-between shadow-md border border-white/60 dark:border-slate-800/60 relative"
            >
              <div className="absolute top-8 right-8 text-indigo-500/10 dark:text-indigo-400/10">
                <Quote className="w-12 h-12" />
              </div>
              <div className="space-y-6 mb-8 relative z-10">
                <div className="flex space-x-1.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[15px] leading-relaxed italic font-medium">
                  "{rev.quote}"
                </p>
              </div>
              <div className="pt-5 border-t border-slate-200/50 dark:border-slate-700/50 relative z-10">
                <p className="font-bold text-slate-900 dark:text-white text-base">{rev.author}</p>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide mt-1">{rev.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
