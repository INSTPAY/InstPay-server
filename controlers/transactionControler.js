const Transaction = require('../models/transactionModel');
const TransactionWith = require('../models/transctionWithModel');
const User = require('../models/userModel');

exports.pay = async (req, res) => {
  const { account, to, amount } = req.body;

  var alredyTransWithRes;
  var newtransRes;
  var transWRes;

  // chake transcton With Alredy avalable
  try {
    alredyTransWithRes = await TransactionWith.findOne({
      sender: account,
      recever: to,
    });
    console.log('alredyTransWithRes ' + alredyTransWithRes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  // transcton With not  avalable crerate new transcton With Model
  if (!alredyTransWithRes)
    try {
      const newtransWith = new TransactionWith({
        sender: account,
        recever: to,
      });
      const e = await newtransWith.save();
      console.log('e ' + e);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  console.log('done 1');
  try {
    // form Account
    const fromAccount = await User.findOne({ account: account });
    const fromBalance = fromAccount.balance;
    const fromUpdatedBalance = fromBalance - amount;
    await User.findOneAndUpdate(
      { account: fromAccount },
      { balance: fromUpdatedBalance }
    );

    // to Account
    const toAccount = await User.findOne({ account: to });
    const toBalance = toAccount.balance;
    const toUpdatedBalance = toBalance + amount;
    await User.findOneAndUpdate(
      { account: toAccount },
      { balance: toUpdatedBalance }
    );

    const trans = Transaction({
      to: to,
      from: account,
      amount: amount,
    });
    // save transaction
    newtransRes = await trans.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  if (newtransRes)
    try {
      transWRes = await TransactionWith.findOneAndUpdate(
        {
          sender: account,
          recever: to,
        },
        {
          $addToSet: { transactions: newtransRes._id.toString() },
        }
      );
    } catch (error) {
      res.status(500).json({ message: error.message });
    }

  if (transWRes)
    try {
      tempUser = await User.findOneAndUpdate(
        {
          account: account,
        },
        {
          $addToSet: { transactions: transWRes._id },
        }
      );

      if (tempUser) res.status(200).json(newtransRes);
      console.log('ok 3');
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.transactions = async (req, res) => {
  const { account } = req.body;
  try {
    const trans = await Transaction.find({ from: account });
    const trans2 = await Transaction.find({ to: account });

    if (trans) res.status(200).json([trans, trans2]);
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

exports.transactionWith = async (req, res) => {
  const { account, recever } = req.body;
  try {
    const trans = await TransactionWith.findOne({
      sender: account,
      recever: recever,
    });

    if (trans) res.status(200).json(trans.transactions);
    else res.status(400).json({ message: 'transaction not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.transactionWithId = async (req, res) => {
  const { _id } = req.body;
  try {
    const trans = await TransactionWith.findById(_id);

    if (trans) res.status(200).json(trans);
    else res.status(400).json({ message: 'transaction not found' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
