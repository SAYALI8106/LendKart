import Blog from '../models/Blog.js';

// @desc    Get all blog articles
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res, next) => {
  try {
    const { tag } = req.query;
    const query = {};
    if (tag && tag !== 'all') {
      query.tags = tag;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single blog article by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Article not found' });
    }

    // Increment view count asynchronously
    Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } }).exec();

    // Related blogs
    const related = await Blog.find({ _id: { $ne: blog._id } }).limit(3);

    res.status(200).json({
      success: true,
      blog,
      related
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create blog article
// @route   POST /api/blogs
// @access  Private (Admin)
export const createBlog = async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, tags, readTime } = req.body;
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const blog = await Blog.create({
      title,
      slug,
      excerpt,
      content,
      coverImage,
      tags: tags || ['Rental Guide'],
      readTime: readTime || '4 min read',
      author: {
        name: req.user.name,
        avatar: req.user.avatar,
        role: 'LendKart Admin'
      }
    });

    res.status(201).json({
      success: true,
      blog
    });
  } catch (error) {
    next(error);
  }
};
