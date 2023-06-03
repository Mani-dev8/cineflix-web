const GoogleUser = require('../models/userGoogleModel');
const EmailUser = require('../models/userEmailModel');
const newUser = async (req, res) => {
    const { userName, email, googleId } = req.body;
    try {
        const isExistingUser = await GoogleUser.find({ googleId });
        if (isExistingUser.length > 0) {
            return res.status(409).json({ message: "User already exist" })
        }
        const newUser = new GoogleUser({
            userName,
            email,
            googleId,
        });
        const savedUser = await newUser.save();
        res.status(201).json({ message: "account created" });
    } catch (error) {
        console.error('Error creating user: ', error);
        res.status(500).json({ message: "Error creating user" })
    }
}
const newEmailUser = async (req, res) => {
    const { userName, password, email } = req.body;
    try {
        const isExistingUserName = await EmailUser.find({ userName });
        if (isExistingUserName.length > 0) {
            return res.send(409).json({ message: "username with this name already exist please try new username" })
        }
        const newUser = new EmailUser(
            {
                userName,
                password,
                email
            }
        )
        const saveUser = await newUser.save();
        res.status(201).json({ message: "account created !" })
    } catch (error) {
        console.log('error in creating user', error)
        res.status(500).json({ message: "Error in creating Phone user" })
    }
}
const getEmailUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExistingUser = await EmailUser.find({ email, password });
        console.log("🚀 ~ file: userControllers.js:47 ~ getEmailUser ~ isExistingUser   ~~~  :", isExistingUser)
        // console.log('isExistingUser.userName', isExistingUser[0]['userName'])
        if (isExistingUser.length > 0) {
            console.log("yes");
            return res.status(200).json({ message: "user authenticated", userName: isExistingUser[0].userName })
        }
        res.status(404).json({ message: "user with this credential does not exist" })
    } catch (error) {
        console.log('error in getEmailUser', error)
        res.status(500).json({ message: "Error in getting user" })

    }
}
const getUserSubscription = async (req, res) => {
    const { type } = req.body;
    try {
        console.log('type', type)
        if (type === 'email user') {
            const { email } = req.body
            const { password } = req.body
            const user = await EmailUser.findOne({ email, password })
            console.log('isSubsibe', user.isSubscribe)
            if (user.isSubscribe === true) {
                return res.status(200).json({ message: "user is subscribed" })
            }
        }
        if (type === 'gmail user') {
            const { userName } = req.body
            const { userId } = req.body
            const user = await GoogleUser.findOne({ userName, userId })
            console.log('isSubsibe', user.isSubscribe)
            if (user.isSubscribe === true) {
                return res.status(200).json({ message: "user is subscribed" })
            }
        }

        //  const isSubscribe = await GoogleUser.find({ userName });
        //  if (isSubscribe.length > 0) {
        //      return res.status(200).json({ message: "user is subsribed" })
        //  }
        res.status(404).json({ message: "user is not subscribed" })


    } catch (error) {
        console.log('error in subscription', error)
        res.status(500).json({ message: "Error in creating Phone user" })
    }
}
const setSubscription = async (req, res) => {
    const { type } = req.body;
    if (type === 'email user') {
        const { email } = req.body
        const { password } = req.body
        const user = await EmailUser.findOneAndUpdate({ email, password }, { isSubscribe: true })
        if (user.isSubscribe === true) {
            return res.status(200).json({ message: "user is subscribed" })
        }
    }
    if (type === 'gmail user') {

    }
}

module.exports = {
    newUser, newEmailUser, getEmailUser, getUserSubscription, setSubscription
}