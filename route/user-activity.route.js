module.exports = function (UserActivity, express, bodyParser) {
    var userActivityRouter = express();
    // Controller import
    var userActivityController = require('../controller/user-activity.controller');
    userActivityRouter.use(bodyParser.json());
    userActivityRouter.use(bodyParser.urlencoded({ extended: true }));

    userActivityRouter.get('/', function (req, res) {
        userActivityController.getUserActivity(UserActivity, req, res);
    });

    userActivityRouter.get('/:userId', function (req, res) {
        userActivityController.getUserActivityById(UserActivity, req, res);
    });

    userActivityRouter.post('/', function (req, res) {
        userActivityController.addUserActivity(UserActivity, req, res);
    });

    return userActivityRouter;
} 