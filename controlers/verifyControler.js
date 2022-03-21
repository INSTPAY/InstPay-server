const sendMail = require('../services/sendEmail');
const Otp = require('../models/otpModel');

exports.emailVerify = async (req, res) => {
  const { email } = req.body;

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
    if (resMail) res.status(200).json({ message: 'email sent' });
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
