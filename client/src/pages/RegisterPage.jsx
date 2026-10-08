import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, AlertCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: 'Pune, Maharashtra'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <SEO title="Create Account — LendKart" description="Join India's premier community-based item rental marketplace." />

      <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* =========================================================================
            LEFT COLUMN: LIFESTYLE BRAND VISUAL
            ========================================================================= */}
        <div className="lg:col-span-6 relative overflow-hidden bg-[#0A1310] text-white p-8 sm:p-12 flex flex-col justify-between hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=85"
            alt="Photography camera rental setup"
            className="absolute inset-0 w-full h-full object-cover filter brightness-75 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1310]/95 via-[#0A1310]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#176B52]/20" />

          {/* Top Brand Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#176B52] flex items-center justify-center font-bold font-display text-white shadow-forest-glow">
                L
              </span>
              <span className="text-xl font-bold font-display text-white">LendKart</span>
            </Link>
          </div>

          {/* Bottom Editorial Content */}
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-amber-300 border border-white/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Earn Passive Income From Idle Gear</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display leading-tight">
              Start Borrowing & Lending Today.
            </h2>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Create an account in 30 seconds to request local 4K projectors, DSLR rigs, camping gear, and power tools.
            </p>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: REGISTRATION FORM
            ========================================================================= */}
        <div className="lg:col-span-6 p-6 sm:p-12 flex flex-col justify-center space-y-5">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Create Account
            </h2>
            <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
              Join the community to lend or borrow verified items.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">City / Location</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                    placeholder="Pune, Maharashtra"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98230 11223"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full !rounded-xl !bg-[#176B52] hover:!bg-[#125440] font-bold text-sm shadow-soft-sm hover:shadow-forest-glow mt-2"
            >
              <span>Create LendKart Account</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="text-center text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
            Already have an account?{' '}
            <Link to="/login" className="font-extrabold text-[#176B52] dark:text-emerald-300 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
