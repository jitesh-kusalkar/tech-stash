'use strict';
var express = require('express');
var app = express();
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var jwt = require('express-jwt');

const APP_PORT = 3000;

// Model export
var User = require('./models/user');
//var UserActivity = require('./models/user-activity');
var Group = require('./models/group');
var Post = require('./models/post');

// Initializing auth token
var auth = jwt({
    secret: 'VERA_VERTO', // Move this to env file
    userProperty: 'payload'
});

// Routes
var userRouter = require('./route/user.route')(User, express, bodyParser, auth);
//var userActivityRouter = require('./route/user-activity.route')(UserActivity, express, bodyParser);
var postRouter = require('./route/post.route')(Post, Group, User, express, bodyParser, auth);
var groupRouter = require('./route/group.route')(Group, express, bodyParser, auth);

// Connect to Mongoose
mongoose.connect('mongodb://localhost/techstash');
var db = mongoose.connection;

app.use(cors()); 
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ message: err.name + ": " + err.message });
    }
});

// All APIs goes below

// GET
app.use('/api/user', userRouter);
//app.use('/api/user/activity', userActivityRouter);
app.use('/api/post', postRouter);
app.use('/api/group', groupRouter);

// End

app.listen(APP_PORT);
console.log('App listening @ ', APP_PORT);