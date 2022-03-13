const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

exports.pay = async (req, res) => {
  const { account, to, balance } = req.body;
  try {
    // form Account
    const fromAccount = await User.findOne({ account: account });
    const fromBalance = fromAccount.balance;
    const fromUpdatedBalance = parseInt(fromBalance) - parseInt(balance);
    await User.findOneAndUpdate(
      { account: fromAccount },
      { balance: fromUpdatedBalance }
    );

    // to Account
    const toAccount = await User.findOne({ account: to });
    const toBalance = toAccount.balance;
    const toUpdatedBalance = parseInt(toBalance) + parseInt(balance);
    await User.findOneAndUpdate(
      { account: toAccount },
      { balance: toUpdatedBalance }
    );

    const trans = Transaction({
      to: to,
      from: account,
      balance: balance,
    });
    // save transaction
    const newtrans = await trans.save();

    if (newtrans) res.status(200).json(newtrans);
    else res.status(400).json({ message: 'transactions not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transactions = async (req, res) => {
  const { account } = req.body;
  try {
    const trans = await Transaction.find({ from: account });

    if (trans) res.status(200).json(trans);
    else res.status(400).json({ message: 'transactions not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.transaction = async (req, res) => {
  const { id } = req.body;
  try {
    const trans = await Transaction.findById(id);

    if (trans) res.status(200).json(trans);
    else res.status(400).json({ message: 'transaction not found' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
