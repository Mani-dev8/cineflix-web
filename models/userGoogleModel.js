const mongoose = require('mongoose');
const userGoogleSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    isSubscribe: {
        type: Boolean,
        default: false
    }
})
module.exports = mongoose.model('UserGoogle', userGoogleSchema)

