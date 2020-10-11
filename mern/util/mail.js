const nodemailer = require('nodemailer');
const config = require('config');
const userName = config.get('email');
const password = config.get('emailPass');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: userName,
    pass: password
  }
});

const sendMail = (to, text) => {
    const mailOptions = {
        from: userName,
        to: to,
        subject: 'Sending Email using Node.js',
        text: text
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

exports.sendMail = sendMail;