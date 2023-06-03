const mongoose = require('mongoose');
const userPhoneSchema = new mongoose.Schema({
    userName: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    phone: { type: Number, unique: true, require: true },
    isSubscibe:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model('PhoneUser', userPhoneSchema)