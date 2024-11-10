const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem'); // Import the FoodItem model

// Route to insert a single food item
router.post('/fooditem', async (req, res) => {
    try {
        console.log('req.body :>> ', req.body);
        // let {CategoryName,name,img,description} = req.body;
        // const foodItem = new FoodItem({
        //     CategoryName: CategoryName,
        //     name: name,
        //     img: img,
        // });
        let item = new FoodItem({
            CategoryName : req.body.CategoryName,
            name : req.body.name,
            img : req.body.img,
            options: req.body.options,
            description: req.body.description
            // location : req.body.location
        })
      let result =  await item.save();
        res.status(201).json({ message: 'Food item added successfully', result });
    } catch (error) {
        console.log('error :>> ', error);
        res.status(400).json({ message: 'Error adding food item', error });
    }
});

// Route to insert multiple food items
router.post('/fooditems', async (req, res) => {
    try {
        const foodItems = await FoodItem.insertMany(req.body);
        res.status(201).json({ message: 'Food items added successfully', foodItems });
    } catch (error) {
        res.status(400).json({ message: 'Error adding food items', error });
    }
});

// Route to get all food items
router.get('/fooditems', async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json({ message: 'Food items retrieved successfully', foodItems });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving food items', error });
    }
});

module.exports = router;
