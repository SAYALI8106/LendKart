import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PlusCircle,
  DollarSign,
  TrendingUp,
  MapPin,
  Trash2,
  Check,
  X,
  Star
} from 'lucide-react';
import { rentalService } from '../services/rentalService';
import { itemService } from '../services/itemService';
import { useAuth } from '../context/AuthContext';
import { formatINR, formatDate, getStatusBadgeClass } from '../utils/formatters';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import api from '../services/api';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState('borrowing'); // 'borrowing' | 'lending'
  const [borrowedRentals, setBorrowedRentals] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Filter for Borrowed Rentals
  const [borrowStatusFilter, setBorrowStatusFilter] = useState('All');

  // Confirmation Modals
  const [actionModal, setActionModal] = useState({
    isOpen: false,
    type: '', // 'approve' | 'reject' | 'cancel' | 'complete'
    rentalId: null,
    rentalTitle: '',
    reason: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/dashboard');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [myRentals, ownerRentals, allItems] = await Promise.all([
          rentalService.getMyRentals(borrowStatusFilter),
          rentalService.getOwnerRentals(),
          api.get('/items').then((r) => r.data.items).catch(() => [])
        ]);

        setBorrowedRentals(myRentals || []);
        setOwnerRequests(ownerRentals || []);
        // Filter items belonging to current user
        const mine = (allItems || []).filter((i) => i.owner?._id === user?._id || i.owner === user?._id);
        setMyItems(mine);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, user, borrowStatusFilter, navigate]);

  // Handle Rental Actions
  const handleConfirmAction = async () => {
    const { type, rentalId, reason } = actionModal;
    try {
      if (type === 'approve') {
        await rentalService.approveRental(rentalId);
      } else if (type === 'reject') {
        await rentalService.rejectRental(rentalId, reason);
      } else if (type === 'cancel') {
        await rentalService.cancelRental(rentalId);
      } else if (type === 'complete') {
        await rentalService.completeRental(rentalId);
      }

      // Refresh data
      const [updatedMy, updatedOwner] = await Promise.all([
        rentalService.getMyRentals(borrowStatusFilter),
        rentalService.getOwnerRentals()
      ]);
      setBorrowedRentals(updatedMy || []);
      setOwnerRequests(updatedOwner || []);
      setActionModal({ isOpen: false, type: '', rentalId: null, rentalTitle: '', reason: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    }
  };

  // Metrics for Owner
  const pendingRequestsCount = ownerRequests.filter((r) => r.status === 'Pending').length;
  const activeRentalsCount = ownerRequests.filter((r) => r.status === 'Approved' || r.status === 'Active').length;
  const totalEarnings = ownerRequests
    .filter((r) => ['Approved', 'Active', 'Completed'].includes(r.status))
    .reduce((sum, r) => sum + (r.rentalFee || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="Dashboard & Rental Manager"
        description="Track active borrowings, approve incoming community rental requests, and manage your listed gear."
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-secondary font-display">
            Activity Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white mt-0.5">
            Rental Management Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage items you are borrowing and requests for equipment you lend.
          </p>
        </div>

        {/* Tab Switcher: Borrowing vs Lending */}
        <div className="flex items-center glass-panel p-1 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('borrowing')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'borrowing'
                ? 'bg-brand-primary text-white shadow-neon-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Rentals (Borrower)
          </button>
          <button
            onClick={() => setActiveTab('lending')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all relative ${
              activeTab === 'lending'
                ? 'bg-brand-primary text-white shadow-neon-glow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Lender Console
            {pendingRequestsCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-brand-accent text-slate-950 text-[10px] font-bold">
                {pendingRequestsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* TAB 1: BORROWING (MY RENTALS) */}
      {activeTab === 'borrowing' && (
        <div className="space-y-6">
          {/* Status Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {['All', 'Pending', 'Approved', 'Active', 'Completed', 'Cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setBorrowStatusFilter(status)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  borrowStatusFilter === status
                    ? 'bg-white text-slate-950 font-bold'
                    : 'glass-card text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Borrowed Rentals List */}
          {borrowedRentals.length === 0 ? (
            <EmptyState
              title="No rentals in this category"
              description="Ready to rent? Explore available gear from local verified community members."
              actionLabel="Explore Items"
              onAction={() => navigate('/explore')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {borrowedRentals.map((rental) => (
                <div
                  key={rental._id}
                  className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getStatusBadgeClass(rental.status)}`}>
                        {rental.status}
                      </span>
                      <span className="text-xs text-slate-400">
                        {formatDate(rental.createdAt)}
                      </span>
                    </div>

                    <div className="flex gap-3 items-center">
                      <img
                        src={rental.item?.images?.[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80'}
                        alt={rental.item?.title}
                        className="w-16 h-16 rounded-xl object-cover border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/items/${rental.item?._id}`}
                          className="font-bold text-sm text-white hover:text-brand-primary line-clamp-1 transition-colors"
                        >
                          {rental.item?.title}
                        </Link>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-brand-secondary" />
                          <span>{rental.item?.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 text-xs space-y-1 text-slate-300">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Dates:</span>
                        <span className="font-semibold text-white">
                          {formatDate(rental.startDate)} → {formatDate(rental.endDate)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Duration:</span>
                        <span>{rental.numberOfDays} {rental.numberOfDays === 1 ? 'day' : 'days'}</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-white/5 font-bold text-white">
                        <span>Total:</span>
                        <span className="text-brand-accent">{formatINR(rental.totalAmount)}</span>
                      </div>
                    </div>

                    {rental.owner && (
                      <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                        <span className="text-slate-500">Lender:</span>
                        <span className="font-medium text-slate-200">{rental.owner.name}</span>
                        <span>({rental.owner.phone})</span>
                      </div>
                    )}
                  </div>

                  {/* Actions for Borrower */}
                  <div className="pt-2 border-t border-white/5 flex gap-2">
                    {rental.status === 'Pending' && (
                      <Button
                        onClick={() =>
                          setActionModal({
                            isOpen: true,
                            type: 'cancel',
                            rentalId: rental._id,
                            rentalTitle: rental.item?.title,
                            reason: ''
                          })
                        }
                        variant="outline"
                        size="sm"
                        className="w-full text-rose-400 border-rose-500/20"
                      >
                        Cancel Request
                      </Button>
                    )}
                    {rental.status === 'Completed' && (
                      <Link to={`/items/${rental.item?._id}`} className="w-full">
                        <Button variant="secondary" size="sm" className="w-full">
                          <Star className="w-3.5 h-3.5 mr-1 text-amber-400 fill-amber-400" />
                          Leave Review
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LENDING OPERATIONS (OWNER CONSOLE) */}
      {activeTab === 'lending' && (
        <div className="space-y-8">
          {/* Owner Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Total Listed Gear</span>
              <div className="text-2xl font-bold font-display text-white">{myItems.length}</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Pending Requests</span>
              <div className="text-2xl font-bold font-display text-amber-400">{pendingRequestsCount}</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Active Rentals</span>
              <div className="text-2xl font-bold font-display text-emerald-400">{activeRentalsCount}</div>
            </div>
            <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-1">
              <span className="text-xs text-slate-400">Total Earnings</span>
              <div className="text-2xl font-bold font-display text-brand-accent">{formatINR(totalEarnings)}</div>
            </div>
          </div>

          {/* Section: Incoming Rental Requests (Approve / Reject) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold font-display text-white">
                Incoming Rental Requests ({ownerRequests.length})
              </h3>
            </div>

            {ownerRequests.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 glass-card rounded-2xl border border-white/5">
                No rental requests received yet.
              </div>
            ) : (
              <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-slate-400 uppercase tracking-wider font-semibold border-b border-white/10">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Borrower</th>
                      <th className="p-4">Dates</th>
                      <th className="p-4">Payout</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {ownerRequests.map((req) => (
                      <tr key={req._id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-semibold text-white max-w-xs truncate">
                          {req.item?.title}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={req.borrower?.avatar}
                              alt=""
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span>{req.borrower?.name}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {formatDate(req.startDate)} → {formatDate(req.endDate)} ({req.numberOfDays}d)
                        </td>
                        <td className="p-4 font-bold text-brand-accent">
                          {formatINR(req.rentalFee)}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadgeClass(req.status)}`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {req.status === 'Pending' && (
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  setActionModal({
                                    isOpen: true,
                                    type: 'approve',
                                    rentalId: req._id,
                                    rentalTitle: req.item?.title
                                  })
                                }
                                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-semibold border border-emerald-500/30"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() =>
                                  setActionModal({
                                    isOpen: true,
                                    type: 'reject',
                                    rentalId: req._id,
                                    rentalTitle: req.item?.title
                                  })
                                }
                                className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 font-semibold border border-rose-500/30"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                          {(req.status === 'Approved' || req.status === 'Active') && (
                            <button
                              onClick={() =>
                                setActionModal({
                                  isOpen: true,
                                  type: 'complete',
                                  rentalId: req._id,
                                  rentalTitle: req.item?.title
                                })
                              }
                              className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 font-semibold border border-blue-500/30"
                            >
                              Mark Returned
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section: My Listed Items */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-white">My Listed Equipment</h3>
                <p className="text-xs text-slate-400">Items you have made available for the community to rent</p>
              </div>
              <Link to="/list-item">
                <Button variant="primary" size="sm">
                  <PlusCircle className="w-4 h-4 mr-1.5" />
                  List New Item
                </Button>
              </Link>
            </div>

            {myItems.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 glass-card rounded-2xl border border-white/5">
                You haven't listed any items yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {myItems.map((item) => (
                  <div key={item._id} className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
                    <img
                      src={item.images?.[0]}
                      alt={item.title}
                      className="w-full h-32 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{item.title}</h4>
                      <p className="text-xs text-brand-accent font-bold mt-1">
                        {formatINR(item.pricePerDay)} /day
                      </p>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                      <span className="text-emerald-400">● {item.status}</span>
                      <Link to={`/items/${item._id}`} className="text-brand-primary hover:underline">
                        View
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={actionModal.isOpen}
        onClose={() => setActionModal({ ...actionModal, isOpen: false })}
        title={`Confirm ${actionModal.type?.toUpperCase()}`}
      >
        <div className="space-y-4 text-xs text-slate-300">
          <p>
            Are you sure you want to <strong>{actionModal.type}</strong> the rental reservation for{' '}
            <span className="text-white font-semibold">"{actionModal.rentalTitle}"</span>?
          </p>

          {actionModal.type === 'reject' && (
            <div>
              <label className="block text-slate-400 mb-1">Reason for declining:</label>
              <input
                type="text"
                value={actionModal.reason || ''}
                onChange={(e) => setActionModal({ ...actionModal, reason: e.target.value })}
                placeholder="e.g. Item unavailable during selected dates"
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/15 text-white"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
            <Button
              onClick={() => setActionModal({ ...actionModal, isOpen: false })}
              variant="outline"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmAction}
              variant={actionModal.type === 'reject' || actionModal.type === 'cancel' ? 'danger' : 'primary'}
              size="sm"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardPage;
