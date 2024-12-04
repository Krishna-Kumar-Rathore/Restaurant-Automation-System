const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            // console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }
    

});




// Route to get all orders
router.get('/getAllOrders', async (req, res) => {
    try {
        const allOrders = await Order.find(); // Fetch all orders from the database
        res.json(allOrders);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error", error.message);
    }
});

// code changes from here 

router.post('/myorderData', async (req, res) => {
    try{
        let myData = await Orders.findOne({'email' : req.body.email})
        res.json({orderData:myData})
    } catch(error) {
        res.send("Server Error" , error.message)
    }
})


    // code changes from here 



module.exports = router

// module.exports = router;