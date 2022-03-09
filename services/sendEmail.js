const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendMail = async (to, message) => {
  var mailOptions = {
    from: process.env.GMAIL_ACCOUNT,
    to: to,
    subject: 'Sending Email from InstPay',
    text: message,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    return error.message;
  }
};

module.exports = sendMail;
