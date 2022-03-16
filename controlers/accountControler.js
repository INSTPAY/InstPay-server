const User = require('../models/userModel');

exports.account = async (req, res) => {
  try {
    const { account } = req.body;
    const user = await User.findOne({ account: account });

    if (user) res.status(200).json(user);
    else res.status(404).json({ message: 'account not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.patch = async (req, res) => {
  const { account } = req.body;
  try {
    const newuser = await User.findOneAndUpdate({ account: account }, req.body);
    res.status(200).json({ message: 'account updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  const { account } = req.body;
  try {
    const newuser = await User.findOneAndRemove({ account: account });
    res.status(200).json({ message: 'account deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.receiverAccount = async (req, res) => {
  try {
    const { receiver } = req.body;
    const user = await User.findOne({ account: receiver });

    if (user) res.status(200).json(user);
    else res.status(404).json({ message: 'account not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
