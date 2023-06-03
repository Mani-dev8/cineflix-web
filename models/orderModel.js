const mongoose = require('mongoose')
const orderScheme = new mongoose.Schema({
    orderDate: { type: Date, default: Date() },
    userName: {
        type: String, require: true
    },
    userType: {
        type: String,
        require: true
    },
    subscriptionType: {
        type: String, require: true
    }
})
const Order = mongoose.model('orders', orderScheme);
module.exports = Order;

