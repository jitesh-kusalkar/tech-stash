module.exports = {
    getUserActivity: function (UserActivity, req, res) {
        console.log('reached');
        UserActivity.getUserActivity(function (err, userActivity) {
            if (err)
                throw err;

            res.json(userActivity);
        });
    },

    getUserActivityById: function (UserActivity, req, res) {
        UserActivity.getUserActivityById(req.params.userId, function (err, userActivity) {
            if (err)
                throw err;

            res.json(userActivity);
        });
    },

    addUserActivity: function (UserActivity, req, res) {
        UserActivity.addUserActivity(req.body, function (err, userActivity) {
            if (err)
                throw err;

            res.send('Activity added');
        });
    }
}