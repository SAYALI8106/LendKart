import mongoose from 'mongoose';
import Item from '../models/Item.js';
import Category from '../models/Category.js';

// @desc    Get all items with search, filters, sorting & pagination
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      location,
      condition,
      minRating,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = { status: 'available' };

    // Search query for title, description, or location
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search.trim(), $options: 'i' } },
        { description: { $regex: search.trim(), $options: 'i' } },
        { location: { $regex: search.trim(), $options: 'i' } }
      ];
    }

    // Category filter by ID or slug
    if (category && category !== 'all') {
      const catStr = String(category).trim();
      if (/^[0-9a-fA-F]{24}$/.test(catStr)) {
        query.category = catStr;
      } else {
        const cat = await Category.findOne({ slug: catStr.toLowerCase() });
        if (cat) query.category = cat._id;
      }
    }

    // Price range
    if (minPrice || maxPrice) {
      query.pricePerDay = {};
      if (minPrice) query.pricePerDay.$gte = Number(minPrice);
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice);
    }

    // Location filter
    if (location && location !== 'all') {
      query.location = { $regex: location.trim(), $options: 'i' };
    }

    // Condition filter
    if (condition && condition !== 'all') {
      query.condition = condition;
    }

    // Rating filter
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    // Owner filter
    if (req.query.owner) {
      query.owner = req.query.owner;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default newest
    if (sort === 'price_asc') sortOption = { pricePerDay: 1 };
    else if (sort === 'price_desc') sortOption = { pricePerDay: -1 };
    else if (sort === 'rating') sortOption = { rating: -1, numReviews: -1 };
    else if (sort === 'recommended') sortOption = { featured: -1, rating: -1 };

    // Pagination
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Item.countDocuments(query);
    const items = await Item.find(query)
      .populate('category', 'name slug icon')
      .populate('owner', 'name avatar location rating isVerified')
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: items.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured items for homepage
// @route   GET /api/items/featured
// @access  Public
export const getFeaturedItems = async (req, res, next) => {
  try {
    const items = await Item.find({ status: 'available' })
      .populate('category', 'name slug icon')
      .populate('owner', 'name avatar location rating isVerified')
      .sort({ rating: -1, featured: -1, createdAt: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      items
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single item details
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined' || id === 'null' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    const item = await Item.findById(id)
      .populate('category', 'name slug icon')
      .populate('owner', 'name email avatar phone location rating isVerified bio createdAt');

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Increment view count asynchronously
    Item.findByIdAndUpdate(id, { $inc: { views: 1 } }).catch(() => {});

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new item listing
// @route   POST /api/items
// @access  Private
export const createItem = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      images,
      pricePerDay,
      securityDeposit,
      condition,
      location,
      rentalRules,
      specifications
    } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ success: false, message: 'Item title is required' });
    }
    if (!description || !String(description).trim()) {
      return res.status(400).json({ success: false, message: 'Item description is required' });
    }

    let categoryDoc = null;
    const catStr = typeof category === 'object' && category?._id ? String(category._id) : String(category || '').trim();

    if (/^[0-9a-fA-F]{24}$/.test(catStr)) {
      categoryDoc = await Category.findById(catStr);
    }
    if (!categoryDoc && catStr) {
      categoryDoc = await Category.findOne({ slug: catStr.toLowerCase() });
    }
    if (!categoryDoc && catStr) {
      categoryDoc = await Category.findOne({ name: new RegExp(`^${catStr}$`, 'i') });
    }
    if (!categoryDoc) {
      categoryDoc = await Category.findOne().sort({ itemCount: -1 });
    }
    if (!categoryDoc) {
      categoryDoc = await Category.create({
        name: 'Photography & Film',
        slug: 'photography',
        icon: 'Camera',
        description: 'Cameras, lenses, lighting and studio gear'
      });
    }

    const safeLocation = (location && String(location).trim()) || (req.user && req.user.location) || 'Pune, Maharashtra';
    const safeImages = Array.isArray(images) && images.filter(Boolean).length > 0
      ? images.filter(Boolean)
      : ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80'];
    const safePrice = Math.max(10, Number(pricePerDay) || 10);
    const safeDeposit = Math.max(0, Number(securityDeposit) || 0);
    const validConditions = ['Like New', 'Excellent', 'Good', 'Fair'];
    const safeCondition = validConditions.includes(condition) ? condition : 'Excellent';

    const newItem = await Item.create({
      title: String(title).trim(),
      description: String(description).trim(),
      category: categoryDoc._id,
      categorySlug: categoryDoc.slug,
      images: safeImages,
      pricePerDay: safePrice,
      securityDeposit: safeDeposit,
      condition: safeCondition,
      location: safeLocation,
      owner: req.user._id,
      rentalRules: Array.isArray(rentalRules) && rentalRules.length > 0 ? rentalRules : [
        'Valid ID verification required upon pickup',
        'Return in original condition and packaging',
        'Late returns incur additional daily charges'
      ],
      specifications: Array.isArray(specifications) ? specifications : []
    });

    // Update category count
    Category.findByIdAndUpdate(categoryDoc._id, { $inc: { itemCount: 1 } }).catch(() => {});

    const populatedItem = await Item.findById(newItem._id)
      .populate('category', 'name slug icon')
      .populate('owner', 'name avatar location rating isVerified');

    res.status(201).json({
      success: true,
      message: 'Item listed successfully on LendKart!',
      item: populatedItem || newItem
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update item listing
// @route   PUT /api/items/:id
// @access  Private
export const updateItem = async (req, res, next) => {
  try {
    let item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    // Check ownership or admin
    if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this item' });
    }

    item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category', 'name slug icon');

    res.status(200).json({
      success: true,
      item
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete item listing
// @route   DELETE /api/items/:id
// @access  Private
export const deleteItem = async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }

    if (item.owner.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);
    await Category.findByIdAndUpdate(item.category, { $inc: { itemCount: -1 } });

    res.status(200).json({
      success: true,
      message: 'Item removed from marketplace'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get similar items
// @route   GET /api/items/:id/similar
// @access  Public
export const getSimilarItems = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id || id === 'undefined' || id === 'null' || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(200).json({ success: true, items: [] });
    }

    const item = await Item.findById(id);
    if (!item) {
      return res.status(200).json({ success: true, items: [] });
    }

    const similar = await Item.find({
      category: item.category,
      _id: { $ne: item._id },
      status: 'available'
    })
      .populate('category', 'name slug')
      .populate('owner', 'name avatar location rating')
      .limit(4);

    res.status(200).json({
      success: true,
      items: similar || []
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all categories
// @route   GET /api/items/categories/all
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ itemCount: -1, name: 1 });
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    next(error);
  }
};
