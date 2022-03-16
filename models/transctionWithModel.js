const mongoose = require('mongoose');

const transactionWithSceama = mongoose.Schema(
  {
    sender: { type: String, require: true },
    recever: { type: String, require: true },
    transactions: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TransactionWith', transactionWithSceama);
