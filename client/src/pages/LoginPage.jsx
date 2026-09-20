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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <SEO title="Sign In to LendKart" description="Access your rental reservations, listed equipment, and community earnings." />

      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="text-2xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">LendKart</span>
          </Link>
          <h2 className="text-2xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Welcome Back</h2>
          <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">
            Sign in to manage your active rentals and listed items.
          </p>
        </div>

        {/* 1-Click Demo Accounts Quick Access */}
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#176B52] dark:text-[#8EAFA0]">
            <Sparkles className="w-4 h-4 text-[#C96F52]" />
            <span>Instant Demo Logins (1-Click)</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('admin@lendkart.demo', 'admin')}
              className="py-1.5 px-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('user@lendkart.demo', 'user')}
              className="py-1.5 px-2 rounded-xl bg-[#176B52]/10 hover:bg-[#176B52]/20 text-[#176B52] dark:text-[#8EAFA0] border border-[#176B52]/30 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Lender Demo
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('rahul@lendkart.demo', 'borrower')}
              className="py-1.5 px-2 rounded-xl bg-[#8EAFA0]/15 hover:bg-[#8EAFA0]/25 text-[#176B52] dark:text-[#8EAFA0] border border-[#8EAFA0]/30 text-[11px] font-semibold transition-colors cursor-pointer"
            >
              Borrower Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#788880] dark:text-[#7D9B8E] absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] placeholder-[#788880] dark:placeholder-[#7D9B8E] focus:outline-none focus:border-[#176B52]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#788880] dark:text-[#7D9B8E] absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] placeholder-[#788880] dark:placeholder-[#7D9B8E] focus:outline-none focus:border-[#176B52]"
              />
            </div>
          </div>

          <div className="pt-2">
            <Button type="submit" isLoading={isLoading} variant="primary" size="md" className="w-full cursor-pointer">
              <LogIn className="w-4 h-4 mr-1.5" />
              Sign In
            </Button>
          </div>

          <div className="text-center text-xs text-[#788880] dark:text-[#7D9B8E] pt-2">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#176B52] dark:text-[#8EAFA0] hover:underline font-semibold">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
