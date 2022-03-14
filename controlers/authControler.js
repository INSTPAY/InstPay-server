const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  try {
    const { account, pin } = req.body;

    //get user
    const user = await User.findById(account);

    try {
      //chaking user pin
      const isCorrectPin = await bcrypt.compare(user.pin, pin);

      if (isCorrectPin) {
        // create token
        const token = jwt.sign(
          {
            account: user.account,
          },
          process.env.JWT_CLIENT_SECRET
          // { expiresIn: '1h' }
        );
        res.status(200).json({ account: user.account, token: token });
      } else
        res
          .status(400)
          .json({ message: 'check your pin', error: error.message });
    } catch (error) {
      res.status(400).json({ message: 'check your pin', error: error.message });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: 'account not found', error: error.message });
  }
};

exports.signup = async (req, res) => {
  const user = User(req.body);

  //create account id
  user.account = Date.now();
  user._id = user.account;

  try {
    user.pin = await bcrypt.hash(user.pin, parseInt(process.env.SALT_ROUND));
  } catch (error) {
    res.status(500).json({
      message: 'you got some error, try again!',
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

  //save user data database
  try {
    const newuser = await user.save();

    res.status(200).json({ account: newuser.account, token: token });
  } catch (error) {
    res.status(400).json({
      message: 'you got some error, try again!',
      error: error.message,
    });
  }
};
