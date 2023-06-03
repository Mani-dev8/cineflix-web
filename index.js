const express = require('express');
const bodyParser = require('body-parser');
const dotenv=require('dotenv')
const user=require('./routes/userRoute')
const sms=require('./routes/smsRoute')
const order=require('./routes/orderRoute')
dotenv.config({path:'./.env'})
const mongoDB=require('./config/db.js')
const app=express();
const port=5000;
mongoDB();
app.use(bodyParser.json());
app.use('/api/v1/',user);
app.use('/api/v1/',sms);
app.use('/api/v1/',order);
app.post('/demo',(req,res)=>{
    console.log("req is requested");
   const {mobile}= req.body
   console.log('mobile', mobile)
    res.send({message:'working'}).status(200);
})
app.get('/',(req,res)=>{
    res.send("success")
})
app.listen(port, () => console.log(`server is running on port ${port}`)); 
