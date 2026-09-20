import api from './api';

export const rentalService = {
  // Create rental request
  createRental: async (data) => {
    const res = await api.post('/rentals', data);
    return res.data;
  },

  // Get user's borrowed rentals
  getMyRentals: async (status = 'All') => {
    const res = await api.get('/rentals/my', { params: { status } });
    return res.data.rentals;
  },

  // Get owner's rental requests
  getOwnerRentals: async (status = 'All') => {
    const res = await api.get('/rentals/requests', { params: { status } });
    return res.data.rentals;
  },

  // Get booked date ranges for calendar
  getBookedDates: async (itemId) => {
    const res = await api.get(`/rentals/item/${itemId}/booked-dates`);
    return res.data.bookedRanges;
  },

  // Approve rental
  approveRental: async (id) => {
    const res = await api.put(`/rentals/${id}/approve`);
    return res.data;
  },

  // Reject rental
  rejectRental: async (id, reason) => {
    const res = await api.put(`/rentals/${id}/reject`, { reason });
    return res.data;
  },

  // Cancel rental
  cancelRental: async (id) => {
    const res = await api.put(`/rentals/${id}/cancel`);
    return res.data;
  },

  // Mark completed
  completeRental: async (id) => {
    const res = await api.put(`/rentals/${id}/complete`);
    return res.data;
  }
};
