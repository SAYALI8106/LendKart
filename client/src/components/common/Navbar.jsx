import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Heart,
  Plus,
  Sun,
  Moon,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../context/WishlistContext';
import NotificationDropdown from '../notifications/NotificationDropdown';

export const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Explore', path: '/explore' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Rent Projector', path: '/rent/projector', highlight: true },
    { label: 'Blog & Guides', path: '/blog' }
  ];

  return (
    <header
      className={`premium-header sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF9]/85 dark:bg-[#0A1310]/85 backdrop-blur-xl py-3 shadow-soft-md border-b border-[#E7E2D6]/80 dark:border-white/10'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="premium-header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Editorial Wordmark */}
        <Link to="/" className="brand-lockup flex items-center gap-3 group cursor-pointer">
          <div className="brand-mark relative w-11 h-11 rounded-[1.1rem] flex items-center justify-center text-white shadow-forest-glow group-hover:scale-105 transition-transform duration-300">
            <span className="brand-mark-ring absolute inset-1 rounded-[0.8rem] border border-white/30" />
            <img src="/favicon.svg" alt="" className="relative w-7 h-7 object-contain" />
            <span className="brand-mark-dot absolute -right-1 -top-1 w-2.5 h-2.5 rounded-full bg-[#D4A373] border-2 border-[#FFFDF9] dark:border-[#0A1310]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[1.35rem] leading-none font-bold font-display tracking-[-0.04em] text-slate-900 dark:text-white flex items-center gap-1.5">
              LendKart
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block shadow-sm" />
            </span>
            <span className="text-[9px] tracking-[0.16em] uppercase font-extrabold text-brand-primary dark:text-brand-secondary mt-1 hidden sm:block">
              Shared gear. Better living.
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="premium-nav hidden md:flex items-center gap-1.5 bg-[#F1ECE1]/80 dark:bg-white/5 p-1.5 rounded-full border border-[#E7E2D6] dark:border-white/10 backdrop-blur-md shadow-inner">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`premium-nav-link px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-soft-sm scale-[1.02]'
                    : link.highlight
                    ? 'text-brand-accent hover:text-brand-accentHover font-extrabold hover:bg-brand-clayLight/60 dark:hover:bg-white/5'
                    : 'text-slate-700 dark:text-slate-200 hover:text-brand-primary dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Actions (List Item CTA, Wishlist, Notifications, Theme, User Profile) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* List an Item CTA */}
          <Link
            to="/list-item"
            className="hidden sm:inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-[#125440] hover:from-[#125440] hover:to-brand-primary text-white text-xs font-bold shadow-soft-sm hover:shadow-forest-glow hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="w-4 h-4 text-emerald-200" />
            <span>List an Item</span>
          </Link>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2.5 rounded-xl border border-[#E7E2D6] dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-brand-accent dark:hover:text-brand-accent hover:border-brand-accent/50 transition-all shadow-xs hover:scale-105"
            title="My Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-brand-accent text-brand-accent' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-brand-accent text-white text-[9px] font-bold flex items-center justify-center shadow-sm animate-bounce">
                {wishlistCount}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            {/* Notifications Dropdown */}
            <NotificationDropdown />

            {/* Dark / Light Mode Switch */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-[#E7E2D6] dark:border-white/10 bg-white/80 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-brand-primary dark:hover:text-amber-300 transition-all shadow-xs hover:scale-105 cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-300 rotate-0 hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 rotate-0 hover:-rotate-12 transition-transform duration-300" />
              )}
            </button>

            {/* User Profile or Login */}
            {isAuthenticated ? (
              <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-xl border border-[#E7E2D6] dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-brand-primary/50 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                  alt={user?.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 hidden lg:inline max-w-[90px] truncate px-1">
                  {user?.name?.split(' ')[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-[#14211D] rounded-2xl border border-[#E7E2D6] dark:border-white/15 shadow-soft-lg p-2 z-50 animate-fade-up">
                  <div className="px-3 py-2 border-b border-[#E7E2D6] dark:border-white/10 mb-1">
                    <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {user?.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user?.email}
                    </div>
                    {user?.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-primaryLight text-brand-primary border border-brand-primary/20">
                        Admin
                      </span>
                    )}
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-primary" />
                    <span>My Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-brand-secondary" />
                    <span>Profile Settings</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-brand-accent hover:bg-orange-50 dark:hover:bg-white/5 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-brand-accent" />
                      <span>Admin Console</span>
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors mt-1 border-t border-[#E7E2D6] dark:border-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-brand-primary dark:hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-bold shadow-soft-sm hover:shadow-forest-glow transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-[#E7E2D6] dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF9] dark:bg-[#14211D] border-b border-[#E7E2D6] dark:border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-up shadow-soft-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#E7E2D6] dark:border-white/10">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Preferences</span>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          </div>
          <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03]">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Notifications</span>
            <NotificationDropdown />
          </div>
          {isAuthenticated ? (
            <Link to="/dashboard" className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5">
              My Dashboard
            </Link>
          ) : (
            <Link to="/login" className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5">
              Sign In
            </Link>
          )}
          {isAuthenticated && (
            <Link to="/profile" className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5">
              Profile Settings
            </Link>
          )}
          <Link
            to="/list-item"
            className="block w-full py-2.5 text-center rounded-xl bg-brand-primary text-white text-xs font-bold"
          >
            + List an Item for Rent
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
