var mongoose = require('mongoose');

var ActivitySchema = new mongoose.Schema({
    groupname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    postDate: {
        type: Date,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    originalPost: {
        type: String,
        default: ''
    },
    like: {
        type: Number,
        default: 0
    },
    comment: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    }
});

var Activity = module.exports = mongoose.model('Activity', ActivitySchema);