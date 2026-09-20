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
  Layers,
  Repeat
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
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFDF9]/95 dark:bg-[#14211D]/95 backdrop-blur-md py-3 shadow-soft-sm border-b border-[#E7E2D6] dark:border-white/10'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Editorial Wordmark */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white shadow-soft-sm group-hover:scale-105 transition-transform duration-200">
            <Repeat className="w-5 h-5 text-emerald-100" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              LendKart
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent inline-block" />
            </span>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
              Don't Buy It. Lend It.
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F1ECE1]/60 dark:bg-white/5 p-1 rounded-full border border-[#E7E2D6]/80 dark:border-white/10">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-white dark:bg-brand-primary text-brand-primary dark:text-white shadow-soft-sm'
                    : link.highlight
                    ? 'text-brand-accent hover:text-brand-accentHover font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:text-brand-primary dark:hover:text-white'
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
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primaryHover text-white text-xs font-semibold shadow-soft-sm hover:shadow-forest-glow transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>List an Item</span>
          </Link>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2 rounded-xl border border-[#E7E2D6] dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-brand-primary dark:hover:text-white hover:border-brand-primary/40 transition-colors"
            title="My Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-accent text-white text-[9px] font-bold flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-[#E7E2D6] dark:border-white/10 bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-200 hover:text-brand-primary dark:hover:text-white transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
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
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl border border-[#E7E2D6] dark:border-white/15 bg-white/80 dark:bg-white/5 text-xs font-semibold text-slate-800 dark:text-white hover:border-brand-primary transition-all shadow-soft-sm"
            >
              Sign In
            </Link>
          )}

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
