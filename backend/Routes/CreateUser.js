// CreateUser.js
const express = require('express')
const router = express.Router()
const User = require('../models/User.js')
const { body, validationResult } = require('express-validator');

// const jwt  = require("jsonwebtoken");
// Password Encryption related coded in not added in login & signup component. Reference : Lecture 8
// const jwtSecret = "MynameisEndtoEndYoutubeChannel$#";

const bcrypt = require("bcryptjs");


router.post("/createuser", 
  [body('email','Invalid MailId').isEmail(),  // username must be an email
    body('name','Minimun length of name is 5').isLength({ min: 5 }),
  body('password','Incorrect Password').isLength({ min: 5 })], // password must be at least 5 chars long
     async (req,res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

        // const salt = await bcrypt.genSalt(10);
        // let secPassword = await bcrypt.hash(req.body.password , salt);

    try {
        let user = new User({
            name : req.body.name,
            password : req.body.password,
            email : req.body.email,
            location : req.body.location
        })
        let result=await user.save(user);
        return res.json({user:result,sucess: true});
    } catch (error) {
        console.log(error)
        res.json({sucess:false});
    }

})

router.post("/loginuser", [body('email','Invalid MailId').isEmail(),  // username must be an email
  body('password','Incorrect Password').isLength({ min: 5 })], 
  async (req,res) =>{
    const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }

         
    let email = req.body.email ;
      try {
           let userData =  await User.findOne({email});
            if(!userData){
                return res.status(400).json({ errors: "Try login with correct credentials" });
            }

            if(req.body.password !== userData.password){
                return res.status(400).json({ errors: "Try login with correct credentials" });
            }

            return res.json({ success : true });

    } catch (error) {
        console.log(error)
        res.json({sucess:false});
    }
 })



module.exports = router;