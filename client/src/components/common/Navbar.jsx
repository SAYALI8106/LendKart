import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  PlusCircle,
  Sun,
  Moon,
  User as UserIcon,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
  Sparkles
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Explore', path: '/explore' },
    { label: 'How It Works', path: '/#how-it-works' },
    { label: 'Rent Projector', path: '/rent/projector' },
    { label: 'Blog', path: '/blog' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'glass-panel py-3 shadow-glass border-b border-white/10'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-primary via-indigo-500 to-brand-secondary p-0.5 shadow-neon-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#070A0F] rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary font-display">
                LK
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-display tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
              LendKart
              <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 -mt-1 hidden sm:block">
              Don't Buy It. Lend It.
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 glass-card px-4 py-1.5 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                location.pathname === link.path
                  ? 'bg-brand-primary/15 text-brand-primary'
                  : 'text-slate-600 dark:text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Actions (List Item, Wishlist, Notifications, Theme, Auth) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* List an Item CTA */}
          <Link
            to="/list-item"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-brand-primary to-brand-primaryHover text-white text-xs font-bold shadow-md shadow-brand-primary/20 hover:scale-105 transition-transform"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List an Item</span>
          </Link>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2.5 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:text-white transition-colors"
            title="My Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Dark / Light Mode Switch */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass-card text-slate-600 dark:text-slate-300 hover:text-white transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          {/* User Profile or Login */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl glass-card border border-white/10 hover:border-brand-primary/50 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                  alt={user?.name}
                  className="w-7 h-7 rounded-lg object-cover"
                />
                <span className="text-xs font-medium text-white hidden lg:inline max-w-[80px] truncate">
                  {user?.name?.split(' ')[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 glass-panel rounded-2xl border border-white/15 shadow-2xl p-2 z-50 animate-fade-in">
                  <div className="px-3 py-2 border-b border-white/10 mb-1">
                    <div className="font-bold text-xs text-white truncate">{user?.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                    {user?.role === 'admin' && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
                        Admin Access
                      </span>
                    )}
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-brand-primary" />
                    <span>My Dashboard</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-brand-secondary" />
                    <span>Profile Settings</span>
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-amber-300 hover:bg-amber-500/10 transition-colors"
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <span>Admin Console</span>
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors mt-1 border-t border-white/5"
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
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white border border-white/15 transition-all"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl glass-card text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className="block px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
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
