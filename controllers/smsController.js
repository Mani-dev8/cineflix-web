
// const messagebird = require('messagebird')('api key');
// //messagebird key- gFtOh1D5bZEfwHa5XyAtKPXDZ7p6vaMCEe92
// const nodemailer = require('nodemailer');
// const { Vonage } = require('@vonage/server-sdk')
// const vonage = new Vonage({
//     apiKey: "f2e0aeee",
//     apiSecret: "32eY2vgP1fjYNQsc"
// })

const nodemailer = require("nodemailer");

const newSmsSend = async (req, res) => {

  //===========================================
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: "manishsewamahto090802@gmail.com",
      pass: "zqoyysujiqheggel",
    },
  });

  await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });
  const { email, number, userName } = req.body;

  const mailData = {
    from: "manishsewamahto090802@gmail.com",
    to: email,
    subject: `CineFlix OTP verification`,
    html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Email</title>
  <style>
    /* CSS styles for the email template */
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      background-color: #000;
      color: #fff;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #000;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      background-color: #ff4d4d;
      color: #fff;
      padding: 20px;
      text-align: center;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }

    .content {
      padding: 20px;
      text-align: center;
    }

    .otp {
      font-size: 36px;
      color: #ff4d4d;
      font-weight:600;
      margin-bottom: 20px;
    }

    .footer {
      padding-top: 20px;
      padding-bottom:10px;
      text-align: center;
    }

    .footer p {
      margin: 0;
      color: #999;
    }
    
  </style>
  
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>OTP Verification</h1>
    </div>
    <div class="content">
      <p style='color:white'>Dear ${userName},</p>
      <p style='color:white'>Your One-Time Password (OTP) is:</p>
      <p class="otp" id="otpValue">${number}</p>
      <p style='color:white'>Please use this OTP to complete the verification process.</p>
    </div>
    <div class="footer">
      <p>© 2023 Cineflix. All rights reserved.</p>
    </div>
  </div>

  
</body>

</html>
`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
  res.status(200).json({ status: "OK" });


  //=============================================

}
module.exports = {
  newSmsSend
}

