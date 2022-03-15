const User = require('../models/userModel');
const sendMail = require('../services/sendEmail');
const Otp = require('../models/otpModel');
const Email = require('../models/emailModel');

exports.emailVerify = async (req, res) => {
  const user = req.body;
  var resUser;
  var resEmail;

  try {
    resUser = await User.findOne({ email: user.email });
    if (!resUser) res.status(400).json({ message: 'account not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (resUser)
    try {
      const newEmail = new Email({ email: resUser.email });
      resEmail = await newEmail.save();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  if (resEmail)
    try {
      var verifyUrl =
        req.protocol +
        '://' +
        req.get('host') +
        req.originalUrl +
        '/' +
        resEmail._id;

      const mailRes = await sendMail(
        resUser.email,
        'InstPay OTP number',
        'Hello, <br>' +
          ', your click  <b>' +
          verifyUrl +
          '</b><br><br><br>Thanks, Regards  <br>InstPay Team'
      );
      res.status(200).json({
        message: 'email sent',
        url: verifyUrl,
        //mail: mailRes.response,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.pinVerify = async (req, res) => {
  const otp = req.body;
  var resOtp;
  var resUser;

  try {
    resOtp = await Otp.findOne({
      _id: otp.key,
      otp: otp.otp,
    });
    if (!resOtp) res.status(400).json({ message: 'invalid key' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (resOtp)
    try {
      resUser = await User.findByIdAndUpdate(resOtp.account, {
        pin: resOtp.pin,
      });
      if (!resUser) res.status(400).json({ message: 'invalid account' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  if (resUser) res.status(200).json({ message: 'pin changed successfully' });
};

exports.emailVerifyID = async (req, res) => {
  const { id } = req.params;
  var resEmail;
  var resUser;

  try {
    resEmail = await Email.findById(id);
    if (!resEmail) res.status(400).json({ message: 'error' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (resEmail)
    try {
      resUser = await User.findOneAndUpdate(
        { email: resEmail.email },
        { verified: true }
      );

      if (resUser)
        res.status(200).json({ message: 'email verified successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};
