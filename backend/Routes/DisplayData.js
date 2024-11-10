const express = require('express')
const router = express.Router()

router.post('/foodData', (req,res) =>{
    try {
        // console.log([global.foodcategories,global.fooditems]);
        // console.log(global.foodcategories);
        // res.send((global.fooditems));
        res.send([global.fooditems,global.foodcategories]);
    } catch (error) {
        console.log(error.message);
        console.log("Server Error")
    }
})

module.exports = router;