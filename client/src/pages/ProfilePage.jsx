import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ShieldCheck, MapPin, Phone, Mail, Star, Save, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatDate } from '../utils/formatters';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isAuthenticated) {
    navigate('/login?redirect=/profile');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateProfile({ name, phone, location, bio, avatar });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <SEO
        title="User Profile & Settings"
        description="Manage your LendKart community account credentials, location, and verified badges."
      />

      <div className="pb-4 border-b border-sand-300 dark:border-[#1E332B]">
        <h1 className="text-2xl sm:text-3xl font-bold font-serif text-charcoal-900 dark:text-sand-100">
          Account Profile & Trust Settings
        </h1>
        <p className="text-xs text-charcoal-500 dark:text-charcoal-400 mt-1">
          Your public profile helps borrowers and lenders establish trust in your neighborhood.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Profile Summary Card */}
        <div className="md:col-span-4 bg-white dark:bg-[#14211D] p-6 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] shadow-soft-sm text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={avatar || user?.avatar}
              alt={user?.name}
              className="w-full h-full rounded-2xl object-cover border-2 border-forest-600 dark:border-forest-400"
            />
            {user?.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-forest-700 text-white p-1 rounded-full shadow-soft-sm" title="Verified Member">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg text-charcoal-900 dark:text-sand-100 font-serif">{user?.name}</h3>
            <p className="text-xs text-charcoal-500 dark:text-charcoal-400">{user?.email}</p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 bg-sand-100 dark:bg-charcoal-800 py-1.5 rounded-xl border border-sand-200 dark:border-charcoal-700">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-bold text-charcoal-900 dark:text-sand-100">{user?.rating || 4.9}</span>
            <span className="text-charcoal-500 dark:text-charcoal-400 text-[11px]">• Community Rating</span>
          </div>

          <div className="text-left pt-3 border-t border-sand-200 dark:border-[#1E332B] text-xs space-y-2 text-charcoal-600 dark:text-charcoal-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400" />
              <span>{user?.location || 'Pune, India'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400" />
              <span>{user?.phone || 'Not specified'}</span>
            </div>
            <div className="text-[11px] text-charcoal-400 dark:text-charcoal-500 pt-1">
              Member since {formatDate(user?.createdAt)}
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="md:col-span-8 bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] shadow-soft-sm space-y-5">
          <h3 className="text-lg font-bold font-serif text-charcoal-900 dark:text-sand-100">Edit Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">City / Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Avatar Image URL</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Bio / Gear Interests</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 focus:outline-none focus:border-forest-600 focus:ring-1 focus:ring-forest-600 transition-colors resize-none"
            />
          </div>

          {savedSuccess && (
            <div className="p-3.5 rounded-xl bg-forest-50 dark:bg-forest-950/40 border border-forest-200 dark:border-forest-800 text-forest-700 dark:text-forest-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0 text-forest-600" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" isLoading={isSaving} variant="primary" size="md" className="shadow-soft-sm">
              <Save className="w-4 h-4 mr-1.5" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
