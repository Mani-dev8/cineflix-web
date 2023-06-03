const express = require('express');
const crypto = require('crypto')
const router = express.Router();
const UserGoogle = require('../models/userGoogleModel');
const EmailUser = require('../models/userEmailModel');
const Order = require('../models/orderModel')
// const{body,validationResult}=require('express-validator')
const Razorpay = require('razorpay');
const KEY_ID = "rzp_test_A0kVgihb52ODEI";
const SECRET_KEY = "dR98DdQAanNqQUACqwPNfnM7";
router.use(express.json());
router.post('/order/order-create', async (req, res) => {
    const amount = parseInt(req.body.amount) * 100;
    console.log(`req.body----${new Date()}`, amount);
    // console.log(validationResult(req));
    var instance = new Razorpay({
        key_id: KEY_ID,
        key_secret: SECRET_KEY,
    })
    var options = {
        amount: amount,
        currency: "INR",
        receipt: "order_rcptid_11"
    }
    try {
        const order = await instance.orders.create(options)
        res.json(order)
    }
    catch (error) {
        console.log(error);
    }
})
router.post('/order/verify', async (req, res) => {
    try {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body.razorpay
        const { type } = req.body.orderData;
        console.log("🚀 ~ file: orderRoute.js:37 ~ router.post ~ req.body.orderData   ~~~  :", req.body.orderData)
        console.log("🚀 ~ file: orderRoute.js:37 ~ router.post ~ type   ~~~  :", type)
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", SECRET_KEY)
            .update(sign.toString())
            .digest("hex");
        console.log(typeof expectedSign);
        console.log('razorpay_signature==== ', typeof razorpay_signature)
        if (razorpay_signature === expectedSign) {
            const { userName } = req.body.orderData;
            console.log("🚀 ~ file: orderRoute.js:48 ~ router.post ~ userName   ~~~  :", userName)
            const { subscriptionType } = req.body.orderData;
            console.log("🚀 ~ file: orderRoute.js:50 ~ router.post ~ subscriptionType   ~~~  :", subscriptionType)
            await Order.create({ userName: userName, subscriptionType: subscriptionType, userType: type })
            if (type === 'email user') {
                const { password } = req.body.orderData
                console.log("🚀 ~ file: orderRoute.js:54 ~ router.post ~ password   ~~~  :", password)
                const response = await EmailUser.findOneAndUpdate({ userName: userName, password: password }, { isSubscribe: true }).then(res.status(200).json({
                    "success": true,
                    "message": "Payment Verified Successfully"
                }))
                console.log('response', response)
            }
            if (type === 'gmail user') {
                const { userId } = req.body
                await UserGoogle.findOneAndUpdate({ userName: userName, googleId: userId }, { isSubscribe: true }).then(res.status(200).json({
                    "success": true,
                    "message": "Payment Verified Successfully"
                }));

            }
        }
        else {
            res.status(400).json({
                "success": false,
                "message": "Invalid Signature sent!"
            })
        }
    } catch (error) {
        res.status(404).json({ message: "internal server error" })
    }
})
router.post('/order-data', async (req, res) => {
    try {
        //    console.log('accountEmail:req.body.accountEmail===', req.body.accountEmail)
        const orders = await Order.find({ accountEmail: req.body.accountEmail });
        if (orders) {
            res.json(orders)
        }
    } catch (error) {
        res.status(400).json({ message: error })
    }
})
module.exports = router;