const mongoose = require('mongoose');

const payeesSceama = mongoose.Schema(
  {
    sender: { type: String, require: true },
    recever: { type: String, require: true },
    transactions: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payees', payeesSceama);
