const mongoose = require('mongoose');

const transactionSceama = mongoose.Schema(
  {
    to: { type: String, require: true },
    from: { type: String, require: true },
    amount: { type: Number, require: true },
    type: { type: Number, require: true },
    method: { type: Number, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSceama);
