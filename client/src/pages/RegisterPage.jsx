import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, AlertCircle, ShieldCheck, CheckCircle2 } from 'lucide-react';
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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <SEO title="Create Your LendKart Account" description="Join India's premier community-based item rental marketplace." />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 mb-1 group">
            <div className="w-9 h-9 rounded-xl bg-forest-700 text-white flex items-center justify-center font-serif text-lg font-bold shadow-soft-sm group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="text-2xl font-bold font-serif text-charcoal-900 dark:text-sand-100 tracking-tight">
              Lend<span className="text-forest-600 dark:text-forest-400">Kart</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold font-serif text-charcoal-900 dark:text-sand-100 tracking-tight">
            Join the Community
          </h2>
          <p className="text-xs text-charcoal-500 dark:text-charcoal-400">
            Rent high-end items nearby or list your unused gear for passive income.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-2xl border border-sand-300/80 dark:border-[#1E332B] shadow-soft-md space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-charcoal-400 dark:text-charcoal-500 absolute left-3 top-3" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Aarav Sharma"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 focus:outline-none focus:border-forest-600 dark:focus:border-forest-400 focus:ring-1 focus:ring-forest-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-charcoal-400 dark:text-charcoal-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="aarav@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 focus:outline-none focus:border-forest-600 dark:focus:border-forest-400 focus:ring-1 focus:ring-forest-600 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-charcoal-400 dark:text-charcoal-500 absolute left-3 top-3" />
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 focus:outline-none focus:border-forest-600 dark:focus:border-forest-400 focus:ring-1 focus:ring-forest-600 transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">Phone</label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 focus:outline-none focus:border-forest-600 dark:focus:border-forest-400 focus:ring-1 focus:ring-forest-600 transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 dark:text-sand-200 mb-1.5">City</label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 text-charcoal-400 dark:text-charcoal-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Pune, Maharashtra"
                  className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-sand-50/50 dark:bg-[#0E1714] border border-sand-300 dark:border-[#1E332B] text-xs text-charcoal-900 dark:text-sand-100 placeholder:text-charcoal-400 dark:placeholder:text-charcoal-500 focus:outline-none focus:border-forest-600 dark:focus:border-forest-400 focus:ring-1 focus:ring-forest-600 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} variant="primary" size="md" className="w-full font-bold shadow-soft-sm">
              <span>Create Account</span>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-charcoal-500 dark:text-charcoal-400">
            <ShieldCheck className="w-3.5 h-3.5 text-forest-600 dark:text-forest-400" />
            <span>Government ID verified & safe security deposits</span>
          </div>

          <div className="text-center text-xs text-charcoal-600 dark:text-charcoal-400 pt-2 border-t border-sand-200 dark:border-[#1E332B]">
            Already have an account?{' '}
            <Link to="/login" className="text-forest-700 dark:text-forest-400 hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
