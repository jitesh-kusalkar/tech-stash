var mongoose = require('mongoose');
var Activity = require('./activity');

var userActivitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    activity: {
        type: [Activity.schema],
        default: []
    }
});

var UserActivity = module.exports = mongoose.model('UserActivity', userActivitySchema, 'activity');

module.exports.getUserActivity = function (callback, limit) {
    UserActivity.find(callback).limit(limit);
}

module.exports.getUserActivityById = function (id, callback) {
    UserActivity.findOne({ userId: id }, callback);
}

module.exports.addUserActivity = function (activityPayload, callback) {
    UserActivity.create(activityPayload, callback);
}