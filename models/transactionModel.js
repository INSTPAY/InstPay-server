const mongoose = require('mongoose');

const transactionSceama = mongoose.Schema(
  {
    to: { type: String, require: true },
    from: { type: String, require: true },
    balance: { type: Number, default: 1000 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSceama);
