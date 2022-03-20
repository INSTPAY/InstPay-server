const User = require('../models/userModel');
const sendMail = require('../services/sendEmail');
const Otp = require('../models/otpModel');
const Email = require('../models/emailModel');

exports.emailVerify = async (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  const newEmailModel = new Email({
    email: email,
    otp: otp,
  });

  var mailRes;

  mailRes = await sendMail(
    newEmailModel.email,
    'InstPay OTP number',
    'Hello, <br>' +
      'Your otp is <h1><b>' +
      newEmailModel.otp +
      '</h1></b><br><br><br>Thanks, Regards  <br>InstPay Team'
  );

  if (mailRes)
    try {
      const resEmail = await newEmailModel.save();
      if (resEmail) res.status(200).json({ message: 'email sent' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.emailVerifyByOtp = async (req, res) => {
  const { otp, email } = req.body;

  try {
    const resEmail = await Email.findOne({ email: email, otp: otp });

    if (resEmail)
      res.status(200).json({ message: 'email verified', status: true });
    else res.status(400).json({ message: 'wrong otp', status: false });
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

// exports.emailVerifyID = async (req, res) => {
//   const { id } = req.params;
//   var resEmail;
//   var resUser;

//   try {
//     resEmail = await Email.findById(id);
//     if (!resEmail) res.status(400).json({ message: 'error' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }

//   if (resEmail)
//     try {
//       resUser = await User.findOneAndUpdate(
//         { email: resEmail.email },
//         { verified: true }
//       );

//       if (resUser)
//         res.status(200).json({ message: 'email verified successfully' });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// };
