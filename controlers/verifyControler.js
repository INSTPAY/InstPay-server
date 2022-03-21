const sendMail = require('../services/sendEmail');
const Otp = require('../models/otpModel');
const User = require('../models/userModel');

exports.emailVerify = async (req, res) => {
  const { email } = req.body;

  try {
    const resUser = await User.findOne({ email: email });

    if (resUser)
      res.status(200).json({ message: 'email already', status: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const newOtp = new Otp({
    payload: email,
    otp: otp,
  });

  const sendOtp = async () => {
    const mailRes = await sendMail(
      newOtp.payload,
      'InstPay OTP number',
      'Hello, <br>' +
        'Your otp is <h1><b>' +
        newOtp.otp +
        '</h1></b><br><br><br>Thanks, Regards  <br>InstPay Team'
    );
    return mailRes;
  };

  var resMail;
  try {
    const resOtp = await newOtp.save();
    if (resOtp) resMail = await sendOtp();
    if (resMail) res.status(200).json({ message: 'email sent', status: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.emailVerifyByOtp = async (req, res) => {
  const { otp, email } = req.body;

  try {
    const resEmail = await Otp.findOne({ payload: email, otp: otp });

    if (resEmail) {
      res.status(200).json({ message: 'email verified', status: true });
    } else res.status(400).json({ message: 'wrong otp', status: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
