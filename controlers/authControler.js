const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.login = async (req, res) => {
  try {
    const { account, pin } = req.body;
    const user = await User.findOne({ account: account, pin: pin });

    // create token
    const token = jwt.sign(
      {
        account: user.account,
      },
      process.env.JWT_CLIENT_SECRET
      // { expiresIn: '1h' }
    );

    if (user) res.status(200).json({ account: user.account, token: token });
    else res.status(400).json({ message: 'account not found' });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

exports.signup = async (req, res) => {
  const user = User(req.body);

  //create account id
  user.pin = Math.floor(Math.random() * 9999);
  user.account = Date.now();
  user._id = user.account;

  // create token
  const token = jwt.sign(
    {
      account: user.account,
    },
    process.env.JWT_CLIENT_SECRET
    // { expiresIn: '1h' }
  );

  //save user data database
  try {
    const newuser = await user.save();

    res
      .status(200)
      .json({ account: newuser.account, pin: newuser.pin, token: token });
  } catch (error) {
    res.status(501).json({ error: error.message });
  }
};
