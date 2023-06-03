
// const messagebird = require('messagebird')('api key');
// //messagebird key- gFtOh1D5bZEfwHa5XyAtKPXDZ7p6vaMCEe92
// const nodemailer = require('nodemailer');
// const { Vonage } = require('@vonage/server-sdk')
// const vonage = new Vonage({
//     apiKey: "f2e0aeee",
//     apiSecret: "32eY2vgP1fjYNQsc"
// })


const newSmsSend = async (req, res) => {
    // try {
    //     // const { phone, number } = req.body;
    //     // const from = "+918169363402"
    //     // const to = `+91${phone}`
    //     // const text = `Your 6 digit OTP verification number is ${number}`

    //     // await vonage.sms.send({ to, from, text })
    //     //     .then(resp => { res.status(200).json({ message: 'Message sent successfully' }); console.log(resp); })
    //     //     .catch(err => { console.log('There was an error sending the messages.'); console.error(err); }); 

    //     var nodemailer = require('nodemailer');

    //     const transporter = nodemailer.createTransport({
    //         host: 'smtp.ethereal.email',
    //         port: 587,
    //         auth: {
    //             user: 'mackenzie.carter77@ethereal.email',
    //             pass: 'kETT4wpXQyhYGTfFmB'
    //         }
    //     });

    //     var mailOptions = {
    //         from: 'mackenzie.carter77@ethereal.email',
    //         to: 'manishsewamahto090802@gmail.com',
    //         subject: 'Sending Email using Node.js',
    //         text: 'That was easy!'
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log('Email sent: ' + info.response);
    //             res.status(200).json({message:"sent successfully"})
    //         }
    //     });
    // } catch (error) {
    //     console.log('error while send sms', error)
    //     res.status(500).json({ message: "Error in sending   email" })
    // }














    const nodemailer = require("nodemailer");

    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            // port: 587,
            // secure: false, // true for 465, false for other ports
            auth: {
                user: 'manishsewamahto090802@gmail.com',
                pass: 'zqoyysujiqheggel'// generated ethereal password
            },
        });
        const { email, number, userName } = req.body;
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'manishsewamahto090802@gmail.com',
            to: `${email}`,
            subject: 'Email verification.',
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
`
        }).then(res.status(200).json({ message: "email send successfully" })).catch(error => res.status(400).json({ message: error }));

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);

}
module.exports = {
    newSmsSend
}

