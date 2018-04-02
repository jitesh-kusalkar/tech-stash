module.exports = function (User, express, bodyParser, auth) {
    var passport = require('passport');
    var userRouter = express();

    userRouter.use(bodyParser.json());
    userRouter.use(bodyParser.urlencoded({ extended: true }));

    // Controller import
    var userController = require('../controller/user.controller');
    var passportLocal = require('../config/passport-local.strategy')(User);

    passport.use(passportLocal);

    userRouter.use(passport.initialize());

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    // Get all users
    userRouter.get('/all', auth, authErrHandler, function (req, res) {
        userController.getUser(User, req, res);
    });

    // Get users list by domain
    userRouter.get('/all/:domain', auth, authErrHandler, function (req, res) {
        userController.getUserByDomain(User, req, res);
    });

    // Delete a specific user
    userRouter.delete('/delete/:userId', auth, authErrHandler, function (req, res) {
        userController.deleteUser(User, req, res);
    });

    // Get user by id
    userRouter.get('/:userId', auth, authErrHandler, function (req, res) {
        userController.getUserById(User, req, res);
    });

    // Register new user
    userRouter.post('/register', function (req, res) {
        userController.registerUser(User, req, res);
    });

    // Login user
    userRouter.post('/login', passport.authenticate('local'), function (req, res) {
        // use req.user
        res.json({
            accessToken: User.generateJWT(req.user) // Generate JWT token instead of sending user directly
        });
        //userController.loginUser(User, req, res);
    });

    // To update user group list
    userRouter.put('/:userId/update/group', auth, authErrHandler, function (req, res) {
        userController.updateGroup(User, req, res);
    });

    function authErrHandler(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({ message: err.name + ": " + err.message });
        }
    }

    return userRouter;
}