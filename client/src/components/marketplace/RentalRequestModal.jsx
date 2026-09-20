import React, { useState } from 'react';
import { Calendar, Check, ShieldCheck, MapPin, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import RentalCalendar from './RentalCalendar';
import { formatINR, formatDate } from '../../utils/formatters';
import { rentalService } from '../../services/rentalService';
import { trackEvent } from '../../services/analytics';
import confetti from 'canvas-confetti';

export const RentalRequestModal = ({ isOpen, onClose, item, bookedRanges = [], onSuccess }) => {
  const [step, setStep] = useState(1);
  const [dateDetails, setDateDetails] = useState(null);
  const [deliveryOption, setDeliveryOption] = useState('Self Pickup');
  const [borrowerNote, setBorrowerNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [confirmedRental, setConfirmedRental] = useState(null);

  const resetState = () => {
    setStep(1);
    setDeliveryOption('Self Pickup');
    setBorrowerNote('');
    setError('');
    setConfirmedRental(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleNext = () => {
    if (step === 1 && !dateDetails) {
      setError('Please select valid rental dates');
      return;
    }
    setError('');
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const res = await rentalService.createRental({
        itemId: item._id,
        startDate: dateDetails.startDate,
        endDate: dateDetails.endDate,
        deliveryOption,
        borrowerNote
      });

      if (res.success) {
        setConfirmedRental(res.rental);
        setStep(4);
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
        trackEvent('request_rental', {
          item_id: item._id,
          total_amount: dateDetails.totalAmount
        });
        if (onSuccess) onSuccess(res.rental);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit rental request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepsList = [
    { num: 1, title: 'Dates' },
    { num: 2, title: 'Details' },
    { num: 3, title: 'Review' },
    { num: 4, title: 'Complete' }
  ];

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Request Item Rental" maxWidth="max-w-xl">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
        {stepsList.map((s, idx) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step > s.num
                  ? 'bg-emerald-500 text-white'
                  : step === s.num
                  ? 'bg-brand-primary text-white shadow-neon-glow'
                  : 'bg-white/10 text-slate-400'
              }`}
            >
              {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
            </div>
            <span
              className={`text-xs hidden sm:inline font-medium ${
                step >= s.num ? 'text-white' : 'text-slate-500'
              }`}
            >
              {s.title}
            </span>
            {idx < stepsList.length - 1 && (
              <div
                className={`w-8 sm:w-12 h-0.5 mx-1 transition-colors ${
                  step > s.num ? 'bg-emerald-500' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Calendar & Date Selection */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <img
              src={item?.images?.[0]}
              alt={item?.title}
              className="w-14 h-14 rounded-lg object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold text-white line-clamp-1">{item?.title}</h4>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-brand-secondary" />
                {item?.location}
              </p>
            </div>
          </div>

          <RentalCalendar
            pricePerDay={item?.pricePerDay}
            securityDeposit={item?.securityDeposit}
            bookedRanges={bookedRanges}
            onDateChange={setDateDetails}
          />

          <div className="flex justify-end pt-2">
            <Button
              onClick={handleNext}
              disabled={!dateDetails}
              variant="primary"
              className="w-full sm:w-auto"
            >
              <span>Continue to Details</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Logistics & Notes */}
      {step === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Pickup & Return Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['Self Pickup', 'Owner Delivery'].map((option) => (
                <div
                  key={option}
                  onClick={() => setDeliveryOption(option)}
                  className={`p-4 rounded-xl border cursor-pointer text-center transition-all ${
                    deliveryOption === option
                      ? 'border-brand-primary bg-brand-primary/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold text-sm">{option}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {option === 'Self Pickup'
                      ? `Meet at ${item?.location}`
                      : 'Coordinate direct drop-off'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Message for Lender (Optional)
            </label>
            <textarea
              rows={3}
              value={borrowerNote}
              onChange={(e) => setBorrowerNote(e.target.value)}
              placeholder="Tell the owner what project or occasion you need this item for..."
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 space-y-1">
            <div className="font-semibold">Lender Rules & Courtesy:</div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
              {item?.rentalRules?.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-2">
            <Button onClick={handleBack} variant="outline" size="md">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button onClick={handleNext} variant="primary" size="md">
              Review Price Summary
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Final Breakdown & Confirmation */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-xl border border-white/10 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-display">
              Rental Summary
            </h4>
            <div className="flex justify-between text-xs text-slate-300">
              <span className="text-slate-400">Item:</span>
              <span className="font-medium text-white">{item?.title}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span className="text-slate-400">Duration:</span>
              <span className="font-medium text-white">
                {formatDate(dateDetails?.startDate)} → {formatDate(dateDetails?.endDate)} ({dateDetails?.days} days)
              </span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span className="text-slate-400">Pickup Location:</span>
              <span className="font-medium text-white">{item?.location}</span>
            </div>
            <div className="flex justify-between text-xs text-slate-300">
              <span className="text-slate-400">Delivery Option:</span>
              <span className="font-medium text-white">{deliveryOption}</span>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Rental Charge</span>
                <span>{formatINR(dateDetails?.rentalFee)}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>Security Deposit (Refundable)</span>
                <span>{formatINR(dateDetails?.securityDeposit)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                <span>Total Payable</span>
                <span className="text-brand-accent font-display">
                  {formatINR(dateDetails?.totalAmount)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20 text-xs text-brand-primary">
            <ShieldCheck className="w-5 h-5 shrink-0 text-brand-secondary" />
            <span>
              No payment is deducted until the owner reviews and approves your request.
            </span>
          </div>

          <div className="flex justify-between pt-2">
            <Button onClick={handleBack} variant="outline" size="md">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              isLoading={isSubmitting}
              variant="accent"
              size="md"
            >
              Confirm Rental Request
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Submission Success */}
      {step === 4 && (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            Rental Request Sent! 🎉
          </h3>
          <p className="text-xs text-slate-300 max-w-sm mx-auto">
            Your request for <span className="font-semibold text-white">{item?.title}</span> has been forwarded to the owner. Status is currently:
          </p>
          <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
            Pending Owner Approval
          </div>
          <div className="text-[11px] text-slate-400">
            You will receive a notification as soon as the owner confirms your booking.
          </div>
          <div className="pt-4">
            <Button onClick={handleClose} variant="primary" size="md">
              Back to Marketplace
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default RentalRequestModal;
