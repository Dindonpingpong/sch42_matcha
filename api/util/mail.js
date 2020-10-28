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

const sendMail = (to, subject, text, html = '') => {
    const mailOptions = {
        from: userName,
        to: to,
        subject: subject,
        text: text,
        html: html
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          return false;
        } else {
          return true;
        }
      });
}

exports.sendMail = sendMail;