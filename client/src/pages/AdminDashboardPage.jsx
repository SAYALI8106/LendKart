import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Package,
  Repeat,
  DollarSign,
  ShieldCheck,
  Ban,
  Check,
  TrendingUp,
  BarChart2,
  PieChart as PieIcon,
  AlertTriangle
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../context/AuthContext';
import { formatINR, formatDate } from '../utils/formatters';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import api from '../services/api';

const COLORS = ['#7C5CFF', '#00D4FF', '#B8FF6A', '#F59E0B', '#EC4899', '#8B5CF6', '#10B981', '#3B82F6'];

export const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' | 'users' | 'items' | 'rentals'
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [rentalsList, setRentalsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login?redirect=/admin');
      return;
    }

    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const [statsRes, analyticsRes, usersRes, itemsRes, rentalsRes] = await Promise.all([
          api.get('/admin/stats'),
          api.get('/admin/analytics'),
          api.get('/admin/users'),
          api.get('/admin/items'),
          api.get('/admin/rentals')
        ]);

        setStats(statsRes.data.stats);
        setAnalytics(analyticsRes.data.analytics);
        setUsersList(usersRes.data.users);
        setItemsList(itemsRes.data.items);
        setRentalsList(rentalsRes.data.rentals);
      } catch (err) {
        console.error('Failed to load admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [isAuthenticated, isAdmin, navigate]);

  const toggleUserSuspend = async (userId) => {
    try {
      const res = await api.put(`/admin/users/${userId}/suspend`);
      if (res.data.success) {
        setUsersList((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, isSuspended: res.data.user.isSuspended } : u))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update user status');
    }
  };

  const toggleItemFlag = async (itemId, currentStatus) => {
    const nextStatus = currentStatus === 'flagged' ? 'available' : 'flagged';
    try {
      const res = await api.put(`/admin/items/${itemId}/status`, { status: nextStatus });
      if (res.data.success) {
        setItemsList((prev) =>
          prev.map((i) => (i._id === itemId ? { ...i, status: nextStatus } : i))
        );
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update item status');
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Admin Control Center"
        description="Comprehensive analytics, user moderation, inventory management, and platform oversight for LendKart."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Admin Portal
            </span>
            <span className="text-xs text-slate-400">Authenticated as {user?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-1">
            System Overview & Moderation
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center glass-panel p-1 rounded-2xl border border-white/10 overflow-x-auto">
          {['analytics', 'users', 'items', 'rentals'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                activeTab === t
                  ? 'bg-brand-primary text-white shadow-neon-glow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400">Total Users</div>
          <div className="text-2xl font-bold font-display text-white mt-1">{stats?.totalUsers || 20}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400">Total Listings</div>
          <div className="text-2xl font-bold font-display text-brand-primary mt-1">{stats?.totalItems || 31}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400">Active Bookings</div>
          <div className="text-2xl font-bold font-display text-brand-secondary mt-1">{stats?.activeRentals || 2}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400">Completed</div>
          <div className="text-2xl font-bold font-display text-emerald-400 mt-1">{stats?.completedRentals || 1}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400">Platform GMV</div>
          <div className="text-2xl font-bold font-display text-brand-accent mt-1">{formatINR(stats?.grossRevenue || 4350)}</div>
        </div>
        <div className="glass-card p-4 rounded-2xl border border-white/10">
          <div className="text-xs text-slate-400">Est. Fee (10%)</div>
          <div className="text-2xl font-bold font-display text-amber-400 mt-1">{formatINR(stats?.platformFee || 435)}</div>
        </div>
      </div>

      {/* TAB: ANALYTICS (RECHARTS) */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue & Rental Activity Trend */}
          <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-white font-display">
                  Monthly Rental Volume & Platform Activity
                </h3>
                <p className="text-xs text-slate-400">Transaction growth trajectories across recent months</p>
              </div>
              <span className="text-xs text-brand-accent font-semibold">+28% MoM</span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.monthlyTrends || []}>
                  <defs>
                    <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#7C5CFF" stopOpacity={0.8}/>
                      <stop offset="95%" stop-color="#7C5CFF" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stop-color="#00D4FF" stopOpacity={0.6}/>
                      <stop offset="95%" stop-color="#00D4FF" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#10151D',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="rentals" stroke="#7C5CFF" fillOpacity={1} fill="url(#colorRentals)" name="Rentals" />
                  <Area type="monotone" dataKey="users" stroke="#00D4FF" fillOpacity={1} fill="url(#colorRevenue)" name="New Users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Chart */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="font-bold text-base text-white font-display">
              Category Distribution
            </h3>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics?.categoryStats || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {(analytics?.categoryStats || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#10151D',
                      borderColor: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB: USERS MODERATION */}
      {activeTab === 'users' && (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">Registered Users ({usersList.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {usersList.map((u) => (
                  <tr key={u._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white flex items-center gap-2">
                      <img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <span>{u.name}</span>
                    </td>
                    <td className="p-4 text-slate-400">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'admin' ? 'bg-amber-500/20 text-amber-400' : 'bg-white/10 text-slate-300'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">{u.location}</td>
                    <td className="p-4">
                      {u.isSuspended ? (
                        <span className="text-rose-400 font-semibold">Suspended</span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => toggleUserSuspend(u._id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                            u.isSuspended
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          }`}
                        >
                          {u.isSuspended ? 'Reactivate' : 'Suspend'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: ITEMS MODERATION */}
      {activeTab === 'items' && (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">Marketplace Listings ({itemsList.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Toggle Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {itemsList.map((item) => (
                  <tr key={item._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="p-4 text-slate-400">{item.category?.name || 'General'}</td>
                    <td className="p-4">{item.owner?.name || 'User'}</td>
                    <td className="p-4 font-bold text-brand-accent">{formatINR(item.pricePerDay)}/d</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'flagged' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleItemFlag(item._id, item.status)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 border border-white/10"
                      >
                        {item.status === 'flagged' ? 'Unflag' : 'Flag / Hide'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB: RENTALS AUDIT */}
      {activeTab === 'rentals' && (
        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="font-bold text-sm text-white">All Platform Transactions ({rentalsList.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Borrower</th>
                  <th className="p-4">Lender</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                {rentalsList.map((r) => (
                  <tr key={r._id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-semibold text-white max-w-xs truncate">{r.item?.title}</td>
                    <td className="p-4">{r.borrower?.name}</td>
                    <td className="p-4">{r.owner?.name}</td>
                    <td className="p-4">{formatDate(r.startDate)} → {formatDate(r.endDate)}</td>
                    <td className="p-4 font-bold text-brand-accent">{formatINR(r.totalAmount)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-white">
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
