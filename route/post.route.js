module.exports = function (Post, Group, User, express, bodyParser, auth) {
    var postRouter = express();

    postRouter.use(bodyParser.json());
    postRouter.use(bodyParser.urlencoded({ extended: true }));

    // Controller import
    var postController = require('../controller/post.controller');

    // Get post by id
    postRouter.get('/:postId', auth, authErrHandler, function (req, res) {
        postController.getPostById(Post, req, res);
    });

    // Create post
    postRouter.post('/', auth, authErrHandler, function (req, res) {
        postController.createPost(Post, req, res);
    });

    // Post to user
    postRouter.post('/user/:userId', auth, authErrHandler, function (req, res) {
        postController.postToUser(User, req, res);
    });

    // Post to group
    postRouter.post('/group/:groupId', auth, authErrHandler, function (req, res) {
        postController.postToGroup(Group, req, res);
    });

    // Comment to post
    postRouter.post('/comment', auth, authErrHandler, function (req, res) {
        postController.postComment(Post, req, res);
    });

    function authErrHandler(err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401);
            res.json({ message: err.name + ": " + err.message });
        }
    }

    return postRouter;
}