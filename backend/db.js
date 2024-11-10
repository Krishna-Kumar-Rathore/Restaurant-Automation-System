// db.js
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/GoFoodMern'; // Connection URI
const User = require('./models/User.js')

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB (Mongoose) database connected successfully to gofoodmern");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

const fetchfoodCategory = async () => {
    try {
        const db = mongoose.connection.useDb("GoFoodMern");  // Specify GoFoodItems Database
        const fetched_dataFC = db.collection("foodcategories");
        console.log();
        console.log();
        console.log("Displaying all Food Category : ");

        // Fetch all documents in food_items collection
        const dataFC = await fetched_dataFC.find({}).toArray();

        if (dataFC.length === 0) {
            console.log("The collection 'food_items' is empty.");
        } else {
            global.foodcategories = dataFC; // code chnges done from here
            console.log("Fetched food category:", global.foodcategories); // code chnges done from here
            // console.log("Fetched Food category Data:", dataFC);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
 };

 const fetchFoodItems = async () => {
    try {
        const db = mongoose.connection.useDb("GoFoodMern");  // Specify GoFoodItem database
        const fetched_data = db.collection("fooditems");
        console.log();
        console.log();
        console.log("Displaying all Food Items : ");
        
        // Fetch all documents in food_items collection
        const data = await fetched_data.find({}).toArray();

        if (data.length === 0) {
            console.log("The collection 'food_items' is empty.");
        } else {
            global.fooditems = data;
            console.log("Fetched Data:", global.fooditems);
            // console.log("Fetched Data:", data);
        }
        
    } catch (error) {
        console.error("Error fetching data:", error);
    }
 
};

connectToMongo().then(async () => {
    await fetchfoodCategory();
    await fetchFoodItems();
});

//  connectToMongo().then(() => fetchfoodCategory ());

module.exports = connectToMongo;




// delete all the commented code in order to avoid confusion