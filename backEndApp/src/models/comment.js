const mongoose = require('mongoose')

const Comment = mongoose.model('comment', {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    content: String,
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }
})

module.exports = Comment;