import express from 'express';
import { getBlogs, getBlogBySlug, createBlog } from '../controllers/blogController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, adminOnly, createBlog);

export default router;
