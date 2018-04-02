var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var personalInfoSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    emailId: {
        type: String,
        unique: true,
        required: true
    }
});

var GroupSignature = mongoose.Schema({
    id: String,
    name: String,
    role: {
        type: String,
        default: 'member'
    }
});

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    salt: String, // salt and hash are used to not save password in DB
    hash: String,
    about: {
        type: personalInfoSchema
    },
    createdDate: {
        type: Date,
        default: Date.now()
    },
    groups: {
        type: [GroupSignature],
        default: []
    },
    posts: {
        type: [String],
        default: []
    },
    followers: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    }
});

var User = module.exports = mongoose.model('User', userSchema, 'users');

module.exports.getUsers = function (domain, callback, limit) {
    if(domain) {
        User.find({$where : 'this.about.emailId.indexOf("' + domain + '") != -1'}, callback).limit(limit);
    } else {
        User.find(callback).limit(limit);
    }
}

module.exports.getUserById = function (id, callback) {
    User.findOne({ _id: id }, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    User.findOne({ username: username }, callback);
}

module.exports.addUser = function (user, callback) {
    User.create(user, callback);
}

module.exports.deleteUserById =  function (id, callback) {
    User.deleteOne({ _id: id }, callback);
}

module.exports.setPassword = function (user) {
    user.salt = crypto.randomBytes(16).toString('hex');
    user.hash = crypto.pbkdf2Sync(user.password, user.salt, 1000, 64, 'sha512').toString('hex');
}

module.exports.checkPassword = function (password, user) {
    return crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex') === user.hash;
}

module.exports.generateJWT = function (user) {
    /* var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7); */

    return jwt.sign({
        username: user.username,
        id: user._id,
        firstname: user.about.firstname,
        lastname: user.about.lastname
        /* exp: parseInt(expiry.getTime() / 1000) */
    }, 'VERA_VERTO'); // Move this to env file
}