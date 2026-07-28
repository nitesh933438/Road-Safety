import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Plus, Edit2, Trash2, Ambulance, BedDouble, Phone, CheckCircle2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const HospitalManagement: React.FC = () => {
  const [hospitals, setHospitals] = useState([
    { id: 'H1', name: 'City General Hospital', beds: 45, trauma: true, contact: '102', ambulance: 5 },
    { id: 'H2', name: 'Metro Trauma Center', beds: 12, trauma: true, contact: '102', ambulance: 2 },
    { id: 'H3', name: 'LifeCare Clinic', beds: 5, trauma: false, contact: '1800-111', ambulance: 0 },
  ]);

  const handleDelete = (id: string) => {
    setHospitals(hospitals.filter(h => h.id !== id));
    toast.success('Hospital removed');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Hospital Directory</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Manage emergency medical centers and trauma units.</p>
        </div>
        <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all font-black text-sm shadow-lg shadow-emerald-500/30 active:scale-95">
          <Plus className="w-5 h-5" />
          <span>Add Hospital</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {hospitals.map((hospital, idx) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.1, duration: 0.2 }}
              className="glass-card bg-white/60 dark:bg-slate-800/40 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 p-6 shadow-sm flex flex-col justify-between backdrop-blur-sm group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-rose-100 dark:bg-rose-900/40 rounded-2xl text-rose-600 dark:text-rose-400 shadow-inner">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 dark:text-white leading-tight text-lg">{hospital.name}</h3>
                      <div className="flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
                        {hospital.trauma ? (
                          <span className="flex items-center text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Trauma Center</span>
                        ) : (
                          <span className="flex items-center text-slate-400"><XCircle className="w-3.5 h-3.5 mr-1" /> Standard Care</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
                      <BedDouble className="w-4 h-4 mr-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Available Beds</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{hospital.beds}</span>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
                      <Ambulance className="w-4 h-4 mr-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Ambulances</span>
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{hospital.ambulance}</span>
                  </div>
                  <div className="col-span-2 bg-white/60 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                    <div className="flex items-center text-slate-500 dark:text-slate-400">
                      <Phone className="w-4 h-4 mr-1.5" />
                      <span className="text-[10px] font-black uppercase tracking-wider">Emergency Contact</span>
                    </div>
                    <span className="font-black text-slate-900 dark:text-white">{hospital.contact}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex justify-end space-x-3">
                <button className="flex-1 flex justify-center items-center py-2.5 text-slate-500 hover:text-blue-600 bg-slate-50 dark:bg-slate-900/30 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all font-bold text-xs uppercase tracking-wider" title="Edit">
                  <Edit2 className="w-4 h-4 mr-2" /> Edit
                </button>
                <button onClick={() => handleDelete(hospital.id)} className="flex-1 flex justify-center items-center py-2.5 text-slate-500 hover:text-rose-600 bg-slate-50 dark:bg-slate-900/30 hover:bg-rose-50 dark:hover:bg-rose-900/30 rounded-xl transition-all font-bold text-xs uppercase tracking-wider" title="Delete">
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
