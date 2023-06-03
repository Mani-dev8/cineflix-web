const mongoose = require('mongoose');
const connectionURl = process.env.CONNECTION_URL;
const mongoDB =()=> mongoose.connect(connectionURl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });

module.exports = mongoDB;
