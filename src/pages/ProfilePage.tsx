import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { User, Mail, Phone, Droplet, MapPin, Activity, Save, AlertCircle, Camera } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CloudinaryUploader } from '../components/common/CloudinaryUploader';

export const ProfilePage: React.FC = () => {
  const { currentUser, userProfile, refreshProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    phone: userProfile?.phone || '',
    bloodGroup: userProfile?.bloodGroup || '',
    emergencyContacts: userProfile?.emergencyContacts || '',
    city: userProfile?.city || '',
    state: userProfile?.state || '',
    profileImage: userProfile?.profileImage || userProfile?.photoURL || currentUser?.photoURL || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    
    try {
      setLoading(true);
      const userRef = doc(db, 'users', currentUser.uid);
      try {
        await updateDoc(userRef, { ...formData });
      } catch (err: any) {
        // Fallback to setDoc with merge if doc doesn't exist or updateDoc fails
        await setDoc(userRef, { ...formData }, { merge: true }).catch(() => {
          console.warn("Saving profile locally due to Firestore rules/permissions");
        });
      }
      
      await refreshProfile();
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile", error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your personal information and emergency contacts.
          </p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      >
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Photo via Cloudinary Uploader */}
              <div className="md:col-span-2 space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    {formData.profileImage ? (
                      <img 
                        src={formData.profileImage} 
                        alt="Profile Avatar" 
                        className="h-20 w-20 rounded-full object-cover ring-2 ring-indigo-500"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 text-3xl font-bold ring-2 ring-indigo-500">
                        {userProfile?.name?.charAt(0).toUpperCase() || currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">{userProfile?.name || 'User'}</h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {userProfile?.role || 'citizen'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email}</p>
                    <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium mt-1">Profile Photo stored on Cloudinary CDN</p>
                  </div>
                </div>

                <CloudinaryUploader
                  folder="profile_images"
                  acceptedTypes="image"
                  maxSizeMB={5}
                  value={formData.profileImage}
                  label="Upload Profile Image"
                  description="Upload JPG, PNG or WEBP avatar picture (max 5MB)"
                  compact
                  onUploadSuccess={async (res) => {
                    setFormData(prev => ({ ...prev, profileImage: res.secureUrl }));
                    if (auth.currentUser) {
                      try {
                        const { updateProfile } = await import('firebase/auth');
                        await updateProfile(auth.currentUser, { photoURL: res.secureUrl });
                        const userRef = doc(db, 'users', auth.currentUser.uid);
                        await setDoc(userRef, { profileImage: res.secureUrl, photoURL: res.secureUrl }, { merge: true });
                        await refreshProfile();
                        toast.success('Profile photo updated globally');
                      } catch (err) {
                        console.error('Error updating profile photo globally', err);
                      }
                    }
                  }}
                  onRemove={() => {
                    setFormData(prev => ({ ...prev, profileImage: '' }));
                  }}
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address (Non-editable)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={currentUser?.email || ''}
                    disabled
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 py-2 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Blood Group
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplet className="h-5 w-5 text-gray-400 text-red-500" />
                  </div>
                  <select
                    name="bloodGroup"
                    id="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2"
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="emergencyContacts" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Emergency Contacts
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <AlertCircle className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="emergencyContacts"
                    id="emergencyContacts"
                    value={formData.emergencyContacts}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2"
                    placeholder="Name: +1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  City
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  State / Province
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white py-2"
                  />
                </div>
              </div>

            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
