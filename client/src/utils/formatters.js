// Currency Formatter in Indian Rupees (INR)
export const formatINR = (amount) => {
  if (amount === undefined || amount === null) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Date Formatter
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

// Relative Time (e.g. "2 hours ago", "Yesterday")
export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
};

// Status Badge Styling Helper
export const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'Approved':
    case 'Active':
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
    case 'Pending':
      return 'bg-amber-500/10 text-amber-400 border border-amber-500/30';
    case 'Completed':
      return 'bg-blue-500/10 text-blue-400 border border-blue-500/30';
    case 'Cancelled':
    case 'Rejected':
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/30';
    default:
      return 'bg-slate-500/10 text-slate-400 border border-slate-500/30';
  }
};
