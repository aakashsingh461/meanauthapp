const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database'); // db connection

// Connect To Database
mongoose.connect(config.database,{useNewUrlParser: true },function(err){
    if(!err){    
    console.log("MongoDb Database Connected Successfully !!!");}
    else{
    console.log("Error in DB Connection : "+JSON.stringify(err,undefined,2));}
});

const app = express();
//const port = 3000;    // use for localhost live developement environment
const port = process.env.PORT || 5000; // for app deployement to heroku

const users = require('./routes/users');

//adding middleware cors
//app.use(cors({ origin : 'http://localhost:4200'}));
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//define routes
app.use('/users', users);

//index route
app.get("/", function(req,res){
    res.send("Server is working fine !!! or Invalid Endpoint ");
});

//set path redirection for running on node server
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start server
app.listen(port , function(){
    console.log("Server stared at port : "+port);   
});