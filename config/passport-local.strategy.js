var LocalStrategy = require('passport-local').Strategy;

module.exports = function (User) {
    return new LocalStrategy(
        function (username, password, done) {
            User.getUserByUsername(username, function (err, user) {
                if(err)
                    return done(err);

                if(!user) {
                    return done(null, false, {
                        message: 'User not found'
                    });
                }

                if(!User.checkPassword(password, user)) {
                    return done(null, false, {
                        message: 'Password is wrong'
                    });
                }

                return done(null, user);
            });
        }
    )
}