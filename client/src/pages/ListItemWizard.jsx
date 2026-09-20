import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Upload,
  Plus,
  Trash2,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  MapPin,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { itemService } from '../services/itemService';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/formatters';
import Button from '../components/common/Button';
import SEO from '../components/common/SEO';
import confetti from 'canvas-confetti';

const SAMPLE_IMAGES = [
  'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80'
];

export const ListItemWizard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [categories, setCategories] = useState([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Form Fields
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [condition, setCondition] = useState('Excellent');
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [pricePerDay, setPricePerDay] = useState(350);
  const [securityDeposit, setSecurityDeposit] = useState(1000);
  const [location, setLocation] = useState(user?.location || 'Pune, Maharashtra');
  const [rentalRules, setRentalRules] = useState([
    'Valid ID required upon pickup',
    'Return with all cables and accessories',
    'Keep away from water and direct dust'
  ]);
  const [newRule, setNewRule] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=/list-item');
    }

    const loadCategories = async () => {
      try {
        const cats = await itemService.getCategories();
        setCategories(cats || []);
        if (cats && cats.length > 0) setCategory(cats[0]._id);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, [isAuthenticated, navigate]);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddRule = () => {
    if (newRule.trim()) {
      setRentalRules([...rentalRules, newRule.trim()]);
      setNewRule('');
    }
  };

  const handleRemoveRule = (index) => {
    setRentalRules(rentalRules.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!title.trim() || !description.trim()) {
        setError('Please enter a title and description');
        return;
      }
    }
    if (step === 2) {
      if (images.length === 0) {
        setError('Please add at least one image of your item');
        return;
      }
    }
    if (step === 3) {
      if (!pricePerDay || pricePerDay < 10) {
        setError('Please enter a valid daily rental price (min ₹10)');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError('');

      const res = await itemService.createItem({
        title,
        description,
        category,
        condition,
        images,
        pricePerDay: Number(pricePerDay),
        securityDeposit: Number(securityDeposit || 0),
        location,
        rentalRules
      });

      if (res.success) {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 }
        });
        setTimeout(() => {
          navigate(`/items/${res.item._id}`);
        }, 1200);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to list item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <SEO
        title="List Your Item for Rent"
        description="Share your camera, tools, projector or camping equipment on LendKart and earn passive rental income."
      />

      {/* Page Header */}
      <div className="max-w-2xl">
        <span className="text-xs font-bold uppercase tracking-wider text-[#176B52] dark:text-[#8EAFA0] font-display">
          Community Lender Wizard
        </span>
        <h1 className="text-3xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0] mt-1">
          List Your Item on LendKart
        </h1>
        <p className="text-xs text-[#788880] dark:text-[#7D9B8E] mt-1">
          Complete the steps below. Your live preview card on the right updates instantly.
        </p>
      </div>

      {/* Wizard Progress Bar */}
      <div className="bg-white dark:bg-[#14211D] p-4 rounded-2xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm flex items-center justify-between">
        {[
          { num: 1, title: 'Basics' },
          { num: 2, title: 'Photos' },
          { num: 3, title: 'Pricing' },
          { num: 4, title: 'Rules & Location' },
          { num: 5, title: 'Review & Publish' }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step > s.num
                  ? 'bg-[#176B52] text-white'
                  : step === s.num
                  ? 'bg-[#176B52] text-white shadow-soft-sm'
                  : 'bg-[#F4F1EA] dark:bg-[#1E332B] text-[#788880] dark:text-[#7D9B8E]'
              }`}
            >
              {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
            </div>
            <span
              className={`text-xs hidden md:inline font-medium ${
                step >= s.num ? 'text-[#17201D] dark:text-[#F8F6F0]' : 'text-[#788880] dark:text-[#7D9B8E]'
              }`}
            >
              {s.title}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Two-Column Layout (Form on Left, Live Preview Card on Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Step Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#14211D] p-6 sm:p-8 rounded-3xl border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm space-y-6">
          {/* Step 1: Basics */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Basic Information</h3>
              <div>
                <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                  Item Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sony Alpha A7 IV Mirrorless Camera + 24-70mm Lens"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-sm text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52] cursor-pointer"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c._id} className="bg-white dark:bg-[#14211D]">
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                    Item Condition *
                  </label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52] cursor-pointer"
                  >
                    <option value="Like New" className="bg-white dark:bg-[#14211D]">Like New</option>
                    <option value="Excellent" className="bg-white dark:bg-[#14211D]">Excellent</option>
                    <option value="Good" className="bg-white dark:bg-[#14211D]">Good</option>
                    <option value="Fair" className="bg-white dark:bg-[#14211D]">Fair</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                  Detailed Description *
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Mention key features, included cables/accessories, best use cases, and condition details..."
                  className="w-full p-3 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52] resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Photos */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Item Photos</h3>
              <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">
                High resolution photos get 4x more rental bookings. Add direct image URLs or pick sample demo images.
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="Paste image URL (https://...)"
                  className="flex-1 px-3 py-2 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
                />
                <Button onClick={handleAddImage} variant="secondary" size="sm">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>

              {/* Sample Quick Pick Images */}
              <div>
                <span className="text-[11px] text-[#788880] dark:text-[#7D9B8E] font-medium block mb-2">
                  Or pick high-res sample presets:
                </span>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SAMPLE_IMAGES.map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt="Sample"
                      onClick={() => setImages([...images, url])}
                      className="w-14 h-14 rounded-lg object-cover cursor-pointer border border-[#E7E2D6] dark:border-[#1E332B] hover:border-[#176B52] hover:scale-105 transition-all shrink-0"
                      title="Click to add photo"
                    />
                  ))}
                </div>
              </div>

              {/* Added Photos Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {images.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden group border border-[#E7E2D6] dark:border-[#1E332B]">
                    <img src={img} alt="Uploaded" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(i)}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Rental Pricing</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                    Daily Rental Price (₹ / day) *
                  </label>
                  <input
                    type="number"
                    min="10"
                    step="10"
                    value={pricePerDay}
                    onChange={(e) => setPricePerDay(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-sm text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
                  />
                  <span className="text-[11px] text-[#788880] dark:text-[#7D9B8E] mt-1 block">
                    Recommended: 1% to 2% of original item purchase price.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                    Refundable Security Deposit (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-sm text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
                  />
                  <span className="text-[11px] text-[#788880] dark:text-[#7D9B8E] mt-1 block">
                    Returned to borrower once returned undamaged.
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] space-y-1.5 text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
                <div className="font-semibold text-[#17201D] dark:text-[#F8F6F0]">Estimated Monthly Earnings:</div>
                <div className="text-2xl font-extrabold text-[#C96F52] font-display">
                  {formatINR(pricePerDay * 8)} / month
                </div>
                <div className="text-[11px] text-[#788880] dark:text-[#7D9B8E]">
                  Based on an average of 8 rental days per month.
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Rules & Location */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Location & Rules</h3>

              <div>
                <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                  Item Pickup City / Locality *
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Kothrud, Pune"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-sm text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5C6E66] dark:text-[#A8C8B5] mb-1">
                  Rental Rules
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newRule}
                    onChange={(e) => setNewRule(e.target.value)}
                    placeholder="e.g. Carry government ID on pickup"
                    className="flex-1 px-3 py-2 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#17201D] dark:text-[#F8F6F0] focus:outline-none focus:border-[#176B52]"
                  />
                  <Button onClick={handleAddRule} variant="secondary" size="sm">
                    Add
                  </Button>
                </div>

                <div className="space-y-1.5">
                  {rentalRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs text-[#5C6E66] dark:text-[#A8C8B5]"
                    >
                      <span>• {rule}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRule(idx)}
                        className="text-rose-600 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Publish */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Review & Publish</h3>
              <p className="text-xs text-[#788880] dark:text-[#7D9B8E]">
                Double-check your listing details before publishing to the community.
              </p>

              <div className="p-4 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] space-y-2 text-xs text-[#5C6E66] dark:text-[#A8C8B5]">
                <div className="flex justify-between">
                  <span>Title:</span>
                  <span className="font-semibold text-[#17201D] dark:text-[#F8F6F0]">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-semibold text-[#17201D] dark:text-[#F8F6F0]">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span>Daily Price:</span>
                  <span className="font-semibold text-[#176B52] dark:text-[#8EAFA0]">{formatINR(pricePerDay)}/day</span>
                </div>
                <div className="flex justify-between">
                  <span>Security Deposit:</span>
                  <span className="font-semibold text-[#17201D] dark:text-[#F8F6F0]">{formatINR(securityDeposit)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-[#176B52]/10 border border-[#176B52]/20 text-xs text-[#176B52] dark:text-[#8EAFA0]">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  Your item will be immediately indexed and discoverable in the explore catalog.
                </span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E7E2D6] dark:border-[#1E332B]">
            {step > 1 ? (
              <Button onClick={() => setStep(step - 1)} variant="outline" size="md">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </Button>
            ) : <div />}

            {step < 5 ? (
              <Button onClick={handleNext} variant="primary" size="md">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                isLoading={isSubmitting}
                variant="accent"
                size="md"
              >
                <span>Publish to Marketplace</span>
                <Sparkles className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Right: Live Interactive Card Preview */}
        <div className="lg:col-span-5 sticky top-24 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#788880] dark:text-[#7D9B8E] flex items-center justify-between px-1">
            <span>Live Marketplace Card Preview</span>
            <span className="text-[#176B52] dark:text-[#8EAFA0] font-medium">Real-time</span>
          </div>

          <div className="bg-white dark:bg-[#14211D] rounded-2xl overflow-hidden border border-[#E7E2D6] dark:border-[#1E332B] shadow-soft-sm p-0">
            <div className="relative aspect-[4/3] w-full bg-[#F2EFE9] dark:bg-[#0E1714]">
              <img
                src={images[0] || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-[#0E1714]/85 backdrop-blur-md text-[#17201D] dark:text-[#EAEFE9] border border-[#E7E2D6] dark:border-white/10">
                {condition}
              </div>
              <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#0E1714]/90 backdrop-blur-md border border-emerald-500/30 text-[10px] text-emerald-800 dark:text-emerald-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Available Today
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-semibold text-sm text-[#17201D] dark:text-[#F8F6F0] line-clamp-2">
                {title || 'Your Item Title Appears Here'}
              </h4>
              <div className="flex items-center justify-between text-xs text-[#788880] dark:text-[#7D9B8E]">
                <span className="text-[11px] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#176B52] dark:text-[#8EAFA0]" />
                  {location || 'Location'}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">New Listing</span>
              </div>

              <div className="pt-2 border-t border-[#E7E2D6] dark:border-[#1E332B] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#788880] dark:text-[#7D9B8E] uppercase font-bold">Rent for</div>
                  <div className="text-lg font-bold text-[#176B52] dark:text-[#8EAFA0] font-display">
                    {formatINR(pricePerDay)}
                    <span className="text-xs text-[#788880] dark:text-[#7D9B8E] font-normal"> /day</span>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-[#176B52]/10 text-[#176B52] dark:text-[#8EAFA0] text-xs font-semibold">
                  Rent
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItemWizard;
