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
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to="/explore" className="hover:text-white transition-colors">Explore</Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <Link to={`/explore?category=${item.category?.slug}`} className="hover:text-white transition-colors">
          {item.category?.name || 'Category'}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-slate-200 truncate max-w-xs">{item.title}</span>
      </div>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl bg-slate-900">
            <img
              src={item.images?.[activeImageIndex] || item.images?.[0]}
              alt={item.title}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Status Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-xs font-semibold text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Verified & Ready
            </div>
            {/* Condition Badge */}
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-brand-primary/20 backdrop-blur-md border border-brand-primary/40 text-xs font-semibold text-brand-primary">
              {item.condition}
            </div>
          </div>

          {/* Image Thumbnails */}
          {item.images?.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {item.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-brand-primary scale-105 shadow-neon-glow'
                      : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description & Specifications */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <h3 className="text-lg font-bold font-display text-white mb-2">About this Item</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Specifications */}
            {item.specifications && item.specifications.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-bold font-display text-white mb-3">Item Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {item.specifications.map((spec, i) => (
                    <div key={i} className="flex justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                      <span className="text-slate-400">{spec.key}</span>
                      <span className="font-semibold text-white">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rental Rules */}
            {item.rentalRules && item.rentalRules.length > 0 && (
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-bold font-display text-white mb-3">Lender's Rental Rules</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {item.rentalRules.map((rule, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-secondary shrink-0" />
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
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6 relative overflow-hidden">
            {/* Ambient subtle glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-brand-primary/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 font-semibold text-slate-300">
                  {item.category?.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    title="Share listing"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(item)}
                    className={`p-2 rounded-xl transition-colors ${
                      wishlisted
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                        : 'bg-white/5 text-slate-300 hover:text-white'
                    }`}
                    title={wishlisted ? 'Saved' : 'Save'}
                  >
                    <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {copiedLink && (
                <div className="text-[11px] text-emerald-400 font-medium mb-1">
                  ✓ Link copied to clipboard!
                </div>
              )}

              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-tight">
                {item.title}
              </h1>

              {/* Rating & Location */}
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{item.rating?.toFixed(1) || '4.8'}</span>
                  <span className="text-slate-500">({reviews.length} reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-secondary" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Daily Rental Rate
                </div>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-3xl font-extrabold font-display text-white">
                    {formatINR(item.pricePerDay)}
                  </span>
                  <span className="text-xs text-slate-400">/ day</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  Security Deposit
                </div>
                <div className="text-sm font-semibold text-brand-secondary mt-0.5">
                  {formatINR(item.securityDeposit)}
                </div>
                <div className="text-[10px] text-emerald-400">100% Refundable</div>
              </div>
            </div>

            {/* Owner Profile Card */}
            {item.owner && (
              <div className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.owner.avatar}
                    alt={item.owner.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-white/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-white">{item.owner.name}</h4>
                      {item.owner.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Super Lender" />
                      )}
                    </div>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{item.owner.rating || 4.9} Lender Rating</span>
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
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
                className="w-full text-base font-bold shadow-neon-glow"
              >
                <span>Request This Rental</span>
              </Button>
              <div className="text-center text-[11px] text-slate-400">
                You won't be charged until the lender accepts your dates.
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
          // Refresh booked ranges
          rentalService.getBookedDates(id).then(setBookedRanges);
        }}
      />

      {/* Reviews Section */}
      <div className="pt-8 border-t border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold font-display text-white">Community Reviews</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Verified feedback from members who rented this item
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-white font-display">
              {item.rating?.toFixed(1) || '4.8'}
            </span>
            <div>
              <RatingStars rating={item.rating || 4.8} size="sm" />
              <span className="text-[11px] text-slate-400">{reviews.length} reviews</span>
            </div>
          </div>
        </div>

        {/* Submit Review Form (if authenticated) */}
        {isAuthenticated && (
          <form
            onSubmit={handleReviewSubmit}
            className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
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
              className="w-full p-3 rounded-xl bg-slate-900/60 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-primary resize-none"
            />
            {reviewError && (
              <div className="text-xs text-rose-400">{reviewError}</div>
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
            <div className="p-8 text-center text-xs text-slate-400 col-span-2 glass-card rounded-2xl">
              No reviews written yet. Be the first to rent and review this item!
            </div>
          ) : (
            reviews.map((rev) => (
              <div key={rev._id} className="p-5 rounded-2xl glass-card border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={rev.reviewer?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Reviewer'}
                      alt={rev.reviewer?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-xs font-bold text-white">{rev.reviewer?.name}</div>
                      <div className="text-[10px] text-slate-500">{formatDate(rev.createdAt)}</div>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} size="xs" />
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{rev.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Similar Items Carousel */}
      {similarItems.length > 0 && (
        <div className="pt-10 border-t border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-display text-white">Similar Gear in {item.category?.name}</h3>
            <Link to={`/explore?category=${item.category?.slug}`} className="text-xs font-semibold text-brand-primary hover:text-brand-secondary">
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
