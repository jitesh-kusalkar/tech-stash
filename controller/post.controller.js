module.exports = {
    getPostById: function (Post, req, res) {
        Post.getPostById(req.params.postId, function (err, post) {
            if (err)
                throw err;

            res.json(post);
        });
    },
    createPost: function (Post, req, res) {
        Post.createPost(req.body, function (e, post) {
            if (e)
                throw err;

            if (!post) {
                res.status(404).body('Something went wrong');
            }
        });
    },
    postToUser: function (User, req, res) {
        User.getUserById(req.params.userId, function (err, user) {
            if (err)
                throw err;

            if (!user) {
                res.status(404).send('User doesn\'t exist');
            }

            var newUser = new User(user);
            newUser.posts.unshift(req.body.postId.toString());
            newUser.save(function (error, updatedUser) {
                if (error)
                    throw error;

                if (!updatedUser) {
                    return res.status(404).send('Unable to post');
                }

                res.json({ message: 'Posted successfully' });
            });
        });
    },
    postToGroup: function (Group, req, res) {
        Group.getGroupById(req.params.groupId, function (err, group) {
            if (err)
                throw err;

            if (!group) {
                res.status(404).send('Group doesn\'t exist');
            }

            var newGroup = new Group(group);
            newGroup.posts.unshift(req.body.postId.toString());
            newGroup.save(function (error, updatedGroup) {
                if (error)
                    throw error;

                if (!updatedGroup) {
                    return res.status(404).send('Unable to post');
                }
            });
        });
    },
    postComment: function (Post, req, res) {
        Post.getPostById(req.body.postId, function (e, post) {
            if (e)
                throw e;

            var newPost = new Post(post);
            newPost.comments.push(req.body);
            newPost.save(function (err, updatedPost) {
                if (err)
                    throw err;

                res.json({ message: 'Comment posted successfully' });
            });
        });
    }
}