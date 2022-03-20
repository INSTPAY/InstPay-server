const User = require('../models/userModel');
const sendMail = require('../services/sendEmail');

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
