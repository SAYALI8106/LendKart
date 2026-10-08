import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectPath = new URLSearchParams(location.search).get('redirect') || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError('');
      await login(email, password);
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoLogin = async (demoEmail, demoRole) => {
    const demoPassword = demoRole === 'admin' ? 'Admin@123' : 'User@123';
    setEmail(demoEmail);
    setPassword(demoPassword);
    try {
      setIsLoading(true);
      setError('');
      await login(demoEmail, demoPassword);
      navigate(demoRole === 'admin' ? '/admin' : redirectPath);
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center px-4 py-8 sm:py-12">
      <SEO title="Sign In — LendKart" description="Access your rental reservations, listed equipment, and community earnings." />

      <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#14211D] border border-[#E5E0D2] dark:border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        {/* =========================================================================
            LEFT COLUMN: LIFESTYLE BRAND VISUAL
            ========================================================================= */}
        <div className="lg:col-span-6 relative overflow-hidden bg-[#0A1310] text-white p-8 sm:p-12 flex flex-col justify-between hidden md:flex">
          <img
            src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=85"
            alt="Cinema projector experience"
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-white/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Community Exchange</span>
            </div>
            <h2 className="text-3xl font-extrabold font-display leading-tight">
              Don't Buy It.{' '}
              <span className="text-emerald-300 block">Lend It.</span>
            </h2>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm">
              Join thousands of filmmakers, gamers, and adventurers sharing 4K projectors, cinema cameras, and tools in your city.
            </p>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: LOGIN FORM & 1-CLICK DEMO ACCOUNTS
            ========================================================================= */}
        <div className="lg:col-span-6 p-6 sm:p-12 flex flex-col justify-center space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-white">
              Welcome Back
            </h2>
            <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
              Sign in to manage your equipment rentals and listings.
            </p>
          </div>

          {/* 1-Click Demo Accounts Quick Access (Vital for Evaluation!) */}
          <div className="p-4 rounded-2xl bg-[#F7F4EC] dark:bg-[#0E1714] border border-[#E5E0D2] dark:border-white/10 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-bold text-[#176B52] dark:text-emerald-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Evaluator Logins (1-Click)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-normal">Preloaded credentials</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin@lendkart.demo', 'admin')}
                className="py-2 px-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-900 dark:text-amber-200 border border-amber-500/30 text-[11px] font-bold transition-all hover:scale-105 cursor-pointer text-center"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('user@lendkart.demo', 'user')}
                className="py-2 px-2 rounded-xl bg-[#176B52]/15 hover:bg-[#176B52]/25 text-[#176B52] dark:text-emerald-300 border border-[#176B52]/30 text-[11px] font-bold transition-all hover:scale-105 cursor-pointer text-center"
              >
                Lender Demo
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('rahul@lendkart.demo', 'borrower')}
                className="py-2 px-2 rounded-xl bg-[#86AFC4]/20 hover:bg-[#86AFC4]/30 text-slate-800 dark:text-sky-300 border border-[#86AFC4]/30 text-[11px] font-bold transition-all hover:scale-105 cursor-pointer text-center"
              >
                Borrower Demo
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <span className="text-[11px] text-[#176B52] dark:text-emerald-400 font-semibold cursor-pointer">
                  Default: User@123
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E0D2] dark:border-white/10 bg-white dark:bg-[#0E1714] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#176B52] focus:ring-2 focus:ring-[#176B52]/20 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full !rounded-xl !bg-[#176B52] hover:!bg-[#125440] font-bold text-sm shadow-soft-sm hover:shadow-forest-glow"
            >
              <span>Sign In to LendKart</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="text-center text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-extrabold text-[#176B52] dark:text-emerald-300 hover:underline">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
