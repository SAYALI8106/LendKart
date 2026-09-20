import api from './api';

export const itemService = {
  // Fetch items with query params
  getItems: async (params = {}) => {
    const res = await api.get('/items', { params });
    return res.data;
  },

  // Get featured items
  getFeaturedItems: async () => {
    const res = await api.get('/items/featured');
    return res.data.items;
  },

  // Get single item by ID
  getItemById: async (id) => {
    const res = await api.get(`/items/${id}`);
    return res.data.item;
  },

  // Get similar items
  getSimilarItems: async (id) => {
    const res = await api.get(`/items/${id}/similar`);
    return res.data.items;
  },

  // Get all categories
  getCategories: async () => {
    const res = await api.get('/items/categories/all');
    return res.data.categories;
  },

  // Create new item listing
  createItem: async (itemData) => {
    const res = await api.post('/items', itemData);
    return res.data;
  },

  // Update item
  updateItem: async (id, itemData) => {
    const res = await api.put(`/items/${id}`, itemData);
    return res.data;
  },

  // Delete item
  deleteItem: async (id) => {
    const res = await api.delete(`/items/${id}`);
    return res.data;
  }
};
