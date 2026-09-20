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

const COLORS = ['#176B52', '#8EAFA0', '#C96F52', '#709DB3', '#D4A373', '#588157', '#3A5A40', '#344E41'];

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E2D6] dark:border-[#1E332B]">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#176B52]/15 text-[#176B52] dark:text-[#8EAFA0] border border-[#176B52]/30">
              Admin Portal
            </span>
            <span className="text-xs text-[#788880] dark:text-[#7D9B8E]">Authenticated as {user?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0] mt-1">
            System Overview & Moderation
          </h1>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-white dark:bg-[#14211D] p-1 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm overflow-x-auto">
          {['analytics', 'users', 'items', 'rentals'].map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === t
                  ? 'bg-[#176B52] text-white shadow-soft-sm'
                  : 'text-[#5C6E66] dark:text-[#A8C8B5] hover:text-[#17201D] dark:hover:text-[#F8F6F0]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="text-xs text-[#788880] dark:text-[#7D9B8E]">Total Users</div>
          <div className="text-2xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0] mt-1">{stats?.totalUsers || 20}</div>
        </div>
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="text-xs text-[#788880] dark:text-[#7D9B8E]">Total Listings</div>
          <div className="text-2xl font-bold font-display text-[#176B52] dark:text-[#8EAFA0] mt-1">{stats?.totalItems || 31}</div>
        </div>
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="text-xs text-[#788880] dark:text-[#7D9B8E]">Active Bookings</div>
          <div className="text-2xl font-bold font-display text-[#176B52] dark:text-[#8EAFA0] mt-1">{stats?.activeRentals || 2}</div>
        </div>
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="text-xs text-[#788880] dark:text-[#7D9B8E]">Completed</div>
          <div className="text-2xl font-bold font-display text-emerald-700 dark:text-emerald-400 mt-1">{stats?.completedRentals || 1}</div>
        </div>
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="text-xs text-[#788880] dark:text-[#7D9B8E]">Platform GMV</div>
          <div className="text-2xl font-bold font-display text-[#C96F52] mt-1">{formatINR(stats?.grossRevenue || 4350)}</div>
        </div>
        <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm">
          <div className="text-xs text-[#788880] dark:text-[#7D9B8E]">Est. Fee (10%)</div>
          <div className="text-2xl font-bold font-display text-[#176B52] dark:text-[#8EAFA0] mt-1">{formatINR(stats?.platformFee || 435)}</div>
        </div>
      </div>

      {/* TAB: ANALYTICS (RECHARTS) */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Revenue & Rental Activity Trend */}
          <div className="lg:col-span-8 bg-white dark:bg-[#14211D] p-6 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] font-display">
                  Monthly Rental Volume & Platform Activity
                </h3>
                <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">Transaction growth trajectories across recent months</p>
              </div>
              <span className="text-xs text-[#176B52] dark:text-[#8EAFA0] font-semibold">+28% MoM</span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics?.monthlyTrends || []}>
                  <defs>
                    <linearGradient id="colorRentals" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#176B52" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#176B52" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8EAFA0" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#8EAFA0" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(142, 175, 160, 0.15)" />
                  <XAxis dataKey="name" stroke="#788880" fontSize={11} />
                  <YAxis stroke="#788880" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#14211D',
                      borderColor: '#1E332B',
                      color: '#F8F6F0',
                      borderRadius: '12px'
                    }}
                  />
                  <Area type="monotone" dataKey="rentals" stroke="#176B52" fillOpacity={1} fill="url(#colorRentals)" name="Rentals" />
                  <Area type="monotone" dataKey="users" stroke="#8EAFA0" fillOpacity={1} fill="url(#colorRevenue)" name="New Users" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution Chart */}
          <div className="lg:col-span-4 bg-white dark:bg-[#14211D] p-6 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-4">
            <h3 className="font-bold text-base text-[#17201D] dark:text-[#F8F6F0] font-display">
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
                      backgroundColor: '#14211D',
                      borderColor: '#1E332B',
                      color: '#F8F6F0',
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
        <div className="bg-white dark:bg-[#14211D] rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm overflow-hidden">
          <div className="p-4 border-b border-[#E7E2D6] dark:border-[#1E332B]">
            <h3 className="font-bold text-sm text-[#17201D] dark:text-[#F8F6F0]">Registered Users ({usersList.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] uppercase tracking-wider font-semibold border-b border-[#E7E2D6] dark:border-[#1E332B]">
                <tr>
                  <th className="p-4">User</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Moderation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2D6] dark:divide-[#1E332B] text-[#5C6E66] dark:text-[#A8C8B5]">
                {usersList.map((u) => (
                  <tr key={u._id} className="hover:bg-[#F8F6F0] dark:hover:bg-[#0E1714]/60 transition-colors">
                    <td className="p-4 font-semibold text-[#17201D] dark:text-[#F8F6F0] flex items-center gap-2">
                      <img src={u.avatar} alt="" className="w-7 h-7 rounded-full object-cover border border-[#E7E2D6] dark:border-[#1E332B]" />
                      <span>{u.name}</span>
                    </td>
                    <td className="p-4 text-[#788880] dark:text-[#7D9B8E]">{u.email}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${u.role === 'admin' ? 'bg-[#176B52]/15 text-[#176B52] dark:text-[#8EAFA0]' : 'bg-[#F8F6F0] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5]'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">{u.location}</td>
                    <td className="p-4">
                      {u.isSuspended ? (
                        <span className="text-rose-700 dark:text-rose-400 font-semibold">Suspended</span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Active</span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      {u.role !== 'admin' && (
                        <button
                          onClick={() => toggleUserSuspend(u._id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold border cursor-pointer ${
                            u.isSuspended
                              ? 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-emerald-500/30'
                              : 'bg-rose-500/15 text-rose-800 dark:text-rose-300 border-rose-500/30'
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
        <div className="bg-white dark:bg-[#14211D] rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm overflow-hidden">
          <div className="p-4 border-b border-[#E7E2D6] dark:border-[#1E332B]">
            <h3 className="font-bold text-sm text-[#17201D] dark:text-[#F8F6F0]">Marketplace Listings ({itemsList.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] uppercase tracking-wider font-semibold border-b border-[#E7E2D6] dark:border-[#1E332B]">
                <tr>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Toggle Flag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2D6] dark:divide-[#1E332B] text-[#5C6E66] dark:text-[#A8C8B5]">
                {itemsList.map((item) => (
                  <tr key={item._id} className="hover:bg-[#F8F6F0] dark:hover:bg-[#0E1714]/60 transition-colors">
                    <td className="p-4 font-semibold text-[#17201D] dark:text-[#F8F6F0] max-w-xs truncate">
                      {item.title}
                    </td>
                    <td className="p-4 text-[#788880] dark:text-[#7D9B8E]">{item.category?.name || 'General'}</td>
                    <td className="p-4">{item.owner?.name || 'User'}</td>
                    <td className="p-4 font-bold text-[#C96F52] font-display">{formatINR(item.pricePerDay)}/d</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        item.status === 'flagged' ? 'bg-rose-500/15 text-rose-800 dark:text-rose-300' : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleItemFlag(item._id, item.status)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#F8F6F0] dark:bg-[#0E1714] hover:bg-[#EAE6DC] text-[#17201D] dark:text-[#F8F6F0] border border-[#E7E2D6] dark:border-[#1E332B] cursor-pointer"
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
        <div className="bg-white dark:bg-[#14211D] rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm overflow-hidden">
          <div className="p-4 border-b border-[#E7E2D6] dark:border-[#1E332B]">
            <h3 className="font-bold text-sm text-[#17201D] dark:text-[#F8F6F0]">All Platform Transactions ({rentalsList.length})</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F6F0] dark:bg-[#0E1714] text-[#5C6E66] dark:text-[#A8C8B5] uppercase tracking-wider font-semibold border-b border-[#E7E2D6] dark:border-[#1E332B]">
                <tr>
                  <th className="p-4">Item</th>
                  <th className="p-4">Borrower</th>
                  <th className="p-4">Lender</th>
                  <th className="p-4">Dates</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E2D6] dark:divide-[#1E332B] text-[#5C6E66] dark:text-[#A8C8B5]">
                {rentalsList.map((r) => (
                  <tr key={r._id} className="hover:bg-[#F8F6F0] dark:hover:bg-[#0E1714]/60 transition-colors">
                    <td className="p-4 font-semibold text-[#17201D] dark:text-[#F8F6F0] max-w-xs truncate">{r.item?.title}</td>
                    <td className="p-4">{r.borrower?.name}</td>
                    <td className="p-4">{r.owner?.name}</td>
                    <td className="p-4">{formatDate(r.startDate)} → {formatDate(r.endDate)}</td>
                    <td className="p-4 font-bold text-[#C96F52] font-display">{formatINR(r.totalAmount)}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F8F6F0] dark:bg-[#0E1714] text-[#17201D] dark:text-[#F8F6F0] border border-[#E7E2D6] dark:border-[#1E332B]">
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
