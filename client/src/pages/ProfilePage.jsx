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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="User Profile & Settings"
        description="Manage your LendKart community account credentials, location, and verified badges."
      />

      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
          Account Profile & Trust Settings
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Your public profile helps borrowers and lenders establish trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Profile Summary Card */}
        <div className="md:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 text-center space-y-4">
          <div className="relative w-24 h-24 mx-auto">
            <img
              src={avatar || user?.avatar}
              alt={user?.name}
              className="w-full h-full rounded-2xl object-cover border-2 border-brand-primary"
            />
            {user?.isVerified && (
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full shadow-md" title="Verified Member">
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg text-white font-display">{user?.name}</h3>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <div className="flex items-center justify-center gap-1 text-xs text-amber-400 bg-white/5 py-1.5 rounded-xl border border-white/5">
            <Star className="w-4 h-4 fill-amber-400" />
            <span className="font-bold text-white">{user?.rating || 4.9}</span>
            <span className="text-slate-400">Community Rating</span>
          </div>

          <div className="text-left pt-3 border-t border-white/10 text-xs space-y-2 text-slate-300">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
              <span>{user?.location || 'Pune, India'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-brand-primary" />
              <span>{user?.phone || 'Not specified'}</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Member since {formatDate(user?.createdAt)}
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSubmit} className="md:col-span-8 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
          <h3 className="text-lg font-bold font-display text-white">Edit Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Contact Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">City / Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Avatar Image URL</label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Gear Interests</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>Profile updated successfully!</span>
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button type="submit" isLoading={isSaving} variant="primary" size="md">
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
