import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Info, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import { calculateRentalDays, isDateBlocked } from '../../utils/dateUtils';

export const RentalCalendar = ({
  pricePerDay = 0,
  securityDeposit = 0,
  bookedRanges = [],
  onDateChange,
  initialStart = '',
  initialEnd = ''
}) => {
  // Format today's date for input min
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(initialStart || today);
  const [endDate, setEndDate] = useState(initialEnd || tomorrow);
  const [error, setError] = useState('');

  // Validate dates whenever they change
  useEffect(() => {
    if (!startDate || !endDate) {
      setError('Please select both pickup and return dates');
      if (onDateChange) onDateChange(null);
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('Return date must be at least 1 day after pickup');
      if (onDateChange) onDateChange(null);
      return;
    }

    // Check if any date in range overlaps with booked ranges
    let isOverlap = false;
    const cur = new Date(startDate);
    const end = new Date(endDate);

    while (cur < end) {
      if (isDateBlocked(cur, bookedRanges)) {
        isOverlap = true;
        break;
      }
      cur.setDate(cur.getDate() + 1);
    }

    if (isOverlap) {
      setError('Selected dates overlap with an already booked reservation');
      if (onDateChange) onDateChange(null);
      return;
    }

    setError('');
    const days = calculateRentalDays(startDate, endDate);
    const rentalFee = days * pricePerDay;
    const totalAmount = rentalFee + securityDeposit;

    if (onDateChange) {
      onDateChange({
        startDate,
        endDate,
        days,
        rentalFee,
        securityDeposit,
        totalAmount
      });
    }
  }, [startDate, endDate, pricePerDay, securityDeposit, bookedRanges]);

  const days = calculateRentalDays(startDate, endDate);
  const rentalFee = days * pricePerDay;
  const totalAmount = rentalFee + securityDeposit;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <CalendarIcon className="w-4 h-4 text-brand-primary" />
          <span>Select Rental Dates</span>
        </div>
        <span className="text-xs text-slate-400">Dynamic Pricing</span>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Pickup Date
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-sm text-white focus:outline-none focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">
            Return Date
          </label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900/60 border border-white/15 text-sm text-white focus:outline-none focus:border-brand-primary"
          />
        </div>
      </div>

      {/* Validation Message */}
      {error ? (
        <div className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Item is available for these dates!</span>
        </div>
      )}

      {/* Live Breakdown Table */}
      <div className="bg-white/5 rounded-xl p-3.5 space-y-2 text-xs text-slate-300">
        <div className="flex justify-between items-center">
          <span>
            Rental Fee ({formatINR(pricePerDay)} × {days} {days === 1 ? 'day' : 'days'})
          </span>
          <span className="font-semibold text-white">{formatINR(rentalFee)}</span>
        </div>

        <div className="flex justify-between items-center text-slate-400">
          <div className="flex items-center gap-1">
            <span>Refundable Security Deposit</span>
            <ShieldCheck className="w-3.5 h-3.5 text-brand-secondary" />
          </div>
          <span>{formatINR(securityDeposit)}</span>
        </div>

        <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm font-bold text-white">
          <span>Total Estimated Amount</span>
          <span className="text-brand-accent text-base font-display">
            {formatINR(totalAmount)}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 italic">
        * Security deposit is fully refunded once the item is returned in verified condition.
      </div>
    </div>
  );
};

export default RentalCalendar;
