const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');

exports.pay = async (req, res) => {
  const { account, to, amount } = req.body;

  try {
    // form Account
    const fromAccount = await User.findOne({ account: account });
    const fromBalance = fromAccount.balance;
    const fromUpdatedBalance = fromBalance - amount;

    //saving new amount into From Account
    const upFrom = await User.findOneAndUpdate(
      { account: account },
      { balance: fromUpdatedBalance }
    );

    // to Account
    const toAccount = await User.findOne({ account: to });
    const toBalance = toAccount.balance;
    const toUpdatedBalance = toBalance + amount;

    //saving new amount into to Account
    const upTo = await User.findOneAndUpdate(
      { account: to },
      { balance: toUpdatedBalance }
    );

    //create transaction
    const trans = Transaction({
      to: to,
      from: account,
      amount: amount,
    });

    // save transaction
    newtransRes = await trans.save();

    res.status(200).json(newtransRes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.transactions = async (req, res) => {
  const { account } = req.body;
  try {
    const trans = await Transaction.find({ from: account });
    const trans2 = await Transaction.find({ to: account });

    const newtrans = [...trans, ...trans2];

    if (trans) res.status(200).json(newtrans);
    else res.status(400).json({ message: 'transactions not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.transaction = async (req, res) => {
  const { _id } = req.body;
  try {
    const trans = await Transaction.findById(_id);

    if (trans) res.status(200).json(trans);
    else res.status(400).json({ message: 'transaction not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payees = async (req, res) => {
  const { account } = req.body;
  try {
    const trans = await Transaction.find({
      from: account,
    });

    var tempToList = [];

    for (let index = 0; index < trans.length; index++) {
      tempToList[index] = trans[index].to;
    }

    console.log(tempToList);

    let to = [...new Set(tempToList)];

    console.log(to);

    var finalUserList = [];

    for (let index = 0; index < to.length; index++) {
      var transs = await User.findOne({
        account: to[index],
      });

      finalUserList[index] = transs;
    }

    console.log(finalUserList);

    if (trans) res.status(200).json(finalUserList);
    else res.status(400).json({ message: 'transaction not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
