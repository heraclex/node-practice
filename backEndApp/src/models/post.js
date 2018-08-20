const mongoose = require('mongoose')

const Post = mongoose.model('post', {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    title: String,
    content: String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }]
})

module.exports = Post