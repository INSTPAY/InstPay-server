const mongoose = require('mongoose');

const otpSceama = mongoose.Schema(
  {
    otp: { type: String, require: true },
    account: { type: String, require: true },
    pin: { type: String, require: true },
  },

  { timestamps: true }
);
module.exports = mongoose.model('Otp', otpSceama);
