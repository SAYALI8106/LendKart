import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';
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

  // Instant demo account filler
  const handleQuickDemoLogin = async (demoEmail, demoRole) => {
    setEmail(demoEmail);
    setPassword('Password@123');
    try {
      setIsLoading(true);
      setError('');
      await login(demoEmail, 'Password@123');
      navigate(demoRole === 'admin' ? '/admin' : redirectPath);
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <SEO title="Sign In to LendKart" description="Access your rental reservations, listed equipment, and community earnings." />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold font-display text-white">LendKart</span>
          </Link>
          <h2 className="text-2xl font-bold font-display text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">
            Sign in to manage your active rentals and listed items.
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick Access */}
        <div className="glass-panel p-4 rounded-2xl border border-brand-primary/30 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-brand-accent">
            <Sparkles className="w-4 h-4" />
            <span>Instant Demo Logins (1-Click)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin@lendkart.demo', 'admin')}
              className="py-1.5 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-colors"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('user@lendkart.demo', 'user')}
              className="py-1.5 px-2 rounded-xl bg-brand-primary/15 hover:bg-brand-primary/25 text-brand-primary border border-brand-primary/30 text-[11px] font-semibold transition-colors"
            >
              Lender Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('rahul@lendkart.demo', 'borrower')}
              className="py-1.5 px-2 rounded-xl bg-brand-secondary/15 hover:bg-brand-secondary/25 text-brand-secondary border border-brand-secondary/30 text-[11px] font-semibold transition-colors"
            >
              Borrower Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-900/60 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-primary"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} variant="primary" size="md" className="w-full">
              <LogIn className="w-4 h-4 mr-1.5" />
              Sign In
            </Button>
          </div>

          <div className="text-center text-xs text-slate-400 pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-brand-primary hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
