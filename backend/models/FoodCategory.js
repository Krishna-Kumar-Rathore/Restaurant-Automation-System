const mongoose = require('mongoose');

// Define the Category schema
const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    }
});

// Create and export the model
module.exports = mongoose.model('FoodCategory', CategorySchema);
