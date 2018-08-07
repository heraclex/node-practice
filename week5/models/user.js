const mongoose = require('mongoose');

const User = mongoose.model('user', {
    username: {
        type: String,
        required: true
    },
    password: String
})

module.exports = User