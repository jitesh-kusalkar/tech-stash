module.exports = function (Group, express, bodyParser, auth) {
    var groupRouter = express();

    groupRouter.use(bodyParser.json());
    groupRouter.use(bodyParser.urlencoded({ extended: true }));

    // Controller import
    var groupController = require('../controller/group.controller');

    // Get group by id
    groupRouter.get('/:groupId', auth, authErrHandler, function (req, res) {
        groupController.getGroupById(Group, req, res);
    });

    // Create group
    groupRouter.post('/create', auth, authErrHandler, function (req, res) {
        groupController.createGroup(Group, req, res);
    });

    function authErrHandler(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({ message: err.name + ": " + err.message });
        }
    }

    return groupRouter;
}