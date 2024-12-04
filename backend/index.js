// index.js
const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
const connectToMongo = require('./db'); // mongoDB got replaced with connectToMongo
// const mongoose = require('mongoose');
app.use(cors());
app.get('/',(req , res) => {
    res.send(`
        <p>'Hello world'</p>
        <p>Dont Giveup! I can complete the RAS project. I will try my best to learn as much as i can.</p>
        <p>Backend localhost is running sucessfullyj    </>
    `);
    // res.send('Dont Giveup! I can complete the RAS project. I will try my best & learn as much as i can.');
}) 

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData")); 

app.use('/api', require("./Routes/DisplayOrderData")); // Error is coming from this statement   : small letter 'o' in in Cart.js at line 28

app.use('/api', require("./Routes/AddFoodItem"));
app.use('/api', require("./Routes/AddFoodCategory"));

app.listen(port,() =>{
    console.log(`Example app listening on port ${port}`);
    console.log('Dont Giveup! I will complete the RAS project very soon');
})


