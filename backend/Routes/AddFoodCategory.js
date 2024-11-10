const express = require('express');
const router = express.Router();
const FoodCategory = require('../models/FoodCategory'); // Import the Category model

// Route to add a single food category
router.post('/foodcategory', async (req, res) => {
    try {
        // Create a new category from request data
        const category = new FoodCategory(req.body);
        await category.save();
        res.status(201).json({ message: 'Category added successfully', category });
    } catch (error) {
        res.status(400).json({ message: 'Error adding category', error });
    }
});

// Route to get all food categories
router.get('/foodcategories', async (req, res) => {
    try {
        const categories = await FoodCategory.find();
        res.status(200).json({ message: 'Categories retrieved successfully', categories });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving categories', error });
    }
});

module.exports = router;
