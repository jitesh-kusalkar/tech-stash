var mongoose = require('mongoose');

var comment = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

var idAndName = mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

var postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true
    },
    comments: {
        type: [comment],
        default: []
    },
    user: {
        type: idAndName,
        required: true
    },
    group: {
        type: idAndName,
        required: true
    },
    like: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

var Post = module.exports = mongoose.model('Post', postSchema, 'posts');

module.exports.getPostById = function (id, callback) {
    Post.findById(id, callback);
}

module.exports.createPost = function (post, callback) {
    Post.create(post, callback);
}