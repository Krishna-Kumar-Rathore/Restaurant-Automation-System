const mongoose = require('mongoose');

// Define the FoodItemSchema
const FoodItemSchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        // required: true
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    options:[] ,
    description: {
        type: String,
        required: true
    }
});

// Create the model
module.exports = mongoose.model('FoodItem', FoodItemSchema);