const express = require('express');
const { newSmsSend } = require('../controllers/smsController');
const router = express.Router();
router.post('/sms/new', newSmsSend)
module.exports = router