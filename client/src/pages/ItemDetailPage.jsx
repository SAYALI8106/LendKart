import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  MapPin,
  ShieldCheck,
  Calendar,
  Share2,
  Heart,
  ChevronRight,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { itemService } from '../services/itemService';
import { rentalService } from '../services/rentalService';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { formatINR, formatDate } from '../../src/utils/formatters';
import RentalCalendar from '../components/marketplace/RentalCalendar';
import RentalRequestModal from '../components/marketplace/RentalRequestModal';
import ItemCard from '../components/marketplace/ItemCard';
import RatingStars from '../components/common/RatingStars';
import Button from '../components/common/Button';
import Skeleton from '../components/common/Skeleton';
import SEO from '../components/common/SEO';
import api from '../services/api';

export const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookedRanges, setBookedRanges] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Review submission state
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const [itemData, similarData, bookedData, reviewsData] = await Promise.all([
          itemService.getItemById(id),
          itemService.getSimilarItems(id),
          rentalService.getBookedDates(id),
          api.get(`/reviews/item/${id}`).then((r) => r.data.reviews).catch(() => [])
        ]);

        setItem(itemData);
        setSimilarItems(similarData || []);
        setBookedRanges(bookedData || []);
        setReviews(reviewsData || []);
        setActiveImageIndex(0);
      } catch (err) {
        console.error('Failed to load item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      setSubmittingReview(true);
      setReviewError('');
      const res = await api.post('/reviews', {
        itemId: item._id,
        rating: newRating,
        comment: newComment
      });

      if (res.data.success) {
        setReviews([res.data.review, ...reviews]);
        setNewComment('');
        // Refresh item for updated rating
        const refreshed = await itemService.getItemById(id);
        setItem(refreshed);
      }
    } catch (err) {
      setReviewError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <Skeleton className="w-48 h-6" />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <Skeleton className="lg:col-span-7 h-96 rounded-3xl" />
          <Skeleton className="lg:col-span-5 h-96 rounded-3xl" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center glass-card rounded-3xl">
        <h3 className="text-xl font-bold font-display text-white mb-2">Item Not Found</h3>
        <p className="text-xs text-slate-400 mb-6">
          The gear you are looking for may have been paused, removed, or has an invalid URL.
        </p>
        <Link to="/explore">
          <Button variant="primary" size="md">Browse Other Items</Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(item._id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <SEO
        title={`${item.title} for Rent in ${item.location}`}
        description={`Rent ${item.title} for ${formatINR(item.pricePerDay)}/day in ${item.location}. Verified lender, instant availability on LendKart.`}
      />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-[#788880] dark:text-[#7D9B8E]">
        <Link to="/" className="hover:text-[#176B52] dark:hover:text-[#F8F6F0] transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#B8C2BC] dark:text-[#3B5449]" />
        <Link to="/explore" className="hover:text-[#176B52] dark:hover:text-[#F8F6F0] transition-colors">Explore</Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#B8C2BC] dark:text-[#3B5449]" />
        <Link to={`/explore?category=${item.category?.slug}`} className="hover:text-[#176B52] dark:hover:text-[#F8F6F0] transition-colors">
          {item.category?.name || 'Category'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#B8C2BC] dark:text-[#3B5449]" />
        <span className="text-[#17201D] dark:text-[#F8F6F0] font-medium truncate max-w-xs">{item.title}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery & Specs */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white dark:bg-[#111E1A] border border-[#E6E1D5] dark:border-white/10 shadow-soft-md">
            <img
              src={item.images?.[activeImageIndex] || item.images?.[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            {/* Status Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 dark:bg-[#0A1310]/90 backdrop-blur-md border border-emerald-500/30 text-xs font-extrabold text-emerald-800 dark:text-emerald-300 shadow-soft-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              Verified & Ready to Rent
            </div>
            {/* Condition Badge */}
            <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full bg-brand-primary/20 dark:bg-brand-primary/30 backdrop-blur-md border border-brand-primary/30 text-xs font-extrabold text-brand-primary dark:text-brand-secondary">
              {item.condition} Condition
            </div>
          </div>

          {/* Image Thumbnails */}
          {item.images?.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-16 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImageIndex === idx
                      ? 'border-brand-primary scale-105 shadow-forest-glow'
                      : 'border-[#E6E1D5] dark:border-white/10 opacity-70 hover:opacity-100 hover:scale-102'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description & Specifications */}
          <div className="bg-white/90 dark:bg-[#111E1A]/90 p-6 sm:p-8 rounded-3xl border border-[#E6E1D5] dark:border-white/10 shadow-soft-md backdrop-blur-md space-y-6">
            <div>
              <h3 className="text-lg font-extrabold font-display text-slate-900 dark:text-[#F8F6F0] mb-2.5">About this Equipment</h3>
              <p className="text-sm text-[#52635B] dark:text-[#A8C8B5] leading-relaxed whitespace-pre-line font-normal">
                {item.description}
              </p>
            </div>

            {/* Specifications */}
            {item.specifications && item.specifications.length > 0 && (
              <div className="pt-5 border-t border-[#E6E1D5] dark:border-white/10">
                <h4 className="text-sm font-extrabold font-display text-slate-900 dark:text-[#F8F6F0] mb-3.5">Technical Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {item.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/5">
                      <span className="text-[#82938B] dark:text-[#7D9B8E] font-medium">{spec.key}</span>
                      <span className="font-bold text-slate-900 dark:text-[#F8F6F0]">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Rules */}
            {item.rentalRules && item.rentalRules.length > 0 && (
              <div className="pt-5 border-t border-[#E6E1D5] dark:border-white/10">
                <h4 className="text-sm font-extrabold font-display text-slate-900 dark:text-[#F8F6F0] mb-3.5">Lender's Guidelines</h4>
                <ul className="space-y-2 text-xs text-[#52635B] dark:text-[#A8C8B5]">
                  {item.rentalRules.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary dark:text-brand-secondary shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Booking Summary & Owner Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/90 dark:bg-[#111E1A]/90 p-6 sm:p-8 rounded-3xl border border-[#E6E1D5] dark:border-white/10 shadow-soft-md backdrop-blur-md space-y-6 sticky top-24">
            <div>
              <div className="flex items-center justify-between text-xs text-[#82938B] dark:text-[#7D9B8E] mb-2.5">
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/10 font-bold text-brand-primary dark:text-brand-secondary">
                  {item.category?.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-[#0A1310] hover:bg-slate-200 text-slate-700 dark:text-[#A8C8B5] transition-colors cursor-pointer"
                    title="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                      wishlisted
                        ? 'bg-[#C96F52]/15 text-[#C96F52] border border-[#C96F52]/30'
                        : 'bg-slate-100 dark:bg-[#0A1310] text-slate-700 dark:text-[#A8C8B5] hover:text-[#C96F52]'
                    }`}
                    title={wishlisted ? 'Saved' : 'Save'}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {copiedLink && (
                <div className="text-[11px] text-emerald-700 dark:text-emerald-300 font-bold mb-1">
                  ✓ Link copied to clipboard!
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 dark:text-[#F8F6F0] leading-tight">
                {item.title}
              </h1>

              {/* Rating & Location */}
              <div className="flex items-center gap-4 mt-3 text-xs text-[#52635B] dark:text-[#A8C8B5]">
                <div className="flex items-center gap-1.5 font-bold">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-slate-900 dark:text-[#F8F6F0]">{item.rating?.toFixed(1) || '4.8'}</span>
                  <span className="text-[#82938B] dark:text-[#7D9B8E]">({reviews.length} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary dark:text-brand-secondary" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-[#F4F1EA] dark:from-[#0A1310] dark:to-[#121E1A] border border-[#E6E1D5] dark:border-white/10 flex items-baseline justify-between shadow-xs">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-[#82938B] dark:text-[#7D9B8E] font-extrabold">
                  Daily Rental Rate
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold font-display text-brand-primary dark:text-brand-secondary">
                    {formatINR(item.pricePerDay)}
                  </span>
                  <span className="text-xs text-[#82938B] dark:text-[#7D9B8E]">/ day</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-[#82938B] dark:text-[#7D9B8E] font-extrabold">
                  Security Deposit
                </div>
                <div className="text-sm font-bold text-slate-900 dark:text-[#F8F6F0] mt-0.5">
                  {formatINR(item.securityDeposit)}
                </div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">100% Refundable</div>
              </div>
            </div>

            {/* Owner Profile Card */}
            {item.owner && (
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0A1310] border border-[#E6E1D5] dark:border-white/10 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.owner.avatar}
                    alt={item.owner.name}
                    className="w-12 h-12 rounded-2xl object-cover border-2 border-brand-primary/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-[#F8F6F0]">{item.owner.name}</h4>
                      {item.owner.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-brand-primary dark:text-brand-secondary" title="Verified Super Lender" />
                      )}
                    </div>
                    <p className="text-xs text-[#52635B] dark:text-[#A8C8B5] flex items-center gap-1 mt-0.5 font-medium">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{item.owner.rating || 4.9} Lender Rating</span>
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-brand-primary/10 text-brand-primary dark:text-brand-secondary border border-brand-primary/20">
                  SuperLender
                </span>
              </div>
            )}

            {/* Rental CTA Button */}
            <div className="space-y-3 pt-2">
              <Button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate('/login?redirect=' + encodeURIComponent(window.location.pathname));
                  } else {
                    setIsModalOpen(true);
                  }
                }}
                variant="accent"
                size="lg"
                className="w-full text-base font-extrabold shadow-terracotta-glow hover:scale-[1.02] transition-transform duration-200 cursor-pointer"
              >
                <span>Request This Rental</span>
              </Button>
              <div className="text-center text-[11px] font-medium text-[#82938B] dark:text-[#7D9B8E]">
                🔒 Zero payment until the lender confirms availability.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-step Rental Request Modal */}
      <RentalRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
        bookedRanges={bookedRanges}
        onSuccess={() => {
          rentalService.getBookedDates(id).then(setBookedRanges);
        }}
      />

      {/* Reviews Section */}
      <div className="pt-8 border-t border-[#E7E2D6] dark:border-[#1E332B] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Community Reviews</h3>
            <p className="text-xs text-[#788880] dark:text-[#7D9B8E] mt-0.5">
              Verified feedback from members who rented this item
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#17201D] dark:text-[#F8F6F0] font-display">
              {item.rating?.toFixed(1) || '4.8'}
            </span>
            <div>
              <RatingStars rating={item.rating || 4.8} size="sm" />
              <span className="text-[11px] text-[#788880] dark:text-[#7D9B8E]">{reviews.length} reviews</span>
            </div>
          </div>
        </div>

        {/* Submit Review Form (if authenticated) */}
        {isAuthenticated && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-5 rounded-2xl bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] space-y-3 shadow-soft-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C6E66] dark:text-[#A8C8B5]">
                Leave a Verified Review
              </span>
              <RatingStars
                rating={newRating}
                size="md"
                interactive
                onRatingChange={setNewRating}
              />
            </div>
            <textarea
              rows={2}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="How was the equipment condition and lender communication?"
              className="w-full p-3 rounded-xl bg-[#F8F6F0] dark:bg-[#0E1714] border border-[#E7E2D6] dark:border-[#1E332B] text-xs sm:text-sm text-[#17201D] dark:text-[#F8F6F0] placeholder-[#788880] dark:placeholder-[#7D9B8E] focus:outline-none focus:border-[#176B52] resize-none"
            />
            {reviewError && (
              <div className="text-xs text-rose-700 dark:text-rose-300">{reviewError}</div>
            )}
            <div className="flex justify-end">
              <Button
                type="submit"
                isLoading={submittingReview}
                variant="primary"
                size="sm"
              >
                Post Review
              </Button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#788880] dark:text-[#7D9B8E] col-span-2 bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] rounded-2xl">
              No reviews written yet. Be the first to rent and review this item!
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="p-5 rounded-2xl bg-white dark:bg-[#14211D] border border-[#E7E2D6] dark:border-[#1E332B] space-y-3 shadow-soft-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.reviewer?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reviewer'}
                      alt={rev.reviewer?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-[#17201D] dark:text-[#F8F6F0]">{rev.reviewer?.name}</div>
                      <div className="text-[10px] text-[#788880] dark:text-[#7D9B8E]">{formatDate(rev.createdAt)}</div>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} size="xs" />
                </div>
                <p className="text-xs text-[#5C6E66] dark:text-[#A8C8B5] leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Similar Items Carousel */}
      {similarItems.length > 0 && (
        <div className="pt-10 border-t border-[#E7E2D6] dark:border-[#1E332B] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display text-[#17201D] dark:text-[#F8F6F0]">Similar Gear in {item.category?.name}</h3>
            <Link to={`/explore?category=${item.category?.slug}`} className="text-xs font-semibold text-[#176B52] dark:text-[#8EAFA0] hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarItems.map((sim) => (
              <ItemCard key={sim._id} item={sim} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetailPage;
