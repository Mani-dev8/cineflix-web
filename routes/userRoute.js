const express = require('express');
const router = express.Router();
const { newUser, newEmailUser, getEmailUser, getUserSubscription, setSubscription } = require('../controllers/userControllers')
router.post('/user/new', newUser);
router.post('/user/new/email', newEmailUser);
router.post('/user/signin/email', getEmailUser);
router.post('/user/subscription', getUserSubscription);
router.post('/user/subscription/new', setSubscription);
module.exports = router