import express from 'express';
import {
  getItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getFeaturedItems,
  getSimilarItems,
  getCategories
} from '../controllers/itemController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getItems);
router.get('/featured', getFeaturedItems);
router.get('/categories', getCategories);
router.get('/categories/all', getCategories);
router.get('/:id/similar', getSimilarItems);
router.get('/:id', getItemById);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

export default router;
