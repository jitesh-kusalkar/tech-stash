module.exports = {
    getUser: function (User, req, res) {
        User.getUsers('', function (err, users) {
            if (err)
                throw err;

            res.json(users);
        });
    },

    getUserByDomain: function (User, req, res) {
        User.getUsers(req.params.domain, function (err, users) {
            if (err)
                throw err;

            res.json(users.map(function (user) {
                return {
                    id: user._id,
                    firstname: user.about.firstname,
                    lastname: user.about.lastname,
                    username: user.username,
                    emailId: user.about.emailId
                }
            }));
        });
    },

    getUserById: function (User, req, res) {
        User.getUserById(req.params.userId, function (err, user) {
            if (err)
                throw err;

            res.json(user);
        });
    },

    loginUser: function (User, req, res) {
        User.getUserByUsername(req.body.username, function (err, user) {
            if (err)
                throw err;

            res.json(user);
        });
    },

    registerUser: function (User, req, res) {
        User.setPassword(req.body);
        User.addUser(req.body, function (err, newUser) {
            if (err)
                throw err;

            res.json({ message: 'User Registered' });
        });
    },

    updateGroup: function (User, req, res) {
        User.getUserById(req.params.userId, function (err, user) {
            if (err)
                throw err;

            var groupSignature = req.body;
            var newUser = new User(user);
            newUser.groups.push(groupSignature);
            newUser.save(function (error, user) {
                if (error)
                    throw error;

                res.json({ message: 'User groups updated' });
            });
        });
    },

    deleteUser: function (User, req, res) {
        User.deleteUserById(req.params.userId, function (err, user) {
            if (err)
                throw err;

            res.json({ message: 'Deleted successfully' });
        });
    }
}