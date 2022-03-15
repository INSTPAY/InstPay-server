const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { account, pin } = req.body;

  var user;
  var isCorrectPin;

  //get user
  try {
    user = await User.findById(account);
    if (!user) res.status(400).json({ message: 'account not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  //pin chake hash
  if (user)
    try {
      isCorrectPin = await bcrypt.compare(pin, user.pin);
      if (!isCorrectPin) res.status(400).json({ message: 'invalid pin' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  // create token
  if (isCorrectPin) {
    const token = jwt.sign(
      { account: user.account },
      process.env.JWT_CLIENT_SECRET
    );
    res.status(200).json({ account: user.account, token: token });
  }
};

exports.signup = async (req, res) => {
  const user = User(req.body);
  var resUser;

  //create account id
  user.account = Date.now();
  user._id = user.account;

  try {
    user.pin = await bcrypt.hash(user.pin, parseInt(process.env.SALT_ROUND));
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }

  // create token
  const token = jwt.sign(
    {
      account: user.account,
    },
    process.env.JWT_CLIENT_SECRET
    // { expiresIn: '1h' }
  );

  //chake is email alredy exits
  try {
    resUser = await User.findOne({ email: user.email });
    if (resUser)
      res.status(400).json({ message: 'email have a another account' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  //save user data database
  if (!resUser)
    try {
      const newuser = await user.save();

      res.status(200).json({ account: newuser.account, token: token });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
};
