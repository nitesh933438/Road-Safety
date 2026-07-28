/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { UserPlus, Phone, Trash2, Shield, Users } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export const EmergencyContactsManager: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('roadguard_emergency_contacts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback
      }
    }
    return [
      { id: '1', name: 'Rajesh Sharma', phone: '+91 98765 11111', relationship: 'Spouse / Family' },
      { id: '2', name: 'Priya Verma', phone: '+91 98765 22222', relationship: 'Colleague / Friend' },
    ];
  });

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newRel, setNewRel] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('roadguard_emergency_contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;
    const newContact: Contact = {
      id: Date.now().toString(),
      name: newName,
      phone: newPhone,
      relationship: newRel || 'Family',
    };
    setContacts([...contacts, newContact]);
    setNewName('');
    setNewPhone('');
    setNewRel('');
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Personal Emergency Contacts</h3>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold shadow-sm transition-colors"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>{isOpen ? 'Cancel' : 'Add Contact'}</span>
        </button>
      </div>

      {isOpen && (
        <form onSubmit={handleAddContact} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">Add New Emergency Contact</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Contact Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number (+91...)"
              value={newPhone}
              onChange={(e) => setNewPhone(e.target.value)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
              required
            />
            <input
              type="text"
              placeholder="Relationship (e.g. Spouse)"
              value={newRel}
              onChange={(e) => setNewRel(e.target.value)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-750 text-white text-xs font-bold shadow-sm"
            >
              Save Contact
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {contacts.map((c) => (
          <div
            key={c.id}
            className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between"
          >
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{c.name}</h4>
                <span className="text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded">
                  {c.relationship}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500 mt-0.5">{c.phone}</p>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`tel:${c.phone}`}
                className="p-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm transition-transform active:scale-95"
                title="Call Contact"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button
                onClick={() => handleDelete(c.id)}
                className="p-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-rose-100 hover:text-rose-600 transition-colors"
                title="Delete Contact"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
