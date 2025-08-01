const express = require('express');
const { body, validationResult } = require('express-validator');
const Food = require('../models/Food');
const Category = require('../models/Category');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// Get all foods with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { category, search, page = 1, limit = 12, isVegetarian } = req.query;
    
    let query = { isAvailable: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by vegetarian
    if (isVegetarian !== undefined) {
      query.isVegetarian = isVegetarian === 'true';
    }
    
    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const foods = await Food.find(query)
      .populate('category', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Food.countDocuments(query);

    res.json({
      foods,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get food by ID
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('category', 'name');
    
    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create food item (Admin only)
router.post('/', adminAuth, [
  body('name').trim().isLength({ min: 2 }).withMessage('Food name must be at least 2 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('image').isURL().withMessage('Image must be a valid URL'),
  body('category').isMongoId().withMessage('Valid category ID required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, image, category, ingredients, isVegetarian, preparationTime } = req.body;

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({ message: 'Category does not exist' });
    }

    const food = new Food({
      name,
      description,
      price,
      image,
      category,
      ingredients: ingredients || [],
      isVegetarian: isVegetarian !== undefined ? isVegetarian : true,
      preparationTime: preparationTime || 15
    });

    await food.save();
    await food.populate('category', 'name');

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update food item (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, price, image, category, ingredients, isVegetarian, isAvailable, preparationTime } = req.body;

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        image,
        category,
        ingredients,
        isVegetarian,
        isAvailable,
        preparationTime
      },
      { new: true }
    ).populate('category', 'name');

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete food item (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      { isAvailable: false },
      { new: true }
    );

    if (!food) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get foods by category
router.get('/category/:categoryId', async (req, res) => {
  try {
    const foods = await Food.find({ 
      category: req.params.categoryId,
      isAvailable: true 
    }).populate('category', 'name');

    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
