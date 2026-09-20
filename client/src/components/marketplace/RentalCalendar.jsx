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
    <div className="bg-white dark:bg-[#14211D] p-5 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D6] dark:border-[#1E332B]">
        <div className="flex items-center gap-2 text-sm font-bold text-[#17201D] dark:text-[#F8F6F0]">
          <CalendarIcon className="w-4 h-4 text-[#176B52] dark:text-[#8EAFA0]" />
          <span>Select Rental Dates</span>
        </div>
        <span className="text-xs text-[#788880] dark:text-[#7D9B8E]">Dynamic Pricing</span>
      </div>

      {/* Date Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
            Pickup Date
          </label>
          <input
            type="date"
            min={today}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-sm text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
            Return Date
          </label>
          <input
            type="date"
            min={startDate || today}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-sm text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
          />
        </div>
      </div>

      {/* Validation Message */}
      {error ? (
        <div className="text-xs text-rose-700 dark:text-rose-300 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl flex items-center gap-2">
          <Info className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Item is available for these dates!</span>
        </div>
      )}

      {/* Live Breakdown Table */}
      <div className="bg-[#F8F6F0] dark:bg-[#0E1714] rounded-xl p-3.5 space-y-2 text-xs text-[#5C6E66] dark:text-[#A8C8B5] border border-[#E7E2D6] dark:border-[#1E332B]">
        <div className="flex justify-between items-center">
          <span>
            Rental Fee ({formatINR(pricePerDay)} × {days} {days === 1 ? 'day' : 'days'})
          </span>
          <span className="font-semibold text-[#17201D] dark:text-[#F8F6F0]">{formatINR(rentalFee)}</span>
        </div>

        <div className="flex justify-between items-center text-[#788880] dark:text-[#7D9B8E]">
          <div className="flex items-center gap-1">
            <span>Refundable Security Deposit</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#176B52] dark:text-[#8EAFA0]" />
          </div>
          <span className="font-medium text-[#17201D] dark:text-[#F8F6F0]">{formatINR(securityDeposit)}</span>
        </div>

        <div className="pt-2 border-t border-[#E7E2D6] dark:border-[#1E332B] flex justify-between items-center text-sm font-bold text-[#17201D] dark:text-[#F8F6F0]">
          <span>Total Estimated Amount</span>
          <span className="text-[#C96F52] text-base font-display">
            {formatINR(totalAmount)}
          </span>
        </div>
      </div>

      <div className="text-[11px] text-[#788880] dark:text-[#7D9B8E] italic">
        * Security deposit is fully refunded once the item is returned in verified condition.
      </div>
    </div>
  );
};

export default RentalCalendar;
