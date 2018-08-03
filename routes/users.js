const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database'); // db connection

//User Register
router.post('/register',function(req ,res ,next ){
    
    let newUser = new User({
        name : req.body.name,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password
    });

    User.addUser(newUser , (err , resData) => {
        if(err){
            res.json({success : false , msg : 'Failed to Register New User !!! '});
        } else {
            res.json({success : true , msg : 'User Register Successfully !!!' })
        }        
    });
    //res.send('REGISTER');
});

//User Authenticate 
router.post('/authenticate', function(req, res ,next ){
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success : false, msg: 'User not found !!!'});
        }
        User.comparePassword(password , user.password, (err, isMatch)=>{
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn : 604800 // 1 wEEK                    
                });
                res.json({
                    success : true,
                    token : 'JWT '+token,
                    user : {
                        id : user._id,
                        name : user.name,
                        username : user.username,
                        email : user.email
                    }
                })
            }else{
                return res.json({success : false, msg: 'Wrong Password !!!'});
            }
        })
    });
    //res.send('AUTHENTICATE');
});

//User Profile 
router.get('/profile', passport.authenticate('jwt' ,{session:false}), function(req, res, next){
    //res.send('PROFILE');
    res.json({user: req.user});
});

module.exports = router;