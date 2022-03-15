const User = require('../models/userModel');
const sendMail = require('../services/sendEmail');
const Otp = require('../models/otpModel');

exports.account = async (req, res) => {
  const user = req.body;
  var resUser;

  try {
    resUser = await User.findOne({ email: user.email });
    if (!resUser) res.status(400).json({ message: 'invalid email' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (resUser)
    try {
      const mailRes = await sendMail(
        resUser.email,
        'Forget InstPay account number',
        'Hello, <br>' +
          resUser.name +
          ', your account number is <b>' +
          resUser.account +
          '</b><br><br><br>Thanks, Regards  <br>InstPay Team'
      );
      res.status(200).json({ message: 'email sent', mail: mailRes.response });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.pin = async (req, res) => {
  const body = req.body;
  var resOtp;
  var resUser;

  const newOtp = new Otp({
    otp: Math.floor(Math.random() * 9999) + 1000,
    account: body.account,
    mail: body.mail,
    pin: body.pin,
  });

  try {
    resUser = await User.findById(body.account);
    if (!resUser) res.status(400).json({ message: 'account not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (resUser)
    try {
      resOtp = await newOtp.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  if (resOtp)
    try {
      const mailRes = await sendMail(
        resUser.email,
        'InstPay OTP number',
        'Hello, <br>' +
          resUser.name +
          ', your OTP <b>' +
          newOtp.otp +
          '</b><br><br><br>Thanks, Regards  <br>InstPay Team'
      );
      res.status(200).json({
        key: resOtp._id,
        message: 'email sent',
        mail: mailRes.response,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
