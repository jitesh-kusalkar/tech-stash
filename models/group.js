var mongoose = require('mongoose');

var member = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        default: 'member'
    }
});

var groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    posts: {
        type: [String],
        default: []
    },
    members: {
        type: [member],
        required: true
    }
});

var Group = module.exports = mongoose.model('Group', groupSchema, 'groups');

module.exports.getGroupById = function (id, callback) {
    Group.findById(id, callback);
}

module.exports.createGroup = function (group, callback) {
    Group.create(group, callback);
}